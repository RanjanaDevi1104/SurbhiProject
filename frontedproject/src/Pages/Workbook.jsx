import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Loader2, CreditCard, ExternalLink, CheckCircle, FileWarning } from "lucide-react";
import { BASE_URL } from '../APPpath';

export default function Workbook() {
  const [workbooks, setWorkbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlockedBooks, setUnlockedBooks] = useState({}); 

  const whatsappNumber = "919805210692"; 

  useEffect(() => {
    fetch(`${BASE_URL}/api/all`)
      .then((res) => res.json())
      .then((data) => {
        setWorkbooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workbooks:", err);
        setLoading(false);
      });
  }, []);

const handlePayment = async (book) => {
    if (!book.pdfUrl) {
      alert("Workbook PDF not ready.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: book.price }),
      });
      
      const data = await res.json();
      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: "rzp_test_SP0E1la6O0DJmp", // ⚠️ Check if this matches your .env RAZORPAY_KEY_ID
        amount: data.order.amount,
        currency: "INR",
        name: "Cosmic Sacred",
        description: `Unlock ${book.title}`,
        order_id: data.order.id,
        handler: async function (response) {
          console.log("Payment Success, now verifying...");

          try {
            const verifyRes = await fetch(`${BASE_URL}/api/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                itemId: book._id,
                itemType: "workbook",
                email: "no-email@workbook.com" 
              }),
            });

            const verifyData = await verifyRes.json();
            console.log("Verification Response:", verifyData);

            if (verifyData.success) {
              setUnlockedBooks((prev) => ({
                ...prev,
                [book._id]: book.pdfUrl 
              }));
              alert("Sacred Guide Unlocked!");
            } else {
              alert("Verification Failed: " + verifyData.message);
            }
          } catch (err) {
            console.error("Verification Call Error:", err);
            alert("Connection error during verification.");
          }
        },
        prefill: {
          name: "Seeker",
          email: "guest@example.com",
        },
        theme: { color: "#6366f1" }, 
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initialization failed.");
    }
  };

  const handleBuyWhatsApp = (title) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Inquiry about ${title}`)}`;
    window.open(url, "_blank");
  };

  if (loading) return <div className="text-center pt-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#05020a] pt-32 pb-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-16 uppercase">Sacred <span className="text-purple-500">Workbooks</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {workbooks.map((book) => (
            <div key={book._id} className="bg-[#0d071e] border border-white/5 rounded-[32px] p-6 flex flex-col">
              <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-2xl mb-4" />
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-gray-400 mb-6 flex-1">{book.description}</p>
              
              <div className="space-y-3">
                {unlockedBooks[book._id] ? (
                  <a
                    href={unlockedBooks[book._id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
                  >
                    <ExternalLink size={16} /> Open Sacred PDF
                  </a>
                ) : (
                  <button
                    onClick={() => handlePayment(book)}
                    className="w-full bg-indigo-600 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
                  >
                    <CreditCard size={16} /> Unlock Guide (₹{book.price})
                  </button>
                )}
                <button onClick={() => handleBuyWhatsApp(book.title)} className="w-full bg-white/5 py-4 rounded-2xl text-xs uppercase font-bold tracking-widest border border-white/10">
                   WhatsApp Support
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}