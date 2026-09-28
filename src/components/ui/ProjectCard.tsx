import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ProjectCard = ({ project, priority }: { project: any, priority?: boolean }) => {
    return (
        <Link to={`/projects/${project.slug || project.id}`} className="block group">
            <motion.div className="apple-card flex flex-col h-full bg-white">
                
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F5F7]">
                    <img
                        src={project.image || project.configurations?.[0]?.image}
                        alt={project.name || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#1D1D1F] text-xs font-semibold rounded-full shadow-sm">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mb-2">
                        {project.name || project.title}
                    </h3>
                    <p className="text-[#86868B] text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
                        {project.description || "Incredible spatial architecture designed for absolute comfort."}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#D2D2D7]/50">
                        <div>
                            <p className="text-[#86868B] text-xs font-medium mb-1">From</p>
                            <p className="text-[#1D1D1F] text-lg font-semibold">{project.price}</p>
                        </div>
                        <div className="text-[#0066CC] font-medium text-sm flex items-center gap-1 group-hover:underline">
                            Explore <span className="text-lg leading-none">›</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
