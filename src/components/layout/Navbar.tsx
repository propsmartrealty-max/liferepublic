import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#DADCE0]">
            <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <span className="material-symbol text-[#1a73e8] text-2xl">apartment</span>
                    <span className="font-sans font-medium text-[#202124] text-xl tracking-tight">Life Republic</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#5F6368]">
                    {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="hover:text-[#202124] transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center z-50">
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="google-btn"
                    >
                        Enquire
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-[#5F6368] z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span className="material-symbol text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 top-16 bg-white z-40 flex flex-col px-6 py-8"
                    >
                        {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={item}
                                className="border-b border-[#F1F3F4] py-4"
                            >
                                <Link 
                                    to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xl font-medium text-[#202124]"
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
