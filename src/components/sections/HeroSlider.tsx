import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Ultra-Advanced Animated Background */}
            <div className="absolute inset-0 w-full h-full bg-grid z-0 opacity-40"></div>
            
            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow z-0" style={{ animationDelay: '2s' }}></div>

            <motion.div 
                style={{ y, opacity }}
                className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-20"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">The Future of Township Living</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[8rem] font-display font-bold tracking-tighter leading-[0.9] mb-8"
                >
                    Redefining <br/>
                    <span className="text-gradient-primary">Sovereignty.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    390 Acres of meticulously engineered architecture. <br className="hidden md:block" />
                    Enter a paradigm where design meets infinite scale.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:scale-105 transition-transform"
                    >
                        Initialize Journey
                    </button>
                    <button 
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-medium tracking-wide hover:bg-white/10 transition-colors backdrop-blur-md"
                    >
                        Explore Enclaves
                    </button>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </section>
    );
};
