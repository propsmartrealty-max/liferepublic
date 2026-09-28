import React from 'react';
import { motion } from 'framer-motion';
import { MorphingBackground } from '../ui/MorphingBackground';

export const HeroSlider = () => {
    return (
        <section className="pt-28 pb-12 px-4 bg-white min-h-[70vh] flex flex-col items-center text-center overflow-hidden relative">
            <MorphingBackground />
            <div className="max-w-4xl mx-auto z-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F0FE] text-[#1a73e8] text-sm font-medium"
                >
                    <span className="material-symbol text-lg">new_releases</span>
                    New Sector Launch
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-5xl font-sans font-medium text-[#202124] tracking-tight leading-[1.1] mb-6"
                >
                    Experience liftoff with <br className="hidden md:block"/>
                    the next-gen township
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-[#5F6368] mb-8 font-normal max-w-2xl mx-auto"
                >
                    390 acres of beautifully engineered spatial design. Discover premium residences integrated seamlessly into Hinjewadi.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="google-btn text-base px-8 py-3 w-full sm:w-auto"
                    >
                        Schedule Tour
                    </button>
                    <button 
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="google-btn-secondary text-base px-8 py-3 w-full sm:w-auto"
                    >
                        View Projects
                    </button>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-6xl mx-auto rounded-[24px] overflow-hidden shadow-google border border-[#DADCE0]"
            >
                <img 
                    src="/images/home/slider-1.webp" 
                    alt="Life Republic Campus" 
                    className="w-full aspect-[16/7] object-cover"
                />
            </motion.div>
        </section>
    );
};
