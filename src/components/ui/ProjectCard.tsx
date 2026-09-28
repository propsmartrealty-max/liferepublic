import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ProjectCard = ({ project, priority }: { project: any, priority?: boolean }) => {
    return (
        <Link to={`/projects/${project.slug || project.id}`} className="block group h-full cursor-interactive">
            <motion.div 
                className="relative overflow-hidden rounded-[24px] bg-black border border-white/10 h-[500px] w-full flex flex-col justify-end transition-all duration-700 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
                {/* Background Image with Parallax/Zoom */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image || project.configurations?.[0]?.image}
                        alt={project.name || project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-6 left-6 z-10 flex gap-2">
                    <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs tracking-widest uppercase rounded-full">
                        {project.category}
                    </span>
                </div>

                {/* Content Section (Bottom) */}
                <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <h3 className="text-3xl font-sans font-medium text-white tracking-tight mb-2">
                        {project.name || project.title}
                    </h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6 line-clamp-2 max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {project.description || "Unparalleled architectural symmetry designed for maximum living comfort."}
                    </p>
                    
                    <div className="flex items-end justify-between border-t border-white/10 pt-4">
                        <div>
                            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Starting at</p>
                            <p className="text-white text-lg font-medium">{project.price}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 delay-100">
                            <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
                            <span className="material-symbol text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
