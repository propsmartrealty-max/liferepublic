import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ProjectCard = ({ project, priority }: { project: any, priority?: boolean }) => {
    return (
        <Link to={`/projects/${project.slug || project.id}`} className="block group h-full cursor-interactive">
            <motion.div className="google-card flex flex-col h-full bg-[#F8F9FA]">
                
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8EAED]">
                    <img
                        src={project.image || project.configurations?.[0]?.image}
                        alt={project.name || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-[#202124] text-xs font-medium rounded-full shadow-sm border border-[#DADCE0]">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-medium text-[#202124] tracking-tight mb-2">
                        {project.name || project.title}
                    </h3>
                    <p className="text-[#5F6368] text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
                        {project.description || "Incredible spatial architecture designed for absolute comfort."}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <p className="text-[#5F6368] text-xs font-medium mb-1">From</p>
                            <p className="text-[#1a73e8] text-lg font-medium">{project.price}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white border border-[#DADCE0] flex items-center justify-center text-[#1a73e8] group-hover:bg-[#E8F0FE] group-hover:border-[#1a73e8] transition-colors">
                            <span className="material-symbol">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
