# Cyber Threat Detector

This starter project includes:

## 🚀 Features
- **Email Phishing Detector:** ML-based analysis of email content.
- **Link Heuristics:** Detects raw IP addresses and abnormally long URLs.
- **Typosquatting Intelligence:** Flags domains that mimic popular brands (e.g., `rnicrosoft.com`).
- **Modern Dashboard:** Built with React, Tailwind CSS, and Lucide Icons.
- **Dockerized:** Entire system runs with a single command.

- ## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Axios.
- **Backend:** FastAPI (Python), SQLAlchemy, Scikit-learn.
- **Database:** SQLite.
- **DevOps:** Docker, Docker Compose.

## Run locally

### Backend

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Docker Compose

```bash
docker compose up --build
```




## 📺 Project Walkthrough

### 1. Secure Access & Validation
The application features a robust authentication system. 
- **Strict Validation:** The registration engine employs advanced Regex to enforce legitimate email formats, rejecting raw or malicious strings.
- **Data Privacy:** User credentials are secured using **Bcrypt password hashing** before being stored in the SQLite database.

  Login Interface
 <img width="1455" height="555" alt="Screenshot (90)" src="https://github.com/user-attachments/assets/e94defef-9aa0-4f3a-8a51-9f118d4ed87d" />

