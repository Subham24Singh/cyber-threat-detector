# Cyber Threat Detector

This starter project includes:

- A FastAPI backend with authentication and threat-analysis endpoints.
- A React + Vite frontend with login, registration, and dashboard views.
- Docker Compose support for running both services together.

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
