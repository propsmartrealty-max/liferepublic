import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SEO } from '../../components/seo/SEO';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Layout, ArrowUpRight, Calculator, Landmark, Shield } from 'lucide-react';

export const TwoBHK: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                const filtered = data.filter(p =>
                    p.features.some(f => f.includes('2 BHK')) ||
                    p.category.includes('2 BHK') ||
                    p.description.includes('2 BHK')
                );
                setProjects(filtered);
            } catch (error) {
                console.error('Failed to load projects', error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="bg-transparent">
            <SEO
                title="Sovereign 2 BHK Flats in Hinjewadi | Yield Synthesis 2026"
                description="Discover premium 2 BHK residences at Kolte Patil Life Republic Hinjewadi. High-efficiency layouts, 4% rental yields, and IT Park proximity for young professionals."
                keywords="2bhk in hinjewadi, life republic 2bhk price, kolte patil 2bhk flats, rental yield hinjewadi, 2 bhk investment pune"
                canonical="/2-bhk-flats-in-hinjewadi"
            />
            <section className="relative pt-48 pb-32 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-secondary z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-30 grayscale blur-[1px]"></div>
                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-3 bg-accent/20 border border-accent/30 rounded-full mb-12 backdrop-blur-xl">
                            <Sparkles size={16} className="text-[#1a73e8] animate-pulse" />
                            <span className="text-[10px] font-bold tracking-tight font-semibold text-[#1a73e8]">The Efficiency Collection v5.5</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-[5rem] lg:text-[6rem] font-sans font-bold text-[#202124] mb-10 tracking-tighter leading-[0.8]">Synthesizing <br /> <span className="text-[#1a73e8] italic">Efficiency.</span></h1>
                        <p className="text-2xl md:text-3xl text-[#5F6368] max-w-4xl leading-relaxed font-medium">The Life Republic 2 BHK collection is engineered for the modern professional, synthesizing smart spatial flow with high-yield investment potential.</p>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                    {[
                        { title: 'Rental Yield Alpha', desc: 'Commanding 3-4.5% annual yields driven by 300,000+ IT professionals in proximity.', icon: TrendingUp },
                        { title: 'Smart Efficiency', desc: 'Zero-wastage floor plans synthesized for hybrid-work and ergonomic living.', icon: Layout },
                        { title: 'Managed Protocols', desc: 'End-to-end rental management for absentee owners and NRI investors.', icon: Shield }
                    ].map((item, idx) => (
                        <div key={idx} className="p-12 bg-[#F8F9FA] rounded-[3.5rem] border border-[#DADCE0] hover:border-accent transition-all group shadow-sm">
                            <div className="w-16 h-16 bg-[#151822] border border-[#DADCE0] rounded-2xl flex items-center justify-center text-[#1a73e8] mb-10 shadow-md group-hover:scale-110 transition-transform"><item.icon size={32} /></div>
                            <h3 className="text-2xl font-sans font-bold text-[#202124] mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-lg text-[#5F6368] font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mb-40">
                    <div className="flex items-end justify-between mb-10 border-b border-[#DADCE0] pb-12">
                        <div className="max-w-2xl"><span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold mb-4 block">Volume Synthesis</span><h2 className="text-5xl md:text-7xl font-sans font-bold text-[#202124] tracking-tighter">The 2 BHK <span className="text-[#1a73e8] italic">Portfolio.</span></h2></div>
                    </div>
                    {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">{[1, 2, 3].map(i => (<div key={i} className="bg-[#F8F9FA] rounded-[3.5rem] h-[500px] animate-pulse" />))}</div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">{projects.map((project) => (<ProjectCard key={project.id} project={project} />))}</div>)}
                </div>
                <section className="mb-40 bg-white rounded-[5rem] p-16 md:p-32 text-[#202124] relative overflow-hidden group">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-5 space-y-12">
                            <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter leading-tight">The Yield <br /><span className="text-[#1a73e8] italic">Synthesis Delta.</span></h2>
                            <p className="text-2xl text-[#5F6368] leading-relaxed font-medium">A 2 BHK residence at Life Republic isn't just a home; it's a high-liquidity financial asset positioned at the epicenter of Pune's IT growth.</p>
                            <div className="p-8 bg-[#151822] border border-[#DADCE0]/5 rounded-[24px] border border-[#DADCE0]"><div className="flex items-center gap-4 text-[#1a73e8] mb-3"><Target size={20} /><span className="text-[11px] font-bold tracking-tight font-semibold">Market Scarcity</span></div><p className="text-lg font-bold text-[#202124] tracking-tight font-semibold">Premium 2 BHK inventory in Hinjewadi Ph 3 is projected to face a 12% supply-gap by 2026.</p></div>
                        </div>
                        <div className="lg:col-span-7 bg-[#151822] border border-[#DADCE0]/5 backdrop-blur-3xl rounded-[24px] p-12 md:p-20 border border-[#DADCE0] shadow-2xl">
                            <div className="space-y-12">
                                <div className="flex items-center gap-8 p-8 bg-[#151822] border border-[#DADCE0]/5 rounded-[24px] border border-[#DADCE0]"><div className="p-5 bg-accent text-[#202124] rounded-2xl"><Calculator size={32} /></div><div><p className="text-[10px] font-bold text-[#202124]/40 tracking-tight font-semibold mb-2">Average Rental Yield</p><p className="text-4xl font-sans font-bold text-[#202124] tracking-tighter">~4.2% p.a.</p></div></div>
                                <div className="flex items-center gap-8 p-8 bg-[#151822] border border-[#DADCE0]/5 rounded-[24px] border border-[#DADCE0]"><div className="p-5 bg-white text-[#1a73e8] rounded-2xl border border-accent/20"><Landmark size={32} /></div><div><p className="text-[10px] font-bold text-[#202124]/40 tracking-tight font-semibold mb-2">Projected Appreciation (2026)</p><p className="text-4xl font-sans font-bold text-[#1a73e8] tracking-tighter">+12.5% YoY</p></div></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <div className="max-w-5xl mx-auto p-20 bg-[#F8F9FA] rounded-[5rem] border border-[#DADCE0] shadow-inner relative overflow-hidden">
                        <h2 className="text-4xl md:text-7xl font-sans font-bold text-[#202124] mb-10 tracking-tighter">Secure Your <br /> <span className="text-[#1a73e8] italic">Sovereign Asset.</span></h2>
                        <div className="flex flex-col md:flex-row gap-8 justify-center"><a href="/contact"><button className="bg-white text-[#202124] px-20 py-10 rounded-full font-bold text-2xl hover:bg-accent hover:text-[#202124] transition-all shadow-2xl flex items-center justify-center gap-4 group">Initiate Site Synthesis <ArrowUpRight size={32} /></button></a></div>
                        <p className="text-[10px] font-bold text-[#5F6368] tracking-tight font-semibold mt-16 block">Secure Yield Access Protocol v5.5</p>
                    </div>
                </section>
            </div>
        </div>
    );
};
