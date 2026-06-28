import { useState } from "react";
import axios from "axios";

export default function RegisterPage({ onNavigate, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Strict Email Regex Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("ERROR: Invalid Email Format. Please use 'user@domain.com'.");
      return;
    }

    try {
      // 2. Post to Backend (Backend expects 'username' and 'password')
      await axios.post("http://localhost:8000/auth/register", {
        username: email,
        password: password
      });
      onSuccess(email);
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.detail || "Email already exists."));
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-blue-400 mb-2">Register</h2>
      <p className="text-slate-400 mb-6 text-sm">Secure your access to the Threat Engine.</p>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Strict Email Format</label>
          <input 
            type="email" 
            placeholder="name@company.com" 
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-bold transition">Create Account</button>
      </form>
      
      <button onClick={() => onNavigate('login')} className="w-full mt-4 text-sm text-slate-500 hover:text-blue-400">
        Already have an account? Login here.
      </button>
    </div>
  );
}