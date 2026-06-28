import { useState } from "react";
import axios from "axios";

export default function DashboardPage({ user, message }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/detect", {
        url: query,
        content: query
      });
      setData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Backend error. Check terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <div className="mb-8 p-4 bg-slate-900 rounded-lg border-l-4 border-blue-500">
         <h2 className="font-bold">{message || "System Ready"}</h2>
         <p className="text-sm text-slate-400">User: {user || "Active User"}</p>
      </div>

      <div className="flex gap-4 mb-10">
        <textarea 
          className="flex-1 p-4 bg-slate-800 rounded-xl border border-slate-700 outline-none focus:border-blue-500 h-24"
          placeholder="Paste content here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="bg-blue-600 px-8 rounded-xl font-bold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "SCANNING..." : "SCAN"}
        </button>
      </div>

      {data && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* PHISHING BOX */}
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Phishing Risk</h3>
            <div className="text-4xl font-black text-blue-400">
              {data.phishing_score?.score ?? 0}%
            </div>
            <p className="text-sm text-slate-300">{data.phishing_score?.label ?? "Calculating..."}</p>
          </div>

          {/* LINK BOX */}
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Link Heuristics</h3>
            <div className="space-y-1">
              {Array.isArray(data.link_findings) && data.link_findings.length > 0 ? (
                data.link_findings.map((f, i) => (
                  <div key={i} className="text-[10px] bg-red-900/20 text-red-400 p-1 rounded">⚠️ {f}</div>
                ))
              ) : (
                <p className="text-xs text-slate-600 italic">No patterns found.</p>
              )}
            </div>
          </div>

          {/* CLONE BOX */}
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Clone Detect</h3>
            <p className="text-xs text-slate-400">
              {typeof data.clone_findings === 'string' ? data.clone_findings : "No clones identified."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}