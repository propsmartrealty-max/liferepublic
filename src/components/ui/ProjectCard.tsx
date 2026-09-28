import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project, priority }: { project: any, priority?: boolean }) => {
    return (
        <Link to={`/projects/${project.slug || project.id}`} className="block group">
            <motion.div className="glass-panel rounded-3xl p-2 h-full flex flex-col group-hover:bg-white/[0.04] transition-all duration-1000 relative overflow-hidden">
                
                {/* Floating orb inside the card for fluid feel */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-teal-400/10 transition-colors duration-1000"></div>

                {/* Image Section - Organic pill shape */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
                    <img
                        src={project.image || project.configurations?.[0]?.image}
                        alt={project.name || project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030508]/80 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4">
                        <span className="glass-pill px-4 py-1.5 text-white/70 text-[9px] font-sans tracking-[0.2em] uppercase">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content Section - Extremely thin typography */}
                <div className="px-6 py-8 flex flex-col flex-1 relative z-10">
                    <h3 className="text-2xl font-serif text-white/90 mb-3 group-hover:text-white transition-colors duration-500">
                        {project.name || project.title}
                    </h3>
                    <p className="slim-text text-xs leading-relaxed mb-8 flex-1 line-clamp-2">
                        {project.description || "Fluid spaces designed for an unobstructed flow of life and light."}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            <span className="text-white/30 text-[8px] uppercase tracking-[0.3em] font-sans mb-1">Starting From</span>
                            <span className="text-white/80 font-sans font-light text-sm tracking-wide">{project.price}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border-[0.5px] border-white/10 flex items-center justify-center text-white/50 group-hover:border-white/30 group-hover:text-white transition-all duration-700">
                            <ArrowRight size={14} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
