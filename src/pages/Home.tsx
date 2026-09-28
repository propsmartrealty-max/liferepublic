import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    useEffect(() => {
        // Force the body to not scroll, we will scroll the container
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
            
            {/* Slide 1: Hero */}
            <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/home/slider-1.webp" alt="Life Republic" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
                </div>
                <div className="z-10 text-center px-4 max-w-5xl">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-sans font-medium text-white tracking-tight mb-6"
                    >
                        Life Republic.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl md:text-3xl text-white/80 font-light tracking-wide"
                    >
                        The future of township living.
                    </motion.p>
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce text-white/50">
                    <span className="text-xs uppercase tracking-[0.2em] mb-2">Scroll</span>
                    <span className="material-symbol">arrow_downward</span>
                </div>
            </section>

            {/* Slide 2: Scale & Vision */}
            <section className="h-screen w-full snap-start relative flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/home/overview-img.jpg" alt="Scale" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="z-10 px-8 md:px-24 max-w-4xl">
                    <motion.p 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-2xl md:text-5xl font-sans font-medium text-white leading-tight mb-8"
                    >
                        390 acres of beautifully engineered spatial design.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <button onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))} className="text-white border border-white/30 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm cursor-interactive">
                            Schedule a Private Tour
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Slide 3: The Residences */}
            <section className="h-screen w-full snap-start relative bg-[#0a0a0a] flex items-center justify-center">
                <div className="absolute inset-0 z-0 flex md:flex-row flex-col">
                    <div className="flex-1 relative group cursor-interactive overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">2 & 3 BHK</h2>
                        </div>
                        <Link to="/projects" className="absolute inset-0 z-10"></Link>
                    </div>
                    <div className="flex-1 relative group cursor-interactive overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600607687931-cece5ce21448?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">Villas</h2>
                        </div>
                        <Link to="/projects" className="absolute inset-0 z-10"></Link>
                    </div>
                </div>
                <div className="absolute top-16 text-center z-10 w-full pointer-events-none">
                    <span className="text-white/50 uppercase tracking-[0.3em] text-sm">The Residences</span>
                </div>
            </section>

            {/* Slide 4: Location */}
            <section className="h-screen w-full snap-start relative flex items-center justify-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop" alt="City" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-transparent"></div>
                </div>
                <div className="z-10 px-8 md:px-24 max-w-2xl text-right">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl font-sans font-medium text-white mb-6"
                    >
                        Connected to <br/>everything.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-xl text-white/70 mb-12"
                    >
                        Hinjewadi Phase 1. Just minutes from Pune's largest IT hub and the upcoming Metro Line 3.
                    </motion.p>
                    <Link to="/location" className="text-white border-b border-white/30 pb-2 hover:border-white transition-colors uppercase tracking-widest text-sm cursor-interactive">
                        Explore Location
                    </Link>
                </div>
            </section>

        </main>
    );
};
export default Home;
