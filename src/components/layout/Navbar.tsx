import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-white/10 py-4' : 'bg-gradient-to-b from-black/80 to-transparent border-transparent py-6'}`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-4 group z-50">
                    <img src="/images/logo/Kolte_Patil_logo.svg" alt="Kolte Patil Logo" className="h-8 md:h-10 brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="w-px h-8 bg-white/20 hidden md:block"></div>
                    <div className="hidden md:flex flex-col">
                        <span className="text-white font-serif tracking-widest text-sm uppercase">Life Republic</span>
                        <span className="text-primary text-[9px] uppercase tracking-[0.2em]">Hinjewadi, Pune</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-10">
                    {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-[11px] font-sans font-medium text-white/70 hover:text-primary uppercase tracking-[0.2em] transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex items-center z-50">
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary hover:text-black font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-500"
                    >
                        Enquire Now
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-center items-center gap-8"
                    >
                        {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={item}
                            >
                                <Link 
                                    to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-serif text-white hover:text-primary transition-colors"
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.button 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('open-enquiry-modal')); }}
                            className="mt-8 px-12 py-4 bg-primary text-black font-sans text-xs font-semibold tracking-[0.2em] uppercase"
                        >
                            Enquire Now
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
