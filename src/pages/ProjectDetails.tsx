import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import { CLUSTERS } from '../lib/clusters';
import { SEO } from '../components/seo/SEO';
import { CheckCircle, Download, Calendar, Layers, ShieldCheck, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

// ─── Lightbox ────────────────────────────────────────────────────────────────
const Lightbox: React.FC<{ images: string[]; startIndex: number; onClose: () => void }> = ({
    images, startIndex, onClose,
}) => {
    const [idx, setIdx] = useState(startIndex);

    const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose, prev, next]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close"
            >
                <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest">
                {idx + 1} / {images.length}
            </div>

            {/* Main image */}
            <motion.img
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={images[idx]}
                alt={`Gallery ${idx + 1}`}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[88vw] object-contain rounded-2xl shadow-2xl"
            />

            {/* Prev / Next */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        className="absolute left-3 sm:left-6 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        className="absolute right-3 sm:right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                            style={{
                                background: i === idx ? '#fff' : 'rgba(255,255,255,0.3)',
                                transform: i === idx ? 'scale(1.5)' : 'none',
                            }}
                            aria-label={`Image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// ─── Section heading helper ──────────────────────────────────────────────────
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-[1px] bg-rainbow shrink-0" />
        <h2 className="text-3xl sm:text-4xl font-sans font-bold">{children}</h2>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const ProjectDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<any>(null);
    const [lightboxImages, setLightboxImages] = useState<string[]>([]);
    const [lightboxStart, setLightboxStart] = useState(0);
    const [activeTab, setActiveTab] = useState('pricing');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const found = CLUSTERS.find((c) => c.slug === slug || c.id === slug);
        if (!found) {
            navigate('/projects', { replace: true });
        } else {
            setProject(found);
        }
    }, [slug, navigate]);

    const openLightbox = (images: string[], start = 0) => {
        setLightboxImages(images);
        setLightboxStart(start);
    };

    if (!project) return null;

    const reraVerificationUrl = 'https://maharera.maharashtra.gov.in/';

    const commonAmenities = [
        'Clubhouse & Lounge', 'Infinity Swimming Pool', 'State-of-the-art Gym',
        'Jogging & Cycling Tracks', 'Kids Play Area', 'Multi-purpose Hall',
        'Landscaped Gardens', '24/7 Security',
    ];

    // Build gallery array
    const allImages: string[] = [
        project.image,
        ...(project.gallery ?? []),
    ].filter(Boolean);

    const tabs = [
        { key: 'pricing', label: 'Configurations' },
        ...(project.floorPlans?.length ? [{ key: 'floor-plans', label: `Floor Plans (${project.floorPlans.length})` }] : []),
        ...(project.gallery?.length ? [{ key: 'gallery', label: 'Gallery' }] : []),
        { key: 'amenities', label: 'Amenities' },
        { key: 'master-plan', label: 'Master Layout' },
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <SEO
                title={`${project.name} | Kolte Patil Life Republic Hinjewadi | Price, Floor Plan`}
                description={project.description}
                canonical={`/projects/${project.slug}`}
            />

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImages.length > 0 && (
                    <Lightbox
                        images={lightboxImages}
                        startIndex={lightboxStart}
                        onClose={() => setLightboxImages([])}
                    />
                )}
            </AnimatePresence>

            {/* ── Cinematic Hero ─────────────────────────────────────── */}
            <div className="relative h-[80vh] w-full bg-black overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: 'easeOut' }}
                    src={project.image}
                    alt={`${project.name} by Kolte-Patil Developers – Premium Township in Hinjewadi, Pune`}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

                {/* Gallery thumbnails */}
                {allImages.length > 1 && (
                    <div className="absolute top-24 right-4 flex flex-col gap-2">
                        {allImages.slice(1, 4).map((img, i) => (
                            <button
                                key={i}
                                onClick={() => openLightbox(allImages, i + 1)}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/20 hover:border-white/50 transition-all hover:scale-105 cursor-interactive"
                            >
                                <img src={img} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
                            </button>
                        ))}
                        {allImages.length > 4 && (
                            <button
                                onClick={() => openLightbox(allImages, 4)}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white text-xs font-bold border border-white/20 hover:border-white/50 transition-all cursor-interactive"
                                style={{ background: 'rgba(5,5,5,0.7)' }}
                            >
                                +{allImages.length - 4}
                            </button>
                        )}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full pb-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                {/* Breadcrumb */}
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4 uppercase tracking-widest cursor-interactive"
                                >
                                    <ChevronLeft size={14} /> All Projects
                                </Link>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-6 backdrop-blur-md"
                                >
                                    <ShieldCheck size={14} className="rainbow-text-clip font-bold" />
                                    <span className="text-xs font-bold tracking-widest uppercase">MahaRERA: {project.rera}</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-6xl font-sans font-bold text-white mb-6 tracking-tight leading-none"
                                >
                                    {project.name}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl md:text-2xl text-white/70 max-w-2xl font-light"
                                >
                                    {project.description}
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col gap-4 min-w-[300px]"
                            >
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                    <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Starting Price</p>
                                    <p className="text-4xl font-bold rainbow-text-clip">{project.configurations?.[0]?.price}</p>
                                </div>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: 'Download Brochure' } }))}
                                    className="w-full py-5 bg-white text-black hover:bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group cursor-interactive"
                                >
                                    <Download size={18} className="group-hover:animate-bounce" />
                                    Download Brochure
                                </button>

                                {/* View all photos */}
                                {allImages.length > 1 && (
                                    <button
                                        onClick={() => openLightbox(allImages, 0)}
                                        className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 cursor-interactive"
                                    >
                                        <ZoomIn size={16} />
                                        View All Photos ({allImages.length})
                                    </button>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Sticky Tab Navigation ─────────────────────────────── */}
            <div
                className="sticky top-[3px] z-50"
                style={{
                    background: 'rgba(5,5,5,0.92)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-3 h-14">
                    {/* Tabs */}
                    <nav
                        className="flex items-center gap-0.5 overflow-x-auto"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        aria-label="Project sections"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => {
                                    setActiveTab(tab.key);
                                    document.getElementById(tab.key)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-200 cursor-interactive"
                                style={{
                                    color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.4)',
                                    background: activeTab === tab.key ? 'rgba(255,255,255,0.10)' : 'transparent',
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* Sticky enquire */}
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name } }))}
                        className="shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 cursor-interactive"
                        style={{
                            background: '#fff',
                            color: '#050505',
                        }}
                    >
                        Enquire
                    </button>
                </div>
            </div>

            {/* ── Main Content ───────────────────────────────────────── */}
            <div className="container mx-auto px-4 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left column */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Configurations & Pricing */}
                        <section id="pricing">
                            <SectionHeading>Configurations & Pricing</SectionHeading>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.configurations?.map((config: any, i: number) => (
                                    <div
                                        key={i}
                                        className="group relative bg-[#0A0A0A] border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all hover:-translate-y-1"
                                    >
                                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <Layers size={18} />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-2">{config.type}</h3>
                                        <p className="text-white/50 text-lg mb-8 font-light">
                                            Carpet Area: <span className="text-white font-medium">{config.size}</span>
                                        </p>
                                        <div className="text-4xl font-bold text-white mb-8">{config.price}</div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: `${config.type} Floor Plan` } }))}
                                                className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold uppercase tracking-widest transition-colors cursor-interactive"
                                            >
                                                Floor Plan
                                            </button>
                                            <button
                                                onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: `${config.type} Cost Sheet` } }))}
                                                className="flex-1 py-4 bg-white text-black hover:bg-rainbow-hover rounded-2xl text-sm font-bold uppercase tracking-widest transition-colors cursor-interactive"
                                            >
                                                Cost Sheet
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Floor Plans Gallery — clickable lightbox */}
                        {project.floorPlans?.length > 0 && (
                            <section id="floor-plans">
                                <SectionHeading>Master & Floor Plans</SectionHeading>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.floorPlans.map((plan: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => openLightbox(project.floorPlans, i)}
                                            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 cursor-interactive text-left transition-all hover:border-white/30 hover:-translate-y-0.5"
                                            aria-label={`View floor plan ${i + 1}`}
                                        >
                                            <img
                                                src={plan}
                                                alt={`${project.name} Floor Plan ${i + 1} – Kolte Patil Life Republic Hinjewadi`}
                                                className="w-full h-auto object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"
                                                style={{ background: 'rgba(0,0,0,0.4)' }}>
                                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white text-black">
                                                    <ZoomIn size={14} /> Full Size
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Project Gallery — masonry + lightbox */}
                        {project.gallery?.length > 0 && (
                            <section id="gallery">
                                <SectionHeading>Project Gallery</SectionHeading>
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {project.gallery.map((img: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => openLightbox(project.gallery, i)}
                                            className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 relative group cursor-interactive block w-full text-left"
                                            aria-label={`View gallery photo ${i + 1}`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${project.name} Premium ${project.category} Gallery Image ${i + 1} at Life Republic Hinjewadi Pune`}
                                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                style={{ background: 'rgba(0,0,0,0.45)' }}>
                                                <ZoomIn size={28} className="text-white" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Amenities */}
                        <section id="amenities">
                            <SectionHeading>World-Class Amenities</SectionHeading>
                            {project.amenitiesList?.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {project.amenitiesList.map((amenity: any, i: number) => (
                                        <div
                                            key={i}
                                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors"
                                        >
                                            <img
                                                src={amenity.icon}
                                                alt={`${amenity.name} Luxury Amenity at ${project.name} Life Republic Hinjewadi`}
                                                className="w-20 h-20 object-cover rounded-xl mix-blend-lighten opacity-90"
                                                loading="lazy"
                                            />
                                            <span className="text-xs font-bold text-white/80 text-center uppercase tracking-widest">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {commonAmenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <CheckCircle size={20} className="text-white/50 shrink-0" />
                                            <span className="text-sm font-bold text-white/80">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Master Layout — clickable lightbox */}
                        {project.masterLayout && (
                            <section id="master-plan">
                                <SectionHeading>Master Layout</SectionHeading>
                                <button
                                    onClick={() => openLightbox([project.masterLayout], 0)}
                                    className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] group cursor-interactive block"
                                    aria-label="View master layout full size"
                                >
                                    <img
                                        src={project.masterLayout}
                                        alt={`${project.name} Master Layout – Life Republic Hinjewadi`}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 gap-6">
                                        <p className="text-2xl font-bold tracking-widest uppercase">Unlock High-Res Plan</p>
                                        <span className="px-10 py-5 bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm text-white">
                                            View Full Layout
                                        </span>
                                    </div>
                                </button>
                                <p className="text-center text-xs mt-3 text-white/20 tracking-widest uppercase">
                                    Click to view · For illustrative purposes only
                                </p>
                            </section>
                        )}

                    </div>

                    {/* Right column: sticky sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">

                            {/* MahaRERA Card */}
                            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-white/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-rainbow/20 transition-colors" />
                                <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-8 flex items-center gap-2">
                                    <ShieldCheck size={16} /> Official MahaRERA
                                </h3>
                                <div className="flex justify-center mb-8 bg-white p-6 rounded-2xl">
                                    <QRCode
                                        value={reraVerificationUrl}
                                        size={200}
                                        level="H"
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                    />
                                </div>
                                <div className="text-center mb-8">
                                    <p className="text-white/50 text-sm mb-2 uppercase tracking-widest">Registration ID</p>
                                    <p className="text-2xl font-mono font-bold tracking-wider">{project.rera}</p>
                                </div>
                                <button
                                    onClick={() => window.open(reraVerificationUrl, '_blank')}
                                    className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-sm font-bold uppercase tracking-widest transition-colors cursor-interactive"
                                >
                                    Verify on MahaRERA
                                </button>
                            </div>

                            {/* Site Visit Card */}
                            <div className="bg-gradient-to-br from-[#111] to-[#050505] p-[1px] rounded-3xl overflow-hidden bg-rainbow">
                                <div className="bg-[#050505] p-8 rounded-[23px] h-full">
                                    <h3 className="text-2xl font-bold mb-4">Experience {project.name}</h3>
                                    <p className="text-white/60 mb-8 font-light leading-relaxed">
                                        Schedule a personalized guided tour with our township experts. Free pickup and drop facility available across Pune.
                                    </p>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: 'Site Visit' } }))}
                                        className="w-full py-5 bg-white text-black hover:bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 cursor-interactive"
                                    >
                                        <Calendar size={18} />
                                        Book Site Visit
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
