export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0516] text-gray-100 px-6 py-16 lg:py-24 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 text-center lg:text-left">
          <p className="text-purple-400 tracking-[0.3em] uppercase text-sm mb-2 font-light">The Soul Behind</p>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-2 leading-tight">
            Andrya Cosmic Healing
          </h1>
          <div className="h-1 w-20 bg-purple-600 rounded-full mx-auto lg:mx-0 mt-4"></div>
        </header>

        {/* Main Bio Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl space-y-10 leading-relaxed">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-300">
              Hello, I’m Surbhi
            </h2>
            <p className="text-gray-200 text-lg md:text-xl font-light">
              I am a <span className="text-white font-medium underline underline-offset-8 decoration-purple-500/50">Psychic Reader & Intuitive Guide</span>.
            </p>
          </section>

          {/* The Journey */}
          <section className="space-y-4">
            <p className="text-gray-300">
              My journey began through my own deep emotional and spiritual awakening. 
              This path led me to a profound understanding of patterns, attachment, 
              inner healing, and <span className="text-purple-200">conscious relationships</span>.
            </p>
            <p className="text-gray-300">
              Through my experiences and intuitive abilities, I now guide people who feel 
              <span className="text-white"> stuck, confused, or overwhelmed</span> in their unique situations.
            </p>
          </section>

          {/* The Philosophy - IMPORTANT PART */}
          <section className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-2xl italic shadow-inner">
            <p className="text-gray-200 text-lg">
              "My work focuses on <span className="text-purple-300 font-medium">clarity and awareness</span> so you can make empowered decisions 
              rather than becoming dependent on predictions."
            </p>
          </section>

          {/* Bottom Grid for Intention & Confidentiality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div className="space-y-2">
              <h3 className="text-purple-300 font-bold flex items-center">
                <span className="mr-2">✦</span> Deep Intention
              </h3>
              <p className="text-sm text-gray-400">
                Every session is conducted personally and with a specific spiritual intention for your highest good.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-purple-300 font-bold flex items-center">
                <span className="mr-2">✦</span> Confidentiality
              </h3>
              <p className="text-sm text-gray-400">
                Your journey is sacred. Every conversation we have is kept strictly private and confidential.
              </p>
            </div>
          </div>

        </div>

        {/* Closing Thought */}
        <div className="mt-16 text-center">
          <p className="text-purple-300/70 font-light italic mb-8">
            "Your clarity is already within you; I just help you find the light to see it."
          </p>
          
          <a 
            href="/home" 
            className="inline-block text-xs uppercase tracking-widest text-gray-400 hover:text-white border-b border-transparent hover:border-purple-500 pb-1 transition-all"
          >
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}