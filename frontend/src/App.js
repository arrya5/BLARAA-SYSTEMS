import React, { useState } from 'react';
import axios from 'axios';
import { 
  Factory, 
  Zap, 
  Flame, 
  FileCheck, 
  Download, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Lock 
} from 'lucide-react';

// --- COMPONENTS ---

// 1. The Navbar (Always visible)
const Navbar = ({ onViewChange }) => (
  <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        {/* Company Branding */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onViewChange('landing')}
        >
          <div className="bg-slate-900 p-2 rounded-lg">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] leading-tight">
              BLARAA SYSTEMS
            </span>
            <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
              Enterprise
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => onViewChange('landing')} className="hover:text-blue-600 transition">Products</button>
          <span className="hidden md:block hover:text-blue-600 cursor-pointer transition">About Us</span>
          <button 
            onClick={() => onViewChange('app')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
          >
            Launch CBAM Pro
          </button>
        </div>
      </div>
    </div>
  </nav>
);

// 2. The Landing Page (Corporate Face)
const LandingPage = ({ onLaunch }) => (
  <div className="animate-in fade-in duration-500">
    {/* Hero Section */}
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Compliance Infrastructure for <br/>
          <span className="text-blue-600">Modern Exporters.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          BLARAA Systems builds the digital backbone for Indian manufacturers. 
          From EU Carbon mandates to global supply chain analytics.
        </p>
        <button 
          onClick={onLaunch}
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition shadow-xl"
        >
          Get Started <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>

    {/* Product Grid */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Our Software Suite</h2>
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Product 1: CBAM Pro (Active) */}
        <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 cursor-pointer" onClick={onLaunch}>
          <div className="absolute top-6 right-6">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">LIVE</span>
          </div>
          <div className="bg-blue-100 h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-blue-600">
            <FileCheck className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">CBAM Pro</h3>
          <p className="text-slate-600 mb-6">
            Automated EU Carbon Border Adjustment Mechanism reporting. 
            Includes XML generation, CEA emission factor calculation, and audit vault.
          </p>
          <span className="text-blue-600 font-bold flex items-center gap-2">
            Launch Application <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        {/* Product 2: Future Placeholder (Coming Soon) */}
        <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-8 opacity-75">
          <div className="absolute top-6 right-6">
            <span className="bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span>
          </div>
          <div className="bg-slate-200 h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-slate-400">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">Supply Chain Analytics</h3>
          <p className="text-slate-500 mb-6">
            Next-generation tracking for raw material sourcing and logistics optimization.
            Coming Q4 2025.
          </p>
          <span className="text-slate-400 font-bold flex items-center gap-2 cursor-not-allowed">
            In Development <Lock className="h-4 w-4" />
          </span>
        </div>

      </div>
    </div>
  </div>
);

// 3. The Dashboard (The Tool)
const Dashboard = ({ formData, setFormData, loading, status, onSubmit, onChange }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
      {/* Sidebar Info */}
      <div className="lg:col-span-4 mb-10 lg:mb-0 space-y-6">
        <div>
           <span className="text-blue-600 font-bold tracking-wide text-sm">PRODUCT: CBAM PRO</span>
           <h2 className="text-3xl font-extrabold text-slate-900 mt-2">New Compliance Filing</h2>
           <p className="text-slate-600 mt-4">
             Enter factory production data below. The engine will calculate specific embedded emissions and generate the XML.
           </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
           <div className="flex items-center gap-2 mb-2">
             <ShieldCheck className="h-5 w-5 text-blue-700" />
             <span className="font-bold text-blue-800 text-sm">Secure Environment</span>
           </div>
           <p className="text-xs text-blue-600">
             Data is encrypted and logged to the BLARAA Audit Vault for future verification.
           </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={onSubmit} className="p-8 space-y-8">
            {/* Company Section */}
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                 <Factory className="h-4 w-4" /> Organization
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input name="company_name" required placeholder="Company Name" value={formData.company_name} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                 <input name="company_id" required placeholder="IE Code / Tax ID" value={formData.company_id} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
               </div>
               <input name="city" required placeholder="City" value={formData.city} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            
            <hr className="border-slate-100" />

            {/* Data Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Flame className="h-4 w-4" /> Production Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="relative">
                   <label className="text-xs font-medium text-slate-500">Total Production</label>
                   <input name="production_tonnes" type="number" step="0.01" required value={formData.production_tonnes} onChange={onChange} className="w-full mt-1 px-3 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div className="relative">
                   <label className="text-xs font-medium text-slate-500">Coal Used (Tonnes)</label>
                   <input name="coal_tonnes" type="number" step="0.01" required value={formData.coal_tonnes} onChange={onChange} className="w-full mt-1 px-3 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div className="relative">
                   <label className="text-xs font-medium text-slate-500">Electricity (kWh)</label>
                   <input name="electricity_kwh" type="number" step="0.01" required value={formData.electricity_kwh} onChange={onChange} className="w-full mt-1 px-3 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${loading ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
              {loading ? 'Processing...' : <><Download className="h-5 w-5" /> Generate Report</>}
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5" /> Report generated & logged to Audit Vault.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP LOGIC ---

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'app'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '', company_id: '', city: '',
    production_tonnes: '', coal_tonnes: '', electricity_kwh: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      // ⚠️ UPDATE THIS URL
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
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <Navbar onViewChange={setView} />
      
      <main className="flex-grow">
        {view === 'landing' ? (
          <LandingPage onLaunch={() => setView('app')} />
        ) : (
          <Dashboard 
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            status={status}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        )}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <Globe className="h-5 w-5 text-slate-400" />
             <span className="text-slate-500 font-bold tracking-widest text-xs uppercase">BLARAA SYSTEMS</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; 2025 BLARAA Systems Pvt Ltd • Bengaluru, India • Enterprise Grade Compliance
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
