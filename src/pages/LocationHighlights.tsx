import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Train, ShoppingBag, Briefcase, Zap, Compass, Target, Navigation, ArrowUpRight, BarChart3 } from 'lucide-react';

const SovereignMap = React.lazy(() => import('../components/ui/SovereignMap').then(module => ({ default: module.SovereignMap })));

const highlights = [
    {
        category: 'Economic Tectonics',
        icon: Briefcase,
        items: [
            { name: 'Rajiv Gandhi IT Park', time: '10 mins', status: 'Global Hub' },
            { name: 'Embassy Tech Zone', time: '12 mins', status: 'Institutional' },
            { name: 'Quadron Business Park', time: '10 mins', status: 'High Yield' }
        ]
    },
    {
        category: 'Transit Synthesis',
        icon: Train,
        items: [
            { name: 'Metro Ph 3 Station', time: '5 mins', status: '2026 Milestone' },
            { name: 'Spine Road Backbone', time: 'Immediate', status: '150ft Width' },
            { name: 'Mumbai-Pune Exp.', time: '15 mins', status: 'National Link' }
        ]
    },
    {
        category: 'Lifestyle Radius',
        icon: ShoppingBag,
        items: [
            { name: 'Phoenix Millennium', time: '20 mins', status: 'Luxury Retail' },
            { name: 'Anisha Global', time: 'Within Gates', status: 'Top Rated' },
            { name: 'Ruby Hall Clinic', time: '12 mins', status: 'Tertiary Care' }
        ]
    }
];

