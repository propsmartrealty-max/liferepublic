import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const NAV_LINKS = [
    { name: 'Projects', path: '/projects' },
    { name: 'Township', path: '/township-guide' },
    { name: 'Garden', path: '/amenities' },
    { name: 'Location', path: '/location' },
    { name: 'Lifestyle', path: '/lifestyle' },
];

// ─── Magnetic button — follows cursor slightly ───────────────────────────────
const MagneticLink: React.FC<{
    to: string;
    children: React.ReactNode;
    isActive: boolean;
    onClick?: () => void;
}> = ({ to, children, isActive, onClick }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const navigate = useNavigate();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const onMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
        x.set(dx);
        y.set(dy);
    };

    const onMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref as any}
            href={to}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={(e) => { 
                e.preventDefault(); 
                onClick?.(); 
                navigate(to); 
            }}
            style={{ x: springX, y: springY }}
            className="relative group cursor-interactive select-none"
        >
            {/* Rainbow underline glow on hover */}
            <span
                className="relative z-10 block px-4 py-2 text-sm font-black uppercase tracking-[0.12em] transition-colors duration-200"
                style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
                {children}
                {/* Animated underline */}
                <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-rainbow rounded-full transition-all duration-300 origin-left"
                    style={{
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        opacity: isActive ? 1 : 0,
                    }}
                />
                <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-rainbow rounded-full transition-all duration-300 origin-left opacity-0 group-hover:opacity-100 group-hover:scale-x-100 scale-x-0"
                />
            </span>
        </motion.a>
    );
};

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const routerNavigate = useNavigate();

    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navigate = (path: string) => {
        setMenuOpen(false);
        routerNavigate(path);
    };

    return (
        <>
            {/* ── Rainbow accent bar ────────────────────────────────── */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-rainbow z-[110]" />

            {/* ── Main navbar ───────────────────────────────────────── */}
            <motion.header
                className="fixed left-0 right-0 z-[100]"
                style={{ top: '3px' }}
                initial={false}
                animate={{
                    background: scrolled
                        ? 'rgba(5,5,5,0.96)'
                        : 'rgba(5,5,5,0.72)',
                    backdropFilter: 'blur(28px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: scrolled
                        ? '0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)'
                        : '0 10px 30px rgba(0,0,0,0.3)',
                }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
                <div
                    className="mx-auto flex items-center justify-between px-6 lg:px-12"
                    style={{
                        maxWidth: '1400px',
                        height: scrolled ? '72px' : '88px',
                        transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                >
                    {/* ── Logo ──────────────────────────────────────── */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 cursor-interactive shrink-0 group"
                        aria-label="Life Republic Home"
                    >
                        <motion.img
                            src="/logo.webp"
                            alt="Life Republic"
                            animate={{ height: scrolled ? 44 : 56 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="object-contain"
                            style={{ mixBlendMode: 'lighten' }}
                        />
                    </Link>

                    {/* ── Desktop links ─────────────────────────────── */}
                    <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
                        {NAV_LINKS.map((item) => (
                            <MagneticLink
                                key={item.name}
                                to={item.path}
                                isActive={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                            >
                                {item.name}
                            </MagneticLink>
                        ))}
                    </nav>

                    {/* ── Right side ────────────────────────────────── */}
                    <div className="flex items-center gap-3">

                        {/* Enquire CTA — desktop */}
                        <motion.button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="hidden md:flex items-center gap-2 cursor-interactive relative overflow-hidden group"
                            style={{
                                padding: scrolled ? '10px 24px' : '12px 28px',
                                borderRadius: '9999px',
                                background: '#fff',
                                color: '#050505',
                                fontSize: '11px',
                                fontWeight: 900,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                transition: 'padding 0.4s ease',
                            }}
                            aria-label="Enquire now"
                        >
                            {/* Rainbow sweep on hover */}
                            <span
                                className="absolute inset-0 bg-rainbow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                Enquire Now
                            </span>
                            {/* Arrow icon */}
                            <svg
                                className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 transition-transform"
                                width="12" height="12" viewBox="0 0 12 12" fill="none"
                            >
                                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>

                        {/* Hamburger — tablet & mobile */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="lg:hidden cursor-interactive flex items-center justify-center relative"
                            style={{
                                width: 48, height: 48,
                                borderRadius: '14px',
                                background: menuOpen ? '#fff' : 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                transition: 'all 0.3s ease',
                            }}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            <div className="flex flex-col justify-center items-center gap-[5px] w-5">
                                <motion.span
                                    animate={menuOpen
                                        ? { rotate: 45, y: 7, backgroundColor: '#050505' }
                                        : { rotate: 0, y: 0, backgroundColor: '#ffffff' }
                                    }
                                    className="block w-5 h-[2px] rounded-full origin-center"
                                    transition={{ duration: 0.25 }}
                                />
                                <motion.span
                                    animate={menuOpen
                                        ? { opacity: 0, scaleX: 0, backgroundColor: '#050505' }
                                        : { opacity: 1, scaleX: 1, backgroundColor: '#ffffff' }
                                    }
                                    className="block w-5 h-[2px] rounded-full"
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    animate={menuOpen
                                        ? { rotate: -45, y: -7, backgroundColor: '#050505' }
                                        : { rotate: 0, y: 0, backgroundColor: '#ffffff' }
                                    }
                                    className="block w-5 h-[2px] rounded-full origin-center"
                                    transition={{ duration: 0.25 }}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* ── Rainbow bottom glow line (visible on scroll) ─── */}
                <AnimatePresence>
                    {scrolled && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0 }}
                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-rainbow"
                            style={{ opacity: 0.25 }}
                        />
                    )}
                </AnimatePresence>
            </motion.header>

            {/* ── MOBILE FULL-SCREEN MENU ───────────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        key="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 0)' }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed inset-0 z-[99] flex flex-col"
                        style={{ background: '#050505', paddingTop: '91px' }}
                    >
                        {/* Decorative rainbow stripe at top */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-rainbow" />

                        {/* Background pattern */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(227,24,55,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,156,222,0.06) 0%, transparent 50%)',
                            }}
                        />

                        {/* Nav items */}
                        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
                            {[...NAV_LINKS].map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -32 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -32 }}
                                    transition={{ delay: 0.05 + i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setMenuOpen(false)}
                                        className="group flex items-center justify-between py-4 cursor-interactive"
                                        style={{
                                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <span
                                            className="font-black uppercase tracking-[0.08em] transition-all duration-300"
                                            style={{
                                                fontSize: 'clamp(28px, 8vw, 52px)',
                                                lineHeight: 1.1,
                                                color: location.pathname === item.path ? 'transparent' : '#fff',
                                                WebkitTextStroke: location.pathname === item.path ? '1px transparent' : undefined,
                                                background: location.pathname === item.path ? 'var(--lr-rainbow)' : 'none',
                                                WebkitBackgroundClip: location.pathname === item.path ? 'text' : 'unset',
                                                backgroundClip: location.pathname === item.path ? 'text' : 'unset',
                                                WebkitTextFillColor: location.pathname === item.path ? 'transparent' : 'inherit',
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                        <motion.span
                                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ background: 'rgba(255,255,255,0.05)' }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                            className="px-8 pb-12 flex flex-col gap-4"
                        >
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
                                }}
                                className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.12em] text-sm relative overflow-hidden group cursor-interactive"
                                style={{ background: '#fff', color: '#050505' }}
                            >
                                <span className="absolute inset-0 bg-rainbow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                    Enquire Now →
                                </span>
                            </button>

                            <p
                                className="text-center text-[11px] font-bold uppercase tracking-[0.3em]"
                                style={{ color: 'rgba(255,255,255,0.18)' }}
                            >
                                Life Republic · Hinjewadi · Pune
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
