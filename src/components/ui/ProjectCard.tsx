import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Sparkles, AlertCircle, X, Maximize2, ShieldCheck, Layers, Calendar, Download, ArrowUpRight } from 'lucide-react';
import { getProjectSlug } from '../../data/slug-registry';

interface Configuration {
    type: string;
    size: string;
    price: string;
    image?: string;
}

interface ProjectData {
    id: string;
    slug?: string;
    name?: string;
    title?: string;
    category?: string;
    description?: string;
    price?: string;
    rera?: string;
    image?: string;
    status?: string;
    possession?: string;
    sector?: string;
    usp?: string;
    masterLayout?: string;
    configurations?: any[];
    gallery?: (string | { url: string; alt?: string })[];
    amenitiesList?: {name: string, icon: string}[];
    floorPlans?: any[];
    [key: string]: any;
}

export const ProjectCard = ({ project, priority }: { project: ProjectData, priority?: boolean }) => {
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (!project) return null;
    
    const projectSlug = getProjectSlug(project.id, project.slug);
    const displaySlug = projectSlug;
    const displayName = project.name || project.title || 'Exclusive Project';
    const displayCategory = project.category || 'Premium Residences';
    const displayDesc = project.description || 'Unparalleled architectural symmetry designed for maximum living comfort.';
    const displayPrice = project.price || 'Price on Request';
    const displayRera = project.rera || '';
    const displayImage = project.image || (project.configurations?.[0]?.image) || 'https://images.unsplash.com/photo-1600607687931-cece5ce21448?q=80&w=2000&auto=format&fit=crop';
    const configurations = project.configurations || [];
    const reraVerificationUrl = `https://maharera.maharashtra.gov.in/`;

    // 3D Parallax Tilt setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isExpanded) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Direct navigation to full project details page
        navigate(`/projects/${projectSlug}`);
    };

    const config = configurations.length > 0 
        ? `${configurations[0].type} ${configurations.length > 1 ? `& ${configurations[configurations.length - 1].type}` : ''}`
        : displayCategory;

    const commonAmenities = ["Clubhouse & Lounge", "Infinity Swimming Pool", "State-of-the-art Gym", "Jogging & Cycling Tracks"];

    return (
        <>
            <motion.div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative block w-full aspect-[4/5] overflow-hidden rounded-[2rem] rainbow-border-wrap bg-black hover:shadow-2xl hover:shadow-rainbow/20 transition-shadow duration-700 cursor-interactive"
            >
                {/* Background Image with Parallax */}
                <motion.div 
                    className="absolute inset-0"
                    style={{ transform: "translateZ(-20px)", transformStyle: "preserve-3d" }}
                >
                    <img 
                        src={displayImage} 
                        alt={displayName} 
                        loading={priority ? "eager" : "lazy"}
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                    />
                </motion.div>

                {/* Highly readable Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent transition-colors duration-700 group-hover:from-[#050505]"></div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-rainbow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none z-30 backdrop-blur-[2px]">
                    <div className="flex items-center gap-3 pointer-events-auto transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                        <Link 
                            to={`/projects/${projectSlug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-5 py-2.5 bg-white text-black hover:bg-rainbow-hover rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-all hover:scale-105"
                        >
                            <span>View Full Page</span>
                            <ArrowUpRight size={15} />
                        </Link>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(true);
                            }}
                            className="px-4 py-2.5 bg-black/60 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-2 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest shadow-2xl transition-all"
                        >
                            <Maximize2 size={15} />
                            <span>Quick View</span>
                        </button>
                    </div>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                    
                    {/* Top section: Configuration and MahaRERA */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2 items-start">
                            {project.status && (
                                <div className={`px-3 py-1 backdrop-blur-md border rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-1 ${
                                    project.status === 'Sold Out' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    (project.status === 'Ready to Move' || project.status === 'Completed' || project.status === 'Ready Possession') ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                                    project.status === 'New Launch' ? 'bg-rainbow border-transparent text-white' : 
                                    'bg-white/10 text-white/90 border-white/20'
                                }`}>
                                    <AlertCircle size={10} />
                                    {project.status}
                                </div>
                            )}
                            <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-xl">
                                {config}
                            </div>
                        </div>
                        <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold text-white/80 uppercase tracking-widest text-right flex flex-col items-end shadow-xl">
                            <span className="opacity-70 mb-0.5">MahaRERA:</span>
                            <span className="text-[10px] rainbow-text-clip font-mono font-bold">{displayRera}</span>
                        </div>
                    </div>

                    {/* Bottom section: Details */}
                    <div className="space-y-4">
                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                            {project.sector && (
                                <div className="flex items-center gap-1.5 text-white/60 mb-2">
                                    <MapPin size={12} className="text-white/40" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">{project.sector}</span>
                                </div>
                            )}
                            <Link 
                                to={`/projects/${projectSlug}`} 
                                onClick={(e) => e.stopPropagation()}
                                className="pointer-events-auto block hover:opacity-90 transition-opacity"
                            >
                                <h3 className="text-4xl font-sans font-bold text-white tracking-tight hover:rainbow-text-clip transition-all">
                                    {displayName}
                                </h3>
                            </Link>
                            <div className="mt-4 h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 overflow-hidden">
                                {project.usp && (
                                    <div className="flex items-start gap-1.5 mb-2 mt-1">
                                        <Sparkles size={12} className="rainbow-text-clip font-bold mt-0.5 shrink-0" />
                                        <span className="text-sm font-bold text-white leading-tight">{project.usp}</span>
                                    </div>
                                )}
                                <p className="text-sm text-white/60 line-clamp-2 leading-relaxed mb-4">
                                    {displayDesc}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-end gap-3">
                            <div>
                                {project.possession && (
                                    <div className="flex items-center gap-1.5 mb-4 text-white/70">
                                        <Clock size={12} className="text-white/50" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Possession: {project.possession}</span>
                                    </div>
                                )}
                                <p className="text-xs text-white/50 uppercase tracking-widest mb-1 font-bold">Pricing Structure</p>
                                <div className="text-xl md:text-2xl font-bold rainbow-text-clip tracking-tight">
                                    {configurations.length > 0 ? `${configurations[0].price} Onwards` : displayPrice}
                                </div>
                            </div>
                            <div className="pointer-events-auto shrink-0">
                                <Link 
                                    to={`/projects/${projectSlug}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-4 py-2 bg-white text-black hover:bg-rainbow-hover rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-xl hover:scale-105 group/btn"
                                    title={`View full project details for ${displayName}`}
                                >
                                    <span>View Full Page</span>
                                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Vibrant Dynamic Expansion Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            onClick={() => setIsExpanded(false)}
                            className="absolute inset-0 bg-black/80"
                        />
                        
                        {/* Modal Body */}
                        <motion.div 
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-7xl max-h-full overflow-y-auto bg-[#050505] rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row z-10 custom-scrollbar rainbow-border-wrap"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-rainbow-hover transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Left: Sticky Image & Hero Data */}
                            <div className="w-full md:w-2/5 relative min-h-[40vh] md:min-h-[80vh]">
                                <img src={displayImage} alt={displayName} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-4 backdrop-blur-md">
                                        <ShieldCheck size={14} className="rainbow-text-clip font-bold" />
                                        <span className="text-xs font-bold tracking-widest uppercase">MahaRERA: {displayRera}</span>
                                    </div>
                                    <h2 className="text-5xl md:text-5xl font-bold text-white mb-2">{displayName}</h2>
                                    <p className="text-lg text-white/70 mb-6">{project.usp}</p>
                                    
                                    <Link 
                                        to={`/projects/${projectSlug}`} 
                                        onClick={() => setIsExpanded(false)}
                                        className="w-full py-4 bg-white text-black hover:bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02]"
                                    >
                                        <span>View Full Page</span>
                                        <ArrowUpRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Scrollable Content Panels */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 space-y-12">
                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2"><MapPin size={16}/> Project Overview</h3>
                                    <p className="text-lg text-white leading-relaxed">{displayDesc}</p>
                                </div>

                                {/* Configurations */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2"><Layers size={16}/> Pricing & Sizes</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {configurations.map((cfg, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/30 transition-colors">
                                                <div className="text-xl font-bold text-white mb-1">{cfg.type}</div>
                                                <div className="text-sm text-white/60 mb-4">{cfg.size}</div>
                                                <div className="text-2xl font-bold rainbow-text-clip mb-4">{cfg.price}</div>
                                                <button 
                                                    onClick={() => {
                                                        setIsExpanded(false);
                                                        window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: displayName, type: `${cfg.type} Floor Plan` } }));
                                                    }}
                                                    className="w-full py-3 bg-white/10 hover:bg-rainbow-hover rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                                                >
                                                    View Floor Plan
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Master Layout & Amenities */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2"><Sparkles size={16}/> Master Layout</h3>
                                    <div 
                                        className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-interactive" 
                                        onClick={() => {
                                            setIsExpanded(false);
                                            window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: displayName, type: 'Master Plan' } }));
                                        }}
                                    >
                                        <img src={project.masterLayout || displayImage} alt="Master Layout" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="px-6 py-3 bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 text-white">
                                                <Download size={14} /> Download PDF
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Site Visit CTA */}
                                <div className="bg-rainbow p-[1px] rounded-2xl">
                                    <div className="bg-[#111] p-6 rounded-[15px] flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">Schedule a Site Visit</h4>
                                            <p className="text-sm text-white/60">Free pickup and drop facility available.</p>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setIsExpanded(false);
                                                window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: displayName, type: 'Site Visit' } }));
                                            }}
                                            className="whitespace-nowrap px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2"
                                        >
                                            <Calendar size={14} /> Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
