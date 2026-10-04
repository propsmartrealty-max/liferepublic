import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
    ChevronDown, 
    Search, 
    Phone, 
    Sparkles, 
    ArrowRight, 
    ShieldCheck, 
    Building2, 
    MapPin, 
    Trees, 
    GraduationCap, 
    Layers, 
    Compass,
    CheckCircle2
} from 'lucide-react';
import { CLUSTERS } from '../../lib/clusters';

// ─── Verified Featured Clusters for Mega Menu ─────────────────────────────────
const FEATURED_CLUSTERS = [
    {
        name: 'Qrious',
        slug: 'kolte-patil-life-republic-qrious',
        sector: 'Sector R1',
        typology: '2 & 3 BHK',
        price: '₹68 Lakhs*',
        status: 'Under Construction',
        possession: 'Dec 2026',
        image: 'https://liferepublic.in/images/projects/location/17507612781749724578qriousele1.jpg'
    },
    {
        name: 'Duet',
        slug: 'kolte-patil-life-republic-duet',
        sector: 'Sector R34',
        typology: 'Smart 2 BHK',
        price: '₹79 Lakhs*',
        status: 'Under Construction',
        possession: 'Dec 2030',
        image: '/images/projects/1747221568duet_banner.jpg'
    },
    {
        name: 'Canvas',
        slug: 'kolte-patil-life-republic-canvas',
        sector: 'Sector R1',
        typology: '3 & 4 BHK Luxury',
        price: '₹1.35 Cr*',
        status: 'Under Construction',
        possession: 'Dec 2027',
        image: 'https://liferepublic.in/images/project/gallery/1727440628GATE%20SCULPTURE.webp'
    },
    {
        name: 'Aros',
        slug: 'kolte-patil-life-republic-aros',
        sector: 'Sector R13',
        typology: '2 & 3 BHK High-Rise',
        price: '₹79 Lakhs*',
        status: 'Under Construction',
        possession: 'June 2028',
        image: '/images/projects/17523100953-bhk-flats-in-pune-hinjewadi-aros-life-republic.webp'
    },
    {
        name: 'Atmos',
        slug: 'kolte-patil-life-republic-atmos',
        sector: 'Sector R22',
        typology: '2, 2.5 & 3 BHK',
        price: '₹90 Lakhs*',
        status: 'Under Construction',
        possession: 'Dec 2028',
        image: '/images/projects/1718284587atmosb.webp'
    },
    {
        name: 'Echoes',
        slug: 'kolte-patil-life-republic-echoes',
        sector: 'Sector R16',
        typology: '2 & 3 BHK Scenic',
        price: '₹79 Lakhs*',
        status: 'Under Construction',
        possession: 'Dec 2027',
        image: 'https://liferepublic.in/images/project/gallery/171083281311.webp'
    }
];

const TOWNSHIP_HIGHLIGHTS = [
    {
        title: '150-Acre Master Ecosystem',
        desc: 'Self-sustainable gated mega-township with multi-layer security',
        path: '/township-guide#master-plan',
        icon: Trees
    },
    {
        title: 'Anisha Global School',
        desc: '4.5-Acre international standard CBSE school within campus',
        path: '/township-guide#school',
        icon: GraduationCap
    },
    {
        title: 'Global Amenities & Clubhouses',
        desc: 'Olympic-sized swimming pools, sports arenas, and fitness complexes',
        path: '/amenities',
        icon: Layers
    },
    {
        title: 'Green Canopy & Sustainability',
        desc: 'Over 20,000 trees, rainwater harvesting, and zero-discharge STP',
        path: '/sustainability',
        icon: Compass
    }
];

const LOCATION_HIGHLIGHTS = [
    {
        title: 'Hinjewadi IT Hub Proximity',
        desc: '5-10 minutes from Wipro, Infosys, TCS & Cognizant campuses',
        path: '/location#it-parks',
        tag: 'Phase 1, 2, 3'
    },
    {
        title: 'Upcoming Metro Line 3',
        desc: 'Direct rapid transit connection linking Hinjewadi to Shivajinagar',
        path: '/connectivity',
        tag: 'Rapid Transit'
    },
    {
        title: 'Mumbai-Pune Expressway',
        desc: 'Seamless signal-free access via newly widened arterial spine roads',
        path: '/location',
        tag: 'Strategic Access'
    }
];

