import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Star, Quote, PlayCircle, Users, Heart, Sparkles, Trophy, ShieldCheck, Cpu, Network, ArrowUpRight, Globe } from 'lucide-react';

const reviews = [
    {
        name: "Rahul Deshpande",
        role: "Sr. IT Lead, Infosys",
        impact: "Connectivity",
        text: "Living in Life Republic is like living in a resort. My commute to Hinjewadi Phase 1 is just 10 mins via the Spine Road, and my kids love the Anisha school within the campus.",
        rating: 5,
        video: true,
        tenure: "2018",
        sector: "Arezo",
        img: "/images/home/atmos-thumb.jpg"
    },
    {
        name: "Priya Sharma",
        role: "Consultant Physician, Ruby Hall",
        impact: "Safety",
        text: "The security and community feel here is unmatched. As a working mother, I feel absolute peace of mind knowing my parents are comfortable in this integrated township.",
        rating: 5,
        video: false,
        tenure: "2021",
        sector: "Nora",
        img: "/images/home/atmos-thumb.jpg"
    },
    {
        name: "Amit Patel",
        role: "Business Architect, TechM",
        impact: "ROI Synthesis",
        text: "I invested in Arezo back in 2021. The appreciation delta following the Spine Road completion has been fantastic. A high-fidelity investment choice in Pune West.",
        rating: 5,
        video: true,
        tenure: "2019",
        sector: "Aros",
        img: "/images/home/atmos-thumb.jpg"
    },
    {
        name: "Sandeep Varma",
        role: "Senior Architect, Gensler",
        impact: "Design",
        text: "The attention to detail in the master planning is evident. 150ft wide roads and the abundance of green spaces make it Hinjewadi's premier residential hub.",
        rating: 5,
        video: false,
        tenure: "2020",
        sector: "Atmos",
        img: "/images/home/atmos-thumb.jpg"
    }
];

const communityStats = [
    { label: 'Verified Citizens', value: '12,500+', icon: Users, color: 'rainbow-text-clip font-bold' },
    { label: 'Resident NPS', value: '4.8/5', icon: Heart, color: 'text-[#1a73e8]' },
    { label: 'Community Tenure', value: '10+ Yrs', icon: Trophy, color: 'text-emerald-400' }
];

