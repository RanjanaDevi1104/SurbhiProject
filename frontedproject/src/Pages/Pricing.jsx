export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0a0516] text-gray-100 px-6 py-20 lg:py-32 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-3xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-purple-400 tracking-[0.4em] uppercase text-xs mb-3 font-semibold">Energy Exchange</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent">
            PRICING POLICY
          </h1>
        </div>

        {/* --- MAIN PRICING CARD --- */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[40px] shadow-2xl text-center relative overflow-hidden">
          
          {/* Decorative Sparkle Icon */}
          <div className="text-5xl mb-6">✨</div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Personalized Sessions, <br />
            <span className="text-purple-400">Tailored Guidance</span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            To ensure the exchange is aligned with the specific depth and nature of your situation, 
            <span className="text-white font-medium"> energy exchange details are shared privately </span> 
            after our initial contact.
          </p>

          {/* Benefits/Features list to build value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto mb-12">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="text-purple-500">✔</span>
              <span>Flexible Reading Options</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="text-purple-500">✔</span>
              <span>Personalized Energy Flow</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="text-purple-500">✔</span>
              <span>No Hidden Charges</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="text-purple-500">✔</span>
              <span>Secure Payment Methods</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919805210692?text=Hello%20I%20want%20to%20know%20about%20the%20pricing%20for%20your%20services"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
          >
            Inquire on WhatsApp
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>

        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            Fair Exchange • Deep Intention • Soulful Healing
          </p>
          <a href="/home" className="inline-block text-xs text-purple-400/50 hover:text-purple-400 tracking-widest uppercase transition-colors">
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}