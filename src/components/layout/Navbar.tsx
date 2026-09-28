import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-1000 ${isScrolled ? 'glass-pill px-8 py-3' : 'glass-pill bg-transparent border-transparent px-8 py-4'}`}
        >
            <div className="flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group z-50">
                    <div className="w-6 h-6 rounded-full border-[0.5px] border-white/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-500"></div>
                    </div>
                    <span className="font-sans font-light text-white tracking-[0.2em] text-[11px] uppercase">Life Republic</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-12 absolute left-1/2 -translate-x-1/2">
                    {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="slim-text text-[10px] hover:text-white transition-colors duration-500"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex items-center z-50">
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="font-sans font-light text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-500 relative group"
                    >
                        <span>Enquire</span>
                        <div className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-white/50 group-hover:w-full transition-all duration-700"></div>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#030508]/90 backdrop-blur-3xl z-40 flex flex-col justify-center items-center gap-10"
                    >
                        {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                key={item}
                            >
                                <Link 
                                    to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-4xl font-sans font-thin text-white/50 hover:text-white tracking-widest transition-colors duration-500"
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
