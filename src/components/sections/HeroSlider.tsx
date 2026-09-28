import React from 'react';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0D14] flex flex-col items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D14]/80 via-[#0B0D14]/40 to-[#0B0D14] z-10" />
        <img
          src="/images/home/slider-1.webp"
          alt="Life Republic Township Aerial View"
          className="w-full h-full object-cover scale-105 opacity-60"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Top Location Pill */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
        >
            <span className="inline-block py-1.5 px-6 rounded-full bg-transparent border border-[#E5C07B]/30 text-[#E5C07B] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              <span className="text-lg leading-none align-middle mr-2">✦</span> 390-ACRE INTEGRATED TOWNSHIP ECOSYSTEM • HINJEWADI, PUNE
            </span>
        </motion.div>

        {/* Main Typography */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-6"
        >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-medium mb-2 drop-shadow-xl">
                Kolte Patil Life Republic
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-white leading-[1.05] drop-shadow-2xl">
                390-Acre Smart Township <span className="text-[#E5C07B]">Ecosystem</span>
            </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10"
        >
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                MahaRERA Sanctioned Premium Apartments, Luxury Villas, High Street Retail, 
                The Cliff Club & Anisha Global School — <span className="text-[#E5C07B] font-semibold">Starting ₹65 Lakhs*</span> just 10 Mins from 
                Hinjewadi IT Park.
            </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="border border-white/20 rounded-xl p-6 md:px-10 bg-black/20 backdrop-blur-sm mb-12 flex flex-col md:flex-row gap-8 md:gap-16 max-w-4xl w-full justify-center text-left"
        >
            <div>
                <p className="text-white font-serif text-2xl font-bold mb-1">390 Acres</p>
                <p className="text-[#E5C07B] text-[10px] uppercase tracking-widest font-bold">SMART TOWNSHIP</p>
            </div>
            <div className="w-px bg-transparent/20 hidden md:block"></div>
            <div>
                <p className="text-white font-serif text-2xl font-bold mb-1">Apts & Villas</p>
                <p className="text-[#E5C07B] text-[10px] uppercase tracking-widest font-bold">FROM ₹65 LAKHS*</p>
            </div>
            <div className="w-px bg-transparent/20 hidden md:block"></div>
            <div>
                <p className="text-white font-serif text-2xl font-bold mb-1">Anisha Global</p>
                <p className="text-[#E5C07B] text-[10px] uppercase tracking-widest font-bold">INTERNATIONAL SCHOOL</p>
            </div>
            <div className="w-px bg-transparent/20 hidden lg:block"></div>
            <div className="hidden lg:block">
                <p className="text-white font-serif text-2xl font-bold mb-1">Retail Hub</p>
                <p className="text-[#E5C07B] text-[10px] uppercase tracking-widest font-bold">HIGH STREET</p>
            </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
        >
            <button 
                className="bg-[#7F1D1D] hover:bg-[#991B1B] text-white border border-red-900/50 px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(153,27,27,0.4)] transition-all flex items-center justify-center gap-3"
                onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
            >
                <span className="text-[#E5C07B] text-lg leading-none">✦</span> ENQUIRE NOW
            </button>
            <button 
                className="bg-transparent hover:bg-[#151822] border border-white/10/5 text-white border border-white/20 px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
                EXPLORE TOWNSHIP <span className="rotate-90">➔</span>
            </button>
        </motion.div>

      </div>
    </section>
  );
};
