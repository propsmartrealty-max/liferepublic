import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Sparkles, Navigation } from 'lucide-react';

export const AerialTour: React.FC = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [10, 0, 0, 10]);

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-white">
            <div className="sticky top-0 h-[75vh] w-full overflow-hidden">
                <motion.div 
                    style={{ scale, filter: `blur(${blur}px)` }}
                    className="absolute inset-0"
                >
                    <img loading="lazy" 
                        src="/images/aerial-sunset.png" 
                        alt="Life Republic Aerial Tour" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-secondary/60"></div>
                </motion.div>

                {/* UI Overlays */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <motion.div 
                        style={{ opacity }}
                        className="text-center text-[#202124] px-4"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-8 backdrop-blur-xl">
                            <Plane size={16} className="text-[#1a73e8]" />
                            <span className="text-[10px] font-bold tracking-tight font-semibold text-[#1a73e8]">Cinematic Aerial Sequence</span>
                        </div>
                        <h2 className="text-5xl md:text-5xl font-sans font-bold mb-6 drop-shadow-2xl">
                            The Horizon of <br /> <span className="text-[#1a73e8] italic">Sovereignty.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-[#202124]/80 max-w-2xl mx-auto font-medium">
                            Scroll to descend into the 390-acre master plan.
                        </p>
                    </motion.div>
                </div>

                {/* Metadata HUD */}
                <div className="absolute bottom-6 sm:bottom-12 left-6 right-6 sm:left-12 sm:right-12 flex flex-col sm:flex-row justify-between items-start sm:items-end z-20 gap-6 sm:gap-0">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#202124]/60">
                            <Navigation size={20} className="text-[#1a73e8] shrink-0" />
                            <span className="text-xs font-bold tracking-tight font-medium">Altitude: 1200ft MSL</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#202124]/60">
                            <Sparkles size={20} className="text-[#1a73e8] shrink-0" />
                            <span className="text-xs font-bold tracking-tight font-medium">Visual Index: 98.4%</span>
                        </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                        <div className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold mb-2">Live Rendering</div>
                        <div className="w-full sm:w-48 h-1 bg-[#151822] border border-[#DADCE0]/10 rounded-full overflow-hidden">
                            <motion.div 
                                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                className="h-full bg-accent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
