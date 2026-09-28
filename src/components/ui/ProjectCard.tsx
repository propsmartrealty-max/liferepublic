import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Phone, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
    project: any;
    delay?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay = 0 }) => {
    // Attempt to extract RERA from features
    const reraFeature = project.features?.find((f: string) => f.includes('MahaRERA')) || 'MahaRERA Registered';
    
    // Extract a realistic price
    const priceText = project.price?.replace(' Lakhs', 'L') || 'Price on Request';

    // Badge styling mapping
    const getBadgeStyle = (category: string) => {
        if (category?.toLowerCase().includes('plot')) return 'bg-[#22c55e] text-white';
        if (category?.toLowerCase().includes('villa')) return 'bg-[#E5C07B] text-black';
        return 'bg-[#3b82f6] text-white'; // default blue for apartments
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group flex flex-col bg-[#151822] rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
        >
            {/* Top Image Section */}
            <div className="relative h-60 w-full overflow-hidden">
                <img
                    src={project.image || project.configurations?.[0]?.image || '/images/home/slider-1.webp'}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151822] via-transparent to-transparent"></div>
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-[#E5C07B] text-[10px] uppercase font-bold px-2 py-1 rounded-sm border border-white/10">
                        <ImageIcon size={10} /> Photo
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm border border-white/10">
                        <LayoutGrid size={10} /> Layout
                    </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                    <span className="bg-[#7F1D1D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-red-900/50">
                        Starting {priceText}
                    </span>
                </div>

                {/* Category Badge over image bottom */}
                <div className="absolute bottom-4 left-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${getBadgeStyle(project.category)}`}>
                        {project.category || 'Premium Residences'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 font-light mb-6 line-clamp-2 leading-relaxed">
                    {project.description || `Premium ${project.category} at Kolte Patil Life Republic, Hinjewadi.`}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 border border-white/10 rounded-lg p-4 mb-4 bg-white/[0.02]">
                    <div className="text-center border-r border-white/10">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Configuration</p>
                        <p className="text-sm font-bold text-white">
                            {project.configurations?.[0]?.type || '2 & 3 BHK'}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-bold text-white">
                            {project.status || 'Under Construction'}
                        </p>
                    </div>
                </div>

                {/* RERA Badge */}
                <div className="flex items-center justify-between border border-white/10 rounded-lg p-3 mb-6 bg-black/20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-[#E5C07B] font-mono">{reraFeature}</span>
                    </div>
                    <a href="#" className="text-[10px] text-green-500 hover:text-green-400 underline decoration-green-500/30 underline-offset-2 transition-all">Verify ↗</a>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto grid grid-cols-[1fr_1.5fr] gap-3">
                    <Button variant="whatsapp" className="w-full gap-2 rounded-md">
                        <Phone size={14} className="fill-current" />
                        <span className="hidden sm:inline">WhatsApp</span>
                    </Button>
                    <Link to={`/projects/${project.slug}`} className="w-full">
                        <Button variant="primary" className="w-full gap-2 rounded-md bg-transparent border border-[#7F1D1D] text-[#7F1D1D] hover:bg-[#7F1D1D] hover:text-white">
                            Explore Enclave <ArrowRight size={14} />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