export const Testimonials: React.FC = () => {
    return (
        <div className="bg-transparent selection:bg-accent selection:text-[#202124]">
            <SEO
                title="Sovereign Social Authority | Resident Monographs | Life Republic"
                description="Read authentic experiences from 12,500+ residents at Kolte Patil Life Republic. Verified stories of community living, security, and growth in Hinjewadi."
                keywords="Life Republic Reviews, Hinjewadi resident stories, Kolte Patil customer feedback, Life Republic amenities review"
                canonical="/testimonials"
            />
            
            {/* Community Pulse Header v6.5 */}
            <section className="bg-white text-[#202124] pt-56 pb-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/60 to-white z-0"></div>
                <div className="absolute inset-0 bg-[url('/images/home/atmos-thumb.jpg')] bg-cover bg-center grayscale opacity-10 blur-[2px] scale-110"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-7xl mx-auto text-center mb-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-6 px-10 py-4 bg-accent/10 border border-accent/20 rounded-full mb-8 backdrop-blur-3xl shadow-2xl"
                        >
                            <ShieldCheck size={20} className="text-[#1a73e8] animate-pulse" />
                            <span className="text-[12px] font-bold tracking-tight font-semibold text-[#1a73e8]">Verified Social Monograph v6.5</span>
                        </motion.div>
                        <h1 className="text-8xl md:text-[5rem] lg:text-[6rem] font-sans font-bold mb-8 tracking-tighter leading-[0.8] italic">
                            The Collective <br /> <span className="text-[#1a73e8]">Authority.</span>
                        </h1>
                        <p className="text-3xl md:text-4xl text-[#202124]/40 max-w-5xl mx-auto leading-relaxed font-medium italic">
                            A sovereign community of 12,500+ citizens sharing a singular vision of integrated township living. Synthesized in Pune's strategic epicenter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
                        {communityStats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.15 * idx }}
                                className="bg-white/5 backdrop-blur-3xl border border-[#DADCE0] p-16 rounded-[4.5rem] flex flex-col gap-10 group hover:bg-[#151822] border border-[#DADCE0]/10 transition-all shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                            >
                                <div className={`w-24 h-24 bg-white/5 rounded-[24px] ${stat.color} flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform border border-[#DADCE0]`}>
                                    <stat.icon size={48} strokeWidth={1} />
                                </div>
                                <div>
                                    <div className="text-8xl font-sans font-bold tracking-tighter mb-2 italic group-hover:text-[#1a73e8] transition-colors">{stat.value}</div>
                                    <div className="text-[14px] font-bold tracking-tight font-semibold text-[#202124]/20">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resident Stories Matrix v6.5 */}
            <section className="py-64 bg-[#F8F9FA]/30 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 border-b border-[#DADCE0] pb-20 gap-12">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <Cpu size={24} className="text-[#1a73e8]" />
                                <span className="text-[11px] font-bold text-[#1a73e8] tracking-tight font-semibold">Community Narratives</span>
                            </div>
                            <h2 className="text-7xl md:text-9xl font-sans font-bold text-[#202124] tracking-tighter leading-none italic">Citizen <br />Monographs.</h2>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            {['Connectivity', 'Safety', 'Nature', 'ROI Synthesis'].map((tag, i) => (
                                <button key={i} className="px-10 py-4 bg-white border border-[#DADCE0] rounded-full text-[11px] font-bold tracking-tight font-semibold text-[#5F6368] hover:border-accent hover:text-[#1a73e8] transition-all hover:scale-105 shadow-sm">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="columns-1 md:columns-2 gap-16 space-y-16 max-w-7xl mx-auto">
                        {reviews.map((review, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="break-inside-avoid bg-[#151822] border border-[#DADCE0] p-16 rounded-[5rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] border border-[#DADCE0] flex flex-col group transition-all hover:border-accent hover:shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform">
                                    <Globe size={150} />
                                </div>
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="p-8 bg-accent/10 text-[#1a73e8] rounded-[24px] group-hover:bg-accent group-hover:text-[#202124] transition-all shadow-inner border border-accent/20 group-hover:rotate-12">
                                        <Quote size={40} />
                                    </div>
                                    <div className="flex flex-col items-end gap-6">
                                        <div className="flex gap-2 text-[#1a73e8]">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={24} fill="currentColor" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold px-6 py-2 bg-accent/10 rounded-full border border-accent/20">{review.impact} Synthesis</span>
                                    </div>
                                </div>

                                {review.video && (
                                    <div className="relative mb-8 group/video cursor-pointer overflow-hidden rounded-[24px] aspect-video bg-[#151822] shadow-2xl border-4 border-white">
                                        <div className="absolute inset-0 bg-white/40 group-hover/video:bg-white/10 transition-all z-10 flex items-center justify-center">
                                            <div className="w-24 h-24 bg-[#151822] border border-[#DADCE0]/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-[#DADCE0] group-hover/video:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                                                <PlayCircle size={64} className="text-[#202124]" />
                                            </div>
                                        </div>
                                        <img loading="lazy" 
                                            src={review.img} 
                                            alt={`${review.name} Story`} 
                                            className="w-full h-full object-cover group-hover/video:scale-110 transition-transform duration-[2s] grayscale group-hover/video:grayscale-0"
                                        />
                                    </div>
                                )}

                                <p className="text-[#5F6368] text-3xl md:text-4xl mb-8 leading-relaxed font-medium italic tracking-tight relative z-10 max-w-2xl">"{review.text}"</p>
                                
                                <div className="mt-auto pt-12 border-t border-[#DADCE0] flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-8">
                                        <div className="w-20 h-20 bg-[#F8F9FA] rounded-[2rem] flex items-center justify-center text-[#202124] border border-[#DADCE0] group-hover:bg-white group-hover:text-[#202124] transition-all shadow-xl group-hover:rotate-12">
                                            <Users size={36} strokeWidth={1} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <h4 className="font-sans font-bold text-[#202124] text-3xl tracking-tighter italic">{review.name}</h4>
                                                <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_var(--accent)]"></div>
                                            </div>
                                            <p className="text-[12px] text-[#5F6368] font-bold tracking-tight font-semibold">{review.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-3 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold tracking-tight font-semibold border border-emerald-100 mb-3 shadow-sm">
                                            <ShieldCheck size={16} />
                                            Verified Citizen
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-300 tracking-tight font-semibold">Since {review.tenure} • Sector {review.sector}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Call v6.5 */}
            <section className="py-64 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-6xl mx-auto space-y-20 p-24 md:p-32 bg-[#F8F9FA] rounded-[6rem] border border-[#DADCE0] relative overflow-hidden group shadow-[0_100px_200px_-50px_rgba(0,0,0,0.1)]"
                    >
                        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none group-hover:rotate-45 transition-transform duration-[4s]">
                            <Network size={400} />
                        </div>
                        <Sparkles size={64} className="text-[#1a73e8] mx-auto mb-12 animate-pulse" />
                        <h2 className="text-7xl md:text-[5rem] lg:text-[6rem] font-sans font-bold text-[#202124] tracking-tighter leading-[0.8] italic">Ready to join the <br /><span className="text-[#1a73e8]">Citizenship?</span></h2>
                        <p className="text-3xl text-[#5F6368] font-medium leading-relaxed max-w-3xl mx-auto italic">
                            Our citizens are our greatest structural proof. Join 12,500+ families already living the **Sovereign 15-Minute City** dream.
                        </p>
                        <div className="flex flex-col md:flex-row gap-10 justify-center pt-16">
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                                className="bg-white text-[#202124] px-20 py-10 rounded-full font-bold text-2xl hover:bg-accent hover:text-[#202124] transition-all shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex items-center justify-center gap-6 group/btn"
                            >
                                Secure Site Visit <ArrowUpRight size={32} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                            </button>
                            <a href="/lifestyle" className="bg-[#151822] border border-[#DADCE0] border-2 border-[#DADCE0] text-[#202124] px-20 py-10 rounded-full font-bold text-2xl hover:bg-[#F8F9FA] transition-all flex items-center justify-center gap-6 group/btn2">
                                The Lifestyle Monograph <Globe size={32} className="group-hover/btn2:rotate-12 transition-transform text-[#1a73e8]" />
                            </a>
                        </div>
                        <p className="text-[12px] font-bold text-gray-200 tracking-tight font-semibold mt-24 block">Citizenship Handshake v6.5 • 2026 Synchronized</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
