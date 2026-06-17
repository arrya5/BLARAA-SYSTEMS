# BLARAA Systems

> India's energy & carbon compliance platform — CBAM, CCTS, RCO, CAFE, and ECSBC in one place.

BLARAA Systems is an open-source SaaS platform that helps Indian industrial companies navigate the wave of energy and carbon regulations arriving between 2025–2027. Instead of juggling spreadsheets and gazette notifications, compliance teams get purpose-built tools that turn raw plant data into audit-ready reports in minutes.

---

## Why this exists

Three major regulations are hitting Indian industry simultaneously:

- **EU CBAM** (Carbon Border Adjustment Mechanism) — quarterly emissions reporting for exporters.
- **CCTS** (Carbon Credit Trading Scheme) — India's mandatory carbon market for 740 factories across 9 obligated sectors.
- **RCO** (Renewable Consumption Obligation) — minimum renewable-energy consumption targets through FY 2029–30.

Most companies are not ready. BLARAA Systems makes each of these calculable, traceable, and reportable — with every number mapped back to its official government source.

---

## Live tools

| Tool | What it does |
|------|--------------|
| **CarbonFile** | Generates EU-compliant CBAM quarterly reports in under 60 seconds (direct + indirect emissions), with XML schema and PDF output. |
| **ComplianceCore** | Calculates CCTS compliance — Greenhouse Gas Emission Intensity and Carbon Credit Certificate surplus/deficit for obligated sectors. |
| **RenewTrack** | Manages RCO compliance through FY 2029–30, tracking four RE components and computing REC units needed with CERC buyout pricing. |

> In development: CAFE efficiency standards, building energy codes (ECSBC), and a trading platform.

---

## Tech stack

**Frontend**
- React (Create React App)
- Tailwind CSS + custom styling
- Lucide React icons
- Axios

**Backend (CBAM module)**
- Python 3.12 + FastAPI
- Pydantic + xsdata (XSD binding)
- ReportLab (PDF generation)
- SQLite (audit trail)

> CCTS and RCO tools are fully client-side; only CBAM requires backend API calls.

---

## Getting started

### Prerequisites
- Node.js 18+
- Python 3.12+

### Frontend
```bash
cd frontend
npm install
npm start
```
The app runs at `http://localhost:3000`.

### Backend (only needed for CBAM)
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn api:app --reload
```
The API runs at `http://localhost:8000` (docs at `/docs`).

---

## Project structure
```
BLARAA-SYSTEMS/
├── frontend/          # React app — all platform tools
│   └── src/App.js
├── backend/           # FastAPI — CBAM calculator + PDF generator
├── docs/              # Service docs mapped to government sources
└── .github/workflows/ # CI/CD
```

---

## Accuracy & sources

Every calculation in BLARAA Systems is derived directly from government notifications and BEE/CERC orders. The `docs/` folder maps each formula to its official gazette source, so results are auditable end-to-end.

> ⚠️ **Disclaimer:** BLARAA Systems is a decision-support tool, not legal or financial advice. Always verify outputs against the latest official notifications before filing.

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

Released under the [MIT License](LICENSE).

## Author

**Arrya Thakur** — [@arrya5](https://github.com/arrya5)
