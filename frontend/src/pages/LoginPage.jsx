import { useState } from "react";
import axios from "axios";

export default function LoginPage({ onNavigate, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username: email,
        password: password
      });
      if (res.data) {
        onSuccess(email);
      }
    } catch (err) {
      alert("Login Failed: Invalid credentials.");
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-emerald-400 mb-2">Login</h2>
      <p className="text-slate-400 mb-6 text-sm">Enter credentials to begin threat analysis.</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-emerald-500 outline-none"
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-emerald-500 outline-none"
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded font-bold transition">Authorize Access</button>
      </form>
      
      <button onClick={() => onNavigate('register')} className="w-full mt-4 text-sm text-slate-500 hover:text-emerald-400">
        New user? Register your device.
      </button>
    </div>
  );
}