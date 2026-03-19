import { useState, useEffect } from "react"; // 1. useEffect import kiya
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../APPpath";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. Page load hote hi states ko force-clear karein
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const msg = await res.text();
      if (res.status === 201 || res.status === 200) {
        navigate("/"); 
      } else {
        alert(msg);
      }
    } catch (error) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05020a] flex items-center justify-center px-4 py-10 relative overflow-hidden font-sans">
      
      {/* --- Animated Background Elements --- */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      {/* --- Signup Card --- */}
      <div className="w-full max-w-[500px] relative z-10">
        
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[30px] blur-xl opacity-20"></div>
        
        <div className="relative bg-[#0d071e]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[30px] shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-purple-500/20">
              <User className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Join the next generation of creators.</p>
          </div>

          {/* 3. Form level par autoComplete="off" */}
          <form onSubmit={handleSignup} className="space-y-4" autoComplete="off">
            
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name} // Value bind ki
                  autoComplete="off" // Autofill off
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email} // Value bind ki
                  autoComplete="off" // Autofill off
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Passwords Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    autoComplete="new-password" // Browser ko saved passwords fill karne se rokta hai
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Confirm</label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    autoComplete="new-password" // Autofill block
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                    onChange={handleChange}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              className={`w-full relative mt-4 group overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right py-4 rounded-xl font-bold text-white tracking-widest uppercase text-xs shadow-xl shadow-indigo-500/20 transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer... */}
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* ... */}
    </div>
  );
}