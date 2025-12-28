# CBAM Compliance SaaS

A full-stack application for generating EU-compliant CBAM (Carbon Border Adjustment Mechanism) XML reports.

## 🏗️ Project Structure

```
cbam-project/
├── backend/          # Python FastAPI backend
│   ├── api.py        # REST API endpoints
│   ├── calculator.py # Carbon emissions calculator
│   ├── cbam_models.py # Pydantic models from XSD
│   ├── database.py   # SQLite audit trail
│   └── schemas/      # EU XSD schema files
└── frontend/         # React frontend
    ├── src/
    └── public/
```

## 🚀 Features

- ✅ EU-compliant XML generation (Regulation 2023/1773)
- ✅ Carbon emissions calculator (Direct + Indirect)
- ✅ Pydantic validation for data integrity
- ✅ Audit trail database for compliance
- ✅ React dashboard for easy data entry

## 🛠️ Tech Stack

**Backend:**
- Python 3.12
- FastAPI
- Pydantic
- xsdata (XML binding)
- SQLite (audit trail)

**Frontend:**
- React 18
- Tailwind CSS
- Axios

## 📦 Installation

### Backend
```bash
cd backend
python -m venv .venv
.venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn api:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🔗 API Endpoints

- `POST /generate-xml` - Generate CBAM compliance report


## 🔭 Live Demo

- **Frontend (GitHub Pages):** https://arrya5.github.io/BLARAA-SYSTEMS/  
  ![Pages](https://github.com/arrya5/BLARAA-SYSTEMS/actions/workflows/gh-pages.yml/badge.svg)

- **Backend (Render):** https://cbam-full-app.onrender.com/  
  (API docs: https://cbam-full-app.onrender.com/docs)


## 📄 License

MIT
