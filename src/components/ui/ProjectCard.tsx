import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    configurations?: Configuration[];
}

export const ProjectCard = ({ project, priority }: { project: ProjectData, priority?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Safety Fallbacks (Hardening)
    if (!project) return null;
    
    const displaySlug = project.slug || project.id || '';
    const displayName = project.name || project.title || 'Exclusive Project';
    const displayCategory = project.category || 'Premium Residences';
    const displayDesc = project.description || 'Unparalleled architectural symmetry designed for maximum living comfort.';
    const displayPrice = project.price || 'Price on Request';
    const displayRera = project.rera || '';
    const displayImage = project.image || (project.configurations?.[0]?.image) || 'https://images.unsplash.com/photo-1600607687931-cece5ce21448?q=80&w=2000&auto=format&fit=crop';
    const configurations = project.configurations || [];

    // 3D Parallax Tilt setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
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

    return (
        <Link to={`/projects/${displaySlug}`} className="block h-full cursor-interactive" style={{ perspective: 1000 }}>
            <motion.div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative overflow-hidden rounded-[24px] bg-black border border-white/10 h-[550px] w-full flex flex-col justify-end transition-shadow duration-700 hover:border-white/30 hover:glow-rainbow hover:border-transparent group"
            >
                {/* Background Image with Parallax/Zoom */}
                <div className="absolute inset-0 z-0" style={{ transform: "translateZ(-20px)" }}>
                    <img
                        loading={priority ? "eager" : "lazy"}
                        decoding="async"
                        src={displayImage}
                        alt={displayName}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 transition-colors duration-700 group-hover:from-black"></div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs tracking-widest uppercase rounded-full">
                        {displayCategory}
                    </span>
                    {displayRera && (
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] tracking-wider uppercase rounded-md font-mono">
                            MahaRERA: {displayRera}
                        </span>
                    )}
                </div>

                {/* Content Section (Bottom) */}
                <div className="relative z-10 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: "translateZ(50px)" }}>
                    <h3 className="text-3xl font-sans font-medium text-white tracking-tight mb-3">
                        {displayName}
                    </h3>
                    
                    {/* Precize Configuration Data */}
                    {configurations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75">
                            {configurations.slice(0, 3).map((config, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[11px] text-white/70 tracking-wide whitespace-nowrap">
                                    {config.type} • {config.size}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6 line-clamp-2 max-w-[95%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {displayDesc}
                    </p>
                    
                    <div className="flex items-end justify-between border-t border-white/10 pt-5">
                        <div>
                            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Starting at</p>
                            <p className="text-white text-lg font-medium">{displayPrice}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 delay-150 group-hover:text-rainbow">
                            <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
                            <span className="material-symbol text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
