import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send, X, ArrowLeft, Zap } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const whatsappNumber = "919805210692";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Cosmic Inquiry*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Phone:* ${formData.phone}%0A` +
                 `*Subject:* ${formData.subject}%0A` +
                 `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#05020a] text-white px-6 py-20 lg:py-32 relative overflow-hidden flex items-center justify-center font-sans">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 blur-[150px] rounded-full animate-pulse"></div>

      <div className="max-w-3xl w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <Zap size={14} className="text-purple-400 fill-purple-400" />
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.3em]">Direct Connection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">
            Let's <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto font-medium tracking-wide">
            "Your journey towards sacred wisdom starts with a single message."
          </p>
        </div>

        {/* --- MAIN CARD --- */}
        <div className="bg-[#0d071e]/60 backdrop-blur-3xl border border-white/10 rounded-[48px] p-8 md:p-12 shadow-2xl overflow-hidden relative group transition-all duration-700 hover:border-purple-500/30">
          
          {!isFormOpen ? (
            // --- INITIAL VIEW ---
            <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                        <MessageSquare size={40} className="text-green-400" />
                    </div>
                </div>
                
                <h3 className="text-2xl font-bold">Have a Sacred Inquiry?</h3>
                <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                    Fill out the form and we will shift our conversation to WhatsApp for a personalized guidance.
                </p>
                
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="group relative inline-flex items-center justify-center bg-white text-black px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-purple-600 hover:text-white active:scale-95 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Start Message <Send size={16} />
                    </span>
                </button>
            </div>
          ) : (
            // --- ENHANCED FORM VIEW ---
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required name="name" type="text" placeholder="John Doe"
                      value={formData.name} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 ring-purple-500/20 focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold ml-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required name="email" type="email" placeholder="john@example.com"
                      value={formData.email} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 ring-purple-500/20 focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold ml-2">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required name="phone" type="tel" placeholder="+91 00000 00000"
                      value={formData.phone} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 ring-purple-500/20 focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold ml-2">Subject</label>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required name="subject" type="text" placeholder="Workbook Query"
                      value={formData.subject} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 ring-purple-500/20 focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold ml-2">Your Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 text-gray-500" size={18} />
                  <textarea
                    required name="message" rows="4" placeholder="Type your sacred message here..."
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 ring-purple-500/20 focus:border-purple-500 transition-all text-white placeholder:text-gray-600 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-[2] bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] active:scale-95 flex items-center justify-center gap-3"
                >
                  Confirm & Open WhatsApp <Send size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex flex-col items-center gap-8">
            <div className="flex items-center gap-10 opacity-40">
                <span className="text-[8px] uppercase tracking-[0.5em]">Confidential</span>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span className="text-[8px] uppercase tracking-[0.5em]">Global Support</span>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span className="text-[8px] uppercase tracking-[0.5em]">24/7 Response</span>
            </div>

            <a href="/home" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all duration-300">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Return to Sanctuary</span>
            </a>
        </div>
      </div>
    </div>
  );
}