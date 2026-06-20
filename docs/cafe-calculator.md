# FuelCompute CAFE 3 Calculator

**Module:** `FuelCompute` (Corporate Average Fuel Economy Compliance)  
**Status:** Live Beta  
**Regulatory framework:** BEE CAFE 3 norms, MoRTH / BEE (India)

---

## What it does

The CAFE 3 calculator lets vehicle manufacturers (OEMs) input their fleet data (sales volume and fuel economy/CO₂ emissions for different models) and compute their overall compliance against the upcoming Corporate Average Fuel Economy (CAFE) Phase III norms in India.

The calculator provides:
1. **Harmonic Mean Calculation**: Corporate Average Fuel Economy (km/l) computed as a sales-weighted harmonic mean, and average CO₂ emissions (g/km) computed as a sales-weighted arithmetic mean.
2. **Regulatory Target Matching**: Automatic lookup of regulatory CO₂ targets based on compliance target year (FY 2027-28 to FY 2031-32) and average fleet curb weight.
3. **Gap Analysis**: Comparison of the fleet's average CO₂ emissions against the target.
4. **Financial Risk Exposure**: Penalty estimation based on standard proxy rates for target exceedances.
5. **Reporting**: Option to export calculation results as a text file report.

---

## Methodology and Formulae

### 1. Corporate Average Fuel Economy (Harmonic Mean)
Following standard BEE / ARAI methodology, corporate average fuel economy (FE) is calculated using the sales-weighted harmonic mean of the individual vehicle models:

\[\text{Corporate Average FE} = \frac{\sum_{i} S_i}{\sum_{i} \frac{S_i}{FE_i}}\]

Where:
- \(S_i\) is the sales volume of model \(i\).
- \(FE_i\) is the fuel economy (km/l) of model \(i\).

### 2. Corporate Average CO₂ Emissions
For CO₂ emissions, the sales-weighted arithmetic mean is computed:

\[\text{Corporate Average CO}_2 = \frac{\sum_{i} (S_i \times CO_{2, i})}{\sum_{i} S_i}\]

Where:
- \(CO_{2, i}\) is the CO₂ emissions (g/km) of model \(i\), derived from its fuel type and fuel economy (or entered directly).

### 3. CAFE 3 Target Equations
Target CO₂ emissions (g/km) are calculated using weight-based target curves defined by the Bureau of Energy Efficiency (BEE):
- **Passenger Cars (PC)**:
  - Target CO₂ (g/km) = \(a \times (W - 1380) + b\)
- **Light Commercial Vehicles / LDV**:
  - Target CO₂ (g/km) = \(a \times (W - 1800) + b\)

Where:
- \(W\) is the sales-weighted average curb weight of the fleet.
- Coefficients \(a\) and \(b\) are set based on the compliance target year.

---

## Compliance Reference Values

| Target Year | PC Coefficient \(a\) | PC Target \(b\) | LDV Coefficient \(a\) | LDV Target \(b\) |
| :--- | :--- | :--- | :--- | :--- |
| **FY 2027-28** | 0.075 | 108.0 | 0.080 | 135.0 |
| **FY 2028-29** | 0.075 | 105.0 | 0.080 | 131.0 |
| **FY 2029-30** | 0.075 | 102.0 | 0.080 | 127.0 |
| **FY 2030-31** | 0.075 | 99.0  | 0.080 | 123.0 |
| **FY 2031-32** | 0.075 | 96.0  | 0.080 | 119.0 |

---

## File Structure

- [App.js](file:///Users/parthkaushal18/Documents/github/BLARAA-SYSTEMS/frontend/src/App.js): Contains the `CAFECalculator` React component, its layout, calculation logic, and integration into the view system.
