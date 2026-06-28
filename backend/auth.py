from hashlib import sha256

from fastapi import HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from models import SessionLocal, User


class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


def _hash_password(password: str) -> str:
    return sha256(password.encode("utf-8")).hexdigest()


def register_user(payload: UserCreate) -> dict[str, object]:
    with SessionLocal() as db:  # type: Session
        existing = db.query(User).filter(User.username == payload.username).first()
        if existing:
            raise HTTPException(status_code=409, detail="User already exists")

        user = User(username=payload.username, password_hash=_hash_password(payload.password))
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "registered", "user": {"id": user.id, "username": user.username}}


def login_user(payload: UserLogin) -> dict[str, object]:
    with SessionLocal() as db:  # type: Session
        user = db.query(User).filter(User.username == payload.username).first()
        if not user or user.password_hash != _hash_password(payload.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {"message": "logged in", "user": {"id": user.id, "username": user.username}}