// ─── Magnetic Nav Item ────────────────────────────────────────────────────────
const MagneticNavItem: React.FC<{
    title: string;
    isActive: boolean;
    hasDropdown?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}> = ({ title, isActive, hasDropdown, isOpen, onClick, onMouseEnter, onMouseLeave }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 350, damping: 25 });
    const springY = useSpring(y, { stiffness: 350, damping: 25 });

    const onMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.2;
        x.set(dx);
        y.set(dy);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        onMouseLeave?.();
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-full flex items-center"
        >
            <motion.button
                onClick={onClick}
                style={{ x: springX, y: springY }}
                className={`relative px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 cursor-interactive select-none ${
                    isOpen ? 'bg-white/10 text-white' : isActive ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
            >
                <span className="text-[13px] font-black uppercase tracking-[0.14em]">
                    {title}
                </span>

                {hasDropdown && (
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-white/50 group-hover:text-white"
                    >
                        <ChevronDown size={14} />
                    </motion.div>
                )}

                {/* Active Indicator Underline */}
                {isActive && (
                    <motion.div
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-rainbow rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}
            </motion.button>
        </div>
    );
};

// ─── Main Navbar Component ───────────────────────────────────────────────────
export const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<'projects' | 'township' | 'location' | null>(null);
    const [mobileProjectsExpanded, setMobileProjectsExpanded] = useState(false);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const location = useLocation();
    const routerNavigate = useNavigate();

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 40);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Close on route navigation
    useEffect(() => {
        setMenuOpen(false);
        setActiveDropdown(null);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleMouseEnterDropdown = (type: 'projects' | 'township' | 'location') => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(type);
    };

    const handleMouseLeaveDropdown = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 220);
    };

    const handleOpenCommandPalette = () => {
        window.dispatchEvent(new CustomEvent('open-command-palette'));
    };

    const handleOpenEnquiry = (type = 'General Inquiry') => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { type } }));
    };

    return (
        <>
            {/* ── Top Spectrum Accent Stripe ─────────────────────────── */}
            <div className="fixed top-0 left-0 w-full h-[3.5px] bg-rainbow z-[120]" />

            {/* ── Prominent Main Navbar ──────────────────────────────── */}
            <motion.header
                className="fixed left-0 right-0 z-[110]"
                style={{ top: '3.5px' }}
                initial={false}
                animate={{
                    background: scrolled
                        ? 'rgba(7, 8, 11, 0.95)'
                        : 'rgba(7, 8, 11, 0.82)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: scrolled
                        ? '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.05)'
                        : '0 10px 30px rgba(0, 0, 0, 0.4)',
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onMouseLeave={handleMouseLeaveDropdown}
            >
                <div
                    className="mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-12"
                    style={{
                        maxWidth: '1540px',
                        height: scrolled ? '82px' : '96px',
                        transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {/* ── Brand Logo & Township Telemetry ──────────────── */}
                    <div className="flex items-center gap-4 lg:gap-6 shrink-0">
                        <Link
                            to="/"
                            className="flex items-center gap-3 cursor-interactive group"
                            aria-label="Kolte-Patil Life Republic Homepage"
                        >
                            <motion.img
                                src="/logo.webp"
                                alt="Kolte-Patil Life Republic"
                                animate={{ height: scrolled ? 48 : 58 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="object-contain"
                                style={{ mixBlendMode: 'lighten' }}
                            />
                        </Link>

                        {/* Live Township Status Pill (Desktop Prominent) */}
                        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-white/70">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="font-semibold text-white/90 tracking-wider uppercase text-[10px]">
                                150+ Acres Master Township
                            </span>
                            <span className="text-white/20">•</span>
                            <span className="text-white/60">14,000+ Happy Families</span>
                        </div>
                    </div>

                    {/* ── Desktop Bold Navigation Links ───────────────── */}
                    <nav className="hidden lg:flex items-center h-full gap-1 xl:gap-2" aria-label="Primary Navigation">
                        {/* Projects Dropdown Trigger */}
                        <div
                            onMouseEnter={() => handleMouseEnterDropdown('projects')}
                            className="h-full flex items-center"
                        >
                            <MagneticNavItem
                                title="Residences"
                                isActive={location.pathname.startsWith('/project')}
                                hasDropdown={true}
                                isOpen={activeDropdown === 'projects'}
                                onClick={() => routerNavigate('/projects')}
                            />
                        </div>

                        {/* Township Dropdown Trigger */}
                        <div
                            onMouseEnter={() => handleMouseEnterDropdown('township')}
                            className="h-full flex items-center"
                        >
                            <MagneticNavItem
                                title="Township"
                                isActive={location.pathname === '/township-guide'}
                                hasDropdown={true}
                                isOpen={activeDropdown === 'township'}
                                onClick={() => routerNavigate('/township-guide')}
                            />
                        </div>

                        {/* Location Dropdown Trigger */}
                        <div
                            onMouseEnter={() => handleMouseEnterDropdown('location')}
                            className="h-full flex items-center"
                        >
                            <MagneticNavItem
                                title="Location"
                                isActive={location.pathname === '/location'}
                                hasDropdown={true}
                                isOpen={activeDropdown === 'location'}
                                onClick={() => routerNavigate('/location')}
                            />
                        </div>

                        {/* Amenities Direct Link */}
                        <MagneticNavItem
                            title="Amenities"
                            isActive={location.pathname === '/amenities'}
                            onClick={() => routerNavigate('/amenities')}
                            onMouseEnter={handleMouseLeaveDropdown}
                        />

                        {/* Lifestyle Direct Link */}
                        <MagneticNavItem
                            title="Lifestyle"
                            isActive={location.pathname === '/lifestyle'}
                            onClick={() => routerNavigate('/lifestyle')}
                            onMouseEnter={handleMouseLeaveDropdown}
                        />
                    </nav>

                    {/* ── Right-Side Prominent Action Hub ──────────────── */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                        {/* Command Palette / Search Trigger */}
                        <motion.button
                            onClick={handleOpenCommandPalette}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-interactive"
                            aria-label="Search Township Clusters"
                            title="Quick Search (⌘K / Ctrl+K)"
                        >
                            <Search size={14} className="text-white/80" />
                            <span className="hidden xl:inline text-[11px] font-mono opacity-60">⌘K</span>
                        </motion.button>

                        {/* Phone Consultation Icon Trigger (Number sits behind icon) */}
                        <a
                            href="tel:+917744009295"
                            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/50 text-emerald-400 transition-all group cursor-interactive shadow-lg"
                            title="Call Sales Office"
                            aria-label="Call Sales Office"
                        >
                            <Phone size={16} className="fill-current group-hover:scale-110 transition-transform" />
                        </a>

                        {/* Prominent High-Impact "Enquire Now" CTA */}
                        <motion.button
                            onClick={() => handleOpenEnquiry('Site Visit Booking')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative overflow-hidden group cursor-interactive px-5 sm:px-7 py-3 rounded-full text-white font-black text-xs uppercase tracking-[0.16em] shadow-2xl flex items-center gap-2 border border-white/20"
                            style={{
                                background: '#ffffff',
                                color: '#050505',
                            }}
                        >
                            {/* Animated Rainbow Underlay on Hover */}
                            <span className="absolute inset-0 bg-rainbow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <span className="relative z-10 font-black group-hover:text-white transition-colors duration-300">
                                Enquire Now
                            </span>
                            <ArrowRight size={14} className="relative z-10 group-hover:text-white transition-all group-hover:translate-x-1" />
                        </motion.button>

                        {/* Mobile / Tablet Hamburger Toggle */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="lg:hidden cursor-interactive flex items-center justify-center relative w-12 h-12 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 transition-all"
                            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                            aria-expanded={menuOpen}
                        >
                            <div className="flex flex-col justify-center items-center gap-[5.5px] w-5">
                                <motion.span
                                    animate={menuOpen
                                        ? { rotate: 45, y: 7.5, backgroundColor: '#050505' }
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
                                        ? { rotate: -45, y: -7.5, backgroundColor: '#050505' }
                                        : { rotate: 0, y: 0, backgroundColor: '#ffffff' }
                                    }
                                    className="block w-5 h-[2px] rounded-full origin-center"
                                    transition={{ duration: 0.25 }}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* ── DESKTOP MEGA MENU: PROJECTS ──────────────────────────── */}
                <AnimatePresence>
                    {activeDropdown === 'projects' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="hidden lg:block border-t border-white/10 bg-[#07080b]/98 backdrop-blur-3xl shadow-2xl overflow-hidden"
                            onMouseEnter={() => handleMouseEnterDropdown('projects')}
                            onMouseLeave={handleMouseLeaveDropdown}
                        >
                            <div className="max-w-[1540px] mx-auto px-8 lg:px-12 py-8">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-white/10 text-white">
                                            <Building2 size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-white uppercase tracking-wider">
                                                Featured Township Residences
                                            </h3>
                                            <p className="text-xs text-white/50">
                                                Explore 2, 3 & 4 BHK luxury residences with possession timelines from 2026 to 2030
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Link
                                            to="/projects"
                                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                                        >
                                            View All Sectors <ArrowRight size={13} />
                                        </Link>
                                    </div>
                                </div>

                                {/* 6 Clusters Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {FEATURED_CLUSTERS.map((cluster) => (
                                        <Link
                                            key={cluster.name}
                                            to={`/projects/${cluster.slug}`}
                                            className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 p-3.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
                                        >
                                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-black/60">
                                                <img
                                                    src={cluster.image}
                                                    alt={`${cluster.name} Life Republic Hinjewadi`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/images/projects/1747221568duet_banner.jpg';
                                                    }}
                                                />
                                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-widest border border-white/15">
                                                    {cluster.sector}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex items-baseline justify-between">
                                                    <h4 className="text-sm font-black text-white group-hover:text-rainbow-hover transition-colors">
                                                        {cluster.name}
                                                    </h4>
                                                    <span className="text-[10px] font-bold text-white/50">
                                                        {cluster.possession}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] font-medium text-white/60">
                                                    {cluster.typology}
                                                </p>
                                                <p className="text-xs font-bold text-white pt-1">
                                                    {cluster.price} <span className="text-[9px] text-white/40 font-normal">onwards</span>
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Bottom Quick Bar inside Dropdown */}
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
                                    <div className="flex items-center gap-6">
                                        <span className="flex items-center gap-1.5">
                                            <ShieldCheck size={14} className="text-emerald-400" /> 100% MahaRERA Registered
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <CheckCircle2 size={14} className="text-emerald-400" /> Zero Brokerage Direct Developer Pricing
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleOpenEnquiry('Township Brochure Download')}
                                        className="text-xs font-bold text-white hover:rainbow-text-clip tracking-wider uppercase transition-colors"
                                    >
                                        Download Township Portfolio PDF →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── DESKTOP MEGA MENU: TOWNSHIP ──────────────────────────── */}
                <AnimatePresence>
                    {activeDropdown === 'township' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="hidden lg:block border-t border-white/10 bg-[#07080b]/98 backdrop-blur-3xl shadow-2xl overflow-hidden"
                            onMouseEnter={() => handleMouseEnterDropdown('township')}
                            onMouseLeave={handleMouseLeaveDropdown}
                        >
                            <div className="max-w-[1540px] mx-auto px-8 lg:px-12 py-8">
                                <div className="grid grid-cols-4 gap-6">
                                    {TOWNSHIP_HIGHLIGHTS.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.title}
                                                to={item.path}
                                                className="group p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 transition-all duration-300"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <Icon size={20} />
                                                </div>
                                                <h4 className="text-sm font-black text-white mb-1 group-hover:text-rainbow-hover transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-white/50 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── DESKTOP MEGA MENU: LOCATION ──────────────────────────── */}
                <AnimatePresence>
                    {activeDropdown === 'location' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="hidden lg:block border-t border-white/10 bg-[#07080b]/98 backdrop-blur-3xl shadow-2xl overflow-hidden"
                            onMouseEnter={() => handleMouseEnterDropdown('location')}
                            onMouseLeave={handleMouseLeaveDropdown}
                        >
                            <div className="max-w-[1540px] mx-auto px-8 lg:px-12 py-8">
                                <div className="grid grid-cols-3 gap-6">
                                    {LOCATION_HIGHLIGHTS.map((item) => (
                                        <Link
                                            key={item.title}
                                            to={item.path}
                                            className="group p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="p-2 rounded-xl bg-white/10 text-white">
                                                    <MapPin size={16} />
                                                </span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                                    {item.tag}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-black text-white mb-1 group-hover:text-rainbow-hover transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-white/50 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subtle rainbow indicator glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            </motion.header>

            {/* ── MOBILE FULL-SCREEN RESPONSIVE DRAWER ─────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        key="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed inset-0 z-[105] flex flex-col bg-[#07080b] overflow-y-auto"
                        style={{ paddingTop: '105px' }}
                    >
                        {/* Background Ambient Glow */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rainbow opacity-10 blur-[100px] rounded-full" />
                        </div>

                        <div className="flex-1 px-6 py-6 flex flex-col justify-between">
                            <div className="space-y-4">
                                {/* Residences Collapsible */}
                                <div>
                                    <button
                                        onClick={() => setMobileProjectsExpanded((prev) => !prev)}
                                        className="w-full flex items-center justify-between py-3 text-2xl font-black uppercase tracking-tight text-white border-b border-white/10"
                                    >
                                        <span>Residences</span>
                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform duration-300 ${
                                                mobileProjectsExpanded ? 'rotate-180 text-white' : 'text-white/40'
                                            }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {mobileProjectsExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden py-3 grid grid-cols-2 gap-3"
                                            >
                                                {FEATURED_CLUSTERS.map((c) => (
                                                    <Link
                                                        key={c.name}
                                                        to={`/projects/${c.slug}`}
                                                        onClick={() => setMenuOpen(false)}
                                                        className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-1"
                                                    >
                                                        <span className="text-xs font-black text-white">{c.name}</span>
                                                        <span className="text-[10px] text-white/50">{c.typology}</span>
                                                        <span className="text-[11px] font-bold text-emerald-400">{c.price}</span>
                                                    </Link>
                                                ))}
                                                <Link
                                                    to="/projects"
                                                    onClick={() => setMenuOpen(false)}
                                                    className="col-span-2 text-center py-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 rounded-xl"
                                                >
                                                    View All 15+ Clusters →
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Standard Nav Links */}
                                {[
                                    { name: 'Township Guide', path: '/township-guide' },
                                    { name: 'Amenities', path: '/amenities' },
                                    { name: 'Location & IT Park', path: '/location' },
                                    { name: 'Lifestyle & Community', path: '/lifestyle' },
                                    { name: 'Sustainability', path: '/sustainability' },
                                    { name: 'Contact & Sales', path: '/contact' }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setMenuOpen(false)}
                                        className="block py-3 text-2xl font-black uppercase tracking-tight text-white/90 hover:text-white border-b border-white/10 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile CTAs & Direct Contact */}
                            <div className="pt-8 space-y-3">
                                <a
                                    href="tel:+917744009295"
                                    className="w-full py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-center flex items-center justify-center gap-2 text-sm tracking-widest uppercase hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-colors"
                                >
                                    <Phone size={16} /> Call Sales Office
                                </a>

                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleOpenEnquiry('Mobile Menu Booking');
                                    }}
                                    className="w-full py-4 rounded-2xl bg-white text-black font-black text-center text-sm tracking-widest uppercase shadow-2xl hover:bg-rainbow-hover transition-colors"
                                >
                                    Book Guided Site Visit →
                                </button>

                                <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 pt-2">
                                    Kolte-Patil Life Republic · Hinjewadi, Pune
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
