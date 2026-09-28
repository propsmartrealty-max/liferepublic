import React from 'react';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
    return (
        <section className="pt-32 pb-16 px-4 bg-[#F5F5F7] min-h-[85vh] flex flex-col items-center justify-between text-center overflow-hidden">
            <div className="max-w-3xl mx-auto z-10 mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl font-bold text-[#1D1D1F] tracking-tight leading-tight mb-4"
                >
                    Life Republic. <br className="hidden md:block"/>
                    <span className="text-[#86868B]">The future of living.</span>
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-lg md:text-xl text-[#1D1D1F] mb-8 font-medium"
                >
                    390 acres of absolute perfection. Now available in Hinjewadi.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="apple-btn px-8 py-3 text-base w-full sm:w-auto"
                    >
                        Schedule Tour
                    </button>
                    <button 
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[#0066CC] font-medium hover:underline flex items-center gap-1 text-base px-4 py-3"
                    >
                        View projects <span className="text-xl leading-none">›</span>
                    </button>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-apple"
            >
                <img 
                    src="/images/home/slider-1.webp" 
                    alt="Life Republic Campus" 
                    className="w-full aspect-[16/7] md:aspect-[21/9] object-cover hover:scale-105 transition-transform duration-1000"
                />
            </motion.div>
        </section>
    );
};
