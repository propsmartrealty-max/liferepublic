import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLUSTERS } from '../../lib/clusters';

export const InteractiveMap = () => {
    const [activeCluster, setActiveCluster] = useState<string | null>(null);

    // Hardcoded relative positions for the glowing dots over the master layout
    const mapNodes = [
        { id: 'qrious', x: '45%', y: '30%', label: 'Qrious (Smart 2 & 3 BHK)' },
        { id: 'canvas', x: '60%', y: '45%', label: 'Canvas (Premium 3 & 4 BHK)' },
        { id: 'espada', x: '35%', y: '55%', label: '24K Espada (5 BHK Row Villas)' },
        { id: 'echoes', x: '55%', y: '65%', label: 'Echoes (2 & 2.5 BHK)' },
        { id: 'aros', x: '75%', y: '35%', label: 'Aros (Premium Living)' },
    ];

    const getClusterData = (id: string) => CLUSTERS.find(c => c.id === id);

    return (
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
            {/* The base image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
                <img 
                    src="https://liferepublic.in/images/gallery/eros/master-layout.webp" 
                    alt="Life Republic Master Plan" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />

                {/* The Interactive Nodes */}
                {mapNodes.map((node) => {
                    const isActive = activeCluster === node.id;
                    return (
                        <div 
                            key={node.id}
                            className="absolute z-20 cursor-pointer"
                            style={{ top: node.y, left: node.x }}
                            onMouseEnter={() => setActiveCluster(node.id)}
                            onMouseLeave={() => setActiveCluster(null)}
                        >
                            <div className="relative">
                                {/* Pulse Effect */}
                                <div className="absolute -inset-4 bg-[#E5C07B]/30 rounded-full blur-md animate-pulse" />
                                
                                {/* Pin */}
                                <div className={`relative p-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-white text-black scale-125' : 'bg-[#E5C07B] text-black'} shadow-lg`}>
                                    <MapPin size={16} fill="currentColor" />
                                </div>
                            </div>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-[#151515] border border-white/20 rounded-2xl p-4 shadow-2xl z-30"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]">
                                                {getClusterData(node.id)?.category}
                                            </span>
                                            {getClusterData(node.id)?.status === 'Sold Out' && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">Sold Out</span>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-white mb-1">{getClusterData(node.id)?.name}</h4>
                                        <p className="text-xs text-white/50 mb-3">{node.label}</p>
                                        
                                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                            <span className="text-sm font-bold text-white">{getClusterData(node.id)?.price}</span>
                                            <Link 
                                                to={`/projects/${getClusterData(node.id)?.slug}`}
                                                className="text-[#E5C07B] text-xs font-bold uppercase tracking-widest hover:text-white flex items-center gap-1 transition-colors"
                                            >
                                                Explore <ArrowRight size={12} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
