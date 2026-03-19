import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import profile from "../assets/images/Profile photo.jpeg";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react"; 

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Screenshot ke hisaab se logic:
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    // Agar role 'admin' hai aur token maujood hai
    if (role === "admin" && token) {
      setIsAdmin(true);
    }
  }, []);

  const services = [
    "Emotional Clarity",
    "Understanding Connections",
    "Guidance on Next Steps",
    "Inner Healing Direction",
    "Spiritual Path Understanding",
  ];

  return (
    <div className="min-h-screen bg-[#0a0516] text-gray-100 flex flex-col overflow-x-hidden relative font-sans">
      
      {/* --- FLOATING ADMIN DASHBOARD BUTTON (Sirf Admin ko dikhega) --- */}
      {isAdmin && (
        <div className="fixed right-0 top-28 z-[1000] animate-in fade-in slide-in-from-right duration-500">
          <Link 
            to="/admin" 
            className="flex items-center gap-3 bg-indigo-600 text-white pl-4 pr-5 py-3 rounded-l-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] border-l border-t border-b border-indigo-400/50 hover:bg-indigo-500 transition-all active:scale-95 group"
          >
            <ShieldCheck size={20} className="text-white group-hover:rotate-12 transition-transform" />
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-70 italic">Access</span>
              <span className="text-xs font-bold uppercase tracking-tight">Admin Panel</span>
            </div>
          </Link>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex items-center justify-center px-6 py-12 lg:py-20 relative">
        
        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Profile Image */}
          <div className="relative flex justify-center lg:justify-end order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src={profile}
                alt="Andrya - Cosmic Healing"
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[40px] object-cover border border-white/10 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="text-center lg:text-left space-y-8 order-2">
            <header className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-purple-400 mb-2">
                <Sparkles size={18} />
                <span className="text-xs uppercase tracking-[0.3em] font-black">Spiritual Guide</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight uppercase italic">
                ANDRYA <br /> 
                <span className="text-purple-500 font-black">COSMIC HEALING</span>
              </h1>
              <p className="text-lg md:text-xl text-purple-300/90 font-medium italic tracking-wide">
                Awaken Your Soul • Find Clarity • Heal Your Journey
              </p>
            </header>

            <div className="space-y-4 text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              <p>
                Feeling confused in relationships, life path, or going through a spiritual awakening?
              </p>
              <p className="text-sm md:text-base opacity-75 border-l-2 border-purple-500/50 pl-4 italic">
                I provide intuitive clarity and grounded guidance through psychic 
                insights, tarot symbolism, and channelled messages.
              </p>
            </div>

            {/* List of Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-300">
                  <span className="text-purple-500 font-bold">✦</span>
                  <span className="font-semibold tracking-wide">{service}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href="https://wa.me/919805210692?text=Hello%20Andrya,%20I%20want%20to%20book%20a%20healing%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black hover:bg-purple-600 hover:text-white px-10 py-4 rounded-full font-black text-lg transition-all transform hover:-translate-y-1 shadow-xl active:scale-95 group"
              >
                Book Your Session
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5 opacity-50 text-[10px] uppercase tracking-[0.4em] font-bold">
        © {new Date().getFullYear()} Andrya Cosmic Healing • All Rights Reserved
      </footer>
    </div>
  );
}