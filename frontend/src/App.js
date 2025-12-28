import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    company_id: '',
    city: '',
    production_tonnes: '',
    coal_tonnes: '',
    electricity_kwh: ''
  });

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send data to your Python Backend
      // Ensure your backend is running on port 8000!
      const response = await axios.post('https://cbam-full-app.onrender.com/generate-xml', formData, {
        responseType: 'blob', // IMPORTANT: Keep this so the file downloads!
      });

      // 2. Create a hidden download link and click it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.company_name}_CBAM_Report.xml`);
      document.body.appendChild(link);
      link.click();
      
      // 3. Cleanup
      link.remove();
      alert("✅ Report Generated Successfully! Check your downloads.");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to connect to Backend. Is api.py running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            🇪🇺 CBAM Auto-Filer
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Generate EU-Compliant XML Reports instantly.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Company Info Section */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <input
                name="company_name"
                required
                placeholder="Company Name (e.g. Sharma Steels)"
                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleChange}
              />
              <input
                name="company_id"
                required
                placeholder="IE Code / Tax ID"
                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleChange}
              />
              <input
                name="city"
                required
                placeholder="City (e.g. Ludhiana)"
                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Production Data Section */}
            <div className="bg-slate-100 p-4 rounded-lg space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">🏭 Factory Data</h3>
              <div>
                <label className="block text-xs font-medium text-slate-500">Total Production (Tonnes)</label>
                <input
                  name="production_tonnes"
                  type="number"
                  required
                  step="0.01"
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">Lignite Coal Used (Tonnes)</label>
                <input
                  name="coal_tonnes"
                  type="number"
                  required
                  step="0.01"
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">Grid Electricity (kWh)</label>
                <input
                  name="electricity_kwh"
                  type="number"
                  required
                  step="0.01"
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white 
              ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
          >
            {loading ? "Generating XML..." : "Download Compliance Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
