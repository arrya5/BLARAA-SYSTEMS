import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import {
  Factory, Zap, Flame, FileCheck, Download,
  ShieldCheck, ArrowRight, BarChart3,
  Globe, Lock, RefreshCw, MessageSquare, Star, Send, FileText,
  ChevronDown, Leaf, Building2, Calculator, HelpCircle, CheckCircle2,
  ChevronRight, Clock, AlertTriangle, Mail, Users, Award, TrendingUp,
  Menu, X, Truck
} from 'lucide-react';

// ─── PLATFORM DATA ────────────────────────────────────────────────

const PRODUCTS = {
  cbam: {
    id: 'cbam',
    name: 'CarbonFile',
    fullName: 'CarbonFile CBAM',
    subtitle: 'EU Carbon Border Adjustment Mechanism',
    status: 'live',
    icon: FileCheck,
    accentColor: '#16a34a',
    bgColor: '#f0fdf4',
    tagline: 'Generate EU-compliant CBAM reports in minutes',
    description: 'Automated embedded emissions calculation and official EU XML schema generation for Indian exporters. Covers direct emissions (coal, gas) and indirect emissions (electricity) per tonne of production.',
    regulation: 'EU CBAM Regulation (EU) 2023/956',
    deadline: 'January 2026 — Full enforcement begins',
    urgency: 'critical',
    price: '₹1,999/report · ₹7,999/month · ₹59,999/year',
    features: [
      'Direct & indirect emissions calculation (EU methodology)',
      'Official EU XML schema (XSD) — submission ready',
      'PDF stakeholder report',
      'Secure audit trail & vault',
      'India grid electricity emission factors',
    ],
    sectors: ['Iron & Steel', 'Cement', 'Aluminium', 'Fertiliser', 'Hydrogen'],
  },
  ccts: {
    id: 'ccts',
    name: 'ComplianceCore',
    fullName: 'ComplianceCore CCTS',
    subtitle: 'Carbon Credit Trading Scheme MRV',
    status: 'live',
    icon: BarChart3,
    accentColor: '#2563eb',
    bgColor: '#eff6ff',
    tagline: 'Track GEI targets and manage Carbon Credit Certificates',
    description: "India's mandatory carbon market compliance tool. Track your Greenhouse Gas Emission Intensity (GEI) vs BEE targets, generate MRV reports for indiancarbonmarket.gov.in, and calculate your CCC surplus or deficit.",
    regulation: 'Energy Conservation Amendment Act 2022 + GHG Emission Intensity Target Rules 2025',
    deadline: 'FY 2026 — First CCTS compliance year',
    urgency: 'critical',
    price: '₹50,000–₹5,00,000/year',
    features: [
      'GEI target vs actual performance tracking',
      'Carbon Credit Certificate surplus/deficit calculator',
      'BEE MRV format report generation',
      'Monthly performance dashboard',
      'indiancarbonmarket.gov.in integration',
    ],
    sectors: ['Aluminium', 'Cement', 'Iron & Steel', 'Fertiliser', 'Petroleum Refinery', 'Petrochemicals', 'Chlor Alkali', 'Pulp & Paper', 'Textile'],
  },
  rco: {
    id: 'rco',
    name: 'RenewTrack',
    fullName: 'RenewTrack RCO',
    subtitle: 'Renewable Consumption Obligation',
    status: 'live',
    icon: Zap,
    accentColor: '#d97706',
    bgColor: '#fffbeb',
    tagline: 'Stay RCO compliant — deadline extended 4 times already',
    description: 'Calculate your mandatory renewable energy %, identify REC shortfall, and generate BEE-format compliance submissions. Covers DISCOMs, open access consumers, and captive power plants.',
    regulation: 'Energy Conservation Act 2001 + RCO Amendment Sep 2025',
    deadline: 'May 31, 2026 — 4th and final extension',
    urgency: 'high',
    price: '₹15,000–₹80,000/year',
    features: [
      'Renewable % vs mandatory sector target',
      'REC units shortfall calculator',
      'DISCOM + Open Access + CPP support',
      'BEE submission format reports',
      'Buyout price comparison tool',
    ],
    sectors: ['DISCOMs', 'Steel', 'Cement', 'Aluminium', 'Railways', 'Automotive', 'Glass', 'Ceramics'],
  },
  brokerage: {
    id: 'brokerage',
    name: 'CarbonXchange',
    fullName: 'CarbonXchange',
    subtitle: 'Carbon Credit Certificate Trading',
    status: 'soon',
    icon: TrendingUp,
    accentColor: '#059669',
    bgColor: '#ecfdf5',
    tagline: 'Buy and sell Carbon Credit Certificates on India\'s live market',
    description: 'Marketplace connecting CCTS entities with surplus CCCs to those facing deficits. Verified credits, transparent pricing, BEE-compliant transfer documentation.',
    regulation: 'CCTS Compliance Mechanism · Indian Carbon Market',
    deadline: 'Market is LIVE — indiancarbonmarket.gov.in',
    urgency: 'medium',
    price: '1–2% commission per trade',
    features: [
      'Verified Carbon Credit Certificate listings',
      'Real-time market price discovery',
      'BEE-compliant transfer documentation',
      'Portfolio tracking dashboard',
      'All 9 CCTS sectors supported',
    ],
    sectors: ['All 9 CCTS obligated sectors', 'Carbon market participants'],
  },
  adeetie: {
    id: 'adeetie',
    name: 'ConnectBEE',
    fullName: 'ConnectBEE',
    subtitle: 'ADEETIE & SAATHEE Portal Integration',
    status: 'soon',
    icon: Globe,
    accentColor: '#7c3aed',
    bgColor: '#f5f3ff',
    tagline: 'Auto-submit compliance data to BEE government portals',
    description: "API connector that takes your operational data and auto-submits to BEE's ADEETIE and SAATHEE platforms — eliminating manual data entry and submission errors.",
    regulation: 'BEE Annual Data Reporting Requirements',
    deadline: 'Annual reporting cycle',
    urgency: 'medium',
    price: '₹30,000 one-time + ₹5,000/year',
    features: [
      'ADEETIE auto-submission',
      'SAATHEE integration',
      'Pre-submission data validation',
      'Submission receipts & audit trail',
      'ERP system connectors',
    ],
    sectors: ['All BEE Designated Consumers', 'DISCOMs', 'PAT entities'],
  },
  voluntary: {
    id: 'voluntary',
    name: 'GreenCredit',
    fullName: 'GreenCredit',
    subtitle: 'Voluntary Carbon Offset Registry',
    status: 'soon',
    icon: Leaf,
    accentColor: '#16a34a',
    bgColor: '#f0fdf4',
    tagline: 'Register projects and earn Carbon Credit Certificates',
    description: "Help farmers, NGOs, and SMEs register offset projects under BEE's 8 approved methodologies (March 2025) and earn CCCs for sale on the Indian Carbon Market.",
    regulation: 'CCTS Offset Mechanism + 8 Approved Methodologies (March 28, 2025)',
    deadline: '2026 — Offset market launch',
    urgency: 'medium',
    price: '5% of credits sold',
    features: [
      'Project registration for all 8 methodologies',
      'Verification workflow with accredited agencies',
      'CCC issuance tracking',
      'Credit listing on indiancarbonmarket.gov.in',
      'Simple farmer/NGO onboarding',
    ],
    sectors: ['Agriculture', 'Afforestation', 'Clean Cooking', 'Waste Management', 'SMEs', 'NGOs'],
  },
  cafe: {
    id: 'cafe',
    name: 'FuelCompute',
    fullName: 'FuelCompute CAFE',
    subtitle: 'Corporate Average Fuel Economy Compliance',
    status: 'soon',
    icon: Truck,
    accentColor: '#dc2626',
    bgColor: '#fef2f2',
    tagline: 'Track fleet fuel efficiency against CAFE 3 norms',
    description: 'Calculate corporate average fuel economy across your vehicle portfolio, model performance gaps against CAFE 3 targets (2027–32 cycle), and generate BEE compliance reports.',
    regulation: 'CAFE 3 Norms 2027–2032 (BEE Draft Notification)',
    deadline: '2027 — CAFE 3 cycle begins',
    urgency: 'medium',
    price: '₹5,00,000–₹20,00,000/year',
    features: [
      'Fleet-wide CAFE calculation',
      'Model-by-model breakdown',
      'Gap analysis vs CAFE 3 targets',
      'HDV, MDV, LDV and passenger car support',
      'BEE compliance report generation',
    ],
    sectors: ['Passenger Car OEMs', 'Commercial Vehicle Manufacturers', 'Two-Wheeler OEMs'],
  },
  ecsbc: {
    id: 'ecsbc',
    name: 'BuildCode',
    fullName: 'BuildCode ECSBC',
    subtitle: 'Energy Conservation Building Code Compliance',
    status: 'soon',
    icon: Building2,
    accentColor: '#ea580c',
    bgColor: '#fff7ed',
    tagline: 'ECSBC 2024 and Eco-Niwas Samhita compliance made simple',
    description: 'Assess buildings against ECSBC 2024 and Eco-Niwas Samhita 2024 standards. Generate compliance certificates across all 4 climate zones for residential and commercial projects.',
    regulation: 'ECSBC 2024 + Eco-Niwas Samhita 2024 (BEE)',
    deadline: 'Mandatory for all new buildings',
    urgency: 'medium',
    price: '₹10,000–₹50,000/project',
    features: [
      'Residential + commercial coverage',
      'All 4 Indian climate zones',
      'Building envelope compliance check',
      'HVAC, lighting and appliance assessment',
      'BEE Building Star Label application ready',
    ],
    sectors: ['Builders & Developers', 'Architects', 'Government Buildings', 'Commercial Real Estate'],
  },
  certification: {
    id: 'certification',
    name: 'AuditPrep',
    fullName: 'AuditPrep',
    subtitle: 'BEE Energy Auditor Certification Prep',
    status: 'soon',
    icon: Award,
    accentColor: '#0891b2',
    bgColor: '#ecfeff',
    tagline: 'Pass the BEE National Certification Examination',
    description: "Comprehensive prep platform for BEE's National Certification Examination for Energy Managers and Auditors — updated for 2025 certification regulations.",
    regulation: 'BEE Certification of Energy Auditors Regulations 2025',
    deadline: 'Annual exam cycle',
    urgency: 'medium',
    price: '₹3,000–₹8,000/course',
    features: [
      'Full syllabus for EA and EM examinations',
      'Past paper practice tests',
      'Sector-specific modules',
      'Live doubt-clearing sessions',
      '25th National Exam results tracker',
    ],
    sectors: ['Engineering Graduates', 'Factory Compliance Teams', 'Consulting Firms'],
  },
  coldchain: {
    id: 'coldchain',
    name: 'ColdTrack',
    fullName: 'ColdTrack',
    subtitle: 'Cold Chain Energy Efficiency SaaS',
    status: 'soon',
    icon: Zap,
    accentColor: '#0284c7',
    bgColor: '#f0f9ff',
    tagline: 'Optimize refrigeration energy and meet BEE standards',
    description: 'Monitor and report energy consumption across cold storage facilities. Generate BEE energy audit reports and identify savings opportunities across your cold chain network.',
    regulation: 'BEE Cold Chain Energy Efficiency Guidelines',
    deadline: '2026–27',
    urgency: 'low',
    price: '₹20,000–₹80,000/year',
    features: [
      'Temperature + energy monitoring dashboard',
      'BEE audit report generation',
      'Energy savings identification & ROI',
      'Multi-facility management',
      'Refrigerant type tracking',
    ],
    sectors: ['Cold Storage Operators', 'Food Processing', 'Pharma Warehouses', 'Logistics'],
  },
  seei: {
    id: 'seei',
    name: 'StateSync',
    fullName: 'StateSync SEEI',
    subtitle: 'State Energy Efficiency Index Dashboard',
    status: 'soon',
    icon: BarChart3,
    accentColor: '#4f46e5',
    bgColor: '#eef2ff',
    tagline: "Track and improve your state's BEE SEEI ranking",
    description: "Dashboard for state energy departments to monitor all SEEI 2024–25 indicators, identify gaps vs top-ranked states, and generate progress reports for BEE.",
    regulation: 'State Energy Efficiency Index (BEE Annual Publication)',
    deadline: 'Annual SEEI reporting',
    urgency: 'medium',
    price: '₹20,00,000–₹50,00,000/state/year',
    features: [
      'SEEI 2024 & 2025 baseline tracking',
      'Indicator-wise gap vs top states',
      'District-level drill-down',
      'Annual BEE progress reports',
      'Policy recommendation engine',
    ],
    sectors: ['State Energy Departments', 'State Designated Agencies (SDAs)'],
  },
};

