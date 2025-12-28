import React, { useState } from 'react';
import axios from 'axios';
import { 
  Factory, Zap, Flame, FileCheck, Download, 
  ShieldCheck, Info, ArrowRight, BarChart3, 
  Globe, Lock, Key, RefreshCw 
} from 'lucide-react';

// --- COMPONENTS ---

// 1. The Navbar (Standard)
const Navbar = ({ onViewChange }) => (
  <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
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
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => onViewChange('landing')} className="hover:text-blue-600 transition">Products</button>
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

// 2. The Admin Panel (NEW SECURE COMPONENT)
const AdminPanel = () => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ⚠️ Use your Render URL here
      const API_URL = 'https://cbam-full-app.onrender.com/admin/view-vault';
      
      const response = await axios.get(API_URL, {
        headers: { 'x-admin-key': apiKey }
      });

      setLogs(response.data.recent_logs);
      setIsAuthenticated(true);
    } catch (err) {
      setError('⛔ Access Denied: Invalid Admin Key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {!isAuthenticated ? (
        // LOGIN SCREEN
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Restricted Access</h2>
          <p className="text-slate-500 mb-6">Enter your BLARAA Systems Security Key to view the audit vault.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input 
                type="password" 
                placeholder="Enter Admin Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition"
            >
              {loading ? 'Verifying...' : 'Unlock Vault'}
            </button>
          </form>
        </div>
      ) : (
        // LOGS TABLE SCREEN
        <div className="animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Audit Vault</h2>
              <p className="text-slate-500">Real-time immutable logs from the "Glass Box".</p>
            </div>
            <button onClick={handleLogin} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition">
              <RefreshCw className="h-4 w-4" /> Refresh Data
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
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-slate-400">The vault is empty.</td>
                    </tr>
                  ) : (
                    logs.map((log, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition">
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
          <p className="text-center text-xs text-slate-400 mt-6">⚠️ CONFIDENTIAL: Authorized Personnel Only</p>
        </div>
      )}
    </div>
  );
};

// 3. The Landing Page (Same as before)
const LandingPage = ({ onLaunch }) => (
  <div className="animate-in fade-in duration-500">
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
        <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 cursor-pointer" onClick={onLaunch}>
          <div className="absolute top-6 right-6"><span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">LIVE</span></div>
          <div className="bg-blue-100 h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-blue-600"><FileCheck className="h-8 w-8" /></div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">CBAM Pro</h3>
          <p className="text-slate-600 mb-6">Automated EU Carbon Border Adjustment Mechanism reporting. Includes XML generation and audit vault.</p>
          <span className="text-blue-600 font-bold flex items-center gap-2">Launch Application <ArrowRight className="h-4 w-4" /></span>
        </div>
        <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-8 opacity-75">
          <div className="absolute top-6 right-6"><span className="bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span></div>
          <div className="bg-slate-200 h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-slate-400"><BarChart3 className="h-8 w-8" /></div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">Supply Chain Analytics</h3>
          <p className="text-slate-500 mb-6">Next-generation tracking for raw material sourcing. Coming Q4 2025.</p>
          <span className="text-slate-400 font-bold flex items-center gap-2 cursor-not-allowed">In Development <Lock className="h-4 w-4" /></span>
        </div>
      </div>
    </div>
  </div>
);

// 4. The Dashboard (Same as before)
const Dashboard = ({ formData, setFormData, loading, status, onSubmit, onChange }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
      <div className="lg:col-span-4 mb-10 lg:mb-0 space-y-6">
        <div>
           <span className="text-blue-600 font-bold tracking-wide text-sm">PRODUCT: CBAM PRO</span>
           <h2 className="text-3xl font-extrabold text-slate-900 mt-2">New Compliance Filing</h2>
           <p className="text-slate-600 mt-4">Enter factory production data below. The engine will calculate specific embedded emissions and generate the XML.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
           <div className="flex items-center gap-2 mb-2"><ShieldCheck className="h-5 w-5 text-blue-700" /><span className="font-bold text-blue-800 text-sm">Secure Environment</span></div>
           <p className="text-xs text-blue-600">Data is encrypted and logged to the BLARAA Audit Vault.</p>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={onSubmit} className="p-8 space-y-8">
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Factory className="h-4 w-4" /> Organization</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input name="company_name" required placeholder="Company Name" value={formData.company_name} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                 <input name="company_id" required placeholder="IE Code / Tax ID" value={formData.company_id} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
               </div>
               <input name="city" required placeholder="City" value={formData.city} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <hr className="border-slate-100" />
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Flame className="h-4 w-4" /> Production Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="relative"><label className="text-xs font-medium text-slate-500">Total Production</label><input name="production_tonnes" type="number" step="0.01" required value={formData.production_tonnes} onChange={onChange} className="w-full mt-1 px-3 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                 <div className="relative"><label className="text-xs font-medium text-slate-500">Coal Used (Tonnes)</label><input name="coal_tonnes" type="number" step="0.01" required value={formData.coal_tonnes} onChange={onChange} className="w-full mt-1 px-3 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                 <div className="relative"><label className="text-xs font-medium text-slate-500">Electricity (kWh)</label><input name="electricity_kwh" type="number" step="0.01" required value={formData.electricity_kwh} onChange={onChange} className="w-full mt-1 px-3 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              </div>
            </div>
            <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${loading ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>{loading ? 'Processing...' : <><Download className="h-5 w-5" /> Generate Report</>}</button>
            {status === 'success' && <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm"><ShieldCheck className="h-5 w-5" /> Report generated & logged to Audit Vault.</div>}
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP LOGIC ---

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'app' | 'admin'
  const [loading, setLoading] = useState(false);
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
      console.error(error); setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // RENDER CONTROLLER
  let CurrentComponent;
  if (view === 'landing') CurrentComponent = <LandingPage onLaunch={() => setView('app')} />;
  else if (view === 'app') CurrentComponent = <Dashboard formData={formData} setFormData={setFormData} loading={loading} status={status} onSubmit={handleSubmit} onChange={handleChange} />;
  else if (view === 'admin') CurrentComponent = <AdminPanel />;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <Navbar onViewChange={setView} />
      <main className="flex-grow">
        {CurrentComponent}
      </main>
      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <Globe className="h-5 w-5 text-slate-400" />
             <span className="text-slate-500 font-bold tracking-widest text-xs uppercase">BLARAA SYSTEMS</span>
          </div>
          <p className="text-slate-400 text-sm mb-6">&copy; 2025 BLARAA Systems Pvt Ltd • Bengaluru, India • Enterprise Grade Compliance</p>
          
          {/* THE SECRET DOOR */}
          <button 
            onClick={() => setView('admin')}
            className="text-slate-300 hover:text-slate-500 transition p-2"
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