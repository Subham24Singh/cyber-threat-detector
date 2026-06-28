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

---

Login Interface
<img width="1455" height="555" alt="Screenshot (90)" src="https://github.com/user-attachments/assets/e94defef-9aa0-4f3a-8a51-9f118d4ed87d" />

---

Registration & Validation
<img width="1448" height="556" alt="Screenshot (91)" src="https://github.com/user-attachments/assets/ad7f666f-6136-4ef7-b735-9dfbc67f88a3" />
<img width="1435" height="574" alt="Screenshot (93)" src="https://github.com/user-attachments/assets/ae667df9-cc89-46b7-b1f9-26e7dc371098" />

---

Typosquatting Intelligence :- e.g., detecting that `rnicrosoft.com` is a deceptive spoof of `microsoft.com`
<img width="1446" height="612" alt="Screenshot (101)" src="https://github.com/user-attachments/assets/bedf6ec6-0f39-4983-9c81-d5547eeddbff" />

---

Phishing & Malicious Link Detection
<img width="1451" height="610" alt="Screenshot (102)" src="https://github.com/user-attachments/assets/0b324dfd-4e50-4ed9-85fc-f3ae1a37a59e" />

---

Safe Content Verification :- The system is tuned to minimize "False Positives," correctly identifying legitimate communication as safe.
<img width="1436" height="610" alt="Screenshot (103)" src="https://github.com/user-attachments/assets/26eeba6b-8ae1-4a85-9727-cb7bb8fe2a22" />
