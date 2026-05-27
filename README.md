<div align="center">

<img src="https://img.shields.io/badge/STATUS-LIVE-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/Platform-ComplianceOS-092f6f?style=for-the-badge" />
<img src="https://img.shields.io/badge/Made_in-India-ff9933?style=for-the-badge" />

# BLARAA Systems — ComplianceOS

### India's complete energy and carbon compliance platform

**CBAM · CCTS · RCO · CAFE · ECSBC · Carbon Market · Cold Chain · SEEI**

Every tool is built directly from government notifications, gazette rules, and official BEE/CERC orders.
No spreadsheets. No guesswork. No waiting for a consultant.

---

### [**OPEN THE LIVE PLATFORM →**](https://blaraa-systems.vercel.app/)

</div>

---

## What Is ComplianceOS?

ComplianceOS is a multi-tool SaaS platform that helps Indian industrial companies, exporters, utilities, and buildings navigate India's rapidly expanding energy and carbon compliance landscape.

Between 2025 and 2027, three major regulations hit simultaneously:

| Regulation | Who It Hits | Deadline |
|---|---|---|
| EU CBAM | Every Indian exporter of steel, cement, aluminium, fertiliser, hydrogen | Jan 2026 — full enforcement |
| CCTS (India's carbon market) | 740 large factories across 9 sectors | Jul 31, 2026 — first Form A |
| RCO (Renewable Consumption Obligation) | All DISCOMs, open access consumers, captive power plants | May 31, 2026 — 4th and final extension |

Instead of building separate tools for each regulation, ComplianceOS handles them all in one place.

---

## Live Tools

### CarbonFile — EU CBAM Report Generator
**Status: LIVE** · Regulation: EU Regulation 2023/956

Generate EU-compliant CBAM quarterly reports in under 60 seconds. Covers direct emissions (coal, gas, fuel combustion) and indirect emissions (grid electricity via CEA factors). Outputs the official EU XML schema (XSD) + human-readable PDF.

**Who needs it:** Any Indian exporter shipping steel, cement, aluminium, fertiliser, or hydrogen to the EU.

---

### ComplianceCore — CCTS MRV Tool
**Status: LIVE** · Regulation: EC Amendment Act 2022 + GHG EI Target Rules 2025

India's mandatory carbon market compliance calculator. Enter your Scope 1 (direct) and Scope 2 (purchased electricity) GHG emissions plus your production volume — the tool calculates your Greenhouse Gas Emission Intensity (GEI), compares it to your BEE-notified target, and tells you exactly how many Carbon Credit Certificates (CCCs) you have earned or need to buy.

Covers all 9 CCTS obligated sectors across both phases:
- Phase 1 (Oct 2025): Cement, Aluminium, Chlor Alkali, Pulp & Paper
- Phase 2 (Jan 2026): Iron & Steel, Fertiliser, Petroleum Refinery, Petrochemicals, Textile

Calculates estimated CCC revenue (surplus) or procurement cost + Environmental Compensation penalty (deficit). Full compliance timeline shown with all key BEE/CERC deadlines.

**Who needs it:** 740 factories across 9 sectors notified by BEE under the GHG Emission Intensity Target Rules 2025.

---

### RenewTrack — RCO Compliance Calculator
**Status: LIVE** · Regulation: MoP Gazette Notification 27 Sep 2025

Calculate your Renewable Consumption Obligation (RCO) compliance position for FY 2024-25 through FY 2029-30. Covers all four mandatory RE components (Wind, Hydro, Distributed RE, Other RE) with individual minimum thresholds per the MoP notification. Auto-applies the 50% DRE concession for hilly and North-Eastern states.

Shows REC units needed, CERC buyout price (Rs 347/MWh for FY 2024-26, +5% annually), and penalty exposure under Section 26(3) of the EC Act 2001.

**Who needs it:** DISCOMs, open access consumers, and captive power plants — the May 31, 2026 deadline is the 4th and final extension.

---

## Services in Development

| Service | Regulation | Priority |
|---|---|---|
| FuelCompute — CAFE 3 | BEE CAFE 3 Draft Norms 2027-32 | Next |
| BuildCode — ECSBC | ECSBC 2024 + Eco-Niwas Samhita 2024 | Planned |
| AuditPrep — BEE Exam Prep | BEE Certification Regulations 2025 | Planned |
| GreenCredit — Voluntary Carbon | CCTS Offset Mechanism, 8 Methodologies | Planned |
| CarbonXchange — CCC Trading | CCTS Compliance Mechanism | Planned |
| ConnectBEE — BEE Portal Integration | BEE ADEETIE, SAATHEE Portals | Planned |
| ColdTrack — Cold Chain Energy Audit | BEE Cold Chain Guidelines | Planned |
| StateSync — SEEI Dashboard | BEE State Energy Efficiency Index | Planned |

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React (Create React App) | UI framework — all components in a single App.js |
| Tailwind CSS + custom CSS | Styling, CSS variables, animations |
| Lucide React | Icons |
| Axios | HTTP client for CBAM backend API calls |
| Vercel | Production hosting (auto-deploys on push to main) |

Single-file architecture — all platform components, tools, and routing live in `frontend/src/App.js`. Navigation uses a `view` state string (no React Router). CCTS and RCO tools are fully client-side (no backend needed).

### Backend (CBAM tool only)
| Tool | Purpose |
|---|---|
| Python 3.12 + FastAPI | REST API framework |
| Pydantic + xsdata | EU XSD to Python model binding |
| ReportLab | PDF generation |
| SQLite | Audit trail and feedback database |
| Render.com | Backend hosting |

**CBAM backend API:** `https://cbam-full-app.onrender.com`

---

## Project Structure

```
BLARAA-SYSTEMS/
├── frontend/
│   └── src/
│       ├── App.js          All platform components + tool logic (2,100+ lines)
│       ├── App.css         All platform styles
│       └── index.css       CSS variables + keyframes
├── backend/
│   ├── api.py              FastAPI endpoints: XML, PDF, feedback, admin vault
│   ├── calculator.py       Direct + indirect CBAM emission calculator
│   ├── cbam_models.py      Pydantic models from EU XSD schema
│   ├── database.py         SQLite audit trail + feedback tables
│   ├── pdf_generator.py    ReportLab PDF builder
│   └── schemas/
│       ├── QReport_ver23.00.xsd    Official EU CBAM quarterly report schema
│       └── stypes.xsd              EU supporting types
├── docs/
│   ├── README.md                   Service index (all 11 products)
│   ├── RenewTrack-RCO.md           RCO documentation (19 sections)
│   └── ComplianceCore-CCTS.md      CCTS documentation (17 sections)
├── vercel.json             Vercel deploy config
└── README.md               This file
```

---

## Platform Routing (App.js)

```
view === 'platform'           PlatformHome (default landing)
view === 'solutions'          AllSolutionsPage (9 sector grid)
view === 'products'           AllProductsPage (11 products, filterable)
view.startsWith('solution-')  SolutionPage (sector-specific tools)
view.startsWith('product-')   ProductPage (product detail + launch button)
view === 'app'                Dashboard (CBAM tool)
view === 'ccts'               ComplianceCoreDashboard (CCTS MRV tool)
view === 'rco'                RenewTrackDashboard (RCO calculator)
view === 'admin'              AdminPanel (stealth access)
view === 'feedback'           FeedbackForm
```

---

## Government Data Sources

Every number in every tool comes from a government notification, gazette, or CERC/BEE order:

| Tool | Key Government Documents |
|---|---|
| CBAM | EU Regulation 2023/956; EU Commission Regulation 2023/1773 (XML schema) |
| CCTS | EC Amendment Act 2022; CCTS 2023 (S.O. 2825(E)); GHG EI Target Rules 2025 (Oct 8, 2025 + Jan 13-16, 2026); CERC CCC Regulations 2026 (Mar 3, 2026) |
| RCO | MoP Gazette Notification Sep 27, 2025; CERC Order (Rs 347/MWh buyout FY24-26); BEE Operational Guidelines |

Full source tables with gazette references are in each tool's documentation under `/docs`.

---

## Run Locally

### Frontend (all tools work locally)
```bash
cd frontend
npm install
npm start
# Platform at http://localhost:3000
```

### Backend (CBAM tool only)
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn api:app --reload
# API at http://localhost:8000 | Docs at http://localhost:8000/docs
```

The frontend calls `https://cbam-full-app.onrender.com` by default. To point at a local backend, set `REACT_APP_API_URL=http://localhost:8000` in `frontend/.env`.

---

## CBAM API Reference

**Base URL:** `https://cbam-full-app.onrender.com`
**Interactive Docs:** [/docs](https://cbam-full-app.onrender.com/docs)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/generate-xml` | Generate EU CBAM XML report (official XSD schema) |
| `POST` | `/generate-pdf` | Generate human-readable PDF report |
| `POST` | `/submit-feedback` | Submit star-rating feedback |
| `GET` | `/admin/view-vault` | View audit logs (requires `x-admin-key` header) |

Request body:
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

## Deployment

| Service | What it hosts | Trigger |
|---|---|---|
| Vercel | Production platform (blaraa-systems.vercel.app) | Push to main |
| Render.com | FastAPI CBAM backend | Push to main |

---

## Service Documentation

Detailed documentation for every live tool is in the `/docs` folder. Each doc covers: plain English explanation, legal framework, who must comply, all government data tables, every calculation formula, worked example, all sources traced to gazette, and limitations.

- [docs/README.md](docs/README.md) — Master service index (all 11 products)
- [docs/ComplianceCore-CCTS.md](docs/ComplianceCore-CCTS.md) — CCTS MRV: GEI calculation, CCC surplus/deficit, sector thresholds, penalty structure, compliance timeline
- [docs/RenewTrack-RCO.md](docs/RenewTrack-RCO.md) — RCO: 6-year targets, 4 RE components, CERC buyout prices, hilly state rules, REC mechanics

---

<div align="center">

**BLARAA Systems**
India's Carbon and Energy Compliance Platform

9816979777 · 9805900001 · blaraasystems@gmail.com

[**Open Platform**](https://blaraa-systems.vercel.app/) · [**CBAM API Docs**](https://cbam-full-app.onrender.com/docs)

</div>
