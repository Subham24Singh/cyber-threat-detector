from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from auth import UserCreate, UserLogin, login_user, register_user
from detection.clone_detector import CloneDetector
from detection.link_scanner import LinkScanner
from detection.phishing import PhishingDetector
from models import create_db_and_tables

app = FastAPI(title="Cyber Threat Detector", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db_and_tables()

phishing_detector = PhishingDetector()
link_scanner = LinkScanner()
clone_detector = CloneDetector()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/register")
def register(payload: UserCreate) -> dict[str, Any]:
    return register_user(payload)


@app.post("/auth/login")
def login(payload: UserLogin) -> dict[str, Any]:
    return login_user(payload)


@app.post("/detect")
def detect(payload: dict[str, Any]) -> dict[str, Any]:
    url = str(payload.get("url", "")).strip()
    content = str(payload.get("content", "")).strip()

    # Get results from your modules
    # Ensure these methods ALWAYS return the correct type (dict, list, str)
    p_result = phishing_detector.score(content or url)
    l_result = link_scanner.scan(url or content)
    c_result = clone_detector.scan(url or content)

    # CRITICAL: We force the format here so React never receives "None"
    return {
        "phishing_score": {
            "score": p_result.get("score", 0) if isinstance(p_result, dict) else 0,
            "label": p_result.get("label", "Safe") if isinstance(p_result, dict) else "Safe"
        },
        "link_findings": l_result if isinstance(l_result, list) else [],
        "clone_findings": str(c_result) if c_result else "No clones detected.",
        "summary": "Analysis complete."
    }