const ALL_PRODUCTS = Object.values(PRODUCTS);

// ─── RCO GOVERNMENT DATA (MoP notification 27 Sep 2025) ──────────────
const HILLY_NE_STATES = ['Arunachal Pradesh','Assam','Manipur','Meghalaya','Mizoram','Nagaland','Sikkim','Tripura','Jammu & Kashmir','Ladakh','Himachal Pradesh','Uttarakhand'];

const RCO_TARGETS = {
  '2024-25': { overall: 29.91, wind: 0.67, hydro: 0.38, dre: 1.50, other: 27.36 },
  '2025-26': { overall: 33.01, wind: 1.45, hydro: 1.22, dre: 2.10, other: 28.24 },
  '2026-27': { overall: 35.95, wind: 1.97, hydro: 1.34, dre: 2.70, other: 29.94 },
  '2027-28': { overall: 38.81, wind: 3.20, hydro: 2.00, dre: 3.00, other: 30.61 },
  '2028-29': { overall: 41.36, wind: 4.00, hydro: 2.50, dre: 4.00, other: 30.86 },
  '2029-30': { overall: 43.33, wind: 4.80, hydro: 3.00, dre: 4.50, other: 31.03 },
};

// CERC Order — FY 2024-25 & 2025-26: ₹347/MWh; 5% annual escalation from FY 2026-27
const RCO_BUYOUT = {
  '2024-25': 347, '2025-26': 347, '2026-27': 364,
  '2027-28': 382, '2028-29': 401, '2029-30': 421,
};

const INDIAN_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Jammu & Kashmir','Ladakh','Delhi','Chandigarh','Puducherry','Other UTs'];

const RCO_SECTORS = ['Iron & Steel','Cement','Aluminium','Fertiliser','Petroleum Refinery','Petrochemicals','Textile','Chlor Alkali','Pulp & Paper','Railways','Automotive','Power Distribution (DISCOM)','Other'];

