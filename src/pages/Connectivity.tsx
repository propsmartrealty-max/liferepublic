import React from 'react';
import { motion } from 'framer-motion';
import { Route, Clock, Zap, ArrowRight } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { SectorComparison } from '../components/sections/SectorComparison';

export const Connectivity: React.FC = () => {
    const [isPeakHour, setIsPeakHour] = React.useState(false);

    const landmarks = [
        { name: "Phase 1 IT Park", distance: "4.5 km", offPeak: "10 mins", peak: "18 mins", type: "Work", impact: "High" },
        { name: "Phase 3 IT Cluster", distance: "2.1 km", offPeak: "5 mins", peak: "8 mins", type: "Work", impact: "Direct" },
        { name: "Blue Ridge School", distance: "3.8 km", offPeak: "8 mins", peak: "12 mins", type: "Education", impact: "Stable" },
        { name: "Metro Station R1", distance: "1.2 km", offPeak: "3 mins", peak: "5 mins", type: "Transit", impact: "2026 Delta" },
        { name: "Mumbai-Pune Expressway", distance: "7.0 km", offPeak: "12 mins", peak: "15 mins", type: "Transit", impact: "Gateway" },
        { name: "Pheonix Mall (Hinjewadi)", distance: "5.5 km", offPeak: "12 mins", peak: "18 mins", type: "Retail", impact: "Lifestyle" }
    ];

    const metroTimeline = [
        { phase: "2024", milestone: "Pillar & Viaduct Completion", status: "Active" },
        { phase: "2025", milestone: "Station Architectural Finish", status: "Upcoming" },
        { phase: "2026", milestone: "Operational Launch: Ph 3 to Shivajinagar", status: "Strategic" }
    ];

    return (
        <div className="bg-transparent">
            <SEO 
                title="Connectivity & Metro 2026 Roadmap | Life Republic Hinjewadi"
                description="Experience the Sovereign Transit advantage. 150ft wide spine road, direct access to Hinjewadi Metro Line 3 (Operational 2026), and 10-minute commute to IT clusters."
                keywords="Life Republic Metro 2026, Hinjewadi Metro Station, Life Republic Spine Road, Flats near Hinjewadi Phase 3, Pune Metro Line 3"
            />

            {/* Hero Section */}
            <section className="relative py-16 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/aerial-night.png')] bg-cover bg-center opacity-10 grayscale"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-8"
                        >
                            <Route size={14} className="rainbow-text-clip font-bold" />
                            <span className="text-[10px] font-bold tracking-tight font-semibold rainbow-text-clip font-bold">Sovereign Transit Protocol</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] mb-8 leading-tight">
                            The Spine of <br /> <span className="rainbow-text-clip font-bold italic">Future Mobility.</span>
                        </h1>
                        <p className="text-xl text-[#5F6368] max-w-2xl mx-auto leading-relaxed font-medium">
                            Life Republic is anchored by the 150ft Spine Road, directly syncing the 390-acre ecosystem with the 2026 Pune Metro network and global IT hubs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Metro 2026 Roadmap */}
            <section className="py-12 bg-[#F8F9FA] overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] mb-8">Metro Line 3 <br /> <span className="rainbow-text-clip font-bold italic">The Value Catalyst.</span></h2>
                            <div className="space-y-8">
                                {metroTimeline.map((item, idx) => (
                                    <div key={idx} className="flex gap-6 relative group">
                                        {idx !== metroTimeline.length - 1 && (
                                            <div className="absolute left-[27px] top-12 bottom-0 w-px bg-gray-200 group-hover:bg-accent transition-colors"></div>
                                        )}
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${item.status === 'Active' ? 'bg-white text-[#202124] border-secondary' : 'bg-white text-[#5F6368] border-white/20'}`}>
                                            <span className="font-bold text-sm">{item.phase}</span>
                                        </div>
                                        <div className="pt-2">
                                            <h4 className="font-bold text-[#202124] text-lg mb-1">{item.milestone}</h4>
                                            <span className={`text-[10px] font-bold tracking-tight font-medium ${item.status === 'Active' ? 'text-green-500' : 'rainbow-text-clip font-bold'}`}>{item.status} Status</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 bg-white p-12 rounded-[3.5rem] text-[#202124] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]"></div>
                            <div className="relative z-10">
                                <Zap size={48} className="rainbow-text-clip font-bold mb-8 animate-pulse" />
                                <h3 className="text-3xl font-sans font-bold mb-6">Strategic Proximity Delta</h3>
                                <p className="text-[#5F6368] text-lg leading-relaxed mb-8">
                                    Property values within a 1.5km radius of Metro Stations have historically seen a **25-40% premium**. Life Republic's gate is situated 1.2km from the upcoming Phase 3 station.
                                </p>
                                <div className="p-6 bg-[#151822] border border-white/20/5 rounded-3xl border border-white/20">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-[#5F6368] uppercase">Station Access</span>
                                        <span className="rainbow-text-clip font-bold font-bold">1.2 KM</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#151822] border border-white/20/10 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} className="h-full bg-accent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proximity Matrix */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] mb-4">The Transit Matrix.</h2>
                            <p className="text-[#5F6368] text-xl font-medium">Real-time travel synthesis for the 2026 infrastructure roadmap.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-[#F8F9FA] p-3 rounded-2xl border border-white/20 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className={!isPeakHour ? 'text-green-500' : 'text-gray-300'} />
                                <span className={`text-[10px] font-bold tracking-tight font-medium transition-colors ${!isPeakHour ? 'text-[#202124]' : 'text-[#5F6368]'}`}>Normal</span>
                            </div>
                            <button 
                                onClick={() => setIsPeakHour(!isPeakHour)}
                                className={`w-12 h-6 rounded-full relative transition-all duration-500 ${isPeakHour ? 'bg-accent' : 'bg-white'}`}
                            >
                                <motion.div animate={{ x: isPeakHour ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-[#151822] border border-white/20 rounded-full shadow-lg" />
                            </button>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold tracking-tight font-medium transition-colors ${isPeakHour ? 'text-[#202124]' : 'text-[#5F6368]'}`}>Peak</span>
                                <Zap size={16} className={isPeakHour ? 'rainbow-text-clip font-bold' : 'text-gray-300'} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {landmarks.map((landmark, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-10 rounded-[24px] border border-white/20 bg-[#151822] border border-white/20 hover:border-accent hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all group"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-[10px] font-bold rainbow-text-clip font-bold tracking-tight font-semibold">{landmark.type}</span>
                                    <div className="px-3 py-1 bg-[#F8F9FA] rounded-full text-[10px] font-bold text-[#202124] border border-white/20">{landmark.impact}</div>
                                </div>
                                <h4 className="text-2xl font-sans font-bold text-[#202124] mb-6 group-hover:rainbow-text-clip font-bold transition-colors">{landmark.name}</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#5F6368] font-medium tracking-tight font-medium text-[10px]">Distance</span>
                                        <span className="font-bold text-[#202124]">{landmark.distance}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#5F6368] font-medium tracking-tight font-medium text-[10px]">Est. Time</span>
                                        <span className={`text-2xl font-sans font-bold ${isPeakHour ? 'rainbow-text-clip font-bold' : 'text-[#202124]'}`}>
                                            {isPeakHour ? landmark.peak : landmark.offPeak}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <SectorComparison />

            {/* CTA */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/aerial-night.png')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] mb-8">Synthesize Your Commute.</h2>
                    <p className="text-xl text-[#5F6368] mb-12 max-w-2xl mx-auto font-medium">
                        Experience the frictionless mobility of Pune's most strategically located integrated township.
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center gap-4 bg-[#151822] border border-white/20 text-[#202124] px-12 py-6 rounded-full font-bold text-lg hover:bg-accent transition-all hover:scale-105 shadow-2xl"
                    >
                        Schedule a Sovereign Tour
                        <ArrowRight size={20} />
                    </a>
                </div>
            </section>
        </div>
    );
};
