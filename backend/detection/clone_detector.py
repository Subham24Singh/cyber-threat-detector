class CloneDetector:
    def scan(self, text: str) -> list[dict[str, object]]:
        phrases = [segment.strip() for segment in text.split() if segment.strip()]
        findings: list[dict[str, object]] = []

        for phrase in phrases:
            lowered = phrase.lower()
            if any(keyword in lowered for keyword in ["bank", "paypal", "microsoft", "office", "amazon"]):
                findings.append({"target": phrase, "status": "flagged"})
            elif "http" in lowered:
                findings.append({"target": phrase, "status": "review"})

        return findings
