import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// 1. The Navbar (Updated with green theme)
const Navbar = ({ onViewChange }) => (
  <nav className="bg-white/70 backdrop-blur-xl border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onViewChange('landing')}
        >
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-lg shadow-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-[0.2em] leading-tight">
              BLARAA SYSTEMS
            </span>
            <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
              CarbonFile
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => onViewChange('landing')} className="hover:text-emerald-600 transition">Products</button>
          <button onClick={() => onViewChange('feedback')} className="hover:text-emerald-600 transition">Feedback</button>
          <button 
            onClick={() => onViewChange('app')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
          >
            Launch CBAM
          </button>
        </div>
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

// 3. The Landing Page (Updated with green theme, glassmorphism, FAQ)
const LandingPage = ({ onLaunch }) => (
  <div className="animate-in fade-in duration-500">
    {/* Hero Section with Gradient */}
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-emerald-200 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-6">
          <Leaf className="h-4 w-4" /> EU CBAM Compliance Made Simple
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Carbon Reporting for <br/>
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Indian Exporters.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Generate EU-compliant CBAM reports in minutes. 
          Accurate emissions calculations, official XML format, complete audit trail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onLaunch}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-emerald-700 hover:to-teal-700 transition shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Generate Report <ArrowRight className="h-5 w-5" />
          </button>
          <button 
            onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-50 transition"
          >
            Learn More <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>EU Schema Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>Instant XML Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>Audit Trail Included</span>
          </div>
        </div>
      </div>
    </div>

    {/* Product Grid with Glassmorphism */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-8 flex items-center gap-2">
        <Leaf className="h-4 w-4" /> Our Software Suite
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* CBAM Card */}
        <div className="group relative bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl p-8 hover:shadow-2xl hover:border-emerald-300 hover:bg-white/90 transition-all duration-300 cursor-pointer" onClick={onLaunch}>
          <div className="absolute top-6 right-6"><span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">LIVE</span></div>
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm"><FileCheck className="h-8 w-8" /></div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">CarbonFile CBAM</h3>
          <p className="text-slate-600 mb-4">Automated EU Carbon Border Adjustment Mechanism reporting. Includes XML generation and audit vault.</p>
          <ul className="text-sm text-slate-500 space-y-2 mb-6">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Direct & Indirect emissions calculation</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Official EU XML schema</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> PDF report for stakeholders</li>
          </ul>
          <span className="text-emerald-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Launch Application <ArrowRight className="h-4 w-4" /></span>
        </div>
        
        {/* Coming Soon Card */}
        <div className="relative bg-slate-50/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 opacity-75">
          <div className="absolute top-6 right-6"><span className="bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span></div>
          <div className="bg-slate-200 h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-slate-400"><BarChart3 className="h-8 w-8" /></div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">Supply Chain Analytics</h3>
          <p className="text-slate-500 mb-6">Next-generation tracking for raw material sourcing. Coming Q4 2026.</p>
          <span className="text-slate-400 font-bold flex items-center gap-2 cursor-not-allowed">In Development <Lock className="h-4 w-4" /></span>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div id="faq-section">
      <FAQSection />
    </div>
  </div>
);

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
  const [view, setView] = useState('landing'); // 'landing' | 'app' | 'admin' | 'feedback'
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '', company_id: '', city: '',
    production_tonnes: '', coal_tonnes: '', electricity_kwh: ''
  });

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
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <Navbar onViewChange={setView} />
      <main className="flex-grow">
        {CurrentComponent}
      </main>
      <footer className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <Leaf className="h-5 w-5 text-emerald-600" />
             <span className="text-emerald-700 font-bold tracking-widest text-xs uppercase">BLARAA SYSTEMS</span>
          </div>
          <p className="text-emerald-600 text-sm mb-2">CarbonFile • Professional CBAM Compliance Solutions • India</p>
          <p className="text-emerald-500 text-xs mb-4">This tool provides estimated calculations. Please verify with official EU CBAM guidelines before submission.</p>
          <p className="text-emerald-700 text-sm mb-6">For inquiries: <span className="font-semibold">9816979777</span> | <span className="font-semibold">9805900001</span></p>
          
          {/* THE SECRET DOOR */}
          <button 
            onClick={() => setView('admin')}
            className="text-emerald-300 hover:text-emerald-600 transition p-2"
            title="Authorized Personnel Only"
          >
            <Lock className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;