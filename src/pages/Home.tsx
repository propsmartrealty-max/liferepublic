import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { KineticText } from '../components/ui/KineticText';
import { MagneticButton } from '../components/ui/MagneticButton';

export const Home = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const slides = 4;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollY = containerRef.current.scrollTop;
                const windowHeight = window.innerHeight;
                // Calculate which slide is currently in view (rounding to nearest integer)
                const current = Math.round(scrollY / windowHeight);
                setActiveSlide(current);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            document.body.style.overflow = 'auto';
            if (container) container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main ref={containerRef} className="w-full bg-black scroll-smooth">
            
            {/* Minimalist Slide Progress Tracker */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 mix-blend-difference pointer-events-none">
                {[...Array(slides)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        {activeSlide === i && (
                            <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-white text-[10px] tracking-[0.2em]"
                            >
                                0{i + 1}
                            </motion.span>
                        )}
                        <div className={`w-[1px] transition-all duration-500 ${activeSlide === i ? 'h-12 bg-white' : 'h-4 bg-white/20'}`} />
                    </div>
                ))}
            </div>

            {/* Slide 1: Hero Video */}
            <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    
                    {/* Hero Architectural Shot */}
                    <motion.img 
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 15, ease: 'easeOut' }}
                        src="/hero-new.jpg" 
                        alt="Life Republic Pune" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]/90"></div>

                </div>
                <div className="z-10 text-center px-4 max-w-5xl flex flex-col items-center">
                    <KineticText 
                        as="h1"
                        text="Kolte Patil Life Republic Township Hinjewadi" 
                        className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tighter mb-6 justify-center rainbow-aura leading-[1.1]"
                    />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-xl md:text-3xl text-white/80 font-light tracking-wide"
                    >
                        An Integrated Township Near Hinjewadi, Pune.
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
                    <motion.img 
                        whileInView={{ scale: 1.05 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src="/images/home/overview-img.jpg" 
                        alt="Scale" 
                        className="w-full h-full object-cover opacity-40" 
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="z-10 px-8 md:px-24 max-w-4xl">
                    <KineticText 
                        text="390 acres of beautifully engineered spatial design." 
                        className="text-3xl md:text-5xl font-sans font-medium text-white leading-[1.1] mb-12"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <MagneticButton 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))} 
                            className="text-white border border-white/30 rounded-full px-10 py-5 bg-rainbow-hover transition-all duration-500 tracking-[0.2em] text-xs uppercase"
                        >
                            Schedule a Private Tour
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>

            {/* Slide 3: The Residences */}
            <section className="h-screen w-full snap-start relative bg-[#0a0a0a] flex items-center justify-center">
                <div className="absolute inset-0 z-0 flex md:flex-row flex-col">
                    <div className="flex-1 relative group cursor-interactive overflow-hidden">
                        <img src="https://liferepublic.in/images/projects/location/172060335117189650503rd Avenue-.jpg" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight drop-shadow-2xl">Apartments</h2>
                            <p className="absolute bottom-10 text-white/70 text-sm font-light max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Explore current and completed Life Republic projects including Qrious, Duet, Canvas, Aros, Atmos, and Echoes. Compare 2 & 3 BHK homes, floor plans, and RERA details.</p>
                        </div>
                        <Link to="/projects" className="absolute inset-0 z-10"></Link>
                    </div>
                    <div className="flex-1 relative group cursor-interactive overflow-hidden">
                        <img src="https://liferepublic.in/images/home/box-img-01.jpg" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight drop-shadow-2xl">Township</h2>
                            <p className="absolute bottom-10 text-white/70 text-sm font-light max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Explore the Kolte-Patil Life Republic Pune location, connectivity to Hinjewadi IT Park, township amenities, and resale investment potential.</p>
                        </div>
                        <Link to="/township-guide" className="absolute inset-0 z-10"></Link>
                    </div>
                </div>
                <div className="absolute top-16 text-center z-10 w-full pointer-events-none">
                    <span className="rainbow-text-clip font-bold uppercase tracking-[0.3em] text-sm">The Residences</span>
                </div>
            </section>

            {/* Slide 4: Location */}
            <section className="h-screen w-full snap-start relative flex items-center justify-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img 
                        whileInView={{ x: 0 }}
                        initial={{ x: 50 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop" 
                        alt="City" 
                        className="w-full h-full object-cover opacity-30" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent"></div>
                </div>
                <div className="z-10 px-8 md:px-24 max-w-2xl text-right flex flex-col items-end">
                    <KineticText 
                        text="Connected to everything." 
                        className="text-4xl md:text-5xl font-sans font-medium text-white mb-6 justify-end"
                    />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-xl text-white/70 mb-12 font-light max-w-md"
                    >
                        Hinjewadi Phase 1. Just minutes from Pune's largest IT hub and the upcoming Metro Line 3.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <MagneticButton>
                            <Link to="/location" className="text-white border-b border-white/30 pb-2 hover:border-white transition-colors tracking-[0.2em] text-sm uppercase">
                                Explore Location
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

export default Home;
