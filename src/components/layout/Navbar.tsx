import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B0D14]/95 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center z-50">
                        <div className="bg-white rounded-md px-4 py-2 border border-[#E5C07B]/50 flex items-center shadow-[0_0_15px_rgba(229,192,123,0.15)]">
                            <span className="text-xl font-serif font-bold text-[#7F1D1D] tracking-tight">KOLTE PATIL</span>
                            <span className="w-px h-6 bg-gray-300 mx-3"></span>
                            <span className="text-xs font-bold text-gray-800 tracking-widest uppercase">Life Republic</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {[
                            { name: 'TOWNSHIP', path: '/master-plan' },
                            { name: 'VILLAS & PLOTS', path: '/projects/nora-plots' },
                            { name: 'APARTMENTS', path: '/projects' },
                            { name: 'HIGH STREET', path: '/location' },
                            { name: 'SCHOOL', path: '/lifestyle' }
                        ].map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="text-[11px] font-bold text-white hover:text-[#E5C07B] uppercase tracking-[0.15em] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center space-x-3 z-50">
                        <Button className="bg-[#10B981] hover:bg-[#059669] text-white text-[10px] uppercase font-bold tracking-wider px-5 py-2.5 rounded-full shadow-md flex items-center gap-2">
                            <Phone size={14} className="fill-current" /> WHATSAPP
                        </Button>
                        <Button className="bg-transparent border border-white/20 text-white hover:border-[#E5C07B] hover:text-[#E5C07B] text-[10px] uppercase font-bold tracking-wider px-5 py-2.5 rounded-full flex items-center gap-2">
                            <Search size={14} /> SEARCH
                        </Button>
                        <Button className="bg-[#7F1D1D] hover:bg-[#991B1B] text-white border border-red-900/50 text-[10px] uppercase font-bold tracking-wider px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(153,27,27,0.4)]" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>
                            ENQUIRE
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className="lg:hidden text-white z-50 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-[#0B0D14] z-40 pt-24 px-6 flex flex-col">
                    <div className="flex flex-col space-y-6 flex-1">
                        {[
                            { name: 'TOWNSHIP', path: '/master-plan' },
                            { name: 'VILLAS & PLOTS', path: '/projects/nora-plots' },
                            { name: 'APARTMENTS', path: '/projects' },
                            { name: 'HIGH STREET', path: '/location' },
                            { name: 'SCHOOL', path: '/lifestyle' }
                        ].map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-serif font-bold text-white border-b border-white/10 pb-4"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pb-12 space-y-4">
                        <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-full font-bold tracking-wider uppercase text-sm">
                            WHATSAPP
                        </Button>
                        <Button className="w-full bg-[#7F1D1D] hover:bg-[#991B1B] text-white py-4 rounded-full font-bold tracking-wider uppercase text-sm border border-red-900/50" onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('open-enquiry-modal')); }}>
                            ENQUIRE NOW
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};
