import React from 'react';
import { motion } from 'framer-motion';
import { Users, Music, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Helmet } from 'react-helmet-async';

export const CommunityCalendar: React.FC = () => {
    const events = [
        {
            date: 'MAY 15',
            title: 'Organic Farmer\'s Market',
            category: 'Lifestyle',
            icon: Music,
            desc: 'Fresh produce from local sustainable farms at the 3.5 Acre Central Park.'
        },
        {
            date: 'JUN 02',
            title: 'Inter-Sector Football League',
            category: 'Sports',
            icon: Trophy,
            desc: 'Join 24 sectors in the biggest community sports event of the year.'
        },
        {
            date: 'JUN 21',
            title: 'International Yoga Day',
            category: 'Wellness',
            icon: Users,
            desc: 'Mass sunrise yoga session at the Spine Road ecological buffer.'
        }
    ];

    return (
        <section className="py-12 bg-white overflow-hidden">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(events.map(event => ({
                        "@context": "https://schema.org",
                        "@type": "Event",
                        "name": event.title,
                        "startDate": `2026-${event.date.split(' ')[0] === 'MAY' ? '05' : '06'}-${event.date.split(' ')[1]}T10:00:00+05:30`,
                        "location": {
                            "@type": "Place",
                            "name": "Life Republic Central Park",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Life Republic, Hinjewadi",
                                "addressLocality": "Pune",
                                "postalCode": "411057",
                                "addressRegion": "Maharashtra",
                                "addressCountry": "IN"
                            }
                        },
                        "description": event.desc,
                        "organizer": {
                            "@type": "Organization",
                            "name": "Life Republic Community Management",
                            "url": "https://life-republic.in"
                        }
                    })))}
                </script>
            </Helmet>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-20 items-end mb-8">
                    <div className="lg:w-2/3">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#1a73e8] text-[10px] font-bold tracking-tight font-semibold block mb-6"
                        >
                            The Sovereign Social
                        </motion.span>
                        <h2 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] leading-[1.1] mb-8">
                            Community <br />Pulse 2026
                        </h2>
                        <p className="text-[#5F6368] text-lg font-light leading-relaxed max-w-xl">
                            Life at Life Republic is more than square footage. It's a curated ecosystem of events, networking, and wellness.
                        </p>
                    </div>
                    <div className="lg:w-1/3 flex justify-start lg:justify-end">
                        <Button variant="outline" className="rounded-full px-8 h-14 gap-2">
                            View Full Calendar <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-8 rounded-[24px] border border-[#DADCE0] bg-[#F8F9FA]/50 hover:bg-[#151822] border border-[#DADCE0] hover:shadow-2xl hover:border-transparent transition-all duration-500 cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="text-[#1a73e8] font-sans font-bold text-xl">{event.date}</div>
                                <div className="w-12 h-12 bg-[#151822] border border-[#DADCE0] rounded-2xl shadow-sm flex items-center justify-center text-[#202124] group-hover:bg-accent group-hover:text-[#202124] transition-colors">
                                    <event.icon size={20} />
                                </div>
                            </div>
                            <span className="text-[10px] font-bold tracking-tight font-medium text-[#5F6368] block mb-2">{event.category}</span>
                            <h4 className="text-xl font-bold text-[#202124] mb-4 group-hover:text-[#1a73e8] transition-colors">{event.title}</h4>
                            <p className="text-[#5F6368] text-sm leading-relaxed mb-6">
                                {event.desc}
                            </p>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden -ml-2 first:ml-0">
                                        <img loading="lazy" src={`https://i.pravatar.cc/150?u=${idx}${i}`} alt="Attendee" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <span className="text-[10px] font-bold text-[#5F6368] ml-2">+450 Residents</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Social Proof Layer */}
                <div className="mt-32 border-t border-[#DADCE0] pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Families', value: '12,000+' },
                            { label: 'Schools', value: '02 Global' },
                            { label: 'Parks', value: '3.5 Acres' },
                            { label: 'Security', value: '24/7 Intel' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <span className="text-3xl md:text-4xl font-sans font-bold text-[#202124] block mb-2">{stat.value}</span>
                                <span className="text-[10px] font-bold tracking-tight font-medium text-[#1a73e8]">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
