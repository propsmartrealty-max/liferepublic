import React from 'react';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/home/slider-1.webp"
                    alt="Life Republic Luxury Township"
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0A0A0A] z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full container mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 md:pb-32">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-6 flex items-center gap-4"
                    >
                        <div className="w-12 h-px bg-primary"></div>
                        <span className="text-primary text-[10px] md:text-xs font-sans font-semibold tracking-[0.3em] uppercase">
                            Kolte Patil Developers
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white leading-[1.1] mb-8"
                    >
                        A Masterpiece of <br/>
                        <span className="text-primary italic font-normal">Modern Living.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-lg md:text-xl text-white/70 font-sans font-light leading-relaxed max-w-2xl mb-12"
                    >
                        Discover 390 acres of meticulously crafted spatial design. Premium residences, 
                        villas, and high-street luxury seamlessly integrated in Hinjewadi.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                            className="px-10 py-4 bg-primary text-black font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500"
                        >
                            Schedule a Private Tour
                        </button>
                        <button 
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-transparent border border-white/30 text-white font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:border-white transition-colors duration-500"
                        >
                            Explore Residences
                        </button>
                    </motion.div>
                </div>
            </div>
            
            {/* Elegant Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 right-12 z-20 hidden md:flex flex-col items-center gap-4"
            >
                <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-sans" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
                <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
            </motion.div>
        </section>
    );
};
