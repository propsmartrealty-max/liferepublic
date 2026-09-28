import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectCard = ({ project, priority }: { project: any, priority?: boolean }) => {
    return (
        <Link to={`/projects/${project.slug || project.id}`} className="block h-full">
            <motion.div
                className="group relative h-[400px] w-full rounded-3xl overflow-hidden bg-surface border border-white/5 hover:border-white/20 transition-all duration-700"
            >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image || project.configurations?.[0]?.image}
                        alt={project.name || project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                    
                    {/* Top Status */}
                    <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {project.category}
                    </div>

                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                        <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                            {project.name || project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-[80%] line-clamp-2">
                            {project.description || "Next-generation spatial architecture."}
                        </p>
                        
                        {/* Hidden details revealed on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center justify-between">
                            <div className="flex gap-4">
                                <div className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                                    {project.configurations?.[0]?.type || 'Smart Homes'}
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                                    Starts ₹{project.price?.replace(' Lakhs', 'L')}
                                </div>
                            </div>
                            
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
