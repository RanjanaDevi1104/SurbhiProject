import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    setTimeout(() => {
      localStorage.clear(); 
      window.location.href = "/"; // Login page par bhejein aur refresh karein
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0516] flex items-center justify-center p-4">
      <div className="bg-[#1a1429] p-8 rounded-2xl shadow-2xl border border-white/10 max-w-sm w-full text-center">
        {!isLoggingOut ? (
          <>
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Logout Karein?</h2>
              <p className="text-gray-400">Kya aap sach mein apna session khatam karna chahte hain?</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all active:scale-95"
              >
                Haan, Logout Karein
              </button>
              <button
                onClick={() => navigate(-1)} // Pichle page par wapas bhejein
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all"
              >
                Nahi, Wapas Jayein
              </button>
            </div>
          </>
        ) : (
          <div className="py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white font-medium">Logging out...</p>
          </div>
        )}
      </div>
    </div>
  );
}