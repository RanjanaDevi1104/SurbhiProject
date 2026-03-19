import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../assets/images/icon.jpeg"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }) =>
    `relative py-1 transition-all duration-300 text-[13px] uppercase tracking-widest font-medium ${
      isActive ? "text-purple-400" : "text-gray-300 hover:text-white"
    }`;

 
  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Workbook", path: "/workbook" },
    { name: "Booking", path: "/booking" },
     { name: "LightAudio", path:"/audio" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full bg-[#0a0516]/80 backdrop-blur-xl z-[100] border-b border-white/5 shadow-2xl font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
        
        {/* --- LOGO --- */}
        <NavLink to={token ? "/home" : "/"} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 blur-md opacity-20 group-hover:opacity-40 transition rounded-full"></div>
            <img src={icon} alt="Logo" className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-purple-400/30 relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-widest bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent leading-none">
              ANDRYA
            </span>
            <span className="text-[8px] tracking-[0.3em] text-purple-400/80 uppercase font-light mt-1">Cosmic Healing</span>
          </div>
        </NavLink>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-5 mr-4">
            {token && navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={navLinkStyle}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center border-l border-white/10 pl-6 gap-4">
            {/* Search */}
            <div className="relative flex items-center">
                <input type="text" placeholder="Search..." className={`bg-white/5 border border-white/10 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:border-purple-500/50 transition-all duration-500 ${showSearch ? "w-32 opacity-100" : "w-0 opacity-0 p-0 pointer-events-none"}`} />
                <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-purple-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>

            {/* --- ALAG ALAG BUTTONS --- */}
            
            {/* AGAR LOGIN NAHI HAI TOH YE DIKHEGA */}
            {!token && (
              <NavLink 
                to="/" 
                className="text-[11px] uppercase tracking-widest font-bold bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 rounded-full text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all duration-300"
              >
                Sign In
              </NavLink>
            )}

            {/* AGAR LOGIN HAI TOH YE DIKHEGA */}
            {token && (
              <button 
                onClick={handleLogout}
                className="text-[11px] uppercase tracking-widest font-bold border border-red-500/30 px-5 py-2.5 rounded-full text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg shadow-red-500/5"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <div className="flex items-center gap-4 lg:hidden">
            <button className="text-white p-2" onClick={() => setOpen(!open)}>
                {open ? (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
            </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden absolute w-full bg-[#0a0516] border-b border-white/5 transition-all duration-500 ease-in-out ${open ? "top-20 opacity-100 translate-y-0" : "-top-[700px] opacity-0 -translate-y-10"}`}>
        <div className="flex flex-col p-8 gap-6 text-[13px] tracking-[0.2em] uppercase font-bold text-center">
          {token && navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => (isActive ? "text-purple-400" : "text-gray-400 hover:text-white")} onClick={() => setOpen(false)}>
              {link.name}
            </NavLink>
          ))}
          
          <div className="h-[1px] bg-white/5 my-2"></div>

          {/* Mobile Login Button */}
          {!token && (
            <NavLink 
                to="/" 
                onClick={() => setOpen(false)}
                className="bg-purple-600 text-white py-4 rounded-xl shadow-lg shadow-purple-500/20"
            >
                Sign In
            </NavLink>
          )}

          {/* Mobile Logout Button */}
          {token && (
            <button 
                onClick={() => { handleLogout(); setOpen(false); }}
                className="text-red-400 py-4 border border-red-400/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
                Logout Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}