import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'Township', path: '/township-guide' },
    { name: 'Central Garden', path: '/amenities' },
    { name: 'Location', path: '/location' },
];

const mobileNavLinks = [
    ...navLinks,
    { name: 'Lifestyle', path: '/lifestyle' },
];

const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div className="relative w-6 h-5 flex flex-col justify-between" aria-hidden="true">
        <span
            className="block h-[2px] bg-white rounded-full transition-all duration-300 origin-left"
            style={{ transform: isOpen ? 'rotate(45deg) translate(2px, -2px)' : 'none' }}
        />
        <span
            className="block h-[2px] bg-white rounded-full transition-all duration-300"
            style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'none' }}
        />
        <span
            className="block h-[2px] bg-white rounded-full transition-all duration-300 origin-left"
            style={{ transform: isOpen ? 'rotate(-45deg) translate(2px, 2px)' : 'none' }}
        />
    </div>
);

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 60);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Rainbow accent bar */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-rainbow z-[110]" />

            {/* ── Floating pill nav ─────────────────────────────────── */}
            <div
                className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none"
                style={{
                    top: '3px', // sit just below the rainbow bar
                    paddingTop: scrolled ? '8px' : '14px',
                    transition: 'padding-top 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                <nav
                    className="pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6"
                    style={{
                        width: scrolled ? 'min(95%, 880px)' : 'min(100%, 1100px)',
                        height: scrolled ? '52px' : '60px',
                        borderRadius: '9999px',
                        background: scrolled
                            ? 'rgba(5,5,5,0.82)'
                            : 'rgba(5,5,5,0.45)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        boxShadow: scrolled
                            ? '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)'
                            : '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
                        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center cursor-interactive z-50 shrink-0" aria-label="Life Republic Home">
                        <img
                            src="/logo.webp"
                            alt="Life Republic"
                            style={{
                                height: scrolled ? '36px' : '42px',
                                objectFit: 'contain',
                                transition: 'height 0.4s ease',
                                mixBlendMode: 'lighten',
                            }}
                        />
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1 text-xs uppercase tracking-widest font-bold">
                        {navLinks.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="relative px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-interactive"
                                    style={{
                                        color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                                        background: isActive ? 'rgba(255,255,255,0.10)' : 'transparent',
                                    }}
                                >
                                    {item.name}
                                    {isActive && (
                                        <span
                                            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                            className="hidden sm:flex items-center px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-interactive"
                            style={{
                                border: '1px solid rgba(255,255,255,0.35)',
                                color: '#fff',
                                background: 'rgba(255,255,255,0.06)',
                            }}
                            aria-label="Enquire now"
                        >
                            Enquire
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full cursor-interactive focus-visible:outline-none"
                            style={{ background: 'rgba(255,255,255,0.08)' }}
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-nav-drawer"
                        >
                            <HamburgerIcon isOpen={isMobileMenuOpen} />
                        </button>
                    </div>
                </nav>
            </div>

            {/* ── Mobile Drawer ─────────────────────────────────────── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[90]"
                            style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="drawer"
                            id="mobile-nav-drawer"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            initial={{ opacity: 0, y: -12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.97 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="fixed z-[95] inset-x-3 rounded-3xl overflow-hidden flex flex-col"
                            style={{
                                top: '70px',
                                background: 'rgba(5,5,5,0.96)',
                                backdropFilter: 'blur(28px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
                                overflowY: 'auto',
                                maxHeight: '80vh',
                            }}
                        >
                            <div className="p-6 flex flex-col gap-1">
                                {mobileNavLinks.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 + i * 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center px-4 py-3.5 rounded-2xl text-base font-bold uppercase tracking-widest transition-all duration-200 active:scale-[0.98] cursor-interactive"
                                            style={{
                                                color: location.pathname === item.path ? '#fff' : 'rgba(255,255,255,0.65)',
                                                background: location.pathname === item.path ? 'rgba(255,255,255,0.08)' : 'transparent',
                                                borderLeft: location.pathname === item.path ? '2px solid rgba(255,255,255,0.6)' : '2px solid transparent',
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.35 }}
                                    className="h-px my-3"
                                    style={{ background: 'rgba(255,255,255,0.08)' }}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.38 }}
                                >
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
                                        }}
                                        className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-200 active:scale-[0.98] cursor-interactive"
                                        style={{
                                            background: '#fff',
                                            color: '#050505',
                                        }}
                                    >
                                        Enquire Now
                                    </button>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.45 }}
                                    className="text-center text-[10px] mt-4 tracking-[0.2em] uppercase"
                                    style={{ color: 'rgba(255,255,255,0.2)' }}
                                >
                                    Life Republic · Hinjewadi · Pune
                                </motion.p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