export const LocationHighlights: React.FC = () => {
    return (
        <div className="bg-transparent">
            <SEO
                title="Sovereign Location Highlights | Hinjewadi 2026 Roadmap"
                description="Explore the Hinjewadi 2026 Infrastructure Roadmap. 5 mins to Metro, 150ft Spine Road connectivity, and 10 mins to Global IT Hubs. Discover the strategic epicenter of Pune West."
                keywords="Hinjewadi Infrastructure 2026, Life Republic Location, Hinjewadi Metro Connectivity, Pune Real Estate Investment 2026"
                canonical="/location-highlights"
            />

            {/* Sovereign Nexus Hero */}
            <section className="relative pt-40 pb-32 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-secondary z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-30 grayscale blur-[1px]"></div>
                
                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-5xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-accent/20 border border-accent/30 rounded-full mb-12 backdrop-blur-xl"
                        >
                            <Compass size={16} className="rainbow-text-clip font-bold animate-spin-slow" />
                            <span className="text-[10px] font-bold tracking-tight font-semibold rainbow-text-clip font-bold">Infrastructure Synthesis 2026</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-9xl font-sans font-bold text-[#202124] mb-10 tracking-tighter leading-none">
                            The Strategic <br /> <span className="rainbow-text-clip font-bold italic">Epicenter.</span>
                        </h1>
                        <p className="text-2xl text-[#5F6368] font-medium max-w-3xl leading-relaxed mb-12">
                            Synthesizing the Rajiv Gandhi Infotech Park's economic velocity with the 2026 Metro expansion. A 390-acre structural masterclass.
                        </p>
                        
                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span className="text-4xl font-sans font-bold text-[#202124]">1.2km</span>
                                <span className="text-[10px] font-bold rainbow-text-clip font-bold tracking-tight font-medium mt-1">To Metro Ph 3</span>
                            </div>
                            <div className="w-px h-12 bg-transparent/10"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-sans font-bold text-[#202124]">0 min</span>
                                <span className="text-[10px] font-bold rainbow-text-clip font-bold tracking-tight font-medium mt-1">To Spine Road</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Ledger */}
            <section className="py-16 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-4 space-y-16">
                            <div className="space-y-6">
                                <span className="text-[10px] font-bold rainbow-text-clip font-bold tracking-tight font-semibold">Spatial Metrics</span>
                                <h2 className="text-5xl font-sans font-bold text-[#202124] tracking-tighter">The Sector <br />Mesh Analysis.</h2>
                                <p className="text-xl text-[#5F6368] font-medium leading-relaxed">
                                    Our 390-acre master plan is mathematically positioned to leverage the Hinjewadi Phase 3 expansion.
                                </p>
                            </div>
                            
                            <div className="space-y-8">
                                {[
                                    { label: 'IT Hub Velocity', val: '10 mins', icon: Briefcase },
                                    { label: 'Expressway Sync', val: '15 mins', icon: Navigation },
                                    { label: 'Retail Proximity', val: '20 mins', icon: ShoppingBag }
                                ].map((m, i) => (
                                    <div key={i} className="flex items-center justify-between p-8 bg-[#F8F9FA] rounded-[24px] border border-white/20 group hover:border-accent transition-all shadow-sm">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white border border-black/10 rounded-2xl flex items-center justify-center rainbow-text-clip font-bold shadow-sm group-hover:scale-110 transition-transform">
                                                <m.icon size={20} />
                                            </div>
                                            <span className="text-[11px] font-bold text-[#202124] tracking-tight font-semibold">{m.label}</span>
                                        </div>
                                        <span className="text-xl font-bold text-[#202124]">{m.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-8 relative group">
                            <div className="absolute -inset-8 border border-accent/10 rounded-[4.5rem] pointer-events-none"></div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/20 h-[750px] group-hover:border-accent/20 transition-all duration-1000"
                            >
                                <React.Suspense fallback={<div className="h-full w-full bg-[#151822] animate-pulse flex items-center justify-center font-sans text-2xl text-[#5F6368]">Synthesizing Location Nexus...</div>}>
                                    <SovereignMap />
                                </React.Suspense>
                                
                                {/* HUD Overlay */}
                                <div className="absolute top-12 left-12 z-20 pointer-events-none">
                                    <div className="bg-white/90 backdrop-blur-3xl p-8 rounded-[24px] border border-white/20 shadow-2xl">
                                        <div className="flex items-center gap-4 rainbow-text-clip font-bold mb-4">
                                            <Target size={20} className="animate-pulse" />
                                            <span className="text-[10px] font-bold tracking-tight font-semibold">Target Nexus Lock</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-2xl font-sans font-bold text-[#202124] tracking-tighter">HINJEWADI_PH3</div>
                                            <div className="text-[9px] text-[#202124]/40 font-mono tracking-widest uppercase">Coordinates: 18.5915° N, 73.7191° E</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-12 right-12 z-20 p-8 bg-white/90 backdrop-blur-2xl rounded-[24px] border border-black/10 text-[#202124] shadow-2xl flex items-center gap-6 group">
                                    <BarChart3 size={32} className="rainbow-text-clip font-bold group-hover:rotate-12 transition-transform" />
                                    <div>
                                        <p className="text-[10px] font-bold tracking-tight font-medium opacity-60">ROI Catalyst</p>
                                        <p className="text-xl font-sans font-bold">15-Min Radius</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure Roadmap Matrix */}
            <section className="py-16 bg-[#F8F9FA]/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-5">
                    <Train size={300} className="text-[#202124]" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-10">
                        <span className="text-[10px] font-bold rainbow-text-clip font-bold tracking-tight font-semibold mb-4 block">The 2026 Forecast</span>
                        <h2 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] tracking-tighter">Infrastructure <span className="rainbow-text-clip font-bold italic">Hardening.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {highlights.map((group, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/80 backdrop-blur-2xl border-t border-l border-white/60 p-16 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                            >
                                <div>
                                    <div className="relative mb-12">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-[1.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        <div className="relative w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center border border-black/5 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500 text-black">
                                            <group.icon size={32} />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-sans font-bold text-[#202124] mb-12 tracking-tight">{group.category}</h3>
                                    <div className="space-y-10">
                                        {group.items.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between group/item">
                                                <div>
                                                    <p className="text-lg font-bold text-[#202124] group-hover/item:rainbow-text-clip font-bold transition-colors">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-[#5F6368] tracking-tight font-semibold mt-1">{item.status}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold rainbow-text-clip font-bold">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-16 pt-8 border-t border-black/5 flex items-center justify-between text-[10px] font-bold tracking-tight font-medium text-[#5F6368]">
                                    <span>Verified 2026</span>
                                    <ArrowUpRight size={16} className="rainbow-text-clip font-bold" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sovereign Verdict */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto p-20 md:p-32 bg-white rounded-[5rem] text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center grayscale opacity-5"></div>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"></div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative z-10"
                        >
                            <Zap size={72} className="rainbow-text-clip font-bold mx-auto mb-12 animate-pulse" />
                            <h2 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] mb-12 tracking-tighter leading-tight">The Investment <br /><span className="rainbow-text-clip font-bold italic text-5xl md:text-9xl">Conclusion.</span></h2>
                            <p className="text-2xl text-[#5F6368] leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
                                Hinjewadi Phase 3 is the fastest-growing real estate cluster in Pune West. Life Republic's 390-acre scale ensures that your asset is not just a home, but a sovereign stake in the city's IT future.
                            </p>
                            <div className="flex flex-col md:flex-row gap-8 justify-center">
                                <a href="/roi-calculator">
                                    <button className="bg-black text-white px-16 py-7 rounded-full font-bold text-lg hover:bg-accent hover:text-[#202124] transition-all shadow-2xl flex items-center gap-4">
                                        Synthesize ROI <ArrowUpRight size={24} />
                                    </button>
                                </a>
                                <a href="/contact">
                                    <button className="bg-transparent border-2 border-white/20 text-[#202124] px-16 py-7 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
                                        Secure Site Visit
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};
