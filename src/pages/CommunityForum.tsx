import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Calendar, Megaphone, ArrowRight, ShieldCheck, Zap, Heart, Globe, Network, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

const forumPosts = [
    { title: 'New Organic Market this Sunday at Central Spine!', author: 'Priya S.', sector: 'Atmos (R22)', replies: 24, time: '2h ago', trending: true },
    { title: 'Morning Yoga Sessions at Urban Park', author: 'Rahul K.', sector: 'Aros (R13)', replies: 15, time: '5h ago' },
    { title: 'Best Broadband options for WFH in Sector R10?', author: 'Amit V.', sector: 'Universe (R10)', replies: 42, time: '1d ago' },
    { title: 'Tennis Tournament registrations open for all age groups', author: 'Admin', sector: 'Township Infrastructure', replies: 8, time: '3h ago', trending: true },
    { title: 'Review of Anisha Global School - Our Experience', author: 'Sneha M.', sector: 'Education Hub', replies: 112, time: '2d ago' },
    { title: 'EV Charging station sync in Arezo parking', author: 'Vikram R.', sector: 'Arezo (R16)', replies: 19, time: '4h ago' }
];

export const CommunityForum: React.FC = () => {
    return (
        <div className="bg-transparent pt-32 pb-40 relative overflow-hidden">
            <SEO 
                title="Sovereign Community Forum & Residents Hub | Life Republic"
                description="Join the vibrant 12,000+ family community at Kolte Patil Life Republic. Connect, participate in events, and stay updated with Hinjewadi's premier social ecosystem."
            />
            
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[250px] pointer-events-none -mr-64 -mt-64"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-32 mb-40">
                    <div className="max-w-4xl text-center lg:text-left">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-6 px-8 py-4 bg-white text-[#202124] rounded-full mb-12 backdrop-blur-3xl shadow-2xl"
                        >
                            <Network size={20} className="text-[#1a73e8] animate-pulse" />
                            <span className="text-[11px] font-bold tracking-tight font-semibold">Social Synthesis Matrix v6.0</span>
                        </motion.div>
                        <h1 className="text-7xl md:text-[5rem] lg:text-[6rem] font-sans font-bold text-[#202124] mb-12 tracking-tighter leading-[0.8]">Resident <br /><span className="text-[#1a73e8] italic">Authority.</span></h1>
                        <p className="text-2xl md:text-3xl text-[#5F6368] leading-relaxed font-medium max-w-3xl">
                            A preview of the private digital ecosystem for Life Republic citizens. Seamlessly connect with 12,000+ families through the <span className="text-[#202124] font-bold underline decoration-accent underline-offset-8">Sovereign Social Protocol</span>.
                        </p>
                    </div>
                    
                    <motion.div 
                        initial={{ rotate: -5, y: 50 }}
                        whileHover={{ rotate: 0, scale: 1.05, y: 0 }}
                        className="w-full max-w-xl aspect-[1.6/1] bg-white p-16 text-[#202124] relative overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] border border-[#DADCE0] rounded-[24px] group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="flex justify-between items-start mb-8">
                            <div className="space-y-2">
                                <h4 className="text-[12px] font-bold tracking-tight font-semibold text-[#1a73e8]">Sovereign Pass</h4>
                                <p className="text-[10px] text-[#202124]/40 uppercase font-bold tracking-[0.2em]">Hinjewadi Citizen Registry</p>
                            </div>
                            <div className="w-20 h-20 bg-[#151822] border border-[#DADCE0]/5 border border-[#DADCE0] rounded-3xl flex items-center justify-center font-sans text-4xl font-bold italic text-[#1a73e8] shadow-2xl group-hover:rotate-12 transition-transform">LR</div>
                        </div>
                        <div className="space-y-8">
                            <div className="h-4 w-64 bg-[#151822] border border-[#DADCE0]/5 rounded-full relative overflow-hidden">
                                <motion.div 
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                                />
                            </div>
                            <div className="h-4 w-48 bg-[#151822] border border-[#DADCE0]/5 rounded-full"></div>
                        </div>
                        <div className="mt-16 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-[#202124]/20 tracking-tight font-semibold font-bold">Protocol Active</p>
                                <p className="text-xl font-bold text-[#202124] tracking-[0.2em]">EST. 2026</p>
                            </div>
                            <div className="flex items-center gap-4 px-8 py-3 bg-accent text-[#202124] rounded-2xl text-[12px] font-bold tracking-tight font-semibold shadow-2xl">
                                <ShieldCheck size={20} /> Verified
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Forum Feed v6.0 */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex items-center justify-between mb-8 bg-[#F8F9FA]/50 backdrop-blur-xl px-12 py-8 rounded-[3.5rem] border border-[#DADCE0] shadow-inner">
                            <h2 className="text-2xl font-sans font-bold text-[#202124] flex items-center gap-6">
                                <MessageSquare size={32} className="text-[#1a73e8]" />
                                Community Synthesis Feed
                            </h2>
                            <button className="text-[11px] font-bold text-[#1a73e8] tracking-tight font-semibold border-b-2 border-accent pb-1 hover:text-[#202124] hover:border-secondary transition-all">Audit Global Discussions</button>
                        </div>
                        
                        <div className="space-y-8">
                            {forumPosts.map((post, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-[#151822] border border-[#DADCE0] p-12 rounded-[24px] border border-[#DADCE0] hover:border-accent hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] transition-all cursor-pointer group relative overflow-hidden"
                                >
                                    {post.trending && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-accent text-[#202124] text-[11px] font-bold px-8 py-3 rounded-bl-[2.5rem] tracking-tight font-semibold shadow-2xl animate-pulse">
                                                Trending
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-10">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-6">
                                                <span className="bg-accent/10 text-[#1a73e8] px-6 py-2 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase border border-accent/20">{post.sector}</span>
                                                <span className="text-[11px] font-bold text-gray-300 tracking-tight font-medium">{post.time} Synergy</span>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-sans font-bold text-[#202124] group-hover:text-[#1a73e8] transition-colors tracking-tighter leading-tight">{post.title}</h3>
                                        </div>
                                        
                                        <div className="flex items-center justify-between border-t border-gray-50 pt-10">
                                            <div className="flex items-center gap-12">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-[#F8F9FA] rounded-2xl flex items-center justify-center text-[#202124] border border-[#DADCE0] shadow-sm">
                                                        <Users size={20} />
                                                    </div>
                                                    <span className="text-base font-bold text-[#5F6368]">{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <MessageSquare size={20} className="text-[#1a73e8]" />
                                                    <span className="text-base font-bold text-[#5F6368]">{post.replies} Engagement Threads</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-green-50 px-6 py-2 rounded-full border border-green-100">
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                                                <span className="text-[11px] text-green-600 font-bold tracking-tight font-medium">{Math.floor(Math.random() * 50) + 15} residents live</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Synthesis v6.0 */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-white p-16 rounded-[5rem] text-[#202124] relative overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-10 grayscale pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                            <h3 className="text-4xl font-bold font-sans mb-12 flex items-center gap-6 relative z-10 tracking-tight">
                                <Calendar size={40} className="text-[#1a73e8]" />
                                Sovereign Events
                            </h3>
                            <div className="space-y-12 relative z-10">
                                {[
                                    { date: 'MAR 28', event: 'Central Spine Holi Synthesis', status: 'Platinum' },
                                    { date: 'APR 05', event: 'Sovereign Kids Workshop', status: 'Enrolling' },
                                    { date: 'APR 12', event: 'Township Tech Meetup', status: 'New' }
                                ].map((item, i) => (
                                    <div key={i} className="group/item">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-bold text-[#1a73e8] tracking-tight font-semibold">{item.date}</span>
                                            <span className="text-[10px] font-bold text-[#202124]/30 tracking-tight font-semibold">{item.status}</span>
                                        </div>
                                        <p className="text-xl font-bold group-hover/item:text-[#1a73e8] transition-colors tracking-tight leading-tight">{item.event}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-16 w-full bg-[#151822] border border-[#DADCE0] text-[#202124] py-8 rounded-full font-bold text-xl hover:bg-accent hover:text-[#202124] transition-all shadow-2xl relative z-10 group/btn flex items-center justify-center gap-4">
                                Secure Resident Pass
                                <ArrowUpRight size={24} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                            </button>
                        </div>

                        <div className="bg-[#151822] border border-[#DADCE0] p-16 rounded-[5rem] border border-[#DADCE0] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                                <Globe size={120} />
                            </div>
                            <h3 className="text-3xl font-bold font-sans text-[#202124] mb-12 flex items-center gap-6 relative z-10 tracking-tight">
                                <Users size={36} className="text-[#1a73e8]" />
                                Community Pulse
                            </h3>
                            <div className="grid grid-cols-2 gap-10 relative z-10">
                                <div className="bg-[#F8F9FA]/50 p-8 rounded-[24px] border border-[#DADCE0] shadow-inner group/stat">
                                    <div className="text-4xl font-sans font-bold text-[#202124] group-hover/stat:text-[#1a73e8] transition-colors">12k+</div>
                                    <div className="text-[11px] font-bold text-[#5F6368] tracking-tight font-semibold mt-3">Sovereign Families</div>
                                </div>
                                <div className="bg-[#F8F9FA]/50 p-8 rounded-[24px] border border-[#DADCE0] shadow-inner group/stat">
                                    <div className="text-4xl font-sans font-bold text-[#202124] group-hover/stat:text-[#1a73e8] transition-colors">45+</div>
                                    <div className="text-[11px] font-bold text-[#5F6368] tracking-tight font-semibold mt-3">Active Avenues</div>
                                </div>
                            </div>
                            <div className="mt-12 p-8 bg-accent/5 rounded-[24px] border border-accent/10">
                                <div className="flex items-center gap-4 text-[#1a73e8] font-bold mb-5 text-[11px] tracking-tight font-semibold">
                                    <Zap size={20} className="animate-pulse" /> Live Intensity Matrix
                                </div>
                                <div className="flex items-center gap-2 h-2.5 w-full bg-[#151822] rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ width: ['40%', '85%', '70%'] }}
                                        transition={{ duration: 6, repeat: Infinity }}
                                        className="h-full bg-accent shadow-[0_0_25px_rgba(197,160,89,0.8)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-12 rounded-[24px] border border-blue-100 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <Megaphone size={80} />
                            </div>
                            <div className="flex items-center gap-4 rainbow-text-clip font-bold font-bold mb-6">
                                <ShieldCheck size={28} />
                                <span className="text-[11px] tracking-tight font-semibold">Township Authority Hub</span>
                            </div>
                            <p className="text-lg rainbow-text-clip font-bold leading-relaxed font-medium">
                                Sovereign shuttle synchronization for Hinjewadi Phase 3 initiating April 1st. Access real-time schedules via Resident Matrix v6.0.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-48 text-center bg-white p-32 md:p-48 rounded-[7rem] relative overflow-hidden group shadow-[0_120px_240px_-60px_rgba(0,0,0,0.6)] border border-[#DADCE0]">
                    <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-10 grayscale pointer-events-none group-hover:scale-105 transition-transform duration-1000"></div>
                    <div className="relative z-10 max-w-5xl mx-auto">
                        <div className="w-32 h-32 bg-accent text-[#202124] rounded-[3.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                            <Heart size={64} className="animate-pulse" />
                        </div>
                        <h2 className="text-6xl md:text-[5rem] lg:text-[6rem] font-sans font-bold text-[#202124] mb-8 tracking-tighter leading-[0.8] italic">Join the <span className="text-[#1a73e8]">Citizenship.</span></h2>
                        <p className="text-3xl text-[#202124]/50 mb-10 font-medium leading-relaxed max-w-4xl mx-auto">Secure your place in Hinjewadi's most active integrated township. Join 12,000+ families already in residence.</p>
                        <a href="/projects" className="inline-flex items-center gap-8 bg-[#151822] border border-[#DADCE0] text-[#202124] px-24 py-12 rounded-full font-bold text-3xl hover:bg-accent hover:scale-[1.05] transition-all shadow-2xl group/btn">
                            Browse Sovereign Portfolio
                            <ArrowRight size={40} className="group-hover/btn:translate-x-4 transition-transform" />
                        </a>
                        <p className="text-[12px] font-bold text-[#202124]/20 tracking-tight font-semibold mt-32 block">Resident Onboarding Protocol v6.0 • 2026 Ready</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
