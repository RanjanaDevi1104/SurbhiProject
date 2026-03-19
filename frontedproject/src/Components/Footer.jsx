import { NavLink } from "react-router-dom";
import icon from "../assets/images/icon.jpeg"; 
// Lucide icons import kiye hain
import { Instagram, Facebook, Linkedin, Mail, Send, Youtube } from "lucide-react"; 

export default function Footer() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Workbook", path: "/workbook" },
    { name: "Booking", path: "/booking" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, link: "https://www.instagram.com/elevatewith_surbhi?igsh=aHZuazUxaHVwNXRq"},
    { icon: <Facebook size={18} />, link: "#" },
    { icon: <Youtube size={18} />, link: "https://youtube.com/@elevatewith_surbhi11?si=TJRPNFF7PVi2vmVt"},
    { icon: <Linkedin size={18} />, link: "#" },
  ];

  return (
    <footer className="bg-[#0a0516] border-t border-white/5 pt-16 pb-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* --- BRAND SECTION --- */}
          <div className="flex flex-col gap-4">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-md opacity-20 group-hover:opacity-40 transition rounded-full"></div>
                <img 
                  src={icon} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-full object-cover border border-purple-400/30 relative z-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-widest bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent leading-none uppercase">
                  ANDRYA
                </span>
                <span className="text-[8px] tracking-[0.3em] text-purple-400/80 uppercase font-light mt-1">
                  Cosmic Healing
                </span>
              </div>
            </NavLink>
            <p className="text-gray-400 text-sm leading-relaxed mt-2 max-w-xs">
              Empowering your spiritual journey through cosmic energy and modern healing practices. Connect with your inner self.
            </p>
          </div>

          {/* --- QUICK LINKS --- */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    to={link.path} 
                    className="text-gray-400 hover:text-purple-400 text-[13px] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-3"></span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- SERVICES --- */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-6">Our Focus</h4>
            <ul className="flex flex-col gap-3">
              {["Energy Alignment", "Mindfulness Coaching", "Spiritual Workbooks", "Cosmic Meditation"].map((item) => (
                <li key={item} className="text-gray-400 text-[13px] flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500/50 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* --- NEWSLETTER & SOCIAL --- */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-6">Stay Connected</h4>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.link} 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={14} />
              </div>
              <input 
                type="email" 
                placeholder="Newsletter Email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-12 text-xs focus:outline-none focus:border-purple-500/50 text-white transition-all"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-500 transition-all">
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[11px] tracking-widest uppercase text-center md:text-left">
            © {new Date().getFullYear()} ANDRYA COSMIC HEALING. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}