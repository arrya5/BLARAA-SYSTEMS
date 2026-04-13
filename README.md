<div align="center">

<img src="https://img.shields.io/badge/STATUS-LIVE-brightgreen?style=for-the-badge&logo=statuspage" />
<img src="https://img.shields.io/badge/EU_CBAM-Compliant-blue?style=for-the-badge&logo=europeanunion" />
<img src="https://img.shields.io/badge/Made_in-India-orange?style=for-the-badge&logo=india" />

# 🌿 CarbonFile — CBAM Compliance SaaS
### by BLARAA Systems

**The fastest way for Indian exporters to generate EU-compliant carbon reports.**  
Generate official XML + PDF reports in under 60 seconds. No spreadsheets. No guesswork.

---

### 🚀 [**OPEN THE LIVE APPLICATION →**](https://blaraa-systems.vercel.app/)

[![Pages](https://github.com/arrya5/BLARAA-SYSTEMS/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/arrya5/BLARAA-SYSTEMS/actions/workflows/gh-pages.yml)
[![Backend](https://img.shields.io/badge/Backend_API-Live_on_Render-46E3B7?logo=render)](https://cbam-full-app.onrender.com/docs)

</div>

---

## 🌍 What is This?

Starting in 2026, any Indian company exporting **steel, cement, aluminum, fertilizers, or electricity** to the EU must submit a CBAM (Carbon Border Adjustment Mechanism) compliance report with embedded carbon emission data.

**CarbonFile** automates this entire process:

| Without CarbonFile | With CarbonFile |
|---|---|
| 📋 Manual spreadsheet calculations | ⚡ Instant automatic calculation |
| ❌ Wrong formula, wrong format | ✅ EU-certified XSD schema output |
| 🕐 Hours of work per quarter | 🚀 Done in under 60 seconds |
| 😰 No audit trail | 🔒 Permanent tamper-proof log |

---

## ✨ Features

- ✅ **EU-compliant XML** — Output follows official EU CBAM schema (Regulation 2023/1773)
- ✅ **PDF Report** — Human-readable version for internal stakeholders
- ✅ **Carbon Calculator** — Uses official EU emission factors (NCV × EF methodology)
- ✅ **Indirect Emissions** — India Grid electricity factor (CEA 0.757 tCO2e/MWh)
- ✅ **Live Estimate** — Real-time emission preview as you type
- ✅ **Audit Vault** — Every report timestamped and logged forever
- ✅ **Feedback System** — Star-rating feedback with backend storage
- ✅ **Admin Panel** — Secure audit log viewer (stealth access)

---

## 🖥️ Screenshots & Live Demo

> ### 👉 [**Try it now: blaraa-systems.vercel.app**](https://blaraa-systems.vercel.app/)

The application has 4 screens:

| Screen | Description |
|---|---|
| 🏠 **Landing Page** | Hero section, product suite, FAQ accordion |
| 📊 **Report Generator** | Step-by-step form with live emission preview |
| 💬 **Feedback** | Star-rating form for user experience |
| 🔒 **Admin Vault** | Password-protected audit log viewer |

---

## 🛠️ Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| **Python 3.12** | Core language |
| **FastAPI** | REST API framework |
| **Pydantic + xsdata** | EU XSD → Python model binding |
| **ReportLab** | PDF generation |
| **SQLite** | Audit trail database |
| **Render.com** | Backend hosting |

### Frontend
| Tool | Purpose |
|---|---|
| **React 19** | UI framework |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP client |
| **Lucide React** | Icons |
| **Vercel / GH Pages** | Frontend hosting |
| **GitHub Actions** | CI/CD pipeline |

---

## 🏗️ Project Structure

```
BLARAA-SYSTEMS/
├── .github/
│   └── workflows/
│       └── gh-pages.yml        ← Auto-deploy to GitHub Pages on push
├── backend/
│   ├── api.py                  ← FastAPI endpoints (XML, PDF, Feedback, Admin)
│   ├── calculator.py           ← Direct & Indirect emissions calculator
│   ├── cbam_models.py          ← Pydantic models from EU XSD schema (1875 lines)
│   ├── database.py             ← SQLite audit trail + feedback tables
│   ├── pdf_generator.py        ← ReportLab PDF builder
│   ├── main.py                 ← Standalone XML generator script (dev tool)
│   └── schemas/
│       ├── QReport_ver23.00.xsd    ← Official EU CBAM quarterly report schema
│       └── stypes.xsd              ← EU supporting types
└── frontend/
    └── src/
        └── App.js              ← Complete React application (855 lines)
```

---

## 🔗 API Reference

**Base URL:** `https://cbam-full-app.onrender.com`  
**Interactive Docs:** [`/docs`](https://cbam-full-app.onrender.com/docs)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/generate-xml` | Generate EU-compliant CBAM XML report |
| `POST` | `/generate-pdf` | Generate human-readable PDF report |
| `POST` | `/submit-feedback` | Submit user feedback with star rating |
| `GET` | `/admin/view-vault` | View last 5 audit logs (requires `x-admin-key` header) |

### Request Body (for XML & PDF):
```json
{
  "company_name": "Sharma Fasteners Pvt Ltd",
  "company_id": "GSTIN123456789",
  "production_tonnes": 1500.0,
  "coal_tonnes": 50.0,
  "electricity_kwh": 20000.0,
  "city": "Ludhiana"
}
```

---

## 🧮 How Emissions Are Calculated

### Direct Emissions (Coal/Fuel)
```
Energy (TJ)   = Fuel Quantity (t) × NCV (TJ/t)
Total CO2e    = Energy (TJ) × Emission Factor (tCO2/TJ)
Specific (SEE) = Total CO2e / Production Quantity (t)
```

**EU Default Factors used:**
| Fuel | NCV (TJ/t) | EF (tCO2/TJ) |
|---|---|---|
| Lignite Coal | 0.0119 | 101.2 |
| Natural Gas | 0.0480 | 56.1 |
| Diesel | 0.0427 | 74.1 |

### Indirect Emissions (Electricity)
```
Consumption (MWh) = kWh / 1000
Total CO2e = MWh × India Grid Factor (0.757 tCO2e/MWh)
Specific   = Total CO2e / Production Quantity (t)
```
*Grid Factor Source: Central Electricity Authority (CEA), India*

---

## 🚀 Run Locally

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn api:app --reload
# API running at http://localhost:8000
# Docs at http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm start
# App running at http://localhost:3000
```

> **Note:** Frontend calls the production backend by default (`https://cbam-full-app.onrender.com`).  
> To use local backend, set `REACT_APP_API_URL=http://localhost:8000` in `frontend/.env`.

---

## 📦 Backend Dependencies

```
fastapi
uvicorn
pydantic
xsdata
xsdata-pydantic
reportlab
```

*(See `backend/requirements.txt` for pinned versions)*

---

## 🌐 Deployment

| Service | What it hosts | Auto-deploy trigger |
|---|---|---|
| **Vercel** | Production Frontend | Push to `main` → Vercel auto-deploys |
| **GitHub Pages** | Backup Frontend | Push to `main` → GitHub Actions builds and deploys to `gh-pages` branch |
| **Render.com** | FastAPI backend | Push to `main` → Render auto-deploys |

---

## 📄 License

MIT — Free to use, modify, and distribute.

---

<div align="center">

**Built with 🌿 by BLARAA Systems • India**  
*Professional CBAM Compliance Solutions*

📞 9816979777 | 9805900001

**[🚀 Open Application](https://blaraa-systems.vercel.app/) · [📖 API Docs](https://cbam-full-app.onrender.com/docs) · [🐙 GitHub](https://github.com/arrya5/BLARAA-SYSTEMS)**

</div>
