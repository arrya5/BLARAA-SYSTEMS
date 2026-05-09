import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { 
  Factory, Zap, Flame, FileCheck, Download, 
  ShieldCheck, ArrowRight, BarChart3, 
  Globe, Lock, RefreshCw, MessageSquare, Star, Send, FileText,
  ChevronDown, Leaf, Building2, Calculator, HelpCircle, CheckCircle2
} from 'lucide-react';

// --- COMPONENTS ---

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-emerald-100 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm">
    <button 
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-emerald-50/50 transition"
    >
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
    {
      question: "What is CBAM (Carbon Border Adjustment Mechanism)?",
      answer: "CBAM is the EU's landmark policy to put a carbon price on imports. Starting 2026, Indian exporters of steel, cement, aluminum, fertilizers, and electricity must report their embedded carbon emissions. This ensures EU importers pay the same carbon costs as EU producers, preventing 'carbon leakage' where production moves to countries with weaker climate policies."
    },
    {
      question: "Who needs to comply with CBAM?",
      answer: "Any company exporting CBAM-covered goods (iron, steel, cement, aluminum, fertilizers, electricity, hydrogen) to the EU needs to comply. During the transition phase (2023-2025), only reporting is required. From 2026, EU importers must purchase CBAM certificates corresponding to the carbon price."
    },
    {
      question: "How does this tool calculate emissions?",
      answer: "We use the official EU methodology for calculating embedded emissions. Direct emissions are calculated from fuel consumption (coal, gas, etc.) using standard emission factors. Indirect emissions come from electricity usage multiplied by grid emission factors. The specific embedded emissions are then calculated per tonne of production."
    },
    {
      question: "Is the generated XML file EU-compliant?",
      answer: "Yes! Our XML output follows the official EU CBAM schema (XSD). It includes all required fields: declarant information, commodity codes (HS/CN), production data, direct and indirect emissions, and calculation methodology. The file is ready for upload to the EU Transitional Registry."
    },
    {
      question: "What data do I need to generate a report?",
      answer: "You'll need: 1) Company details (name, ID, location), 2) Production quantity in tonnes, 3) Fuel consumption (coal/gas in tonnes), 4) Electricity consumption in kWh. We handle all the complex calculations automatically."
    },
    {
      question: "How much does this service cost?",
      answer: "We're currently in early access mode. Contact us directly to discuss pricing that works for your business size and reporting frequency. We offer flexible plans for SMEs and large enterprises."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Everything you need to know</h2>
          <p className="text-slate-600 mt-2">Get answers about CBAM compliance and our platform</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress Steps Component
const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Company Info', icon: Building2 },
    { num: 2, label: 'Production Data', icon: Factory },
    { num: 3, label: 'Generate Report', icon: FileCheck }
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep >= step.num;
        const isComplete = currentStep > step.num;
        
        return (
          <React.Fragment key={step.num}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              isActive 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-slate-100 text-slate-400'
            }`}>
              {isComplete ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
              <span className="text-sm font-semibold hidden sm:inline">{step.label}</span>
              <span className="text-sm font-semibold sm:hidden">{step.num}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${isActive ? 'bg-emerald-300' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Live Calculation Preview
const LivePreview = ({ formData }) => {
  const [preview, setPreview] = useState({ direct: 0, indirect: 0, total: 0 });
  
  useEffect(() => {
    const production = parseFloat(formData.production_tonnes) || 0;
    const coal = parseFloat(formData.coal_tonnes) || 0;
    const electricity = parseFloat(formData.electricity_kwh) || 0;
    
    if (production > 0) {
      // Simplified calculation preview (actual uses backend)
      const coalFactor = 2.42; // tCO2 per tonne coal (approximate)
      const elecFactor = 0.82 / 1000; // tCO2 per kWh (India grid)
      
      const directEmissions = (coal * coalFactor) / production;
      const indirectEmissions = (electricity * elecFactor) / production;
      
      setPreview({
        direct: directEmissions.toFixed(4),
        indirect: indirectEmissions.toFixed(6),
        total: (directEmissions + indirectEmissions).toFixed(4)
      });
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
        <div className="bg-white/60 rounded-lg p-2">
          <p className="text-xs text-slate-500">Direct</p>
          <p className="font-mono font-bold text-emerald-700">{preview.direct}</p>
        </div>
        <div className="bg-white/60 rounded-lg p-2">
          <p className="text-xs text-slate-500">Indirect</p>
          <p className="font-mono font-bold text-emerald-700">{preview.indirect}</p>
        </div>
        <div className="bg-white/60 rounded-lg p-2 border-2 border-emerald-300">
          <p className="text-xs text-slate-500">Total</p>
          <p className="font-mono font-bold text-emerald-800">{preview.total}</p>
        </div>
      </div>
      <p className="text-xs text-emerald-600 mt-2 text-center italic">*Estimates only. Final values calculated by backend.</p>
    </div>
  );
};

// 1. The Navbar — scroll-aware, transparent over hero, frosted when scrolled
const Navbar = ({ onViewChange, scrolled }) => (
  <nav className={`navbar ${scrolled ? 'solid' : 'transparent'}`}>
    <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">
      <button onClick={() => onViewChange('landing')} className="flex items-center gap-3" style={{background:'none',border:'none',cursor:'pointer',padding:0}}>
        <div style={{background:'linear-gradient(135deg,#092f6f,#1db5f2)',padding:'8px',borderRadius:'10px',display:'flex'}}>
          <Leaf style={{width:20,height:20,color:'#fff'}} />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <span style={{fontSize:'9px',fontWeight:800,letterSpacing:'0.18em',textTransform:'uppercase',color: scrolled ? '#1db5f2' : 'rgba(255,255,255,0.8)',lineHeight:1,fontFamily:'var(--font-body)'}}>BLARAA SYSTEMS</span>
          <span style={{fontSize:'17px',fontWeight:800,letterSpacing:'-0.02em',color: scrolled ? 'var(--slate-dark)' : '#fff',lineHeight:1.1,fontFamily:'var(--font-heading)'}}>CarbonFile</span>
        </div>
      </button>
      <div style={{display:'flex',alignItems:'center',gap:'32px'}}>
        {['Products','FAQ','Feedback'].map(label => (
          <button key={label} className="nav-link" onClick={() => onViewChange(label === 'Products' ? 'landing' : label === 'Feedback' ? 'feedback' : 'landing')}
            style={{color: scrolled ? 'var(--slate-dark)' : 'rgba(255,255,255,0.92)'}}>
            {label}
          </button>
        ))}
        <button className="nav-cta" onClick={() => onViewChange('app')}>Launch CBAM →</button>
      </div>
    </div>
  </nav>
);

// 2. The Admin Panel (STEALTH VERSION)
const AdminPanel = () => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(false); // Simple boolean for red shake effect
  const [adminLoading, setAdminLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setError(false);

    try {
      const API_URL = 'https://cbam-full-app.onrender.com/admin/view-vault';
      const response = await axios.get(API_URL, {
        headers: { 'x-admin-key': apiKey }
      });
      setLogs(response.data.recent_logs);
      setIsAuthenticated(true);
    } catch (err) {
      setError(true); // Trigger error state
      setApiKey('');  // Clear input on fail
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col justify-center">
      {!isAuthenticated ? (
        // STEALTH LOGIN (Just a Box)
        <div className="flex justify-center w-full">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setError(false); }}
              placeholder="" 
              autoFocus
              className={`w-full bg-transparent border-b-2 text-center text-3xl font-mono tracking-widest py-4 focus:outline-none transition-colors
                ${error 
                  ? 'border-red-500 text-red-600 placeholder-red-300' 
                  : 'border-slate-300 text-slate-800 focus:border-slate-900'
                }`}
            />
          </form>
        </div>
      ) : (
        // LOGS TABLE SCREEN (Remains the same)
        <div className="animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Audit Vault</h2>
            <button onClick={() => window.location.reload()} className="text-sm font-bold text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50">
              <RefreshCw className="h-4 w-4 inline mr-2" /> Refresh
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4 text-right">Coal (T)</th>
                    <th className="px-6 py-4 text-right">Direct CO2</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Vault empty.</td></tr>
                  ) : (
                    logs.map((log, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-mono text-xs">{log.id}</td>
                        <td className="px-6 py-4">{log.timestamp}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{log.company_name}</td>
                        <td className="px-6 py-4 text-right font-mono">{log.input_coal_tonnes}</td>
                        <td className="px-6 py-4 text-right font-mono text-blue-600 font-bold">{log.output_direct_specific}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ─── STAT COUNTER (counts up when visible) ───────────────────
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

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

// 3. The Landing Page — Premium Animated Hero
const LandingPage = ({ onLaunch }) => {
  useReveal();
  return (
    <div>
      {/* ── HERO SCENE ── */}
      <section className="hero-scene">
        {/* Animated sky */}
        <div className="hero-sky" />

        {/* Cloud 1 */}
        <svg className="cloud cloud-1" width="200" height="60" viewBox="0 0 200 60" fill="none">
          <ellipse cx="100" cy="40" rx="90" ry="28" fill="rgba(255,255,255,0.55)" />
          <ellipse cx="70" cy="32" rx="50" ry="26" fill="rgba(255,255,255,0.55)" />
          <ellipse cx="130" cy="30" rx="45" ry="24" fill="rgba(255,255,255,0.55)" />
        </svg>
        {/* Cloud 2 */}
        <svg className="cloud cloud-2" width="140" height="44" viewBox="0 0 140 44" fill="none">
          <ellipse cx="70" cy="30" rx="62" ry="20" fill="rgba(255,255,255,0.4)" />
          <ellipse cx="48" cy="22" rx="36" ry="18" fill="rgba(255,255,255,0.4)" />
          <ellipse cx="96" cy="20" rx="32" ry="17" fill="rgba(255,255,255,0.4)" />
        </svg>
        {/* Cloud 3 */}
        <svg className="cloud cloud-3" width="120" height="36" viewBox="0 0 120 36" fill="none">
          <ellipse cx="60" cy="24" rx="54" ry="16" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="40" cy="18" rx="30" ry="14" fill="rgba(255,255,255,0.35)" />
        </svg>

        {/* SVG Illustration — Poweris-style landscape */}
        <svg className="hero-illustration" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">

          {/* ── SKY TEXTURE STROKES ── */}
          <rect x="0" y="0" width="1440" height="700" fill="none" />
          {[0,1,2,3,4].map(i=>(
            <line key={i} x1="200" y1={40+i*18} x2="900" y2={55+i*18} stroke="rgba(255,255,255,0.07)" strokeWidth="28" strokeLinecap="round"/>
          ))}

          {/* ── CITY SKYLINE (background, muted teal) ── */}
          <g opacity="0.55">
            <rect x="590"  y="180" width="45"  height="280" fill="#3a7f9e" rx="2"/>
            <rect x="645"  y="130" width="55"  height="330" fill="#4590af" rx="2"/>
            <rect x="710"  y="160" width="40"  height="300" fill="#3a7f9e" rx="2"/>
            <rect x="760"  y="100" width="65"  height="360" fill="#4d9fbf" rx="2"/>
            <rect x="835"  y="150" width="50"  height="310" fill="#3a7f9e" rx="2"/>
            <rect x="895"  y="190" width="38"  height="270" fill="#3d8aa8" rx="2"/>
            <rect x="943"  y="140" width="55"  height="320" fill="#4a98b8" rx="2"/>
            <rect x="1008" y="210" width="42"  height="250" fill="#3a7f9e" rx="2"/>
            {/* Window dots */}
            {[600,615,650,665,680,765,780,795,810,845,860,950,965,980].map((x,i)=>(
              <rect key={i} x={x} y={180+(i%5)*42} width="8" height="12" rx="2" fill="rgba(200,240,255,0.3)"/>
            ))}
            {/* Tower / antenna on tallest */}
            <rect x="787" y="60" width="6" height="40" fill="#3a7f9e"/>
            <line x1="790" y1="60" x2="810" y2="90" stroke="#3a7f9e" strokeWidth="2"/>
            <line x1="790" y1="60" x2="770" y2="90" stroke="#3a7f9e" strokeWidth="2"/>
          </g>

          {/* ── BACK MOUNTAINS (dark, dramatic) ── */}
          <path d="M0,700 L0,420 Q80,340 200,370 Q320,400 400,300 Q480,200 560,280 Q640,360 720,320 Q800,280 900,350 Q960,390 1040,310 Q1120,230 1200,320 Q1300,410 1440,380 L1440,700 Z" fill="#253c35"/>
          <path d="M0,700 L0,480 Q100,420 220,440 Q340,460 440,380 Q520,315 620,390 Q700,450 800,420 Q900,390 1000,450 Q1100,510 1200,460 Q1320,410 1440,450 L1440,700 Z" fill="#1e3028"/>

          {/* ── MID GREEN HILLS ── */}
          <path d="M0,700 L0,560 Q150,490 320,520 Q500,550 680,500 Q820,460 960,510 Q1100,560 1280,530 Q1380,515 1440,525 L1440,700 Z" fill="#3d6e4a"/>
          <path d="M0,700 L0,590 Q200,540 420,570 Q600,595 780,555 Q950,515 1140,560 Q1300,595 1440,570 L1440,700 Z" fill="#4a7c52"/>

          {/* ── GOLDEN FIELD ── */}
          <path d="M0,700 L0,620 Q180,580 400,600 Q620,620 840,590 Q1040,562 1240,595 Q1360,612 1440,600 L1440,700 Z" fill="#7ba83c"/>
          <path d="M0,700 L0,645 Q240,618 480,635 Q700,650 920,625 Q1120,602 1340,630 Q1400,638 1440,632 L1440,700 Z" fill="#8ec444"/>

          {/* ── POWER LINES ── */}
          {/* Pole 1 */}
          <line x1="680" y1="540" x2="680" y2="610" stroke="#2a3a30" strokeWidth="3"/>
          <line x1="666" y1="548" x2="694" y2="548" stroke="#2a3a30" strokeWidth="2"/>
          {/* Pole 2 */}
          <line x1="820" y1="530" x2="820" y2="605" stroke="#2a3a30" strokeWidth="3"/>
          <line x1="806" y1="538" x2="834" y2="538" stroke="#2a3a30" strokeWidth="2"/>
          {/* Pole 3 */}
          <line x1="960" y1="535" x2="960" y2="608" stroke="#2a3a30" strokeWidth="3"/>
          <line x1="946" y1="543" x2="974" y2="543" stroke="#2a3a30" strokeWidth="2"/>
          {/* Wires */}
          <path d="M667,548 Q750,560 807,538" fill="none" stroke="#2a3a30" strokeWidth="1.5" opacity="0.7"/>
          <path d="M807,538 Q890,552 947,543" fill="none" stroke="#2a3a30" strokeWidth="1.5" opacity="0.7"/>
          <path d="M669,552 Q750,565 809,542" fill="none" stroke="#2a3a30" strokeWidth="1.2" opacity="0.5"/>
          <path d="M809,542 Q890,557 949,548" fill="none" stroke="#2a3a30" strokeWidth="1.2" opacity="0.5"/>

          {/* ── HOUSES WITH SOLAR PANELS ── */}
          {/* House 1 */}
          <g transform="translate(700,530)">
            <rect x="0" y="0" width="80" height="60" fill="#ede8de"/>
            <polygon points="-4,0 40,-32 84,0" fill="#ccc0a8"/>
            <rect x="28" y="20" width="22" height="40" fill="#9b8b6e"/>
            <rect x="4" y="-24" width="18" height="12" fill="#2d5a8a" opacity="0.85"/>
            <rect x="25" y="-26" width="18" height="12" fill="#2d5a8a" opacity="0.85"/>
            <rect x="46" y="-24" width="18" height="12" fill="#2d5a8a" opacity="0.85"/>
            <line x1="4" y1="-18" x2="22" y2="-18" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <line x1="25" y1="-20" x2="43" y2="-20" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <rect x="6" y="10" width="14" height="18" rx="1" fill="rgba(160,200,220,0.6)"/>
            <rect x="58" y="10" width="14" height="18" rx="1" fill="rgba(160,200,220,0.6)"/>
          </g>
          {/* House 2 — main large */}
          <g transform="translate(790,518)">
            <rect x="0" y="0" width="110" height="72" fill="#f0ece0"/>
            <polygon points="-5,0 55,-38 115,0" fill="#d4c6a8"/>
            <rect x="40" y="28" width="28" height="44" fill="#9b8b6e"/>
            <rect x="4" y="-28" width="22" height="14" fill="#2d5a8a" opacity="0.85"/>
            <rect x="30" y="-30" width="22" height="14" fill="#2d5a8a" opacity="0.85"/>
            <rect x="56" y="-28" width="22" height="14" fill="#2d5a8a" opacity="0.85"/>
            <rect x="82" y="-28" width="22" height="14" fill="#2d5a8a" opacity="0.85"/>
            <line x1="4" y1="-21" x2="26" y2="-21" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <line x1="30" y1="-23" x2="52" y2="-23" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <rect x="6" y="12" width="18" height="24" rx="1" fill="rgba(160,200,220,0.6)"/>
            <rect x="84" y="12" width="18" height="24" rx="1" fill="rgba(160,200,220,0.6)"/>
          </g>
          {/* House 3 — right */}
          <g transform="translate(910,525)">
            <rect x="0" y="0" width="85" height="65" fill="#ede8de"/>
            <polygon points="-4,0 42,-30 89,0" fill="#ccc0a8"/>
            <rect x="30" y="22" width="24" height="43" fill="#9b8b6e"/>
            <rect x="4" y="-22" width="20" height="12" fill="#2d5a8a" opacity="0.85"/>
            <rect x="28" y="-24" width="20" height="12" fill="#2d5a8a" opacity="0.85"/>
            <rect x="52" y="-22" width="20" height="12" fill="#2d5a8a" opacity="0.85"/>
          </g>

          {/* ── WIND TURBINES (animateTransform — rotation center explicit) ── */}

          {/* Turbine A — tallest, leftmost */}
          <g transform="translate(760,250)">
            <polygon points="-5,0 5,0 3,320 -3,320" fill="#f0ede8"/>
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="9s" repeatCount="indefinite"/>
              <path d="M-4,6 C-5,-25 -2,-95 0,-118 C2,-95 5,-25 4,6 Z" fill="white" opacity="0.96"/>
              <path d="M-4,6 C-5,-25 -2,-95 0,-118 C2,-95 5,-25 4,6 Z" fill="white" opacity="0.96" transform="rotate(120 0 0)"/>
              <path d="M-4,6 C-5,-25 -2,-95 0,-118 C2,-95 5,-25 4,6 Z" fill="white" opacity="0.96" transform="rotate(240 0 0)"/>
            </g>
            <circle cx="0" cy="0" r="9" fill="#d8d4ce"/>
          </g>

          {/* Turbine B */}
          <g transform="translate(890,270)">
            <polygon points="-4,0 4,0 2.5,285 -2.5,285" fill="#f0ede8"/>
            <g>
              <animateTransform attributeName="transform" type="rotate" from="60 0 0" to="420 0 0" dur="11s" repeatCount="indefinite"/>
              <path d="M-3.5,5 C-4,-20 -2,-82 0,-102 C2,-82 4,-20 3.5,5 Z" fill="white" opacity="0.94"/>
              <path d="M-3.5,5 C-4,-20 -2,-82 0,-102 C2,-82 4,-20 3.5,5 Z" fill="white" opacity="0.94" transform="rotate(120 0 0)"/>
              <path d="M-3.5,5 C-4,-20 -2,-82 0,-102 C2,-82 4,-20 3.5,5 Z" fill="white" opacity="0.94" transform="rotate(240 0 0)"/>
            </g>
            <circle cx="0" cy="0" r="8" fill="#d8d4ce"/>
          </g>

          {/* Turbine C */}
          <g transform="translate(1010,280)">
            <polygon points="-4,0 4,0 2.5,265 -2.5,265" fill="#f0ede8"/>
            <g>
              <animateTransform attributeName="transform" type="rotate" from="120 0 0" to="480 0 0" dur="8s" repeatCount="indefinite"/>
              <path d="M-3,5 C-4,-18 -2,-72 0,-90 C2,-72 4,-18 3,5 Z" fill="white" opacity="0.92"/>
              <path d="M-3,5 C-4,-18 -2,-72 0,-90 C2,-72 4,-18 3,5 Z" fill="white" opacity="0.92" transform="rotate(120 0 0)"/>
              <path d="M-3,5 C-4,-18 -2,-72 0,-90 C2,-72 4,-18 3,5 Z" fill="white" opacity="0.92" transform="rotate(240 0 0)"/>
            </g>
            <circle cx="0" cy="0" r="7" fill="#d8d4ce"/>
          </g>

          {/* Turbine D — rightmost, smaller (depth) */}
          <g transform="translate(1130,295)">
            <polygon points="-3.5,0 3.5,0 2,245 -2,245" fill="#f0ede8"/>
            <g>
              <animateTransform attributeName="transform" type="rotate" from="200 0 0" to="560 0 0" dur="10s" repeatCount="indefinite"/>
              <path d="M-3,4 C-3.5,-15 -1.5,-62 0,-78 C1.5,-62 3.5,-15 3,4 Z" fill="white" opacity="0.9"/>
              <path d="M-3,4 C-3.5,-15 -1.5,-62 0,-78 C1.5,-62 3.5,-15 3,4 Z" fill="white" opacity="0.9" transform="rotate(120 0 0)"/>
              <path d="M-3,4 C-3.5,-15 -1.5,-62 0,-78 C1.5,-62 3.5,-15 3,4 Z" fill="white" opacity="0.9" transform="rotate(240 0 0)"/>
            </g>
            <circle cx="0" cy="0" r="6" fill="#d8d4ce"/>
          </g>

          {/* ── FOREGROUND DARK VEGETATION ── */}
          {/* Dark bush clusters */}
          <ellipse cx="80"   cy="680" rx="90"  ry="50" fill="#0e2218"/>
          <ellipse cx="180"  cy="695" rx="70"  ry="40" fill="#122a1e"/>
          <ellipse cx="1300" cy="682" rx="85"  ry="48" fill="#0e2218"/>
          <ellipse cx="1400" cy="690" rx="65"  ry="38" fill="#122a1e"/>
          <ellipse cx="1200" cy="695" rx="55"  ry="35" fill="#0f2318"/>
          {/* Leaf shapes foreground left */}
          <path d="M0,700 Q30,640 60,680 Q90,700 100,700 Z" fill="#0a1a10"/>
          <path d="M50,700 Q90,630 130,665 Q160,690 170,700 Z" fill="#0c2015"/>
          <path d="M1280,700 Q1330,635 1370,668 Q1400,692 1420,700 Z" fill="#0a1a10"/>
          <path d="M1360,700 Q1390,645 1420,670 Q1440,690 1440,700 Z" fill="#0c2015"/>

          {/* ── WILDFLOWERS ── */}
          {[
            {x:55, y:650},{x:82, y:662},{x:108,y:645},
            {x:135,y:658},{x:160,y:648}
          ].map((p,i)=>(
            <g key={i}>
              <line x1={p.x} y1={p.y} x2={p.x} y2={p.y-20} stroke="#3a6e40" strokeWidth="2"/>
              <circle cx={p.x} cy={p.y-22} r="7" fill={i%2===0?"#fffbea":"#fff"} opacity="0.95"/>
              <circle cx={p.x} cy={p.y-22} r="3" fill="#f0c040" opacity="0.9"/>
            </g>
          ))}

        </svg>


        {/* Hero Text Content */}
        <div className="hero-content">
          <span className="hero-badge">
            <Leaf size={12} /> EU CBAM Compliance
          </span>
          <h1 className="hero-headline">
            Start carbon<br/>compliance from<br/>your factory
          </h1>
          <p className="hero-sub">
            EU-ready CBAM reports in minutes. Accurate embedded emissions calculations, official XML schema, complete audit trail for Indian exporters.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={onLaunch}>
              Generate Report <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>
              Learn More
            </button>
          </div>
          <div className="hero-trust">
            {['EU Schema Compliant','Instant XML','Audit Trail'].map(t => (
              <div key={t} className="trust-item">
                <CheckCircle2 size={14} style={{color:'rgba(255,255,255,0.9)'}} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" onClick={() => document.getElementById('stats')?.scrollIntoView({behavior:'smooth'})}>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div id="stats" className="stats-strip">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8">
          <StatCounter target={2026} suffix="" label="CBAM Full Enforcement" />
          <StatCounter target={6} suffix="" label="Covered Product Sectors" />
          <StatCounter target={100} suffix="%" label="Official EU XML Format" />
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal mb-14">
            <span className="section-chip"><Leaf size={11} /> Our Suite</span>
            <h2 className="section-title">Compliance tools<br/>built for India</h2>
            <p className="section-sub">Everything an Indian exporter needs to meet EU CBAM obligations — from calculation to submission-ready files.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="product-card reveal reveal-delay-1" onClick={onLaunch}>
              <div style={{position:'absolute',top:24,right:24}}><span className="card-badge badge-live">LIVE</span></div>
              <div className="card-icon-wrap"><FileCheck size={26} style={{color:'var(--navy)'}} /></div>
              <h3 className="card-title">CarbonFile CBAM</h3>
              <p style={{color:'#5a7184',fontSize:'0.92rem',margin:'10px 0 18px',lineHeight:1.65}}>Automated EU Carbon Border Adjustment Mechanism reporting. Includes XML generation and secure audit vault.</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10,marginBottom:22}}>
                {['Direct & Indirect emissions calculation','Official EU XML schema (XSD)','PDF report for stakeholders'].map(f=>(
                  <li key={f} style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.88rem',color:'#4a6070'}}>
                    <CheckCircle2 size={15} style={{color:'#16a34a',flexShrink:0}} />{f}
                  </li>
                ))}
              </ul>
              <span style={{color:'var(--navy)',fontWeight:700,fontSize:'0.9rem',display:'flex',alignItems:'center',gap:6}}>Launch Application <ArrowRight size={15} /></span>
            </div>
            <div className="product-card disabled">
              <div style={{position:'absolute',top:24,right:24}}><span className="card-badge badge-soon">COMING SOON</span></div>
              <div className="card-icon-wrap" style={{background:'linear-gradient(135deg,#f1f5f9,#e2e8f0)'}}><BarChart3 size={26} style={{color:'#94a3b8'}} /></div>
              <h3 className="card-title" style={{color:'#94a3b8'}}>Supply Chain Analytics</h3>
              <p style={{color:'#94a3b8',fontSize:'0.92rem',margin:'10px 0 18px',lineHeight:1.65}}>Next-generation tracking for raw material sourcing and scope 3 emissions. Coming Q4 2026.</p>
              <span style={{color:'#94a3b8',fontWeight:700,fontSize:'0.9rem',display:'flex',alignItems:'center',gap:6}}>In Development <Lock size={14} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{background:'linear-gradient(to bottom,#f8fbff,#fff)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <span className="section-chip"><Zap size={11} /> How It Works</span>
            <h2 className="section-title" style={{textAlign:'center'}}>Three steps to compliance</h2>
          </div>
          <div className="steps-container">
            {[
              {n:'01',icon:<Building2 size={22} style={{color:'var(--navy)'}}/>,title:'Enter Company Info',desc:'Provide your company name, Import Export code, GSTIN and factory location to identify your entity.'},
              {n:'02',icon:<Factory size={22} style={{color:'var(--navy)'}}/>,title:'Add Production Data',desc:'Enter monthly production output, coal consumption in tonnes, and electricity usage in kWh.'},
              {n:'03',icon:<FileCheck size={22} style={{color:'var(--navy)'}}/>,title:'Download Reports',desc:'Instantly receive an EU-compliant XML file and a human-readable PDF ready for stakeholders.'},
            ].map((s,i)=>(
              <div key={i} className={`step-card reveal reveal-delay-${i+1}`}>
                <div className="step-number">{s.n}</div>
                <div style={{marginBottom:10}}>{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq-section"><FAQSection /></div>
    </div>
  );
};



// 3b. Feedback Form Component
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = 'https://cbam-full-app.onrender.com/submit-feedback';
      await axios.post(API_URL, formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="animate-in fade-in duration-500 max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-12">
          <div className="bg-emerald-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">Thank You!</h2>
          <p className="text-emerald-700">Your feedback has been received. We appreciate your input.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <MessageSquare className="h-4 w-4" /> We Value Your Feedback
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Help Us Improve</h2>
        <p className="text-slate-600 mt-2">Share your experience with CarbonFile by BLARAA Systems</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-xl space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">How would you rate our service?</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className={`p-2 rounded-lg transition ${formData.rating >= star ? 'text-yellow-400' : 'text-slate-300'} hover:scale-110`}
              >
                <Star className="h-8 w-8" fill={formData.rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white/50"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Company (Optional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white/50"
            placeholder="Your company name"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Your Feedback *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none bg-white/50"
            placeholder="Tell us about your experience..."
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><RefreshCw className="h-5 w-5 animate-spin" /> Submitting...</>
          ) : (
            <><Send className="h-5 w-5" /> Submit Feedback</>
          )}
        </button>
      </form>
    </div>
  );
};

// 4. The Dashboard (UPDATED WITH PROGRESS STEPS, LIVE PREVIEW, GREEN THEME)
const Dashboard = ({ formData, setFormData, loading, loadingPdf, status, onSubmit, onSubmitPdf, onChange }) => {
  // Calculate current step based on form completion
  const getStep = () => {
    if (!formData.company_name && !formData.company_id && !formData.city) return 1;
    if (!formData.production_tonnes && !formData.coal_tonnes && !formData.electricity_kwh) return 2;
    return 3;
  };

  return (
  <div className="animate-in slide-in-from-bottom-4 duration-500 min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Progress Steps */}
      <ProgressSteps currentStep={getStep()} />
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
      
      {/* LEFT COLUMN: The "About / Logic" Section */}
      <div className="lg:col-span-5 mb-10 lg:mb-0 space-y-6">
        
        {/* Title Block */}
        <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6">
           <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
             CarbonFile CBAM • v2.0
           </span>
           <h2 className="text-3xl font-extrabold text-slate-900 mt-4">
             EU Compliance Engine
           </h2>
           <p className="text-slate-600 mt-4 text-lg leading-relaxed">
             Generate EU-compliant CBAM reports with accurate emissions calculations and official XML format.
           </p>
        </div>

        {/* Live Calculation Preview */}
        <LivePreview formData={formData} />

        {/* How It Works Guide */}
        <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" /> How It Works
          </h3>
          
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2.5 rounded-xl h-fit shadow-sm">
              <Building2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">1. Enter Company Info</h4>
              <p className="text-xs text-slate-500 mt-1">
                Provide your company name, tax ID, and factory location.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2.5 rounded-xl h-fit shadow-sm">
              <Factory className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">2. Add Production Data</h4>
              <p className="text-xs text-slate-500 mt-1">
                Enter monthly production, coal consumption, and electricity usage.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2.5 rounded-xl h-fit shadow-sm">
              <FileCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">3. Generate Reports</h4>
              <p className="text-xs text-slate-500 mt-1">
                Download EU-compliant XML and human-readable PDF reports.
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
           <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
           <div>
             <span className="font-bold text-emerald-800 text-sm block">Audit Trail Active</span>
             <p className="text-xs text-emerald-600 mt-1">
               Every report is timestamped and logged for compliance verification.
             </p>
           </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The Form (Generator) */}
      <div className="lg:col-span-7">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 flex justify-between items-center">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Leaf className="h-4 w-4" /> Report Generator
            </h3>
            <span className="text-emerald-200 text-xs font-mono bg-emerald-700/50 px-2 py-1 rounded">SECURE</span>
          </div>
          
          <form onSubmit={onSubmit} className="p-8 space-y-8">
            {/* Organization Section */}
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                 <Building2 className="h-4 w-4" /> Step 1: Organization Details
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Building2 className="h-4 w-4" /></div>
                   <input name="company_name" required placeholder="Company Name" value={formData.company_name} onChange={onChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white/50" />
                 </div>
                 <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><FileText className="h-4 w-4" /></div>
                   <input name="company_id" required placeholder="IE Code / GSTIN" value={formData.company_id} onChange={onChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white/50" />
                 </div>
               </div>
               <div className="relative">
                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Globe className="h-4 w-4" /></div>
                 <input name="city" required placeholder="Factory City / Location" value={formData.city} onChange={onChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white/50" />
               </div>
            </div>
            
            <hr className="border-emerald-100" />

            {/* Metrics Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <Factory className="h-4 w-4" /> Step 2: Production Metrics (Monthly)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                   <label className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                     <Factory className="h-3 w-3" /> Production
                   </label>
                   <div className="relative mt-2">
                      <input name="production_tonnes" type="number" step="0.01" required value={formData.production_tonnes} onChange={onChange} className="w-full pl-3 pr-10 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-lg bg-white" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500 font-bold bg-emerald-100 px-2 py-1 rounded">T</span>
                   </div>
                 </div>
                 <div className="bg-gradient-to-br from-white to-orange-50/50 border border-orange-200 rounded-xl p-4">
                   <label className="text-[10px] font-bold text-orange-600 uppercase flex items-center gap-1">
                     <Flame className="h-3 w-3" /> Coal Used
                   </label>
                   <div className="relative mt-2">
                      <input name="coal_tonnes" type="number" step="0.01" required value={formData.coal_tonnes} onChange={onChange} className="w-full pl-3 pr-10 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none font-mono text-lg bg-white" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-orange-500 font-bold bg-orange-100 px-2 py-1 rounded">T</span>
                   </div>
                 </div>
                 <div className="bg-gradient-to-br from-white to-yellow-50/50 border border-yellow-300 rounded-xl p-4">
                   <label className="text-[10px] font-bold text-yellow-600 uppercase flex items-center gap-1">
                     <Zap className="h-3 w-3" /> Electricity
                   </label>
                   <div className="relative mt-2">
                      <input name="electricity_kwh" type="number" step="0.01" required value={formData.electricity_kwh} onChange={onChange} className="w-full pl-3 pr-14 py-3 rounded-lg border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none font-mono text-lg bg-white" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded">kWh</span>
                   </div>
                 </div>
              </div>
            </div>

            <hr className="border-emerald-100" />

            {/* Step 3: Generate */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <Download className="h-4 w-4" /> Step 3: Generate Reports
              </h3>
              
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
              <div className="animate-in fade-in slide-in-from-top-2 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm shadow-sm">
                <div className="bg-white p-2 rounded-full shadow-sm"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
                <div>
                  <span className="font-bold block">Success!</span>
                  <span className="text-emerald-600">Report generated & audit log secured.</span>
                </div>
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

// --- MAIN APP LOGIC ---

function App() {
  const [view, setView] = useState('landing');
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '', company_id: '', city: '',
    production_tonnes: '', coal_tonnes: '', electricity_kwh: ''
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const API_URL = 'https://cbam-full-app.onrender.com/generate-xml'; 
      const response = await axios.post(API_URL, formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.company_name}_CBAM_Report.xml`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus('success');
    } catch (error) {
      console.error(error); setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPdf = async () => {
    if (!formData.company_name || !formData.company_id || !formData.city || 
        !formData.production_tonnes || !formData.coal_tonnes || !formData.electricity_kwh) {
      alert('Please fill all fields before generating PDF');
      return;
    }
    setLoadingPdf(true); setStatus(null);
    try {
      const API_URL = 'https://cbam-full-app.onrender.com/generate-pdf'; 
      const response = await axios.post(API_URL, formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.company_name}_CBAM_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus('success');
    } catch (error) {
      console.error(error); setStatus('error');
    } finally {
      setLoadingPdf(false);
    }
  };

  // RENDER CONTROLLER
  let CurrentComponent;
  if (view === 'landing') CurrentComponent = <LandingPage onLaunch={() => setView('app')} />;
  else if (view === 'app') CurrentComponent = <Dashboard formData={formData} setFormData={setFormData} loading={loading} loadingPdf={loadingPdf} status={status} onSubmit={handleSubmit} onSubmitPdf={handleSubmitPdf} onChange={handleChange} />;
  else if (view === 'admin') CurrentComponent = <AdminPanel />;
  else if (view === 'feedback') CurrentComponent = <FeedbackForm />;

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:'var(--font-body)',display:'flex',flexDirection:'column'}}>
      <Navbar onViewChange={setView} scrolled={scrolled || view !== 'landing'} />
      <main style={{flexGrow:1, paddingTop: view === 'landing' ? 0 : 72}}>
        {CurrentComponent}
      </main>
      <footer className="site-footer" style={{padding:'56px 0 32px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:32,marginBottom:40}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <div style={{background:'linear-gradient(135deg,#1db5f2,#092f6f)',padding:'7px',borderRadius:'9px',display:'flex'}}>
                  <Leaf style={{width:18,height:18,color:'#fff'}} />
                </div>
                <span className="footer-brand">CarbonFile</span>
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',maxWidth:280,lineHeight:1.65}}>
                Professional EU CBAM compliance solutions for Indian exporters. Accurate, auditable, EU-schema ready.
              </p>
            </div>
            <div style={{display:'flex',gap:56,flexWrap:'wrap'}}>
              <div>
                <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Product</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <button className="footer-link" onClick={()=>setView('app')}>CBAM Report Generator</button>
                  <button className="footer-link" onClick={()=>setView('landing')}>How It Works</button>
                  <button className="footer-link" onClick={()=>setView('feedback')}>Submit Feedback</button>
                </div>
              </div>
              <div>
                <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Contact</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <span style={{color:'rgba(255,255,255,0.55)',fontSize:'13.5px'}}>9816979777</span>
                  <span style={{color:'rgba(255,255,255,0.55)',fontSize:'13.5px'}}>9805900001</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="footer-divider" />
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>
              © {new Date().getFullYear()} BLARAA Systems. CarbonFile • CBAM Compliance Solutions • India
            </p>
            <button onClick={()=>setView('admin')} title="Authorized Personnel Only"
              style={{background:'none',border:'none',cursor:'pointer',padding:4,color:'rgba(255,255,255,0.15)',transition:'color 0.2s'}}
              onMouseOver={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}
              onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.15)'}>
              <Lock style={{width:14,height:14}} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;