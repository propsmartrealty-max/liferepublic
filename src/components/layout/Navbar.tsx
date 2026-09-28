import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] mix-blend-difference text-white">
            <div className="container mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-interactive z-50">
                    <img src="/logo.webp" alt="Life Republic" className="h-10 object-contain mix-blend-lighten" />
                </Link>

                {/* Desktop Links - Minimal */}
                <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium">
                    {['Projects', 'Master Plan', 'Location'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="hover:opacity-50 transition-opacity cursor-interactive"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center z-50">
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="border border-white rounded-full px-6 py-2 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors cursor-interactive"
                    >
                        Enquire
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden z-50 cursor-interactive" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span className="material-symbol text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center mix-blend-normal text-white"
                    >
                        {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={item}
                                className="my-4"
                            >
                                <Link 
                                    to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-4xl font-light uppercase tracking-widest"
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
