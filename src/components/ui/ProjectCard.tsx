import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project, priority }: { project: any, priority?: boolean }) => {
    return (
        <Link to={`/projects/${project.slug || project.id}`} className="block group">
            <motion.div className="arch-card flex flex-col h-full bg-[#0A0A0A]">
                {/* Image Section - Strict 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                        src={project.image || project.configurations?.[0]?.image}
                        alt={project.name || project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1.5s] ease-out"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-md text-primary text-[9px] font-sans tracking-[0.2em] uppercase border border-primary/20">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content Section - Minimalist */}
                <div className="p-8 flex flex-col flex-1 border-t border-white/5">
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 group-hover:text-primary transition-colors duration-500">
                        {project.name || project.title}
                    </h3>
                    <p className="text-white/50 text-sm font-sans font-light leading-relaxed mb-8 flex-1 line-clamp-2">
                        {project.description || "An exclusive collection of premium residences designed for absolute luxury."}
                    </p>
                    
                    <div className="flex items-end justify-between mt-auto">
                        <div>
                            <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-sans mb-1">Starting From</p>
                            <p className="text-white text-lg font-serif">{project.price}</p>
                        </div>
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                            <ArrowRight size={16} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
