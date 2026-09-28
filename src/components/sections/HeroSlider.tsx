import React from 'react';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030508]">
            
            {/* Fluid Water/Aurora Background */}
            <div className="fluid-bg">
                <div className="fluid-orb bg-[#2DD4BF] w-[600px] h-[600px] -top-40 -left-20 animation-delay-2000"></div>
                <div className="fluid-orb bg-[#3B82F6] w-[500px] h-[500px] top-40 right-10 animation-delay-4000"></div>
                <div className="fluid-orb bg-[#8B5CF6] w-[700px] h-[700px] -bottom-40 left-1/4"></div>
            </div>

            {/* Wireframe Glass Overlay Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwaGF0IGQ9Ik00MCAwaC0xdjQwTTAgNDBWMzl0NDAtMXYtMUgwdjFINDBWMEgwdi0xIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-50 z-0"></div>

            <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="glass-pill px-6 py-2 mb-8 flex items-center gap-3 animate-float"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></div>
                    <span className="slim-text text-[10px]">Life Republic Township • Hinjewadi</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-sans font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 leading-tight mb-8"
                >
                    Fluid <span className="font-serif italic text-white">Living.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.6 }}
                    className="text-lg md:text-xl font-sans font-extralight text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed"
                >
                    An architectural ecosystem that flows seamlessly with your lifestyle. 
                    390 acres of unbounded, wireframe-precision design.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="glass-pill px-10 py-4 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-500 font-sans font-light tracking-[0.2em] text-[11px] uppercase group flex items-center justify-center gap-4"
                    >
                        <span>Experience the Flow</span>
                        <div className="w-8 h-px bg-white/30 group-hover:bg-white transition-colors duration-500"></div>
                    </button>
                </motion.div>
            </div>
            
            {/* Soft fade at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#030508] to-transparent z-10"></div>
        </section>
    );
};