const fmtMWh = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)} TWh`;
  if (n >= 1000) return `${(n / 1000).toFixed(2)} GWh`;
  return `${n.toFixed(0)} MWh`;
};

const fmtINR = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
};
// ─────────────────────────────────────────────────────────────────────

// ─── CCTS GOVERNMENT DATA (GHG EI Target Rules 2025) ─────────────────
// Phase 1: Oct 8, 2025 (Cement, Aluminium, Chlor Alkali, Pulp & Paper — 282 entities)
// Phase 2: Jan 13–16, 2026 (Iron & Steel, Fertiliser, Petroleum Refinery, Petrochemicals, Textile — 460+ entities)
// Baselines are FY 2023-24 plant-specific; sector averages shown here are for reference only.
const CCTS_SECTORS = [
  { id: 'cement',      label: 'Cement',              unit: 'tonne cement',         phase: 1, threshold: '30,000 TPA clinker (grinding unit: 10,000 TOE/year)',        subsectors: ['OPC (Ordinary Portland Cement)', 'PPC (Portland Pozzolana Cement)', 'Composite Cement', 'White Cement'],  refBaseline: 0.62, refTarget25: 0.60, refTarget26: 0.58 },
  { id: 'aluminium',   label: 'Aluminium',            unit: 'tonne Al',             phase: 1, threshold: '10,000 TPA or 7,500 TOE/year',                               subsectors: ['Primary Smelter', 'Alumina Refinery', 'Secondary Aluminium'],                                            refBaseline: 13.50, refTarget25: 13.00, refTarget26: 12.60 },
  { id: 'chlor_alkali',label: 'Chlor Alkali',         unit: 'tonne caustic soda',   phase: 1, threshold: '12,000 TOE/year',                                            subsectors: ['Membrane Cell', 'Diaphragm Cell'],                                                                     refBaseline: 1.25, refTarget25: 1.17, refTarget26: 1.09 },
  { id: 'pulp_paper',  label: 'Pulp & Paper',         unit: 'tonne paper',          phase: 1, threshold: '30,000 TPA paper or 7,500 TOE/year',                         subsectors: ['Integrated (Wood-based)', 'Recycled Fibre (RCF)', 'Agro-based', 'Specialty Paper'],               refBaseline: 1.15, refTarget25: 1.07, refTarget26: 0.99 },
  { id: 'iron_steel',  label: 'Iron & Steel',         unit: 'tonne crude steel',    phase: 2, threshold: '30,000 TPA crude steel or 20,000 TOE/year',                  subsectors: ['BF-BOF (Integrated)', 'DRI / Sponge Iron', 'EAF / EIF (Electric Arc)', 'Ferro Alloys'],           refBaseline: 2.50, refTarget25: 2.40, refTarget26: 2.30 },
  { id: 'fertiliser',  label: 'Fertiliser',           unit: 'tonne urea',           phase: 2, threshold: 'Facility-named in gazette (21 notified entities)',            subsectors: ['Gas-based Urea', 'Naphtha-based Urea', 'Ammonia'],                                                   refBaseline: 2.50, refTarget25: 2.45, refTarget26: 2.40 },
  { id: 'refinery',    label: 'Petroleum Refinery',   unit: 'MBBLS crude',          phase: 2, threshold: '90,000 TOE/year',                                            subsectors: ['Petroleum Refinery'],                                                                                  refBaseline: 4.90, refTarget25: 4.75, refTarget26: 4.62 },
  { id: 'petrochem',   label: 'Petrochemicals',       unit: 'tonne product',        phase: 2, threshold: '1,00,000 TOE/year',                                          subsectors: ['Petrochemicals'],                                                                                      refBaseline: 1.10, refTarget25: 1.06, refTarget26: 1.02 },
  { id: 'textile',     label: 'Textile',              unit: 'tonne textile product', phase: 2, threshold: '3,000 TOE/year (spinning, processing, composite, fibre)',    subsectors: ['Composite Fibre', 'Processing', 'Spinning'],                                                          refBaseline: 5.00, refTarget25: 4.90, refTarget26: 4.78 },
];

// Analyst estimate — CERC has not published an official price band yet (as of May 2026)
const CCTS_CCC_PRICE = { low: 600, mid: 800, high: 1200 };
// ─────────────────────────────────────────────────────────────────────

const SECTORS = [
  {
    id: 'industry',
    label: 'Heavy Industry',
    subtitle: 'Steel · Cement · Aluminium · Fertiliser · Petrochemical',
    icon: Factory,
    accentColor: '#1e40af',
    bgColor: '#dbeafe',
    description: 'You face the highest compliance burden in India — CBAM for EU exports, CCTS for domestic carbon targets, and RCO for renewable mandates. All active simultaneously.',
    products: ['cbam', 'ccts', 'rco', 'brokerage', 'adeetie'],
    urgency: 'CRITICAL — 3 regulations active now',
    urgencyColor: '#dc2626',
  },
  {
    id: 'exporters',
    label: 'EU Exporters',
    subtitle: 'Exporting covered goods to Europe',
    icon: Globe,
    accentColor: '#16a34a',
    bgColor: '#dcfce7',
    description: 'EU CBAM full enforcement starts January 2026. Every shipment of steel, cement, aluminium, or fertiliser to the EU requires an embedded emissions report.',
    products: ['cbam'],
    urgency: 'January 2026 — Enforcement begins',
    urgencyColor: '#dc2626',
  },
  {
    id: 'utilities',
    label: 'Power Utilities',
    subtitle: 'DISCOMs & Electricity Distributors',
    icon: Zap,
    accentColor: '#d97706',
    bgColor: '#fef3c7',
    description: "RCO mandates a minimum % of renewable energy in your distribution mix. Deadline extended 4 times — regulators are out of patience.",
    products: ['rco', 'adeetie'],
    urgency: 'May 31, 2026 — Final RCO deadline',
    urgencyColor: '#ea580c',
  },
  {
    id: 'buildings',
    label: 'Buildings & Construction',
    subtitle: 'Builders · Architects · Developers',
    icon: Building2,
    accentColor: '#ea580c',
    bgColor: '#ffedd5',
    description: 'ECSBC 2024 and Eco-Niwas Samhita 2024 are mandatory for all new buildings. BEE Building Star Label certification is now linked to project approvals.',
    products: ['ecsbc'],
    urgency: 'Mandatory for all new buildings',
    urgencyColor: '#ea580c',
  },
  {
    id: 'automotive',
    label: 'Automotive',
    subtitle: 'Vehicle Manufacturers & OEMs',
    icon: Truck,
    accentColor: '#dc2626',
    bgColor: '#fee2e2',
    description: 'CAFE 3 norms (2027–32) are in draft. Every OEM needs to model fleet performance against new fuel efficiency targets now — before they are finalized.',
    products: ['cafe'],
    urgency: '2027 — CAFE 3 compliance cycle',
    urgencyColor: '#d97706',
  },
  {
    id: 'professionals',
    label: 'Energy Professionals',
    subtitle: 'Energy Auditors · Managers · Consultants',
    icon: Award,
    accentColor: '#0891b2',
    bgColor: '#cffafe',
    description: 'All designated consumers must employ certified BEE Energy Managers. New certification regulations 2025 change exam requirements. 50,000+ aspiring auditors need prep.',
    products: ['certification', 'adeetie'],
    urgency: 'New 2025 certification regulations',
    urgencyColor: '#0891b2',
  },
  {
    id: 'carbon-market',
    label: 'Carbon Market',
    subtitle: 'Credit buyers · Sellers · Project developers',
    icon: TrendingUp,
    accentColor: '#059669',
    bgColor: '#d1fae5',
    description: 'The Indian Carbon Market is live. CCTS entities buy/sell CCCs. Non-obligated entities — farmers, NGOs, SMEs — can register offset projects under 8 approved methodologies.',
    products: ['brokerage', 'voluntary'],
    urgency: 'Market is LIVE — indiancarbonmarket.gov.in',
    urgencyColor: '#16a34a',
  },
  {
    id: 'coldchain',
    label: 'Cold Chain & Food',
    subtitle: 'Cold Storage · Food Processing · Logistics',
    icon: Factory,
    accentColor: '#0284c7',
    bgColor: '#e0f2fe',
    description: "BEE cold chain energy efficiency guidelines are being enforced. Mandatory energy audits are coming for large cold storage operators from 2026–27.",
    products: ['coldchain'],
    urgency: '2026–27 — BEE enforcement',
    urgencyColor: '#0284c7',
  },
  {
    id: 'government',
    label: 'State Government',
    subtitle: 'State Energy Depts · SDAs',
    icon: ShieldCheck,
    accentColor: '#4f46e5',
    bgColor: '#e0e7ff',
    description: "BEE publishes the State Energy Efficiency Index annually. States ranked poorly face political pressure and risk losing central energy funds.",
    products: ['seei'],
    urgency: 'Annual SEEI ranking by BEE',
    urgencyColor: '#4f46e5',
  },
];

// ─── EXISTING COMPONENTS (unchanged) ──────────────────────────────

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-emerald-100 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm">
    <button onClick={onClick} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-emerald-50/50 transition">
      <span className="font-semibold text-slate-800">{question}</span>
      <ChevronDown className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <p className="px-6 pb-4 text-slate-600 leading-relaxed">{answer}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { question: 'What is CBAM (Carbon Border Adjustment Mechanism)?', answer: "CBAM is the EU's landmark policy to put a carbon price on imports. Starting 2026, Indian exporters of steel, cement, aluminum, fertilizers, and electricity must report their embedded carbon emissions. This ensures EU importers pay the same carbon costs as EU producers, preventing 'carbon leakage' where production moves to countries with weaker climate policies." },
    { question: 'What is India\'s Carbon Credit Trading Scheme (CCTS)?', answer: 'CCTS is India\'s mandatory domestic carbon market under the Energy Conservation Amendment Act 2022. Around 740 energy-intensive factories across 9 sectors get legally binding Greenhouse Gas Emission Intensity targets. Factories that beat targets earn Carbon Credit Certificates they can sell. Factories that miss targets must buy CCCs or pay penalties. First compliance year is FY2026.' },
    { question: 'What is the Renewable Consumption Obligation (RCO)?', answer: 'RCO mandates that designated consumers (large factories, DISCOMs, railways) consume a minimum percentage of their electricity from non-fossil/renewable sources. The deadline has been extended four times — the final deadline is May 31, 2026. Non-compliance will result in penalties under the new Compliance Enforcement Rules 2025.' },
    { question: 'How does CarbonFile calculate CBAM emissions?', answer: "We use the official EU methodology. Direct emissions are calculated from fuel consumption (coal, gas) using standard emission factors. Indirect emissions come from electricity usage multiplied by India's grid emission factor. Specific embedded emissions are calculated per tonne of production. The XML output follows the official EU CBAM schema." },
    { question: 'Which companies need to comply with CCTS?', answer: 'Around 740 large factories across 9 sectors: Aluminium, Cement, Iron & Steel, Fertiliser, Petroleum Refinery, Petrochemicals, Chlor Alkali, Pulp & Paper, and Textile. These are the same sectors covered by BEE\'s PAT scheme, which is now transitioning to CCTS. GHG Emission Intensity Target Rules 2025 set the baselines.' },
    { question: 'How much does the platform cost?', answer: 'CarbonFile CBAM (live) starts at ₹1,999/report or ₹7,999/month. CCTS and RCO modules are in early access — join the waitlist for priority pricing. Enterprise and multi-product bundles available for factories facing multiple compliance requirements. Contact us for a custom quote.' },
  ];
  return (
    <div className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Everything you need to know</h2>
          <p className="text-slate-600 mt-2">About CBAM, CCTS, RCO and our compliance platform</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Company Info', icon: Building2 },
    { num: 2, label: 'Production Data', icon: Factory },
    { num: 3, label: 'Generate Report', icon: FileCheck },
  ];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep >= step.num;
        const isComplete = currentStep > step.num;
        return (
          <React.Fragment key={step.num}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
              {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              <span className="text-sm font-semibold hidden sm:inline">{step.label}</span>
              <span className="text-sm font-semibold sm:hidden">{step.num}</span>
            </div>
            {index < steps.length - 1 && <div className={`w-8 h-0.5 ${isActive ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const LivePreview = ({ formData }) => {
  const [preview, setPreview] = useState({ direct: 0, indirect: 0, total: 0 });
  useEffect(() => {
    const production = parseFloat(formData.production_tonnes) || 0;
    const coal = parseFloat(formData.coal_tonnes) || 0;
    const electricity = parseFloat(formData.electricity_kwh) || 0;
    if (production > 0) {
      const directEmissions = (coal * 2.42) / production;
      const indirectEmissions = (electricity * 0.82) / 1000 / production;
      setPreview({ direct: directEmissions.toFixed(4), indirect: indirectEmissions.toFixed(6), total: (directEmissions + indirectEmissions).toFixed(4) });
    } else {
      setPreview({ direct: 0, indirect: 0, total: 0 });
    }
  }, [formData]);
  const hasData = parseFloat(formData.production_tonnes) > 0;
  return (
    <div className={`bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 transition-all ${hasData ? 'opacity-100' : 'opacity-50'}`}>
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-800">Live Estimate (tCO2/tonne)</span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/60 rounded-lg p-2"><p className="text-xs text-slate-500">Direct</p><p className="font-mono font-bold text-emerald-700">{preview.direct}</p></div>
        <div className="bg-white/60 rounded-lg p-2"><p className="text-xs text-slate-500">Indirect</p><p className="font-mono font-bold text-emerald-700">{preview.indirect}</p></div>
        <div className="bg-white/60 rounded-lg p-2 border-2 border-emerald-300"><p className="text-xs text-slate-500">Total</p><p className="font-mono font-bold text-emerald-800">{preview.total}</p></div>
      </div>
      <p className="text-xs text-emerald-600 mt-2 text-center italic">*Estimates only. Final values calculated by backend.</p>
    </div>
  );
};

const StatCounter = ({ target, suffix, label }) => {
  const [count, setCount] = useState(0);
  const [counting, setCounting] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCounting(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!counting) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); } else setCount(start);
    }, 28);
    return () => clearInterval(timer);
  }, [counting, target]);
  return (
    <div ref={ref} className="stat-item">
      <div className={`stat-number ${counting ? 'counting' : ''}`}>{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const AdminPanel = () => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault(); setError(false);
    try {
      const response = await axios.get('https://cbam-full-app.onrender.com/admin/view-vault', { headers: { 'x-admin-key': apiKey } });
      setLogs(response.data.recent_logs); setIsAuthenticated(true);
    } catch { setError(true); setApiKey(''); }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col justify-center">
      {!isAuthenticated ? (
        <div className="flex justify-center w-full">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <input type="password" value={apiKey} onChange={(e) => { setApiKey(e.target.value); setError(false); }} placeholder="" autoFocus
              className={`w-full bg-transparent border-b-2 text-center text-3xl font-mono tracking-widest py-4 focus:outline-none transition-colors ${error ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800 focus:border-slate-900'}`} />
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Audit Vault</h2>
            <button onClick={() => window.location.reload()} className="text-sm font-bold text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"><RefreshCw className="h-4 w-4 inline mr-2" /> Refresh</button>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-xs">
                  <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Timestamp</th><th className="px-6 py-4">Company</th><th className="px-6 py-4 text-right">Coal (T)</th><th className="px-6 py-4 text-right">Direct CO2</th></tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Vault empty.</td></tr> : logs.map((log, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-xs">{log.id}</td>
                      <td className="px-6 py-4">{log.timestamp}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{log.company_name}</td>
                      <td className="px-6 py-4 text-right font-mono">{log.input_coal_tonnes}</td>
                      <td className="px-6 py-4 text-right font-mono text-blue-600 font-bold">{log.output_direct_specific}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleRating = (value) => setFormData({ ...formData, rating: value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await axios.post('https://cbam-full-app.onrender.com/submit-feedback', formData); setSubmitted(true); }
    catch { setError('Failed to submit feedback. Please try again.'); }
    finally { setLoading(false); }
  };
  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-12">
        <div className="bg-emerald-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="h-8 w-8 text-emerald-600" /></div>
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Thank You!</h2>
        <p className="text-emerald-700">Your feedback has been received.</p>
      </div>
    </div>
  );
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4"><MessageSquare className="h-4 w-4" /> We Value Your Feedback</div>
        <h2 className="text-3xl font-extrabold text-slate-900">Help Us Improve</h2>
        <p className="text-slate-600 mt-2">Share your experience with BLARAA Systems</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">How would you rate our service?</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => handleRating(star)} className={`p-2 rounded-lg transition ${formData.rating >= star ? 'text-yellow-400' : 'text-slate-300'} hover:scale-110`}>
                <Star className="h-8 w-8" fill={formData.rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white/50" placeholder="Your name" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white/50" placeholder="your@email.com" /></div>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-2">Company (Optional)</label><input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white/50" placeholder="Your company name" /></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-2">Your Feedback *</label><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none bg-white/50" placeholder="Tell us about your experience..." /></div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg disabled:opacity-50">
          {loading ? <><RefreshCw className="h-5 w-5 animate-spin" /> Submitting...</> : <><Send className="h-5 w-5" /> Submit Feedback</>}
        </button>
      </form>
    </div>
  );
};

const Dashboard = ({ formData, setFormData, loading, loadingPdf, status, onSubmit, onSubmitPdf, onChange }) => {
  const getStep = () => {
    if (!formData.company_name && !formData.company_id && !formData.city) return 1;
    if (!formData.production_tonnes && !formData.coal_tonnes && !formData.electricity_kwh) return 2;
    return 3;
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProgressSteps currentStep={getStep()} />
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-5 mb-10 lg:mb-0 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6">
              <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">CarbonFile CBAM • v2.0</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-4">EU Compliance Engine</h2>
              <p className="text-slate-600 mt-4 text-lg leading-relaxed">Generate EU-compliant CBAM reports with accurate emissions calculations and official XML format.</p>
            </div>
            <LivePreview formData={formData} />
            <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-2 flex items-center gap-2"><Zap className="h-4 w-4" /> How It Works</h3>
              {[{ icon: Building2, title: '1. Enter Company Info', desc: 'Provide your company name, tax ID, and factory location.' }, { icon: Factory, title: '2. Add Production Data', desc: 'Enter monthly production, coal consumption, and electricity usage.' }, { icon: FileCheck, title: '3. Generate Reports', desc: 'Download EU-compliant XML and human-readable PDF reports.' }].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2.5 rounded-xl h-fit shadow-sm"><Icon className="h-5 w-5 text-emerald-600" /></div>
                  <div><h4 className="font-bold text-slate-900 text-sm">{title}</h4><p className="text-xs text-slate-500 mt-1">{desc}</p></div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div><span className="font-bold text-emerald-800 text-sm block">Audit Trail Active</span><p className="text-xs text-emerald-600 mt-1">Every report is timestamped and logged for compliance verification.</p></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2"><Leaf className="h-4 w-4" /> Report Generator</h3>
                <span className="text-emerald-200 text-xs font-mono bg-emerald-700/50 px-2 py-1 rounded">SECURE</span>
              </div>
              <form onSubmit={onSubmit} className="p-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2"><Building2 className="h-4 w-4" /> Step 1: Organization Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative"><div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Building2 className="h-4 w-4" /></div><input name="company_name" required placeholder="Company Name" value={formData.company_name} onChange={onChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white/50" /></div>
                    <div className="relative"><div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><FileText className="h-4 w-4" /></div><input name="company_id" required placeholder="IE Code / GSTIN" value={formData.company_id} onChange={onChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white/50" /></div>
                  </div>
                  <div className="relative"><div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Globe className="h-4 w-4" /></div><input name="city" required placeholder="Factory City / Location" value={formData.city} onChange={onChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white/50" /></div>
                </div>
                <hr className="border-emerald-100" />
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2"><Factory className="h-4 w-4" /> Step 2: Production Metrics (Monthly)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200 rounded-xl p-4"><label className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1"><Factory className="h-3 w-3" /> Production</label><div className="relative mt-2"><input name="production_tonnes" type="number" step="0.01" required value={formData.production_tonnes} onChange={onChange} className="w-full pl-3 pr-10 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-lg bg-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500 font-bold bg-emerald-100 px-2 py-1 rounded">T</span></div></div>
                    <div className="bg-gradient-to-br from-white to-orange-50/50 border border-orange-200 rounded-xl p-4"><label className="text-[10px] font-bold text-orange-600 uppercase flex items-center gap-1"><Flame className="h-3 w-3" /> Coal Used</label><div className="relative mt-2"><input name="coal_tonnes" type="number" step="0.01" required value={formData.coal_tonnes} onChange={onChange} className="w-full pl-3 pr-10 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none font-mono text-lg bg-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-orange-500 font-bold bg-orange-100 px-2 py-1 rounded">T</span></div></div>
                    <div className="bg-gradient-to-br from-white to-yellow-50/50 border border-yellow-300 rounded-xl p-4"><label className="text-[10px] font-bold text-yellow-600 uppercase flex items-center gap-1"><Zap className="h-3 w-3" /> Electricity</label><div className="relative mt-2"><input name="electricity_kwh" type="number" step="0.01" required value={formData.electricity_kwh} onChange={onChange} className="w-full pl-3 pr-14 py-3 rounded-lg border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none font-mono text-lg bg-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded">kWh</span></div></div>
                  </div>
                </div>
                <hr className="border-emerald-100" />
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2"><Download className="h-4 w-4" /> Step 3: Generate Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="submit" disabled={loading || loadingPdf} className={`py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:scale-[1.02]'}`}>
                      {loading ? <><RefreshCw className="h-5 w-5 animate-spin" /> Generating...</> : <><Download className="h-5 w-5" /> Download XML</>}
                    </button>
                    <button type="button" onClick={onSubmitPdf} disabled={loading || loadingPdf} className={`py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${loadingPdf ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl hover:scale-[1.02]'}`}>
                      {loadingPdf ? <><RefreshCw className="h-5 w-5 animate-spin" /> Generating...</> : <><FileText className="h-5 w-5" /> Download PDF</>}
                    </button>
                  </div>
                </div>
                {status === 'success' && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm shadow-sm">
                    <div className="bg-white p-2 rounded-full shadow-sm"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
                    <div><span className="font-bold block">Success!</span><span className="text-emerald-600">Report generated & audit log secured.</span></div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── NEW PLATFORM COMPONENTS ───────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    live: { label: 'LIVE', cls: 'badge-live-tag' },
    waitlist: { label: 'EARLY ACCESS', cls: 'badge-early-tag' },
    soon: { label: 'COMING SOON', cls: 'badge-soon-tag' },
  };
  const { label, cls } = map[status] || map.soon;
  return <span className={`status-badge ${cls}`}>{label}</span>;
};

const Breadcrumb = ({ items, onViewChange }) => (
  <div className="breadcrumb-bar">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <ChevronRight size={13} style={{ color: '#94a3b8' }} />}
        {item.view ? (
          <button className="bc-link" onClick={() => onViewChange(item.view)}>{item.label}</button>
        ) : (
          <span className="bc-current">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

const WaitlistForm = ({ product }) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', sector: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await axios.post('https://cbam-full-app.onrender.com/submit-feedback', {
        name: form.name, email: form.email, company: form.company,
        message: `WAITLIST: ${product.fullName} | Sector: ${form.sector || 'Not specified'}`, rating: 5,
      });
    } catch { }
    setSubmitted(true); setLoading(false);
  };
  if (submitted) return (
    <div className="waitlist-success">
      <CheckCircle2 size={28} style={{ color: '#16a34a' }} />
      <h3>You're on the list!</h3>
      <p>We'll notify <strong>{form.email}</strong> when {product.name} launches.</p>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="waitlist-form">
      <h3>Join the Waitlist</h3>
      <p>Be first to access {product.name} when it launches.</p>
      <div className="waitlist-grid">
        <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input required placeholder="Company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
        <input placeholder="Your sector (e.g. Steel)" value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })} />
      </div>
      <button type="submit" disabled={loading} className="btn-waitlist">
        {loading ? <><RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} /> Joining...</> : <><Mail size={15} /> Join Waitlist</>}
      </button>
    </form>
  );
};

const ProductCard = ({ product, onViewChange }) => {
  const Icon = product.icon;
  return (
    <div className="mini-product-card" onClick={() => onViewChange(`product-${product.id}`)}>
      <div className="mini-card-top">
        <div className="mini-icon" style={{ background: product.accentColor + '18' }}>
          <Icon size={20} style={{ color: product.accentColor }} />
        </div>
        <StatusBadge status={product.status} />
      </div>
      <h3 className="mini-card-name">{product.name}</h3>
      <p className="mini-card-sub">{product.subtitle}</p>
      <div className="mini-card-deadline">
        <Clock size={11} style={{ color: product.accentColor, flexShrink: 0 }} />
        <span style={{ color: product.accentColor, fontSize: 11, fontWeight: 600 }}>{product.deadline}</span>
      </div>
      <div className="mini-card-footer">
        <span className="mini-card-price">{product.price}</span>
        <span style={{ color: product.accentColor, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
          {product.status === 'live' ? 'Launch' : 'Learn More'} <ArrowRight size={11} />
        </span>
      </div>
    </div>
  );
};

const ProductPage = ({ productId, onViewChange }) => {
  const product = PRODUCTS[productId];
  if (!product) return <div className="p-12 text-center text-slate-500">Product not found.</div>;
  const Icon = product.icon;
  return (
    <div className="product-detail-page">
      <Breadcrumb items={[{ label: 'BLARAA Systems', view: 'platform' }, { label: 'Products', view: 'products' }, { label: product.name }]} onViewChange={onViewChange} />
      <div className="product-hero-section" style={{ background: product.bgColor }}>
        <div className="product-hero-inner">
          <div className="product-hero-left">
            <StatusBadge status={product.status} />
            <div className="product-big-icon" style={{ background: product.accentColor + '20' }}>
              <Icon size={34} style={{ color: product.accentColor }} />
            </div>
            <h1 className="product-page-title">{product.fullName}</h1>
            <p className="product-page-tagline">{product.tagline}</p>
            <p className="product-page-desc">{product.description}</p>
            <div className="product-meta-list">
              <div className="pm-item"><span className="pm-label">Regulation</span><span className="pm-val">{product.regulation}</span></div>
              <div className="pm-item"><Clock size={13} style={{ color: product.accentColor, flexShrink: 0 }} /><span className="pm-val" style={{ color: product.accentColor, fontWeight: 700 }}>{product.deadline}</span></div>
              <div className="pm-item"><span className="pm-label">Pricing</span><span className="pm-val" style={{ fontFamily: 'monospace' }}>{product.price}</span></div>
            </div>
            {product.status === 'live' && (
              <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => onViewChange(product.id === 'cbam' ? 'app' : product.id)}>
                Launch {product.name} <ArrowRight size={16} />
              </button>
            )}
          </div>
          <div className="product-hero-right">
            <div className="product-features-card">
              <h3 className="pcard-label">What's Included</h3>
              <ul className="pcard-features">
                {product.features.map((f, i) => (
                  <li key={i}><CheckCircle2 size={15} style={{ color: product.accentColor, flexShrink: 0 }} /><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <div className="product-sectors-card">
              <h3 className="pcard-label">Covered Sectors</h3>
              <div className="sector-tags">
                {product.sectors.map((s, i) => (
                  <span key={i} className="sector-tag-chip" style={{ background: product.accentColor + '14', color: product.accentColor }}>{s}</span>
                ))}
              </div>
            </div>
            {product.status !== 'live' && <WaitlistForm product={product} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const AllProductsPage = ({ onViewChange }) => {
  const [filter, setFilter] = useState('all');
  useReveal();
  const filtered = filter === 'all' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.status === filter);
  return (
    <div className="all-products-page">
      <div className="all-products-header">
        <span className="section-chip"><FileCheck size={11} /> All Products</span>
        <h1 className="section-title" style={{ textAlign: 'center' }}>India's Complete Compliance Suite</h1>
        <p className="section-sub" style={{ textAlign: 'center', margin: '10px auto 0' }}>11 tools covering every major energy and carbon regulation in India and the EU.</p>
        <div className="filter-tabs">
          {[['all', 'All'], ['live', 'Live Now'], ['waitlist', 'Early Access'], ['soon', 'Coming Soon']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} className={`filter-tab ${filter === val ? 'active' : ''}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="all-products-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} onViewChange={onViewChange} />)}
      </div>
    </div>
  );
};

const SolutionPage = ({ sectorId, onViewChange }) => {
  const sector = SECTORS.find(s => s.id === sectorId);
  if (!sector) return <div className="p-12 text-center text-slate-500">Sector not found.</div>;
  const Icon = sector.icon;
  const sectorProducts = sector.products.map(id => PRODUCTS[id]).filter(Boolean);
  return (
    <div className="solution-page">
      <Breadcrumb items={[{ label: 'BLARAA Systems', view: 'platform' }, { label: 'Solutions', view: 'solutions' }, { label: sector.label }]} onViewChange={onViewChange} />
      <div className="solution-hero-band" style={{ background: sector.bgColor }}>
        <div className="solution-hero-inner">
          <div className="sol-icon-wrap" style={{ background: sector.accentColor + '22' }}>
            <Icon size={26} style={{ color: sector.accentColor }} />
          </div>
          <div className="urgency-pill" style={{ color: sector.urgencyColor, background: sector.urgencyColor + '14', borderColor: sector.urgencyColor + '30' }}>
            <AlertTriangle size={12} /> {sector.urgency}
          </div>
          <h1 className="solution-page-title">Solutions for {sector.label}</h1>
          <p className="solution-page-desc">{sector.description}</p>
        </div>
      </div>
      <div className="solution-products-section">
        <h2 className="sol-products-label">{sectorProducts.length} tool{sectorProducts.length !== 1 ? 's' : ''} recommended for your sector</h2>
        <div className="sol-product-grid">
          {sectorProducts.map(product => {
            const PIcon = product.icon;
            return (
              <div key={product.id} className="sol-product-card" onClick={() => onViewChange(`product-${product.id}`)}>
                <div className="spc-top">
                  <div className="spc-icon-box" style={{ background: product.accentColor + '16' }}>
                    <PIcon size={22} style={{ color: product.accentColor }} />
                  </div>
                  <StatusBadge status={product.status} />
                </div>
                <h3 className="spc-title">{product.fullName}</h3>
                <p className="spc-tagline">{product.tagline}</p>
                <div className="spc-deadline-row">
                  <Clock size={12} style={{ color: product.accentColor }} />
                  <span style={{ color: product.accentColor, fontSize: 12, fontWeight: 600 }}>{product.deadline}</span>
                </div>
                <ul className="spc-feature-list">
                  {product.features.slice(0, 3).map((f, i) => (
                    <li key={i}><CheckCircle2 size={13} style={{ color: product.accentColor, flexShrink: 0 }} /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="spc-footer-row">
                  <span className="spc-price-tag">{product.price}</span>
                  <button className="spc-action-btn" style={{ background: product.accentColor }}>
                    {product.status === 'live' ? 'Launch Now' : 'Join Waitlist'} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SectorGrid = ({ onViewChange }) => (
  <section className="sector-section">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12 reveal">
        <span className="section-chip"><Users size={11} /> Find Your Solution</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Who are you?</h2>
        <p className="section-sub" style={{ textAlign: 'center', margin: '10px auto 0', maxWidth: 500 }}>
          Select your sector and we'll show you exactly which regulations apply and what you need.
        </p>
      </div>
      <div className="sector-grid">
        {SECTORS.map((sector, idx) => {
          const Icon = sector.icon;
          return (
            <div key={sector.id} className={`sector-card reveal reveal-delay-${(idx % 4) + 1}`}
              style={{ '--sector-accent': sector.accentColor, '--sector-bg': sector.bgColor }}
              onClick={() => onViewChange(`solution-${sector.id}`)}>
              <div className="sc-icon-box" style={{ background: sector.bgColor }}>
                <Icon size={20} style={{ color: sector.accentColor }} />
              </div>
              <div className="sc-urgency-tag" style={{ color: sector.urgencyColor, background: sector.urgencyColor + '12' }}>
                {sector.urgency}
              </div>
              <h3 className="sc-title">{sector.label}</h3>
              <p className="sc-subtitle">{sector.subtitle}</p>
              <div className="sc-chips">
                {sector.products.slice(0, 3).map(id => PRODUCTS[id]).filter(Boolean).map(p => (
                  <span key={p.id} className="sc-chip" style={{ background: p.accentColor + '14', color: p.accentColor }}>{p.name}</span>
                ))}
                {sector.products.length > 3 && <span className="sc-chip" style={{ background: '#f1f5f9', color: '#64748b' }}>+{sector.products.length - 3}</span>}
              </div>
              <div className="sc-arrow-wrap"><ArrowRight size={15} style={{ color: sector.accentColor }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const AllSolutionsPage = ({ onViewChange }) => {
  useReveal();
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 80 }}>
      <div className="solutions-page-hero">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="platform-badge" style={{ opacity: 1, animation: 'none' }}><Users size={12} /> Solutions by Sector</span>
          <h1 className="platform-headline" style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginTop: 20 }}>Find your compliance solution</h1>
          <p className="platform-sub" style={{ marginBottom: 0 }}>Select your sector below to see which regulations apply to you and which tools you need.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0' }}>
        <div className="sector-grid">
          {SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div key={sector.id} className={`sector-card reveal reveal-delay-${(idx % 4) + 1}`}
                style={{ '--sector-accent': sector.accentColor, '--sector-bg': sector.bgColor }}
                onClick={() => onViewChange(`solution-${sector.id}`)}>
                <div className="sc-icon-box" style={{ background: sector.bgColor }}>
                  <Icon size={20} style={{ color: sector.accentColor }} />
                </div>
                <div className="sc-urgency-tag" style={{ color: sector.urgencyColor, background: sector.urgencyColor + '12' }}>{sector.urgency}</div>
                <h3 className="sc-title">{sector.label}</h3>
                <p className="sc-subtitle">{sector.subtitle}</p>
                <div className="sc-chips">
                  {sector.products.slice(0, 3).map(id => PRODUCTS[id]).filter(Boolean).map(p => (
                    <span key={p.id} className="sc-chip" style={{ background: p.accentColor + '14', color: p.accentColor }}>{p.name}</span>
                  ))}
                  {sector.products.length > 3 && <span className="sc-chip" style={{ background: '#f1f5f9', color: '#64748b' }}>+{sector.products.length - 3}</span>}
                </div>
                <div className="sc-arrow-wrap"><ArrowRight size={15} style={{ color: sector.accentColor }} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── COMPLIANCE CORE (CCTS MRV) DASHBOARD ──────────────────────────
const ComplianceCoreDashboard = ({ onViewChange }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    entityName: '', sector: '', subsector: '', financialYear: '2025-26',
    production: '', scope1: '', scope2: '', baselineGEI: '', targetGEI: '',
  });
  const [result, setResult] = useState(null);

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const sectorData = form.sector ? CCTS_SECTORS.find(s => s.id === form.sector) : null;
  const scope1Val = parseFloat(form.scope1) || 0;
  const scope2Val = parseFloat(form.scope2) || 0;
  const prodVal   = parseFloat(form.production) || 0;
  const tgtGEI    = parseFloat(form.targetGEI) || 0;
  const baseGEI   = parseFloat(form.baselineGEI) || 0;
  const liveGEI   = prodVal > 0 ? (scope1Val + scope2Val) / prodVal : 0;
  const liveDelta = tgtGEI > 0 && prodVal > 0 ? (tgtGEI - liveGEI) * prodVal : 0;
  const liveOk    = liveGEI > 0 && tgtGEI > 0 && liveGEI <= tgtGEI;

  const calculate = (e) => {
    e.preventDefault();
    const prod     = parseFloat(form.production) || 0;
    const s1       = parseFloat(form.scope1) || 0;
    const s2       = parseFloat(form.scope2) || 0;
    const tgt      = parseFloat(form.targetGEI) || 0;
    const base     = parseFloat(form.baselineGEI) || 0;
    const total    = s1 + s2;
    const achieved = prod > 0 ? total / prod : 0;
    const cccDelta = (tgt - achieved) * prod;
    const earned   = Math.max(0, cccDelta);
    const deficit  = Math.max(0, -cccDelta);
    setResult({
      prod, s1, s2, total, achieved, tgt, base,
      earned, deficit,
      isCompliant: achieved <= tgt && achieved > 0,
      geiReductionPct:    base > 0 ? (base - achieved) / base * 100 : 0,
      targetReductionPct: base > 0 ? (base - tgt) / base * 100 : 0,
      surplusLow:  earned * CCTS_CCC_PRICE.low,
      surplusMid:  earned * CCTS_CCC_PRICE.mid,
      surplusHigh: earned * CCTS_CCC_PRICE.high,
      defCostLow:  deficit * CCTS_CCC_PRICE.low,
      defCostMid:  deficit * CCTS_CCC_PRICE.mid,
      defCostHigh: deficit * CCTS_CCC_PRICE.high,
      penaltyMid:  deficit * CCTS_CCC_PRICE.mid * 2,
      penaltyHigh: deficit * CCTS_CCC_PRICE.high * 2,
      sector: sectorData,
      fy: form.financialYear,
    });
    setStep(3);
  };

  const StepBar = () => (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= n ? '#2563eb' : '#e2e8f0', color: step >= n ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{n}</div>
          <span style={{ fontSize: 12, color: step >= n ? '#1e293b' : '#94a3b8', fontWeight: step === n ? 700 : 400 }}>{['Entity Details', 'Emissions & Production', 'Results'][n - 1]}</span>
          {n < 3 && <ChevronRight size={14} style={{ color: '#cbd5e1', margin: '0 4px' }} />}
        </div>
      ))}
    </div>
  );

  // ── Step 1 ──────────────────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ maxWidth: 760, margin: '40px auto', padding: '0 20px' }}>
      <button onClick={() => onViewChange('product-ccts')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>← Back to ComplianceCore</button>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ background: 'linear-gradient(135deg,#2563eb,#1e40af)', padding: 10, borderRadius: 10, display: 'flex' }}>
            <BarChart3 style={{ width: 20, height: 20, color: '#fff' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>ComplianceCore — CCTS MRV Tool</h1>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>GHG Emission Intensity Calculator · Carbon Credit Trading Scheme 2023</p>
          </div>
        </div>
        <StepBar />
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>Step 1 — Entity & Compliance Year</h2>
        <form onSubmit={e => { e.preventDefault(); if (!form.sector) return; setStep(2); }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Entity / Plant Name (optional)</label>
            <input value={form.entityName} onChange={e => setF('entityName', e.target.value)} placeholder="e.g. SAIL Bhilai Steel Plant" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Sector <span style={{ color: '#dc2626' }}>*</span></label>
            <select value={form.sector} onChange={e => { setF('sector', e.target.value); setF('subsector', ''); }} required style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
              <option value="">Select CCTS obligated sector</option>
              {CCTS_SECTORS.map(s => <option key={s.id} value={s.id}>{s.label} — Phase {s.phase}</option>)}
            </select>
          </div>
          {sectorData && sectorData.subsectors.length > 1 && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Sub-sector</label>
              <select value={form.subsector} onChange={e => setF('subsector', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select sub-sector</option>
                {sectorData.subsectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Compliance Year <span style={{ color: '#dc2626' }}>*</span></label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['2025-26', '2026-27'].map(fy => (
                <button type="button" key={fy} onClick={() => setF('financialYear', fy)} style={{ flex: 1, padding: '10px', border: `2px solid ${form.financialYear === fy ? '#2563eb' : '#d1d5db'}`, borderRadius: 8, background: form.financialYear === fy ? '#eff6ff' : '#fff', color: form.financialYear === fy ? '#2563eb' : '#64748b', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                  FY {fy}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: form.financialYear === '2025-26' ? '#2563eb' : '#7c3aed', marginTop: 6 }}>
              {form.financialYear === '2025-26' ? '1st CCTS compliance year — Form A (verified GHG data) due July 31, 2026' : '2nd CCTS compliance year — Form A due July 31, 2027'}
            </p>
          </div>
          {sectorData && (
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#1e40af', marginBottom: 10 }}>Sector-Average Reference GEI (for guidance only)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  ['Sector Baseline', sectorData.refBaseline.toFixed(2), 'FY 2023-24 avg'],
                  [`FY ${form.financialYear} Target`, (form.financialYear === '2025-26' ? sectorData.refTarget25 : sectorData.refTarget26).toFixed(2), 'Sector avg. target'],
                  ['Required Reduction', (((sectorData.refBaseline - (form.financialYear === '2025-26' ? sectorData.refTarget25 : sectorData.refTarget26)) / sectorData.refBaseline) * 100).toFixed(1) + '%', 'From baseline'],
                ].map(([title, val, sub]) => (
                  <div key={title} style={{ background: '#fff', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#2563eb' }}>{val}</div>
                    <div style={{ fontSize: 10, color: '#374151', fontWeight: 600, marginTop: 2 }}>{title}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{sub}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#64748b', marginTop: 10, marginBottom: 4, fontStyle: 'italic' }}>⚠ These are sector-wide averages. Your plant-specific baseline and target are in your BEE gazette notification — use those in Step 2.</p>
              <p style={{ fontSize: 11, color: '#374151', marginBottom: 0 }}>Obligation threshold: {sectorData.threshold}</p>
            </div>
          )}
          <button type="submit" disabled={!form.sector} style={{ width: '100%', padding: 14, background: form.sector ? 'linear-gradient(135deg,#2563eb,#1e40af)' : '#e2e8f0', color: form.sector ? '#fff' : '#94a3b8', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: form.sector ? 'pointer' : 'default' }}>
            Continue to Emissions Data →
          </button>
        </form>
      </div>
    </div>
  );

  // ── Step 2 ──────────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ maxWidth: 980, margin: '40px auto', padding: '0 20px' }}>
      <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>← Back</button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20, alignItems: 'start' }}>
        {/* Live preview panel */}
        <div style={{ position: 'sticky', top: 90, background: '#1e293b', borderRadius: 16, padding: 28, color: '#fff' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Live GEI Preview</p>
          {liveGEI > 0 && tgtGEI > 0 ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 38, fontWeight: 900, color: liveOk ? '#4ade80' : '#f87171', lineHeight: 1 }}>{liveGEI.toFixed(4)}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>tCO2e / {sectorData?.unit || 'unit'}</div>
                <div style={{ marginTop: 8, fontSize: 13, color: liveOk ? '#4ade80' : '#f87171', fontWeight: 700 }}>{liveOk ? '✓ Below Target' : '✗ Above Target'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>Your GEI</span>
                  <span style={{ fontWeight: 700 }}>{liveGEI.toFixed(4)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>Target GEI</span>
                  <span style={{ color: '#93c5fd', fontWeight: 700 }}>{tgtGEI.toFixed(4)}</span>
                </div>
                <div style={{ background: '#334155', borderRadius: 8, overflow: 'hidden', height: 8, marginBottom: 10 }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (tgtGEI / liveGEI) * 100)}%`, background: liveOk ? '#4ade80' : '#f87171', transition: 'width 0.3s' }} />
                </div>
                {prodVal > 0 && (
                  <div style={{ fontSize: 12, textAlign: 'center', fontWeight: 700, color: liveDelta >= 0 ? '#4ade80' : '#f87171' }}>
                    {liveDelta >= 0
                      ? `+${Math.round(liveDelta).toLocaleString('en-IN')} CCCs surplus`
                      : `${Math.round(-liveDelta).toLocaleString('en-IN')} CCCs deficit`}
                  </div>
                )}
              </div>
              {baseGEI > 0 && <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Reduction from baseline: <span style={{ color: '#a78bfa', fontWeight: 700 }}>{((baseGEI - liveGEI) / baseGEI * 100).toFixed(1)}%</span></div>}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '28px 0', opacity: 0.4 }}>
              <BarChart3 style={{ width: 34, height: 34, margin: '0 auto 10px' }} />
              <p style={{ fontSize: 13 }}>Enter production, emissions,<br />and target GEI to see live preview</p>
            </div>
          )}
        </div>
        {/* Input form */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28 }}>
          <StepBar />
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Step 2 — Emissions & Production Data</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Sector: <strong>{sectorData?.label}</strong> · FY {form.financialYear}</p>
          <form onSubmit={calculate}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 12 }}>ANNUAL PRODUCTION OUTPUT</p>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Production volume <span style={{ color: '#dc2626' }}>*</span></label>
              <div style={{ display: 'flex' }}>
                <input type="number" min="0" value={form.production} onChange={e => setF('production', e.target.value)} required placeholder="e.g. 2000000" style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px 0 0 8px', fontSize: 14, outline: 'none' }} />
                <span style={{ padding: '10px 12px', background: '#e2e8f0', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 8px 8px 0', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>{sectorData?.unit || 'units'}</span>
              </div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 12 }}>GHG EMISSIONS (FY {form.financialYear})</p>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Scope 1 Emissions (direct) <span style={{ color: '#dc2626' }}>*</span></label>
                <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>Fuel combustion + process emissions (CO2; also PFCs for aluminium)</p>
                <div style={{ display: 'flex' }}>
                  <input type="number" min="0" value={form.scope1} onChange={e => setF('scope1', e.target.value)} required placeholder="tCO2e" style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px 0 0 8px', fontSize: 14, outline: 'none' }} />
                  <span style={{ padding: '10px 12px', background: '#e2e8f0', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 8px 8px 0', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center' }}>tCO2e</span>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Scope 2 Emissions (indirect) <span style={{ color: '#dc2626' }}>*</span></label>
                <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>Purchased electricity + heat — use CEA grid emission factor for your state</p>
                <div style={{ display: 'flex' }}>
                  <input type="number" min="0" value={form.scope2} onChange={e => setF('scope2', e.target.value)} required placeholder="tCO2e" style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px 0 0 8px', fontSize: 14, outline: 'none' }} />
                  <span style={{ padding: '10px 12px', background: '#e2e8f0', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 8px 8px 0', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center' }}>tCO2e</span>
                </div>
              </div>
              {scope1Val > 0 && prodVal > 0 && (
                <div style={{ marginTop: 12, background: '#eff6ff', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#1e40af' }}>
                  Calculated GEI = ({scope1Val.toLocaleString('en-IN')} + {scope2Val.toLocaleString('en-IN')}) ÷ {prodVal.toLocaleString('en-IN')} = <strong>{liveGEI.toFixed(4)} tCO2e/{sectorData?.unit || 'unit'}</strong>
                </div>
              )}
            </div>
            <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>YOUR BEE-NOTIFIED GEI TARGETS</p>
              <p style={{ fontSize: 11, color: '#78350f', marginBottom: 14 }}>From the official GHG Emission Intensity Target Rules 2025 gazette notification — values are plant-specific and unique to each entity.</p>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Your Baseline GEI (FY 2023-24) <span style={{ color: '#dc2626' }}>*</span></label>
                <div style={{ display: 'flex' }}>
                  <input type="number" step="0.0001" min="0" value={form.baselineGEI} onChange={e => setF('baselineGEI', e.target.value)} required placeholder={sectorData ? sectorData.refBaseline.toFixed(2) : 'e.g. 2.50'} style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px 0 0 8px', fontSize: 14, outline: 'none' }} />
                  <span style={{ padding: '10px 12px', background: '#e2e8f0', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 8px 8px 0', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>tCO2e/{sectorData?.unit || 'unit'}</span>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Your Target GEI for FY {form.financialYear} <span style={{ color: '#dc2626' }}>*</span></label>
                <div style={{ display: 'flex' }}>
                  <input type="number" step="0.0001" min="0" value={form.targetGEI} onChange={e => setF('targetGEI', e.target.value)} required placeholder={sectorData ? (form.financialYear === '2025-26' ? sectorData.refTarget25 : sectorData.refTarget26).toFixed(2) : 'e.g. 2.40'} style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px 0 0 8px', fontSize: 14, outline: 'none' }} />
                  <span style={{ padding: '10px 12px', background: '#e2e8f0', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 8px 8px 0', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>tCO2e/{sectorData?.unit || 'unit'}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: 14, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>← Back</button>
              <button type="submit" style={{ flex: 2, padding: 14, background: 'linear-gradient(135deg,#2563eb,#1e40af)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Calculate CCC Position →</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // ── Step 3 — Results ────────────────────────────────────────────────
  const r = result;
  if (!r) return null;
  return (
    <div style={{ maxWidth: 820, margin: '40px auto', padding: '0 20px' }}>
      <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>← Back to Data Entry</button>

      {/* Status banner */}
      <div style={{ background: r.isCompliant ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'linear-gradient(135deg,#dc2626,#b91c1c)', borderRadius: 16, padding: '28px 32px', color: '#fff', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7, marginBottom: 6 }}>{r.sector?.label} · FY {r.fy} · CCTS Status</div>
            <div style={{ fontSize: 30, fontWeight: 900 }}>{r.isCompliant ? '✓ GEI TARGET MET' : '✗ GEI TARGET MISSED'}</div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>Your GEI: <strong>{r.achieved.toFixed(4)}</strong> vs Target: <strong>{r.tgt.toFixed(4)}</strong> tCO2e/{r.sector?.unit || 'unit'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{r.isCompliant ? 'CCCs Earned' : 'CCCs Deficit'}</div>
            <div style={{ fontSize: 34, fontWeight: 900 }}>{Math.round(r.isCompliant ? r.earned : r.deficit).toLocaleString('en-IN')}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>tCO2e</div>
          </div>
        </div>
      </div>

      {/* GEI Summary Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>GEI Performance Summary</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Parameter', 'Value', 'Unit'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 12, borderBottom: '1px solid #e2e8f0' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Annual Production',        val: r.prod.toLocaleString('en-IN'),         unit: r.sector?.unit || 'units' },
                { label: 'Scope 1 Emissions',        val: r.s1.toLocaleString('en-IN'),           unit: 'tCO2e' },
                { label: 'Scope 2 Emissions',        val: r.s2.toLocaleString('en-IN'),           unit: 'tCO2e' },
                { label: 'Total GHG Emissions',      val: r.total.toLocaleString('en-IN'),        unit: 'tCO2e' },
                { label: 'Baseline GEI (FY 2023-24)',val: r.base.toFixed(4),                      unit: `tCO2e/${r.sector?.unit || 'unit'}` },
                { label: `Target GEI (FY ${r.fy})`,  val: r.tgt.toFixed(4),                       unit: `tCO2e/${r.sector?.unit || 'unit'}`, hi: true },
                { label: 'Your Achieved GEI',        val: r.achieved.toFixed(4),                  unit: `tCO2e/${r.sector?.unit || 'unit'}`, hi: true },
                { label: 'Reduction from Baseline',  val: `${r.geiReductionPct.toFixed(2)}%`,     unit: `Required: ${r.targetReductionPct.toFixed(2)}%` },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: row.hi ? (r.isCompliant ? '#f0fdf4' : '#fef2f2') : 'transparent' }}>
                  <td style={{ padding: '10px 14px', color: '#374151' }}>{row.label}</td>
                  <td style={{ padding: '10px 14px', fontWeight: row.hi ? 700 : 400, color: row.hi ? (r.isCompliant ? '#16a34a' : '#dc2626') : '#1e293b' }}>{row.val}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8' }}>{row.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Surplus block */}
      {r.isCompliant && r.earned > 0 && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#16a34a', marginBottom: 14 }}>Carbon Credit Certificates Earned — Estimated Revenue</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
            {[['At ₹600/tCO2e (low)', r.surplusLow], ['At ₹800/tCO2e (mid-range)', r.surplusMid], ['At ₹1,200/tCO2e (high)', r.surplusHigh]].map(([label, val]) => (
              <div key={label} style={{ background: '#fff', borderRadius: 10, padding: 14, textAlign: 'center', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#16a34a' }}>{fmtINR(val)}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#374151', marginBottom: 6 }}>You earned <strong>{Math.round(r.earned).toLocaleString('en-IN')} CCCs</strong> ({Math.round(r.earned).toLocaleString('en-IN')} tCO2e below target). These can be sold on IEX, PXIL, or HPX after BEE/NSC-ICM issues them following your verified Form A submission.</p>
          <p style={{ fontSize: 11, color: '#64748b', fontStyle: 'italic' }}>⚠ CERC has not published an official floor/ceiling CCC price band yet. ₹600–₹1,200/tCO2e is an analyst estimate. Actual prices will be set by market forces on the power exchanges.</p>
        </div>
      )}

      {/* Deficit block */}
      {!r.isCompliant && r.deficit > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', marginBottom: 14 }}>CCC Deficit — Action Required Before Trading Window</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 14 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: 14, border: '1px solid #fecaca' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>CCCs to Purchase</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#dc2626' }}>{Math.ceil(r.deficit).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>on IEX / PXIL / HPX</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: 14, border: '1px solid #fecaca' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Estimated Purchase Cost (mid)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#dc2626' }}>{fmtINR(r.defCostMid)}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>₹{CCTS_CCC_PRICE.low.toLocaleString()}–₹{CCTS_CCC_PRICE.high.toLocaleString()} range</div>
            </div>
          </div>
          <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c', marginBottom: 6 }}>Environmental Compensation Risk (if deficit not corrected by trading window)</p>
            <p style={{ fontSize: 13, color: '#7f1d1d' }}>Formula: 2 × market price × {Math.ceil(r.deficit).toLocaleString('en-IN')} tCO2e</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#7f1d1d' }}>{fmtINR(r.penaltyMid)} (at ₹800) — up to {fmtINR(r.penaltyHigh)} (at ₹1,200)</p>
            <p style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>Administered by CPCB. 90-day payment window after order. Penalty is NOT applicable if deficit CCCs are purchased during the October 2026 trading cycle.</p>
          </div>
          <p style={{ fontSize: 12, color: '#374151' }}><strong>Action:</strong> Purchase {Math.ceil(r.deficit).toLocaleString('en-IN')} CCCs on IEX/PXIL/HPX during the October 2026 trading window to achieve compliance at an estimated cost of {fmtINR(r.defCostLow)}–{fmtINR(r.defCostHigh)}.</p>
        </div>
      )}

      {/* Compliance milestones */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 14 }}>Compliance Timeline — FY 2025-26</h3>
        {[
          { date: 'Before FY ends',   label: 'Hire BEE-accredited Carbon Verification Agency (ACVA) and finalise GHG monitoring plan' },
          { date: 'March 31, 2026',   label: 'End of FY 2025-26 — GHG data collection complete; verify with ACVA' },
          { date: 'July 31, 2026',    label: 'Submit Form A (verified GHG emission data for FY 2025-26) to BEE — CRITICAL DEADLINE', critical: true },
          { date: 'August–September', label: 'BEE completeness check (10 working days) + technical review → NSC-ICM recommendation' },
          { date: 'October 2026',     label: 'CCC issuance (surplus entities) or CCC purchase window (deficit entities) on IEX, PXIL, HPX', critical: true },
          { date: '90 days after',    label: 'Environmental Compensation payment to CPCB (only if deficit uncorrected after trading window)' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.critical ? '#dc2626' : '#2563eb', marginTop: 5, flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: m.critical ? '#dc2626' : '#2563eb', display: 'block' }}>{m.date}</span>
              <span style={{ fontSize: 13, color: '#374151' }}>{m.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory citation */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18, marginBottom: 20, fontSize: 12, color: '#64748b' }}>
        <p style={{ fontWeight: 700, color: '#374151', marginBottom: 6 }}>Legal Basis</p>
        <p>Energy Conservation (Amendment) Act 2022 · Carbon Credit Trading Scheme 2023 (S.O. 2825(E), MoP/MoEFCC)</p>
        <p>GHG Emission Intensity Target Rules 2025 — Phase 1: Oct 8, 2025 | Phase 2: Jan 13–16, 2026</p>
        <p>CERC (Terms and Conditions for Purchase and Sale of Carbon Credit Certificates) Regulations 2026 — Gazette: March 3, 2026</p>
        <p style={{ marginTop: 8, fontStyle: 'italic' }}>⚠ Baseline and target GEI values are plant-specific and binding only as published in official gazette notifications. This tool is for planning and estimation only. Engage a BEE-accredited Carbon Verification Agency (ACVA) for verified MRV before submitting Form A to BEE.</p>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Download size={14} /> Print / Save
        </button>
        <button onClick={() => { setResult(null); setStep(1); setForm({ entityName: '', sector: '', subsector: '', financialYear: '2025-26', production: '', scope1: '', scope2: '', baselineGEI: '', targetGEI: '' }); }} style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <RefreshCw size={14} /> New Calculation
        </button>
        <button onClick={() => onViewChange('platform')} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#092f6f,#1db5f2)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Platform <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
// ───────────────────────────────────────────────────────────────────────

// ─── RENEW TRACK DASHBOARD ─────────────────────────────────────────
const RenewTrackDashboard = ({ onViewChange }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    entityName: '', consumerType: '', sector: '',
    state: '', financialYear: '2025-26',
    totalMWh: '', windMWh: '', hydroMWh: '', dreMWh: '', otherREMWh: '',
  });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const t = RCO_TARGETS[form.financialYear];
  const isHillyNE = HILLY_NE_STATES.includes(form.state);
  const totalRE = (parseFloat(form.windMWh) || 0) + (parseFloat(form.hydroMWh) || 0) + (parseFloat(form.dreMWh) || 0) + (parseFloat(form.otherREMWh) || 0);
  const total = parseFloat(form.totalMWh) || 0;
  const livePct = total > 0 ? (totalRE / total * 100) : 0;

  const calculate = (e) => {
    e.preventDefault();
    const tgt = RCO_TARGETS[form.financialYear];
    const bRate = RCO_BUYOUT[form.financialYear];
    const wind = parseFloat(form.windMWh) || 0;
    const hydro = parseFloat(form.hydroMWh) || 0;
    const dre = parseFloat(form.dreMWh) || 0;
    const otherRE = parseFloat(form.otherREMWh) || 0;
    const curRE = wind + hydro + dre + otherRE;
    const dreTarget = isHillyNE ? tgt.dre / 2 : tgt.dre;
    const ovReq = tgt.overall / 100 * total;
    const windReq = tgt.wind / 100 * total;
    const hydroReq = tgt.hydro / 100 * total;
    const dreReq = dreTarget / 100 * total;
    const ovShort = Math.max(0, ovReq - curRE);
    const windShort = Math.max(0, windReq - wind);
    const hydroShort = Math.max(0, hydroReq - hydro);
    const dreShort = Math.max(0, dreReq - dre);
    setResult({
      total, curRE, tgt, isHillyNE, dreTarget,
      ovReq, windReq, hydroReq, dreReq,
      ovShort, windShort, hydroShort, dreShort,
      isCompliant: ovShort === 0 && windShort === 0 && hydroShort === 0 && dreShort === 0,
      curPct: (curRE / total * 100).toFixed(2),
      buyoutCost: ovShort * bRate,
      bRate, recsNeeded: Math.ceil(ovShort),
      otherHave: otherRE,
    });
    setStep(3);
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', background: '#fff' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 };
  const cardStyle = { background: '#fff', border: '1px solid #fed7aa', borderRadius: 16, padding: 24 };

  // ── STEP 1 ──────────────────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#fff7ed 0%,#fff 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: 'BLARAA Systems', view: 'platform' }, { label: 'Products', view: 'products' }, { label: 'RenewTrack RCO' }]} onViewChange={onViewChange} />
        <div style={{ background: '#fff7ed', border: '1px solid #fbbf24', borderRadius: 12, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <AlertTriangle size={16} style={{ color: '#d97706', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#92400e', fontSize: 13 }}>RCO Compliance Deadline: 31 May 2026</div>
            <div style={{ color: '#b45309', fontSize: 12, marginTop: 2 }}>FY 2024-25 compliance reports must be filed with BEE by 31st May 2026. Penalties apply under Section 26(3), Energy Conservation Act, 2001.</div>
          </div>
        </div>
        <div style={cardStyle}>
          <span style={{ background: '#fff7ed', color: '#d97706', border: '1px solid #fbbf24', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700 }}>Step 1 of 3 — Entity Details</span>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a2942', marginTop: 14, marginBottom: 4 }}>Who is filing this RCO return?</h2>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Under Energy Conservation (Amendment) Act, 2022 — MoP Notification dated 27 September 2025</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>Entity Name (Optional)</label>
              <input value={form.entityName} onChange={e => set('entityName', e.target.value)} placeholder="e.g. Tata Steel Ltd, MSEDCL, NTPC CPP" style={inputStyle} />
            </div>

            <div>
              <label style={{ ...labelStyle, marginBottom: 10 }}>Consumer Type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                  { val: 'discom', label: 'DISCOM', sub: 'Distribution Licensee' },
                  { val: 'open-access', label: 'Open Access', sub: 'Consumer' },
                  { val: 'cpp', label: 'Captive Power', sub: 'Plant (CPP)' },
                ].map(opt => (
                  <button key={opt.val} type="button" onClick={() => set('consumerType', opt.val)}
                    style={{ padding: '12px 8px', border: `2px solid ${form.consumerType === opt.val ? '#d97706' : '#e2e8f0'}`, borderRadius: 10, background: form.consumerType === opt.val ? '#fff7ed' : '#fff', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: form.consumerType === opt.val ? '#d97706' : '#374151' }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
              {form.consumerType === 'discom' && <div style={{ marginTop: 8, fontSize: 11, color: '#64748b', background: '#f8fafc', borderRadius: 8, padding: '6px 10px' }}>DISCOMs: RCO applies to aggregate procurement. Calculated on total electrical energy procured for distribution.</div>}
              {form.consumerType === 'cpp' && <div style={{ marginTop: 8, fontSize: 11, color: '#64748b', background: '#f8fafc', borderRadius: 8, padding: '6px 10px' }}>CPP: Thermal power plants are excluded. Only captive users procuring via OA or CPP are covered.</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Sector *</label>
                <select value={form.sector} onChange={e => set('sector', e.target.value)} style={{ ...inputStyle, fontFamily: 'inherit' }}>
                  <option value="">Select sector</option>
                  {RCO_SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>State *</label>
                <select value={form.state} onChange={e => set('state', e.target.value)} style={{ ...inputStyle, fontFamily: 'inherit' }}>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                {isHillyNE && <div style={{ marginTop: 6, fontSize: 11, color: '#0891b2', background: '#ecfeff', borderRadius: 6, padding: '4px 8px' }}>Hilly/NE state: Distributed RE obligation is halved per MoP notification.</div>}
              </div>
            </div>

            <div>
              <label style={{ ...labelStyle, marginBottom: 10 }}>Financial Year *</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.keys(RCO_TARGETS).map(fy => (
                  <button key={fy} type="button" onClick={() => set('financialYear', fy)}
                    style={{ padding: '7px 14px', border: `2px solid ${form.financialYear === fy ? '#d97706' : '#e2e8f0'}`, borderRadius: 20, background: form.financialYear === fy ? '#fff7ed' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: form.financialYear === fy ? 700 : 500, color: form.financialYear === fy ? '#d97706' : '#64748b' }}>
                    FY {fy}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 10, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#64748b', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span>Overall target: <strong style={{ color: '#d97706' }}>{t.overall}%</strong></span>
                <span>Wind min: <strong>{t.wind}%</strong></span>
                <span>Hydro min: <strong>{t.hydro}%</strong></span>
                <span>Dist. RE min: <strong>{isHillyNE ? (t.dre / 2).toFixed(2) : t.dre}%</strong>{isHillyNE ? ' (½ rate)' : ''}</span>
              </div>
            </div>

            <button onClick={() => { if (!form.consumerType || !form.sector || !form.state) { alert('Please select Consumer Type, Sector and State'); return; } setStep(2); }}
              style={{ padding: '14px', background: 'linear-gradient(135deg,#d97706,#b45309)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Continue to Energy Data <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── STEP 2 ──────────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#fff7ed 0%,#fff 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: 'BLARAA Systems', view: 'platform' }, { label: 'RenewTrack RCO' }]} onViewChange={onViewChange} />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Live preview panel */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: 16, padding: 22, position: 'sticky', top: 90 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Zap size={15} style={{ color: '#d97706' }} />
                <span style={{ fontWeight: 700, fontSize: 12, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live Compliance Preview</span>
              </div>
              <div style={{ textAlign: 'center', padding: '12px 0 18px' }}>
                <div style={{ fontSize: 56, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1, color: total === 0 ? '#cbd5e1' : livePct >= t.overall ? '#16a34a' : '#dc2626' }}>
                  {total > 0 ? livePct.toFixed(1) : '—'}%
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>Current RE Share</div>
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: '#fff7ed', border: '1px solid #fbbf24', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#d97706' }}>
                  <Clock size={11} /> Target: {t.overall}% (FY {form.financialYear})
                </div>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: 8, height: 10, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{ height: '100%', width: `${Math.min(100, total > 0 ? Math.min(livePct / t.overall * 100, 100) : 0)}%`, background: livePct >= t.overall ? '#16a34a' : '#f59e0b', borderRadius: 8, transition: 'width 0.4s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginBottom: 18 }}>
                <span>0%</span><span>Mandatory: {t.overall}%</span>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Component Minimums</div>
                {[
                  { label: 'Wind', req: t.wind, have: parseFloat(form.windMWh) || 0 },
                  { label: 'Hydro', req: t.hydro, have: parseFloat(form.hydroMWh) || 0 },
                  { label: `Dist. RE (≤10MW)${isHillyNE ? ' ½-rate' : ''}`, req: isHillyNE ? t.dre / 2 : t.dre, have: parseFloat(form.dreMWh) || 0 },
                ].map(row => {
                  const reqMWh = row.req / 100 * total;
                  const ok = total > 0 && row.have >= reqMWh;
                  const missing = Math.max(0, reqMWh - row.have);
                  return (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 12, borderBottom: '1px solid #f8fafc' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#374151' }}>{row.label}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>Min {row.req.toFixed(2)}% = {total > 0 ? fmtMWh(reqMWh) : '—'}</div>
                      </div>
                      <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: total === 0 ? '#f1f5f9' : ok ? '#dcfce7' : '#fee2e2', color: total === 0 ? '#94a3b8' : ok ? '#16a34a' : '#dc2626' }}>
                        {total === 0 ? '—' : ok ? 'Met' : `Short ${fmtMWh(missing)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 14, fontSize: 10, color: '#94a3b8', lineHeight: 1.6 }}>
                Source: MoP Gazette Notification, 27 Sep 2025. Buyout rate FY {form.financialYear}: ₹{RCO_BUYOUT[form.financialYear]}/MWh (CERC order).
              </div>
            </div>
          </div>

          {/* Energy data form */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ background: '#fff7ed', color: '#d97706', border: '1px solid #fbbf24', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700 }}>Step 2 of 3 — Energy Data</span>
            </div>
            <form onSubmit={calculate} style={cardStyle}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a2942', marginBottom: 4 }}>Annual Energy Consumption</h2>
              <p style={{ color: '#64748b', fontSize: 12, marginBottom: 20 }}>Enter FY {form.financialYear} figures in MWh. (1 MU = 1000 MWh = 1 GWh)</p>

              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <label style={{ ...labelStyle, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 11 }}>
                  Total Annual Electricity Consumption (MWh) *
                </label>
                <input type="number" step="0.01" min="1" required value={form.totalMWh} onChange={e => set('totalMWh', e.target.value)} placeholder="e.g. 500000" style={{ ...inputStyle, fontSize: 16, fontWeight: 700 }} />
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 5 }}>Net self-consumption excluding auxiliary, as per SLDC-certified meter reading (Operational Guidelines, BEE)</div>
              </div>

              <div style={{ border: '1.5px solid #fed7aa', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ background: '#fff7ed', padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Renewable Energy — Direct Consumption + RECs Purchased (MWh) *
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { key: 'windMWh', label: 'Wind Energy', hint: `Mandatory minimum: ${t.wind}% of total`, placeholder: 'Wind MWh (direct generation + wind RECs)' },
                    { key: 'hydroMWh', label: 'Hydro Energy', hint: `Mandatory minimum: ${t.hydro}% of total`, placeholder: 'Hydro MWh (direct + hydro RECs)' },
                    { key: 'dreMWh', label: 'Distributed RE — ≤10 MW projects', hint: `Mandatory minimum: ${isHillyNE ? (t.dre / 2).toFixed(2) : t.dre}% of total${isHillyNE ? ' (hilly/NE state — 50% concession applied)' : ''}`, placeholder: 'Rooftop solar, small wind, small hydro (MWh)' },
                    { key: 'otherREMWh', label: 'Other RE — Solar, Biomass, Others', hint: `Covers balance of ${t.other}% other RE requirement`, placeholder: 'Large solar, biomass, biogas, other (MWh)' },
                  ].map(({ key, label, hint, placeholder }) => (
                    <div key={key}>
                      <label style={labelStyle}>{label}</label>
                      <input type="number" step="0.01" min="0" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} style={inputStyle} />
                      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>{hint}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#64748b' }}>Total RE entered:</span>
                  <strong style={{ color: '#d97706', fontFamily: 'monospace' }}>
                    {fmtMWh(totalRE)}{total > 0 ? ` (${(totalRE / total * 100).toFixed(2)}%)` : ''}
                  </strong>
                </div>
              </div>

              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '10px 14px', fontSize: 11, color: '#0369a1', marginBottom: 16 }}>
                <strong>REC Equivalence:</strong> 1 REC (Renewable Energy Certificate) = 1 MWh of renewable energy. RECs purchased on IEX/PXIL count towards RCO fulfilment. Buyout payment is an alternate compliance mechanism per CERC order.
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="submit" style={{ flex: 2, padding: '12px', background: 'linear-gradient(135deg,#d97706,#b45309)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <BarChart3 size={16} /> Calculate RCO Compliance
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // ── STEP 3 — RESULTS ────────────────────────────────────────────────
  const r = result;
  const otherShort = Math.max(0, (r.tgt.other / 100 * r.total) - r.otherHave);
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f8fafc 0%,#fff 100%)' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: 'BLARAA Systems', view: 'platform' }, { label: 'RenewTrack RCO' }]} onViewChange={onViewChange} />

        {/* Status Banner */}
        <div style={{ borderRadius: 20, padding: '28px 32px', marginBottom: 24, textAlign: 'center', background: r.isCompliant ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : 'linear-gradient(135deg,#fef2f2,#fee2e2)', border: `2px solid ${r.isCompliant ? '#86efac' : '#fca5a5'}` }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 40, background: r.isCompliant ? '#16a34a' : '#dc2626', color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 14, letterSpacing: '0.04em' }}>
            {r.isCompliant ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
            {r.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
            FY {form.financialYear} RCO Assessment — {form.entityName || (form.consumerType === 'discom' ? 'DISCOM' : form.consumerType === 'cpp' ? 'CPP' : 'Open Access Consumer')} · {form.sector} · {form.state}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Your RE Share', val: `${r.curPct}%`, color: r.isCompliant ? '#16a34a' : '#dc2626' },
              { label: 'Required', val: `${r.tgt.overall}%`, color: '#d97706' },
              { label: 'Surplus', val: fmtMWh(Math.max(0, r.curRE - r.ovReq)), color: '#16a34a' },
              { label: 'Shortfall', val: fmtMWh(r.ovShort), color: '#dc2626' },
            ].filter((_, i) => !(i === 2 && !r.isCompliant) && !(i === 3 && r.isCompliant)).map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'monospace', color: item.color }}>{item.val}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ background: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2942' }}>Component-wise RCO Compliance</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>MoP Notification, 27 Sep 2025</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {['Source', 'Required %', 'Required (MWh)', 'Consumed/RECs (MWh)', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Wind', req: r.tgt.wind, reqMWh: r.windReq, have: parseFloat(form.windMWh) || 0, short: r.windShort, note: '' },
                  { label: 'Hydro', req: r.tgt.hydro, reqMWh: r.hydroReq, have: parseFloat(form.hydroMWh) || 0, short: r.hydroShort, note: '' },
                  { label: 'Dist. RE (≤10 MW)', req: r.dreTarget, reqMWh: r.dreReq, have: parseFloat(form.dreMWh) || 0, short: r.dreShort, note: r.isHillyNE ? '½-rate exemption' : '' },
                  { label: 'Other RE (Solar etc.)', req: r.tgt.other, reqMWh: r.tgt.other / 100 * r.total, have: r.otherHave, short: otherShort, note: '' },
                  { label: 'Total RCO', req: r.tgt.overall, reqMWh: r.ovReq, have: r.curRE, short: r.ovShort, bold: true },
                ].map((row, i) => {
                  const ok = row.short === 0;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: row.bold ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', fontWeight: row.bold ? 800 : 500, color: '#1a2942' }}>
                        {row.label}{row.note && <span style={{ fontSize: 10, color: '#0891b2', marginLeft: 6, fontStyle: 'italic' }}>{row.note}</span>}
                      </td>
                      <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontWeight: 600, color: '#d97706' }}>{row.req.toFixed(2)}%</td>
                      <td style={{ padding: '10px 16px', fontFamily: 'monospace', color: '#64748b' }}>{row.reqMWh.toFixed(0)}</td>
                      <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontWeight: 600, color: ok ? '#16a34a' : '#1a2942' }}>{row.have.toFixed(0)}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: ok ? '#dcfce7' : '#fee2e2', color: ok ? '#15803d' : '#dc2626', whiteSpace: 'nowrap' }}>
                          {ok ? 'Met' : `Short ${fmtMWh(row.short)}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-compliant options */}
        {!r.isCompliant && (
          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#dc2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={15} /> Three Compliance Options (Equal Hierarchy — CERC Order)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { title: 'Option 1', sub: 'Procure Renewable Power', detail: `Source ${fmtMWh(r.ovShort)} additional RE via PPA, open access, or rooftop solar before year-end.`, color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
                { title: 'Option 2', sub: 'Purchase RECs', detail: `Buy ${r.recsNeeded.toLocaleString('en-IN')} MWh-equivalent RECs on IEX or PXIL. Prices vary by REC type.`, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', bigVal: `${r.recsNeeded.toLocaleString('en-IN')} RECs` },
                { title: 'Option 3', sub: 'Pay Buyout Price', detail: `@ ₹${r.bRate}/MWh (CERC determined, FY ${form.financialYear}). 75% credited to State Energy Conservation Fund.`, color: '#d97706', bg: '#fff7ed', border: '#fbbf24', bigVal: fmtINR(r.buyoutCost) },
              ].map((opt, i) => (
                <div key={i} style={{ background: opt.bg, border: `1px solid ${opt.border}`, borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: opt.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{opt.title}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2942', margin: '4px 0 6px' }}>{opt.sub}</div>
                  {opt.bigVal && <div style={{ fontSize: 20, fontWeight: 900, fontFamily: 'monospace', color: opt.color, marginBottom: 4 }}>{opt.bigVal}</div>}
                  <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{opt.detail}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 14px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, fontSize: 12, color: '#be123c' }}>
              <strong>Penalty under Section 26(3), EC Act 2001:</strong> Up to ₹10,00,000 per non-compliance instance + up to 2× price per MTOE of excess consumption. Failure to submit reports: additional penalties under Section 26(4).
            </div>
          </div>
        )}

        {/* Compliant message */}
        {r.isCompliant && (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 14, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
              <span style={{ fontWeight: 700, color: '#15803d', fontSize: 14 }}>All RCO requirements met for FY {form.financialYear}</span>
            </div>
            <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.6 }}>
              Your surplus is <strong>{fmtMWh(r.curRE - r.ovReq)}</strong> above the {r.tgt.overall}% mandatory target.{' '}
              Submit your compliance report to BEE before <strong>31 May 2026</strong> (FY 2024-25) or 31 December (subsequent years).
            </p>
          </div>
        )}

        {/* Legal footer */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, fontSize: 11, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 }}>
          <strong style={{ color: '#64748b' }}>Regulatory Reference:</strong> Ministry of Power Gazette Notification dated 27 September 2025 (superseding notification dated 20 October 2023) under Energy Conservation (Amendment) Act, 2022 — Section 14(x). CERC Order on "Determination of Buyout Price as alternate compliance mechanism for RCO". Excluded sources: nuclear power, waste heat recovery (except CCGT), 50% of fossil-based cogeneration. Results are indicative — consult a BEE-certified Energy Manager for official compliance filings at rco.beeindia.gov.in.
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => { setStep(1); setResult(null); setForm(p => ({ ...p, totalMWh: '', windMWh: '', hydroMWh: '', dreMWh: '', otherREMWh: '' })); }}
            style={{ flex: 1, padding: '12px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            New Calculation
          </button>
          <button onClick={() => window.print()}
            style={{ flex: 1, padding: '12px', background: '#fff', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Download size={14} /> Print / Save
          </button>
          <button onClick={() => onViewChange('platform')}
            style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#092f6f,#1db5f2)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            Platform <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
// ───────────────────────────────────────────────────────────────────────

// ─── PLATFORM HOME ─────────────────────────────────────────────────
const PlatformHome = ({ onViewChange }) => {
  useReveal();
  const REGS = ['EU CBAM — Jan 2026', 'India CCTS — FY2026', 'RCO — May 2026', 'CAFE 3 — 2027', 'ECSBC 2024 — Active'];
  return (
    <div>
      {/* HERO */}
      <section className="platform-hero">
        <div className="platform-hero-bg" />
        <div className="platform-hero-content">
          <div className="platform-badge">
            <Star size={12} fill="currentColor" /> India's First Complete Carbon & Energy Compliance Platform
          </div>
          <h1 className="platform-headline">
            Every compliance<br />requirement.<br />One platform.
          </h1>
          <p className="platform-sub">
            CBAM. CCTS. RCO. CAFE. ECSBC.<br />
            India and EU regulations are active. We handle all of them.
          </p>
          <div className="platform-cta-group">
            <button className="btn-primary" style={{ animation: 'pulse-glow 2.5s ease 1.8s infinite' }} onClick={() => onViewChange('solutions')}>
              Find My Solution <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => onViewChange('products')}>
              View All Products
            </button>
          </div>
          <div className="hero-trust" style={{ justifyContent: 'center' }}>
            {['EU CBAM Compliant', 'BEE MRV Ready', 'Indian Carbon Market', 'Audit Trail'].map(t => (
              <div key={t} className="trust-item"><CheckCircle2 size={14} style={{ color: 'rgba(255,255,255,0.9)' }} /><span>{t}</span></div>
            ))}
          </div>
        </div>
        <div className="reg-ticker">
          <div className="reg-ticker-track">
            {[...REGS, ...REGS].map((r, i) => (
              <span key={i} className="reg-ticker-item"><Clock size={11} /> {r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter target={11} suffix="" label="Compliance Products" />
          <StatCounter target={740} suffix="+" label="CCTS Obligated Factories" />
          <StatCounter target={1333} suffix="" label="PAT Covered Industries" />
          <StatCounter target={2026} suffix="" label="Year Everything Converges" />
        </div>
      </div>

      {/* SECTOR SELECTOR */}
      <SectorGrid onViewChange={onViewChange} />

      {/* PRODUCTS PREVIEW */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal flex flex-wrap justify-between items-end gap-4 mb-12">
            <div>
              <span className="section-chip"><FileCheck size={11} /> Product Suite</span>
              <h2 className="section-title">11 tools. One login.</h2>
              <p className="section-sub">From EU CBAM to India's carbon market — every regulation covered.</p>
            </div>
            <button className="btn-outline" onClick={() => onViewChange('products')}>View All Products →</button>
          </div>
          <div className="products-preview-grid">
            {ALL_PRODUCTS.slice(0, 6).map(p => <ProductCard key={p.id} product={p} onViewChange={onViewChange} />)}
          </div>
        </div>
      </section>

      <div id="faq-section"><FAQSection /></div>
    </div>
  );
};

// ─── NAVBAR ────────────────────────────────────────────────────────
const Navbar = ({ onViewChange, scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = (view) => { onViewChange(view); setMobileOpen(false); };
  return (
    <nav className={`navbar ${scrolled ? 'solid' : 'transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">
        <button onClick={() => close('platform')} className="flex items-center gap-3" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ background: 'linear-gradient(135deg,#092f6f,#1db5f2)', padding: '8px', borderRadius: '10px', display: 'flex' }}>
            <Leaf style={{ width: 20, height: 20, color: '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: scrolled ? '#1db5f2' : 'rgba(255,255,255,0.8)', lineHeight: 1 }}>BLARAA SYSTEMS</span>
            <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em', color: scrolled ? 'var(--slate-dark)' : '#fff', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>ComplianceOS</span>
          </div>
        </button>
        <div className="nav-desktop">
          {[['solutions', 'Solutions'], ['products', 'Products'], ['feedback', 'Contact']].map(([view, label]) => (
            <button key={view} className="nav-link" onClick={() => close(view)} style={{ color: scrolled ? 'var(--slate-dark)' : 'rgba(255,255,255,0.92)' }}>{label}</button>
          ))}
          <button className="nav-cta" onClick={() => close('app')}>Launch CBAM →</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: scrolled ? '#1e293b' : '#fff' }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          {[['solutions', 'Solutions'], ['products', 'All Products'], ['app', 'Launch CBAM Tool'], ['feedback', 'Contact']].map(([view, label]) => (
            <button key={view} className="mobile-menu-item" onClick={() => close(view)}>{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── FOOTER ────────────────────────────────────────────────────────
const Footer = ({ onViewChange }) => (
  <footer className="site-footer" style={{ padding: '56px 0 32px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ background: 'linear-gradient(135deg,#1db5f2,#092f6f)', padding: '7px', borderRadius: '9px', display: 'flex' }}>
              <Leaf style={{ width: 18, height: 18, color: '#fff' }} />
            </div>
            <span className="footer-brand">BLARAA Systems</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', maxWidth: 280, lineHeight: 1.65 }}>
            India's complete energy and carbon compliance platform. CBAM, CCTS, RCO, CAFE, ECSBC — all in one place.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Solutions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SECTORS.slice(0, 5).map(s => <button key={s.id} className="footer-link" onClick={() => onViewChange(`solution-${s.id}`)}>{s.label}</button>)}
            </div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Products</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ALL_PRODUCTS.filter(p => p.status === 'live' || p.status === 'waitlist').map(p => (
                <button key={p.id} className="footer-link" onClick={() => onViewChange(`product-${p.id}`)}>{p.name}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px' }}>9816979777</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px' }}>9805900001</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px' }}>blaraasystems@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>© {new Date().getFullYear()} BLARAA Systems. India's Carbon & Energy Compliance Platform.</p>
        <button onClick={() => onViewChange('admin')} title="Authorized Personnel Only"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(255,255,255,0.15)', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}>
          <Lock style={{ width: 14, height: 14 }} />
        </button>
      </div>
    </div>
  </footer>
);

// ─── APP ────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState('platform');
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({ company_name: '', company_id: '', city: '', production_tonnes: '', coal_tonnes: '', electricity_kwh: '' });

  useEffect(() => { window.scrollTo(0, 0); }, [view]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setStatus(null);
    try {
      const response = await axios.post('https://cbam-full-app.onrender.com/generate-xml', formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a'); link.href = url;
      link.setAttribute('download', `${formData.company_name}_CBAM_Report.xml`);
      document.body.appendChild(link); link.click(); link.remove();
      setStatus('success');
    } catch { setStatus('error'); } finally { setLoading(false); }
  };

  const handleSubmitPdf = async () => {
    if (!formData.company_name || !formData.company_id || !formData.city || !formData.production_tonnes || !formData.coal_tonnes || !formData.electricity_kwh) { alert('Please fill all fields before generating PDF'); return; }
    setLoadingPdf(true); setStatus(null);
    try {
      const response = await axios.post('https://cbam-full-app.onrender.com/generate-pdf', formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a'); link.href = url;
      link.setAttribute('download', `${formData.company_name}_CBAM_Report.pdf`);
      document.body.appendChild(link); link.click(); link.remove();
      setStatus('success');
    } catch { setStatus('error'); } finally { setLoadingPdf(false); }
  };

  const heroViews = ['platform', 'solutions'];
  const isHero = heroViews.includes(view);

  let CurrentComponent = null;
  if (view === 'platform') CurrentComponent = <PlatformHome onViewChange={setView} />;
  else if (view === 'solutions') CurrentComponent = <AllSolutionsPage onViewChange={setView} />;
  else if (view === 'products') CurrentComponent = <AllProductsPage onViewChange={setView} />;
  else if (view.startsWith('solution-')) CurrentComponent = <SolutionPage sectorId={view.replace('solution-', '')} onViewChange={setView} />;
  else if (view.startsWith('product-')) CurrentComponent = <ProductPage productId={view.replace('product-', '')} onViewChange={setView} />;
  else if (view === 'ccts') CurrentComponent = <ComplianceCoreDashboard onViewChange={setView} />;
  else if (view === 'rco') CurrentComponent = <RenewTrackDashboard onViewChange={setView} />;
  else if (view === 'app') CurrentComponent = <Dashboard formData={formData} setFormData={setFormData} loading={loading} loadingPdf={loadingPdf} status={status} onSubmit={handleSubmit} onSubmitPdf={handleSubmitPdf} onChange={handleChange} />;
  else if (view === 'admin') CurrentComponent = <AdminPanel />;
  else if (view === 'feedback') CurrentComponent = <FeedbackForm />;

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column' }}>
      <Navbar onViewChange={setView} scrolled={scrolled || !isHero} />
      <main style={{ flexGrow: 1, paddingTop: isHero ? 0 : 72 }}>
        {CurrentComponent}
      </main>
      <Footer onViewChange={setView} />
    </div>
  );
}

export default App;
