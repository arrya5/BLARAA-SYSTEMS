# RenewTrack — RCO Compliance Tool
### Service Documentation | BLARAA Systems — ComplianceOS Platform

---

## Table of Contents

1. [What is RCO? — For a Complete Beginner](#1-what-is-rco--for-a-complete-beginner)
2. [Why Does This Law Exist?](#2-why-does-this-law-exist)
3. [The Legal Framework — Every Law and Notification](#3-the-legal-framework--every-law-and-notification)
4. [Who Must Comply?](#4-who-must-comply)
5. [Who Is Exempt?](#5-who-is-exempt)
6. [Year-wise Mandatory Targets — Full Government Table](#6-year-wise-mandatory-targets--full-government-table)
7. [What Are Wind, Hydro, Distributed RE, and Other RE?](#7-what-are-wind-hydro-distributed-re-and-other-re)
8. [Special Provision for Hilly and North-Eastern States](#8-special-provision-for-hilly-and-north-eastern-states)
9. [Three Ways to Meet Your RCO Target](#9-three-ways-to-meet-your-rco-target)
10. [Buyout Prices — CERC Order Year by Year](#10-buyout-prices--cerc-order-year-by-year)
11. [What Are RECs (Renewable Energy Certificates)?](#11-what-are-recs-renewable-energy-certificates)
12. [Penalties for Non-Compliance](#12-penalties-for-non-compliance)
13. [Filing Deadlines](#13-filing-deadlines)
14. [How "Total Consumption" is Measured — Government Definition](#14-how-total-consumption-is-measured--government-definition)
15. [How the RenewTrack Tool Works — Step by Step](#15-how-the-renewtrack-tool-works--step-by-step)
16. [Every Calculation Explained](#16-every-calculation-explained)
17. [Example Walkthrough — A Steel Plant](#17-example-walkthrough--a-steel-plant)
18. [All Government Sources Used](#18-all-government-sources-used)
19. [Limitations and Disclaimer](#19-limitations-and-disclaimer)

---

## 1. What is RCO? — For a Complete Beginner

**RCO stands for Renewable Consumption Obligation.**

Think of it this way:

> The government of India says to large electricity users: *"A minimum percentage of the electricity you consume every year must come from renewable (non-fossil) sources like solar, wind, or hydro."*

If a steel factory uses **1,00,000 MWh** (1 lakh units of electricity) in a year, and the government says the RCO target is **33%**, then at least **33,000 MWh** of that electricity must come from renewable sources.

If the factory only has **20,000 MWh** from renewable sources, it has a **shortfall of 13,000 MWh**. It must make up this shortfall by one of three methods (buying certificates, paying a fee, or actually sourcing more renewable power).

**Why does this matter to a business?**
- Failure to comply means penalties of up to ₹10,00,000 (ten lakh rupees) per violation.
- The government extended the deadline four times already — businesses kept hoping it would be extended again. That grace period is over. The final deadline is **31 May 2026** for FY 2024-25.

---

## 2. Why Does This Law Exist?

India has committed to the Paris Agreement and its own National Determined Contributions (NDCs):
- **500 GW** of non-fossil energy capacity by 2030
- **50% of energy** from non-fossil sources by 2030
- **Net zero** carbon emissions by 2070

The government realised that just building solar and wind parks is not enough — someone has to *consume* that renewable electricity. Large industrial users (factories, power distributors, railways) consume most of India's electricity. The RCO forces them to shift their consumption towards renewables.

This is the *demand side* of India's renewable energy push. The *supply side* is the National Solar Mission, Production Linked Incentive (PLI) for solar panels, etc.

---

## 3. The Legal Framework — Every Law and Notification

The RCO rests on this chain of laws and notifications:

| Document | Date | What It Does |
|----------|------|-------------|
| **Energy Conservation Act, 2001** | 2001 | Original law that created the Bureau of Energy Efficiency (BEE) and gave power to mandate energy norms for large consumers |
| **Energy Conservation (Amendment) Act, 2022** | 19 December 2022 | Added Sub-section (x) to Section 14 of the EC Act — this is the specific provision that created the legal basis for RCO. It came into effect on 1 January 2023. |
| **Ministry of Power Notification (MoP)** | 20 October 2023 | First RCO notification — specified minimum renewable % year-by-year. Set up the compliance framework for DISCOMs, Open Access consumers and CPPs. |
| **Ministry of Power Gazette Notification (Revised)** | **27 September 2025** | **Supersedes the October 2023 notification.** Updated/revised the year-wise percentage targets. This is the currently operative notification. All our tool calculations are based on this. |
| **CERC Order — Buyout Price** | 2025-26 | Central Electricity Regulatory Commission determined the buyout price at ₹347/MWh for FY 2024-25 and 2025-26 based on weighted average REC prices (Dec 2024–Nov 2025). Also fixed 5% annual escalation from FY 2026-27 onwards. |
| **BEE Operational Guidelines** | 2024 | Bureau of Energy Efficiency published step-by-step operational guidelines explaining how to measure consumption, calculate shortfall, buy RECs, and submit compliance reports to rco.beeindia.gov.in |
| **Compliance Enforcement Rules, 2025** | 2025 | Made penalties under Section 26(3) of the EC Act real and enforceable. Before these rules, penalties were on paper only. |

**The specific legal provision:**
> Section 14(x), Energy Conservation (Amendment) Act, 2022:
> *"The Central Government may, by notification in the Official Gazette, specify the minimum percentage of energy that shall be consumed from non-fossil sources by designated consumers."*

---

## 4. Who Must Comply?

Three categories of entities are covered under the RCO notification:

### Category 1: Electricity Distribution Licensees (DISCOMs)
- All companies that distribute electricity to end consumers in India
- Examples: MSEDCL (Maharashtra), TSSPDCL (Telangana), KSEB (Kerala), BRPL (Delhi)
- Their RCO obligation is calculated on their **total procurement** for distribution
- They must ensure the minimum % of what they procure and supply comes from renewable sources

### Category 2: Open Access Consumers
- Large factories and industrial units that buy electricity directly from the grid (not through a DISCOM) using Open Access provisions under the Electricity Act, 2003
- These are typically very large consumers — steel plants, aluminium smelters, cement factories
- Their RCO applies to their Open Access consumption

### Category 3: Captive Power Plants (CPP)
- Factories that generate their own electricity using captive power plants (usually coal-based thermal plants)
- Their RCO applies to their captive consumption
- **Important exception:** Thermal power plants themselves are not covered. Only the *captive users* of captive power.

### Who are Designated Consumers (DCs)?
The term "Designated Consumer" comes from the EC Act. These are large energy-intensive industries. All 9 CCTS sectors are DCs:
- Iron & Steel
- Cement
- Aluminium
- Fertiliser
- Petroleum Refinery
- Petrochemicals
- Chlor Alkali
- Pulp & Paper
- Textile

Plus Railways, Automotive, and other large consumers.

---

## 5. Who Is Exempt?

The following sources are **excluded** from the RCO calculation — meaning they do not count as renewable energy for RCO purposes, and the energy they produce is also not counted in the denominator of "total consumption" in some cases:

| Excluded Source | Reason |
|----------------|--------|
| **Nuclear power** | Not classified as renewable energy under Indian law |
| **Waste Heat Recovery (WHR)** | Generally excluded (exception: combined cycle gas turbine plants get partial credit) |
| **50% of fossil-based cogeneration** | Only half of cogeneration from fossil fuels counts towards total consumption |
| **Thermal Power Plants** | TPPs are not covered as obligated entities (they are generators, not consumers) |

Also excluded from the obligation:
- Entities below the threshold consumption level specified by BEE
- North-Eastern and Hilly states get a **50% concession** on the Distributed RE component (see Section 8)

---

## 6. Year-wise Mandatory Targets — Full Government Table

This is the complete table from the **Ministry of Power Gazette Notification dated 27 September 2025**. All percentages are of total annual electricity consumption.

| Financial Year | Wind (%) | Hydro (%) | Dist. RE ≤10MW (%) | Other RE — Solar etc. (%) | **Total RCO (%)** |
|---------------|----------|-----------|---------------------|---------------------------|-------------------|
| 2024-25 | 0.67 | 0.38 | 1.50 | 27.36 | **29.91** |
| 2025-26 | 1.45 | 1.22 | 2.10 | 28.24 | **33.01** |
| 2026-27 | 1.97 | 1.34 | 2.70 | 29.94 | **35.95** |
| 2027-28 | 3.20 | 2.00 | 3.00 | 30.61 | **38.81** |
| 2028-29 | 4.00 | 2.50 | 4.00 | 30.86 | **41.36** |
| 2029-30 | 4.80 | 3.00 | 4.50 | 31.03 | **43.33** |

**How to read this table:**

Take FY 2025-26 (the upcoming year):
- Out of every 100 units (MWh) of electricity you consume, at least **33.01 units** must come from renewable sources.
- Of those 33.01 units:
  - At least **1.45 units** must specifically come from Wind energy
  - At least **1.22 units** must specifically come from Hydro energy
  - At least **2.10 units** must specifically come from Distributed RE (rooftop solar, small wind under 10 MW)
  - The remaining **28.24 units** can come from any mix of Solar, Biomass, Biogas, or other RE

**Key insight:** The total is not just one number — it has four sub-components with their own minimums. You cannot skip wind entirely and make up the total with solar. You must meet each component minimum separately.

---

## 7. What Are Wind, Hydro, Distributed RE, and Other RE?

### Wind Energy
- Electricity generated from wind turbines — onshore or offshore
- Can be consumed directly (if your factory has a wind farm connected to it) or via RECs (Renewable Energy Certificates from wind projects)
- **Minimum obligation:** Increases from 0.67% (FY 2024-25) to 4.80% (FY 2029-30)
- **Why a separate minimum?** The government wants to specifically promote wind energy, not just solar, because India has abundant wind resources (especially in Tamil Nadu, Gujarat, Rajasthan, Andhra Pradesh)

### Hydro Energy
- Electricity generated from hydroelectric power stations
- Can be from large hydro dams or small/mini hydro
- **Minimum obligation:** Increases from 0.38% (FY 2024-25) to 3.00% (FY 2029-30)
- **Why a separate minimum?** Hydro is dispatchable (can be controlled unlike solar/wind) and helps with grid stability

### Distributed Renewable Energy (DRE) — ≤10 MW Projects
- Small, distributed renewable energy installations with capacity **at or below 10 MW**
- Examples: Rooftop solar panels on your factory building, small wind turbines in your compound, small hydro plants
- Also includes off-site small RE projects connected to you via wheeling
- **Minimum obligation:** Increases from 1.50% (FY 2024-25) to 4.50% (FY 2029-30)
- **Why a separate minimum?** To encourage distributed, decentralised renewable energy, not just large utility-scale projects
- **Hilly/NE state special rule:** The minimum for DRE is halved for 12 specified states (see Section 8) because these regions have difficult terrain making distributed RE expensive

### Other Renewable Energy (Solar, Biomass, Biogas, etc.)
- All other non-fossil sources: Large solar plants, biomass power, biogas, small hydro >10 MW, ocean energy, geothermal, etc.
- This is the largest component — the "balance" after wind, hydro, and DRE minimums are met
- **Obligation:** Ranges from 27.36% (FY 2024-25) to 31.03% (FY 2029-30) — most of the RE obligation is here

---

## 8. Special Provision for Hilly and North-Eastern States

The **12 hilly and North-Eastern states** get a special concession on the Distributed RE (≤10 MW) component only:

**Their DRE minimum is exactly half of the standard national minimum.**

| State | Category |
|-------|----------|
| Arunachal Pradesh | North-Eastern |
| Assam | North-Eastern |
| Manipur | North-Eastern |
| Meghalaya | North-Eastern |
| Mizoram | North-Eastern |
| Nagaland | North-Eastern |
| Sikkim | North-Eastern |
| Tripura | North-Eastern |
| Jammu & Kashmir | Hilly (UT) |
| Ladakh | Hilly (UT) |
| Himachal Pradesh | Hilly |
| Uttarakhand | Hilly |

**Example for FY 2025-26:**
- Standard DRE minimum: 2.10%
- For a factory in Assam: DRE minimum = 1.05% (half)
- The remaining 1.05% that was the DRE reduction gets folded into the "Other RE" component (can be met by any RE source)
- Total RCO (33.01%) does NOT change — only the internal DRE sub-minimum is halved

**Why this exemption?** These regions have challenging terrain making distributed RE installations expensive and difficult. Setting a lower sub-target acknowledges this practical constraint.

---

## 9. Three Ways to Meet Your RCO Target

The government allows three compliance mechanisms. All three are **equal in status** — you can choose any one, or a combination. There is no hierarchy (CERC explicitly clarified this).

### Option 1: Direct Renewable Energy Consumption
The most direct way. You actually consume renewable electricity.
- **Buy green power via PPA (Power Purchase Agreement):** Sign a contract with a solar/wind developer
- **Set up your own renewable plant:** Rooftop solar, captive wind farm, etc.
- **Buy renewable power via Open Access:** Purchase RE from the wholesale electricity market
- **Store and consume:** Install battery storage and use it to consume renewable power

This directly reduces your carbon footprint and qualifies for RE100 / ESG certifications.

### Option 2: Purchase Renewable Energy Certificates (RECs)
If you cannot source renewable electricity directly, buy RECs.
- **1 REC = 1 MWh of renewable energy** generated and injected into the grid
- RECs are traded on two energy exchanges: **IEX (Indian Energy Exchange)** and **PXIL (Power Exchange India Limited)**
- There are separate REC types: Wind RECs, Solar RECs, Hydro RECs, Non-Solar RECs
- You must buy the right type — a Wind REC counts towards the wind component minimum
- Prices vary based on supply/demand on the exchange, typically ₹200–₹500/MWh range

### Option 3: Pay the Buyout Price
If neither of the above is possible, pay a cash buyout to the government.
- The price is determined by CERC (Central Electricity Regulatory Commission)
- **75% of buyout funds** go to the State Energy Conservation Fund
- **25% of buyout funds** go to the Central Government
- This is the most expensive option per MWh — treated as a last resort

---

## 10. Buyout Prices — CERC Order Year by Year

CERC determined the buyout price based on the **weighted average REC price** on IEX/PXIL for the period December 2024 to November 2025, which was ₹346.74/MWh (rounded to ₹347/MWh).

From FY 2026-27, a **fixed 5% annual escalation** applies.

| Financial Year | Buyout Price per MWh | Notes |
|----------------|---------------------|-------|
| 2024-25 | **₹347/MWh** | CERC Order FY 2024-25 & 2025-26 |
| 2025-26 | **₹347/MWh** | Same rate for both years |
| 2026-27 | **₹364/MWh** | +5% from base |
| 2027-28 | **₹382/MWh** | +5% from FY26-27 |
| 2028-29 | **₹401/MWh** | +5% from FY27-28 |
| 2029-30 | **₹421/MWh** | +5% from FY28-29 |

**To calculate total buyout cost for any shortfall:**
```
Buyout Cost (₹) = Shortfall (MWh) × Buyout Price (₹/MWh)
```

**Example:** A factory has a shortfall of 5,000 MWh in FY 2025-26
```
Buyout Cost = 5,000 × 347 = ₹17,35,000 (₹17.35 lakh)
```

**Important:** Paying the buyout does NOT mean you are "penalised." The buyout is a legitimate, government-sanctioned compliance mechanism. Penalties are separate and additional (see Section 12).

---

## 11. What Are RECs (Renewable Energy Certificates)?

A **Renewable Energy Certificate (REC)** is a market-based instrument that certifies that 1 MWh of electricity was generated from a renewable source and injected into the grid.

**How the REC system works:**
1. A solar plant in Rajasthan generates 1,000 MWh and injects it into the grid
2. The plant gets 1,000 RECs issued to it by the Central Agency
3. A steel plant in Jharkhand (which uses coal-based electricity from its grid) buys those 1,000 RECs
4. The steel plant can now count 1,000 MWh as "renewable" for its RCO calculation
5. The physical electricity is the same coal power — only the "green attribute" is transferred

**REC Types relevant to RCO:**
| REC Type | Counts Towards |
|----------|---------------|
| Wind REC | Wind component minimum |
| Solar REC | Other RE component |
| Hydro REC | Hydro component minimum |
| Non-Solar/Non-Wind REC | Other RE component |

**Where to buy RECs:**
- **IEX (Indian Energy Exchange):** www.iexindia.com — largest energy exchange
- **PXIL (Power Exchange India Limited):** www.pxil.co.in
- RECs are auctioned in monthly sessions — prices are discovery-based

**CERC 2022 REC Regulations Amendment:** Also introduced **VPPAs (Virtual Power Purchase Agreements)** as a new instrument. VPPAs work like RECs but tied to a specific renewable project.

---

## 12. Penalties for Non-Compliance

Non-compliance with RCO invites penalties under the **Energy Conservation Act, 2001 (as amended)**:

### Section 26(3) — Primary Penalty
- Up to **₹10,00,000 (ten lakh rupees)** for each instance of non-compliance
- Additional penalty: Up to **2× the price per MTOE (Million Tonnes of Oil Equivalent)** of energy consumption exceeding the prescribed norm
- Each financial year of non-compliance counts as a separate instance

### Section 26(4) — Reporting Penalty
- Separate penalty for failure to submit required compliance information/reports to BEE
- This applies even if your actual consumption meets targets — if you don't file, you're penalised

### Who enforces penalties?
- Bureau of Energy Efficiency (BEE) under the Ministry of Power
- BEE can initiate proceedings against non-compliant entities
- Compliance Enforcement Rules, 2025 made enforcement real — previously, penalties were notified but rarely enforced

### Important: Penalty ≠ Buyout
Paying the buyout price is a legal compliance mechanism. Penalties are on top of and separate from the buyout. An entity that neither sources RE, nor buys RECs, nor pays the buyout faces both the penalty AND is still required to fulfil the RCO obligation.

---

## 13. Filing Deadlines

| Submission | FY 2024-25 Deadline | Subsequent Years Deadline |
|-----------|--------------------|-----------------------------|
| Energy Accounts to SLDC | 31 October 2025 | 31 July of the following year |
| Compliance Report to BEE | **31 May 2026** | 31 December of the following year |

**The four deadline extensions for FY 2024-25:**
1. Original deadline: 31 March 2025
2. 1st extension: 30 June 2025
3. 2nd extension: 30 September 2025
4. 3rd extension: 31 December 2025
5. 4th (final) extension: **31 May 2026** — BEE has stated this is the final extension

**Where to submit:**
- BEE's RCO Portal: **rco.beeindia.gov.in**
- DISCOMs submit their own format
- Designated Consumers (DCs) submit the DC format
- BEE-designated verification agencies audit the submissions

---

## 14. How "Total Consumption" is Measured — Government Definition

The government definition of "total electricity consumption" for RCO purposes (from BEE Operational Guidelines):

> **"Net self-consumption, excluding auxiliary consumption, based on actual measurements and energy accounting, including meter readings certified by the respective State Load Dispatch Centre (SLDC)."**

**Breaking this down simply:**

- **Net consumption** = Total electricity consumed − Electricity exported back to grid
- **Excluding auxiliary consumption** = Do not count the electricity used to run your measuring/metering equipment itself
- **SLDC-certified meter readings** = Must be the official meter data confirmed by your state's grid operator (SLDC), not self-reported only

**For DISCOMs specifically:**
- For a distribution company, "consumption" is measured differently — it is their **total procurement** for distribution purposes, accounting for Aggregate Technical and Commercial (AT&C) losses
- This is because DISCOMs supply electricity, not consume it directly, so the framework calculates their obligation based on what they procure

**What counts as renewable in the denominator?**
Only direct physical consumption of verified renewable electricity (from the grid or own generation) and RECs purchased for that year count.

---

## 15. How the RenewTrack Tool Works — Step by Step

The RenewTrack tool is a 3-step compliance calculator built into the BLARAA Systems ComplianceOS platform.

### Step 1: Entity Details

The user provides:
1. **Entity Name** (optional — for report reference)
2. **Consumer Type** — One of three options:
   - DISCOM (Distribution Licensee)
   - Open Access Consumer
   - Captive Power Plant (CPP)
3. **Sector** — From the list of 13 sector options (Iron & Steel, Cement, etc.)
4. **State** — From 33 states/UTs. The tool automatically detects if the state is a hilly/NE state and applies the 50% DRE concession
5. **Financial Year** — FY 2024-25 through FY 2029-30. The tool loads the corresponding government targets automatically

On selecting the financial year, the tool shows the specific targets from the MoP notification for that year (overall %, wind %, hydro %, DRE %).

### Step 2: Energy Data

The user provides:
1. **Total Annual Electricity Consumption (MWh)** — The denominator of all calculations
2. **Wind Energy (MWh)** — Direct wind + wind RECs purchased
3. **Hydro Energy (MWh)** — Direct hydro + hydro RECs purchased
4. **Distributed RE (≤10 MW) (MWh)** — Rooftop solar, small wind/hydro installations
5. **Other RE (MWh)** — Large solar, biomass, biogas, other (direct + RECs)

**Live Preview Panel (updates as you type):**
- Shows current RE share percentage in real-time
- Progress bar showing how close you are to the mandatory target
- Component-wise "Met / Short" indicators for Wind, Hydro, and DRE minimums

### Step 3: Results

The tool displays:
- **COMPLIANT or NON-COMPLIANT** status badge
- Your actual RE% vs required RE% vs shortfall/surplus in MWh
- **Component-wise compliance table** — one row per source (Wind, Hydro, DRE, Other RE, Total) showing required %, required MWh, what you have, and status
- If non-compliant: All three compliance options with exact costs (RECs needed, buyout cost in ₹)
- Penalty warning under Section 26(3)
- Full regulatory reference citation
- Print/Save button for your records

---

## 16. Every Calculation Explained

Here is the exact mathematical logic inside the RenewTrack tool:

### Step A: Load the targets for the selected financial year
```
targets = RCO_TARGETS[financialYear]
// Example for FY 2025-26:
// targets.overall = 33.01
// targets.wind    = 1.45
// targets.hydro   = 1.22
// targets.dre     = 2.10
// targets.other   = 28.24
```

### Step B: Apply hilly/NE state DRE concession
```
isHillyNE = state is in HILLY_NE_STATES list
dreTarget = isHillyNE ? (targets.dre / 2) : targets.dre
// Example: Assam → dreTarget = 2.10 / 2 = 1.05%
// Example: Maharashtra → dreTarget = 2.10%
```

### Step C: Calculate required MWh for each component
```
overallRequiredMWh = (targets.overall / 100) × totalConsumptionMWh
windRequiredMWh    = (targets.wind    / 100) × totalConsumptionMWh
hydroRequiredMWh   = (targets.hydro   / 100) × totalConsumptionMWh
dreRequiredMWh     = (dreTarget        / 100) × totalConsumptionMWh
otherRERequiredMWh = (targets.other   / 100) × totalConsumptionMWh
```

### Step D: Calculate total renewable energy the entity has
```
totalRE_MWh = windMWh + hydroMWh + dreMWh + otherREMWh
```

### Step E: Calculate shortfalls
A shortfall exists only if the entity has LESS than the required minimum. Surpluses in one component cannot offset deficits in another component minimum.

```
overallShortfall = MAX(0, overallRequiredMWh - totalRE_MWh)
windShortfall    = MAX(0, windRequiredMWh    - windMWh)
hydroShortfall   = MAX(0, hydroRequiredMWh   - hydroMWh)
dreShortfall     = MAX(0, dreRequiredMWh     - dreMWh)
otherShortfall   = MAX(0, otherRERequiredMWh - otherREMWh)
```

**Why MAX(0, ...)?**
If the entity has MORE than required (surplus), the shortfall is zero — they are compliant for that component. We don't report negative shortfalls (surpluses in one component don't offset shortfalls in another).

### Step F: Determine compliance status
```
isCompliant = (overallShortfall === 0)
              AND (windShortfall === 0)
              AND (hydroShortfall === 0)
              AND (dreShortfall === 0)
```

All four conditions must be true simultaneously for the entity to be compliant. Meeting the overall total is not enough — all component minimums must also be met.

### Step G: Calculate compliance options
```
// Option 2: RECs needed
recsNeeded = CEILING(overallShortfall)
// CEILING because RECs are whole units — you can't buy 1.5 RECs

// Option 3: Buyout cost
buyoutRate = RCO_BUYOUT[financialYear]
buyoutCost_Rs = overallShortfall × buyoutRate
```

**Note on RECs:**
The REC count is calculated against the OVERALL shortfall, not component-specific shortfalls. You buy RECs of the correct type to meet each component minimum. In practice:
- Wind shortfall → buy Wind RECs
- Hydro shortfall → buy Hydro RECs
- DRE shortfall → buy small-project RECs
- Overall shortfall → buy any RE RECs

### Step H: Display current RE share percentage
```
currentREPercent = (totalRE_MWh / totalConsumptionMWh) × 100
```

---

## 17. Example Walkthrough — A Steel Plant

**Scenario:** Tata Steel Jamshedpur unit, FY 2025-26 assessment

**Inputs:**
- Consumer Type: Captive Power Plant (CPP)
- Sector: Iron & Steel
- State: Jharkhand (not a hilly/NE state)
- Financial Year: 2025-26
- Total annual consumption: 8,00,000 MWh (8 lakh MWh = 800 million units = 800 MUs)
- Wind energy consumed/RECs: 12,000 MWh
- Hydro energy consumed/RECs: 10,000 MWh
- Distributed RE (rooftop solar): 5,000 MWh
- Other RE (large solar via PPA): 1,80,000 MWh

**Calculations (Step C):**
```
Overall required = 33.01% × 8,00,000 = 2,64,080 MWh
Wind required    = 1.45%  × 8,00,000 =   11,600 MWh
Hydro required   = 1.22%  × 8,00,000 =    9,760 MWh
DRE required     = 2.10%  × 8,00,000 =   16,800 MWh
Other required   = 28.24% × 8,00,000 = 2,25,920 MWh
```

**Total RE (Step D):**
```
Total RE = 12,000 + 10,000 + 5,000 + 1,80,000 = 2,07,000 MWh
```

**Shortfalls (Step E):**
```
Overall shortfall = MAX(0, 2,64,080 - 2,07,000) = 57,080 MWh  ← NON-COMPLIANT
Wind shortfall    = MAX(0, 11,600 - 12,000)      =        0    ← Met
Hydro shortfall   = MAX(0, 9,760  - 10,000)      =        0    ← Met
DRE shortfall     = MAX(0, 16,800 - 5,000)        = 11,800 MWh ← NON-COMPLIANT
Other shortfall   = MAX(0, 2,25,920 - 1,80,000)  = 45,920 MWh ← NON-COMPLIANT
```

**Compliance Status (Step F):**
```
isCompliant = (57,080 === 0) → FALSE
Result: NON-COMPLIANT
```

**Current RE share:**
```
2,07,000 / 8,00,000 × 100 = 25.88% (vs required 33.01%)
```

**Compliance options (Step G):**
```
RECs needed  = CEILING(57,080) = 57,080 RECs
               (Buy ~11,800 small-project RECs for DRE + ~45,280 solar/other RECs)

Buyout cost  = 57,080 × ₹347 = ₹1,98,06,760 (₹1.98 Cr)
```

**Recommendation:**
The company needs to either:
1. Source an additional 57,080 MWh of renewable electricity (e.g., increase its solar PPA or install more rooftop solar)
2. Buy ~57,080 RECs (of the right types)
3. Pay ₹1.98 Crore as buyout to the state energy conservation fund

---

## 18. All Government Sources Used

| Source | Document | Date | URL/Reference |
|--------|----------|------|---------------|
| Primary Law | Energy Conservation (Amendment) Act, 2022 | 19 Dec 2022 | Gazette of India, Extraordinary, Part II, Section 1 |
| RCO Notification | Ministry of Power Gazette Notification (Revised) | **27 Sep 2025** | Supersedes 20 Oct 2023 notification — all % targets sourced from here |
| Buyout Price | CERC Order "Determination of Buyout Price as alternate compliance mechanism for RCO" | 2025-26 | CERC, New Delhi — ₹347/MWh for FY24-25 & 25-26; 5% escalation from FY26-27 |
| Operational Guidelines | BEE Operational Guidelines for RCO Compliance Mechanism | 2024 | beeindia.gov.in/WriteReadData/L45218/9003437506971259.pdf |
| Compliance Portal | BEE RCO Portal | Ongoing | rco.beeindia.gov.in |
| Deadline Extensions | BEE letters extending FY 2024-25 deadline | Multiple, latest to 31 May 2026 | beeindia.gov.in/renewable-consumption-obligations-rco.php |
| Penalty Framework | Compliance Enforcement Rules, 2025 under EC Act Section 26(3)/(4) | 2025 | Ministry of Power |
| REC Regulations | CERC (Terms and Conditions for Renewable Energy Certificates for Renewable Energy Generation) Regulations, 2022 (First Amendment) | 2025 | Introduced VPPAs and updated certificate multipliers |
| BEE Website | Complete RCO programme page | Current | beeindia.gov.in/programmes/renewable-consumption-obligations-rco |

**Specific data points sourced:**

| Data Point | Source | Exact Value |
|-----------|--------|-------------|
| FY 2024-25 targets | MoP Notification 27 Sep 2025 | Overall 29.91%, Wind 0.67%, Hydro 0.38%, DRE 1.50%, Other 27.36% |
| FY 2025-26 targets | MoP Notification 27 Sep 2025 | Overall 33.01%, Wind 1.45%, Hydro 1.22%, DRE 2.10%, Other 28.24% |
| FY 2026-27 targets | MoP Notification 27 Sep 2025 | Overall 35.95%, Wind 1.97%, Hydro 1.34%, DRE 2.70%, Other 29.94% |
| FY 2027-28 to 2029-30 targets | Interpolated from resiindia.org analysis of full notification table | See table in Section 6 |
| Buyout price FY 2024-25 & 2025-26 | CERC Order | ₹347/MWh (based on weighted avg REC price Dec 2024–Nov 2025) |
| Buyout price FY 2026-27 | CERC Order (5% escalation) | ₹364/MWh |
| DRE concession for hilly/NE states | MoP Notification 27 Sep 2025 | 50% of standard DRE % |
| Hilly/NE state list | MoP Notification 27 Sep 2025 | 12 states listed in Section 8 |
| Penalty amounts | EC Act 2001, Section 26(3) | Up to ₹10L per instance + 2× price/MTOE |
| Filing deadline | BEE letters | 31 May 2026 (FY 2024-25); 31 Dec subsequently |
| "Net self-consumption" definition | BEE Operational Guidelines | Excluding auxiliary, SLDC-certified |
| 75% buyout to State Fund | CERC Order | 75% to State Energy Conservation Fund |
| Three compliance mechanisms equal | CERC Order (clarification) | All three are non-hierarchical |

---

## 19. Limitations and Disclaimer

### What the tool calculates accurately:
- Overall RCO compliance status (compliant/non-compliant)
- Component-wise shortfalls for Wind, Hydro, DRE, and Other RE
- Buyout cost at CERC-determined rates
- REC units needed
- Hilly/NE state DRE concession

### What the tool does NOT do (yet):
- Generate the official BEE-format compliance report for submission to rco.beeindia.gov.in
- Connect directly to BEE's RCO portal or SLDC data
- Factor in REC price fluctuations (IEX/PXIL market prices change daily — the buyout rate is fixed by CERC, REC market prices are variable)
- Account for banking/carrying forward of surplus RECs from previous years
- Calculate for multiple facilities of the same entity consolidated (enterprise-level)

### Important notes:
1. **Results are indicative.** This tool is a compliance calculator, not an official BEE submission system.
2. **Consult a BEE-certified Energy Manager** for official compliance filings. All Designated Consumers are required by law to appoint a certified Energy Manager.
3. **FY 2027-28 to 2029-30 data** uses interpolated values. The exact targets for these years should be confirmed against the official notification when available.
4. **The tool uses MWh as the unit.** Convert your data: 1 MU (Million Units) = 1 GWh = 1,000 MWh.
5. **The buyout price may be revised** by CERC annually. The values in this tool reflect the current CERC order.

---

*Document Version: 1.0 | Date: May 2026 | BLARAA Systems — ComplianceOS*
*Built on: MoP Notification 27 Sep 2025 + CERC Buyout Price Order 2025-26*
*For corrections or updates contact: blaraasystems@gmail.com*
