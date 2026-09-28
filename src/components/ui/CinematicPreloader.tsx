import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicPreloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        
        // Simulate rapid asset loading
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = 'auto';
        }, 2200); // 2.2 seconds total duration

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
                >
                    {/* Background Subtle Gradient Pulse */}
                    <motion.div 
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-black"
                    />

                    {/* Logo Reveal */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <img 
                            src="/logo.webp" 
                            alt="Kolte Patil Life Republic" 
                            className="h-20 md:h-28 object-contain drop-shadow-2xl mix-blend-lighten mb-12" 
                        />
                        
                        <div className="flex flex-col items-center gap-2 opacity-60">
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-[9px] uppercase tracking-[0.4em] text-white font-bold"
                            >
                                Initializing Global Township
                            </motion.span>
                            <span className="rainbow-text-clip text-xs font-mono font-bold tracking-widest">
                                {Math.min(progress, 100)}%
                            </span>
                        </div>
                    </motion.div>
                    
                    {/* Ultra-sleek Rainbow Progress Bar */}
                    <motion.div 
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-rainbow"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
