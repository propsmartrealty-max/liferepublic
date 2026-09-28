import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Milestone, TramFront, Building2, MousePointer2 } from 'lucide-react';

const infraItems = [
    {
        title: "Pune Metro Line 3",
        status: "Under Construction",
        impact: "Direct connectivity to Maan-Hinjewadi from Civil Court.",
        completion: "2025-26",
        icon: TramFront
    },
    {
        title: "PMREDA Ring Road",
        status: "Planning Stage",
        impact: "128km outer ring road passing near Marunji.",
        completion: "2027",
        icon: Milestone
    },
    {
        title: "Marunji Road Expansion",
        status: "Active",
        impact: "Expansion to 150ft to handle township traffic.",
        completion: "Ongoing",
        icon: Building2
    },
    {
        title: "High Street Retail",
        status: "Launched",
        impact: "Premium commercial blocks within Life Republic.",
        completion: "2025",
        icon: TrendingUp
    }
];

export const InfraTracker: React.FC = () => {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rainbow-text-clip font-bold rounded-full text-sm font-bold mb-4 tracking-tight font-medium">
                            <TrendingUp size={16} /> Sovereign Growth Monitor
                        </div>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] mb-6">Hinjewadi Infrastructure & Appreciation Tracker</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Track the real-time development of critical infrastructure projects driving property value appreciation in the <strong>Life Republic</strong> ecosystem.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {infraItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-[#F8F9FA] rounded-3xl border border-white/20 hover:border-accent hover:shadow-xl transition-all group"
                        >
                            <div className="w-14 h-14 bg-[#151822] border border-white/20 rounded-2xl flex items-center justify-center rainbow-text-clip font-bold mb-6 shadow-sm group-hover:bg-accent group-hover:text-[#202124] transition-all">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#202124] mb-2">{item.title}</h3>
                            <div className="inline-block px-2 py-1 bg-white border border-white/20 rounded text-[10px] font-bold rainbow-text-clip font-bold uppercase tracking-tighter mb-4">
                                {item.status}
                            </div>
                            <p className="text-[#5F6368] text-sm leading-relaxed mb-6">
                                {item.impact}
                            </p>
                            <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                                <span className="text-[10px] text-[#5F6368] uppercase font-bold tracking-widest">Est. Delivery</span>
                                <span className="text-sm font-bold text-[#202124]">{item.completion}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-white rounded-[2rem] text-[#202124] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h4 className="text-2xl font-bold mb-3">Want a detailed ROI Projection?</h4>
                            <p className="text-[#202124]/60 mb-0">Our analysts have mapped the 10-year appreciation curve for Marunji & Hinjewadi. Download the Sovereign Whitepaper.</p>
                        </div>
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                            className="px-10 py-4 bg-accent text-[#202124] rounded-full font-bold flex items-center gap-3 hover:bg-white hover:text-[#202124] transition-all shadow-xl shadow-accent/20"
                        >
                            <MousePointer2 size={18} /> Download Strategy PDF
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
