import React, { useState } from 'react';

export default function Booking() {
  const [selectedService, setSelectedService] = useState("");

  const services = [
    { id: 1, name: "Tarot Reading (30 Min)", price: "₹999", icon: "🔮" },
    { id: 2, name: "Love & Relationship", price: "₹1,499", icon: "💖" },
    { id: 3, name: "Career Guidance", price: "₹1,199", icon: "💼" },
    { id: 4, name: "Emergency/Instant Read", price: "₹1,999", icon: "⚡" },
  ];

  const steps = [
    { 
      id: "01", 
      title: "Choose Service", 
      desc: "Niche diye gaye options mein se apni pasand ki service select karein.",
      icon: "✨"
    },
    { 
      id: "02", 
      title: "WhatsApp Message", 
      desc: "Booking button par click karein, aapka message auto-type ho jayega.",
      icon: "📱"
    },
    { 
      id: "03", 
      title: "Secure Payment", 
      desc: "Main aapko UPI (GPay/PhonePe) ya International link share karunga.",
      icon: "💳"
    },
    { 
      id: "04", 
      title: "Verification", 
      desc: "Payment ke baad screenshot bhejein taaki slot confirm ho sake.",
      icon: "✅"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0516] text-gray-100 px-6 py-16 lg:py-24 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 tracking-[0.4em] uppercase text-xs mb-3 font-semibold">Step-by-Step Guide</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
            BOOK YOUR SESSION
          </h1>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">Apne sawalon ke jawab pane ke liye niche diye gaye steps ko follow karein.</p>
        </div>

        {/* --- STEP 1: SERVICE SELECTION --- */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-purple-300">
            <span className="bg-purple-500/20 p-2 rounded-lg">Step 1:</span> Select Your Service
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <div 
                key={s.id}
                onClick={() => setSelectedService(s.name)}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedService === s.name 
                  ? "border-purple-500 bg-purple-500/10 scale-105" 
                  : "border-white/5 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-purple-400 font-medium mt-1">{s.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- STEPS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0d071e] p-8 rounded-3xl border border-white/10 h-full">
                <div className="text-4xl mb-4">{step.icon}</div>
                <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">{step.id}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- PAYMENT & VERIFICATION SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
               Payment Methods
            </h3>
            <div className="flex flex-wrap gap-4 opacity-70">
              {/* Fake Payment Icons for UI */}
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">Google Pay</div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">PhonePe</div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">Paytm</div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">PayPal (Intl)</div>
            </div>
            <p className="mt-6 text-gray-400 text-sm italic">
              * Payment details will be sent personally on WhatsApp once we confirm your time.
            </p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 p-8 rounded-[32px] flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4 text-purple-300">Fast Verification</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Payment ke baad <span className="text-white font-bold underline">Utr Number ya Screenshot</span> share karna na bhoolein. Verification ke baad 24 hours ke andar aapko schedule allot kar diya jayega.
            </p>
            <div className="flex items-center gap-3 text-xs text-purple-400 font-mono">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              Booking Open for Today
            </div>
          </div>
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="text-center">
          <a
            href={`https://wa.me/919805210692?text=Hello! I want to book ${selectedService || 'a session'}. Please share payment details.`}
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <button className="relative bg-[#0a0516] hover:bg-transparent text-white px-12 py-5 rounded-full font-bold text-xl transition-all border border-purple-500/50 flex items-center gap-3">
              Book Now via WhatsApp
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </a>
          <p className="mt-6 text-gray-500 text-sm italic underline decoration-purple-500/30">Secure & Confidential Session</p>
        </div>

      </div>
    </div>
  );
}