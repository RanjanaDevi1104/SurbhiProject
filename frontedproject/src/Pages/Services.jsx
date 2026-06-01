import React from 'react';

export default function Services() {
  const services = [
    {
      name: "Clairvoyant Energy Reading",
      icon: "✨",
      duration: "per question",
      price: "₹555",
      desc: "A deep-dive psychic session to read your energetic signature and provide future foresight via a 1-on-1 call.",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Clairvoyant%20Energy%20Reading%20(₹555)",
    },
    {
      name: "Intuitive & Psychic Reading",
      icon: "🔮",
      duration: "per question",
      price: "₹333",
      desc: "Deep insights into your energy field and life patterns through intuitive psychic vision and channelled guidance.",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Intuitive%20Psychic%20Reading%20(₹333)",
    },
    {
      name: "Tarot Guidance",
      icon: "🃏",
      duration: "per question",
      price: "₹222",
      desc: "Detailed answers and spiritual roadmap using sacred tarot symbolism to navigate your current life situations.",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Tarot%20Guidance%20(₹222)",
    },
    {
      name: " Akashik Record Reading",
      icon: "🖼️",
      duration: "one to one Session(3 question)",
      price: "₹5000",
      desc: "A one-to-one Akashic Record Reading session offering intuitive and soul-level guidance to help you understand emotional patterns, life lessons, and inner blocks connected to your current situation.",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Akashik%20Record%20Reading%20(₹5000)",
    },
    {
      name: "Connection Guidance",
      icon: "♾️",
      duration: "one to one Session(per question)",
      price: "₹1100",
      desc: "Understanding the soul-level dynamics, karmic lessons, and patterns between you and another soul.",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Connection%20Guidance%20(₹1100)",
    },
    {
      name: "Starseed Guidance",
      icon: "🌟",
      duration: "one to one Session(per question)",
      price: "₹2100",
      desc: "Exploring your cosmic origins, star system connections, and understanding your soul's higher mission on Earth.",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Starseed%20Guidance%20(₹2100)",
    },
    {
      name: "Automatic Writing Message",
      icon: "🖋️",
      duration: "You will receive a written intuitive message based on your question",
      price: "₹222(via text)",
      desc: "Automatic writing is a channeled intuitive guidance where I receive messages through writing from higher energies regarding your Question",
      link: "https://wa.me/919805210692?text=Hello%20I%20want%20to%20book%20Automatic%20Writing%20Reading%20(₹222)",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0516] text-gray-100 px-6 py-20 lg:py-28 relative overflow-hidden">
      
      {/* Background Cosmic Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-purple-400 tracking-[0.5em] uppercase text-xs mb-4 font-bold italic">Divine Offerings</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent uppercase">
            OUR SERVICES
          </h1>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg font-light italic">
            "Receive the clarity your soul has been seeking."
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[40px] hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 flex flex-col items-center text-center shadow-2xl"
            >
              {/* Price Badge - Ab sabhi cards par dikhega */}
              <div className="absolute top-6 right-8 bg-purple-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                {s.price}
              </div>

              {/* Service Icon */}
              <div className="text-4xl mb-6 bg-purple-500/10 w-20 h-20 flex items-center justify-center rounded-full shadow-inner group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold mb-2 text-white tracking-wide uppercase">{s.name}</h3>
              
              {/* Duration - Ab sabhi cards par dikhega */}
              <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                {s.duration}
              </p>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                {s.desc}
              </p>

              {/* WhatsApp Button */}
              <a 
                href={s.link} 
                className="mt-auto inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-white bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 py-3 px-8 rounded-full transition-all group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Inquire & Book
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-20 text-center py-10 border-t border-white/5">
          <p className="text-gray-500 text-sm italic">
            "Prices are in INR. For international bookings, please inquire via WhatsApp."
          </p>
        </div>

      </div>
    </div>
  );
}