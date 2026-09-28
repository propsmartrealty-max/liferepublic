import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-[#D2D2D7]/50">
            <div className="container mx-auto px-4 max-w-5xl h-14 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <span className="font-semibold text-[#1D1D1F] text-lg tracking-tight">Life Republic</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-[#1D1D1F]/80">
                    {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="hover:text-[#1D1D1F] transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center z-50">
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                        className="apple-btn px-4 py-1.5 text-xs"
                    >
                        Enquire
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-[#1D1D1F] z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 top-14 bg-[#F5F5F7] z-40 flex flex-col px-6 py-8"
                    >
                        {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={item}
                                className="border-b border-[#D2D2D7] py-4"
                            >
                                <Link 
                                    to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-semibold text-[#1D1D1F]"
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
