import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../APPpath";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, Loader2 } from "lucide-react"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in AND Force Clear Fields
  useEffect(() => {
    // Browser autofill ko rokne ke liye mount hote hi clear karein
    setEmail("");
    setPassword("");

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      role === "admin" ? navigate("/admin") : navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        data.user.role === "admin" ? navigate("/admin") : navigate("/home");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05020a] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      
      {/* --- Cosmic Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      {/* --- Login Card --- */}
      <div className="w-full max-w-[450px] relative z-10">
        
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[30px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[#0d071e]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[30px] shadow-2xl">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/20">
              <LogIn className="text-white w-8 h-8 ml-1" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Please enter your details to sign in.</p>
          </div>

          {/* Form level par autocomplete off rakha hai */}
          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-indigo-300 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  required
                  name="user_email" // Name badal diya browser ko confuse karne ke liye
                  autoComplete="off" // Email autofill off
                  value={email}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" size="sm" className="text-[11px] text-gray-500 hover:text-indigo-400 transition-colors uppercase font-bold tracking-tighter">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="user_password" // Name badal diya
                  autoComplete="new-password" // Browser ko purana password fill karne se rokta hai
                  value={password}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Login Button */}
            <button 
              disabled={loading}
              className={`w-full relative mt-4 group overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right py-4 rounded-xl font-bold text-white tracking-widest uppercase text-xs shadow-xl shadow-indigo-500/20 transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Back Link */}
      <Link to="/" className="absolute bottom-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-500 hover:text-indigo-400 transition-all group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portal
      </Link>
    </div>
  );
}