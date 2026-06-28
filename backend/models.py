import os
from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# --- FIX START ---
# 1. Get the absolute path of the current folder (backend)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. Define the data directory path
DATA_DIR = os.path.join(BASE_DIR, "data")

# 3. Create the 'data' folder if it doesn't exist
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# 4. Set the database path correctly
DB_PATH = os.path.join(DATA_DIR, "cyber_threat.db")

# Windows handling for SQLite string
if os.name == 'nt':
    DATABASE_URL = f"sqlite:///{DB_PATH.replace('\\', '/')}"
else:
    DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
# --- FIX END ---

Base = declarative_base()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ThreatEvent(Base):
    __tablename__ = "threat_events"
    id = Column(Integer, primary_key=True, index=True)
    source = Column(String(120), nullable=False)
    severity = Column(String(20), default="medium")
    summary = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

def create_db_and_tables() -> None:
    Base.metadata.create_all(bind=engine)