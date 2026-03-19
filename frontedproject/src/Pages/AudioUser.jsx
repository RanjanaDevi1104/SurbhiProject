import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../APPpath';
import { Loader2, Music } from 'lucide-react'; // सुंदर दिखने के लिए Lucide का उपयोग

export default function LightLanguage() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/audio/all-audios`)
      .then(res => res.json())
      .then(data => {
        setAudios(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

 const handlePurchase = async (audio) => {
  const userEmail = prompt("Enter your Gmail ID:");
  if (!userEmail || !userEmail.includes("@")) return alert("Valid Email ID required");

  try {
    // 1. Create Order - URL match karein: /api/audio/payment/create-order
    const res = await fetch(`${BASE_URL}/api/audio/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // 👈 YEH ZAROORI HAI
      body: JSON.stringify({ amount: audio.price })   // 👈 Amount yahan ja raha hai
    });

    const data = await res.json();
    if (!data.success) return alert("Order failed: " + data.message);

    const options = {
      key: "rzp_test_SP0E1la6O0DJmp",
      amount: data.order.amount,
      currency: "INR",
      name: "Cosmic Sacred",
      order_id: data.order.id,
      handler: async function (response) {
        // 2. Verify Payment - URL match karein: /api/audio/payment/verify
        const verifyRes = await fetch(`${BASE_URL}/api/audio/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // 👈 YEH BHI ZAROORI HAI
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: userEmail,
            audioId: audio._id
          })
        });
        const result = await verifyRes.json();
        alert(result.message); // Yahan likha aayega ki email bhej diya gaya hai
      },
      prefill: { email: userEmail },
      theme: { color: "#8b5cf6" }
    };
    new window.Razorpay(options).open();
  } catch (error) {
    alert("Backend connection error!");
  }
};

  if (loading) return (
    <div className="min-h-screen bg-[#05020a] flex items-center justify-center">
      <Loader2 className="animate-spin text-purple-500" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05020a] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-white font-black mb-12 text-center tracking-tighter uppercase italic">
          Light <span className="text-purple-500">Language</span> Audios
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audios.map(audio => (
            <div key={audio._id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex flex-col hover:border-purple-500/50 transition-all group shadow-2xl">
              <div className="relative h-56 mb-6 overflow-hidden rounded-2xl">
                <img src={audio.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={audio.title} />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-sm">₹{audio.price}</div>
              </div>
              
              <h3 className="text-white text-xl font-bold mb-3">{audio.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">{audio.description}</p>
              
              <button 
                onClick={() => handlePurchase(audio)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                Unlock Transmission
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}