import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, MapPin, Building2, Zap, ArrowUpRight, Cpu, Network, ShieldCheck } from 'lucide-react';
import sectorsData from '../../data/sectors.json';
import { motion } from 'framer-motion';

export const SectorLinkMesh: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const relatedSectors = sectorsData.sectors
        .filter(s => !currentPath.includes(s.slug))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    const relatedAvenues = sectorsData.avenues
        .filter(a => !currentPath.includes(a.slug))
        .slice(0, 3);

    const relatedLocalities = sectorsData.localities
        .filter(l => !currentPath.includes(l.slug))
        .slice(0, 3);

    return (
        <section className="py-16 bg-white border-t border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -mr-48 -mt-48"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-white text-[#202124] rounded-full mb-6 shadow-xl"
                        >
                            <Network size={14} className="rainbow-text-clip font-bold animate-pulse" />
                            <span className="text-[10px] font-bold tracking-tight font-semibold">Sovereign Connectivity Matrix v6.0</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] tracking-tighter leading-none mb-6">
                            Infrastructure <br /><span className="rainbow-text-clip font-bold italic">Synergy.</span>
                        </h2>
                        <p className="text-xl text-[#5F6368] font-medium leading-relaxed">
                            Navigate the structural mesh of Life Republic. Every cluster is programmatically linked to the 150ft Spine Road backbone.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6 p-6 bg-[#F8F9FA] rounded-[2rem] border border-white/20 shadow-inner group">
                        <div className="p-4 bg-[#151822] border border-white/20 rounded-2xl shadow-sm rainbow-text-clip font-bold group-hover:rotate-12 transition-transform">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-[#5F6368] tracking-tight font-medium block">Transit Benchmark</span>
                            <span className="text-lg font-bold text-[#202124] tracking-tight">2026 Deployment Ready</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Residential Cluster Matrix */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 rainbow-text-clip font-bold font-bold tracking-tight font-semibold text-[10px]">
                            <Building2 size={16} /> Residential Cluster Mesh
                        </div>
                        <div className="flex flex-col gap-6">
                            {relatedSectors.map((sector, i) => (
                                <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link 
                                        to={`/projects/${sector.slug}`}
                                        className="group flex items-center justify-between p-8 bg-[#F8F9FA]/50 rounded-[24px] border border-white/20 hover:bg-[#151822] border border-white/20 hover:border-accent hover:shadow-2xl transition-all"
                                    >
                                        <div className="space-y-1">
                                            <span className="text-lg font-bold text-[#202124] group-hover:rainbow-text-clip font-bold tracking-tight">{sector.name.split('(')[0]}</span>
                                            <span className="text-[9px] text-[#5F6368] font-bold tracking-tight font-medium block">{sector.id} Portfolio</span>
                                        </div>
                                        <ArrowUpRight size={24} className="text-gray-200 group-hover:rainbow-text-clip font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Infrastructure Spine Matrix */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 rainbow-text-clip font-bold font-bold tracking-tight font-semibold text-[10px]">
                            <Zap size={16} /> Infrastructure Backbones
                        </div>
                        <div className="flex flex-col gap-6">
                            {relatedAvenues.map((ave, i) => (
                                <motion.div key={ave.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link 
                                        to={`/location/${ave.slug}`}
                                        className="group flex items-center justify-between p-8 bg-[#F8F9FA]/50 rounded-[24px] border border-white/20 hover:bg-[#151822] border border-white/20 hover:border-accent hover:shadow-2xl transition-all"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-lg font-bold text-[#202124] group-hover:rainbow-text-clip font-bold tracking-tight">{ave.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] text-[#5F6368] font-bold tracking-tight font-medium">{ave.infrastructure}</span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={24} className="text-gray-200 group-hover:rainbow-text-clip font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Regional Connectivity Matrix */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 rainbow-text-clip font-bold font-bold tracking-tight font-semibold text-[10px]">
                            <Globe size={16} /> Regional Macro-Hubs
                        </div>
                        <div className="flex flex-col gap-6">
                            {relatedLocalities.map((loc, i) => (
                                <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link 
                                        to={`/location/${loc.slug}`}
                                        className="group flex items-center justify-between p-8 bg-[#F8F9FA]/50 rounded-[24px] border border-white/20 hover:bg-[#151822] border border-white/20 hover:border-accent hover:shadow-2xl transition-all"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-lg font-bold text-[#202124] group-hover:rainbow-text-clip font-bold tracking-tight">{loc.name} Hub</span>
                                            <div className="flex items-center gap-3">
                                                <MapPin size={12} className="rainbow-text-clip font-bold" />
                                                <span className="text-[10px] text-[#5F6368] font-bold tracking-tight font-medium">{loc.distance} Synthesis</span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={24} className="text-gray-200 group-hover:rainbow-text-clip font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-24 p-12 bg-white rounded-[24px] text-[#202124] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                        <Cpu size={150} />
                    </div>
                    <div className="space-y-4 relative z-10 text-center lg:text-left">
                        <h4 className="text-3xl md:text-5xl font-sans font-bold tracking-tighter leading-tight italic">Secure Your <br /> <span className="rainbow-text-clip font-bold">Sovereign Thesis.</span></h4>
                        <p className="text-[#202124]/50 text-xl font-medium tracking-tight">Download the 2026 Hinjewadi Infrastructure & ROI appreciation monograph.</p>
                    </div>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-brochure-engine'))}
                        className="px-16 py-8 bg-accent text-[#202124] rounded-full font-bold text-2xl hover:bg-white transition-all shadow-2xl flex items-center gap-6 group/btn relative z-10"
                    >
                        Initiate Synthesis <ArrowUpRight size={32} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
