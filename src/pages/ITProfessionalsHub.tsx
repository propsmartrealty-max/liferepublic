import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Laptop, Wifi, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/seo/SEO';

export const ITProfessionalsHub: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO
                title="Premium Homes for IT Professionals in Hinjewadi | Life Republic"
                description="Discover Kolte Patil Life Republic: The ultimate 390-acre township designed for IT professionals in Pune. Walk to work, enjoy 40+ amenities, and maximize your ROI."
                keywords="Flats for IT Professionals Pune, Hinjewadi IT Park flats, Life Republic near TCS, Walk to work homes Hinjewadi"
                canonical="/it-professionals-hinjewadi"
            />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center bg-white overflow-hidden">
                <div className="absolute inset-0">
                    <img loading="lazy" src="/images/projects/atmos/Atmos-1.jpg" alt="Life Republic Aerial View" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl space-y-8"
                    >
                        <span className="text-[#1a73e8] text-sm font-bold tracking-tight font-semibold block">
                            Rajiv Gandhi IT Park
                        </span>
                        <h1 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] tracking-tighter leading-[1.1]">
                            The Ultimate <br /><span className="text-[#1a73e8] italic">Work-Life</span> Synthesis.
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-medium">
                            Designed exclusively for the visionaries shaping the future in Pune's IT Corridor. Reduce your commute, elevate your lifestyle, and secure your financial future in a 390-acre smart township.
                        </p>
                        <div className="pt-8 flex flex-wrap gap-6">
                            <Button size="lg" className="rounded-full px-10 py-6 font-bold tracking-tight font-medium text-xs shadow-2xl" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>
                                Download ROI Report
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Advantage */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-8">
                        <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold block mb-4">Strategic Location</span>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] tracking-tighter">Minutes from <br /><span className="text-[#1a73e8] italic">Innovation.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Briefcase, time: "5 Mins", location: "Hinjewadi Phase 1", desc: "TCS, Infosys, Wipro Campuses" },
                            { icon: Laptop, time: "10 Mins", location: "Hinjewadi Phase 2", desc: "Embassy Tech Zone, Quadron" },
                            { icon: Clock, time: "15 Mins", location: "Hinjewadi Phase 3", desc: "Megapolis, Tech Mahindra" },
                            { icon: TrendingUp, time: "Walkable", location: "Upcoming Metro", desc: "Seamless connectivity to Pune City" }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 bg-[#F8F9FA] rounded-[24px] border border-[#DADCE0] hover:shadow-2xl hover:bg-[#151822] border border-[#DADCE0] transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-[#151822] border border-[#DADCE0] rounded-2xl flex items-center justify-center text-[#1a73e8] shadow-lg group-hover:bg-accent group-hover:text-[#202124] transition-colors mb-8">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-4xl font-sans font-bold text-[#202124] mb-2">{item.time}</h3>
                                <p className="text-lg font-bold text-[#E5C07B] mb-2">{item.location}</p>
                                <p className="text-sm text-[#5F6368] font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech-Enabled Living */}
            <section className="py-12 bg-white text-[#202124] rounded-[24px] mx-4 lg:mx-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 space-y-10">
                            <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold block">Smart Homes</span>
                            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter leading-tight">
                                Engineered for <br /><span className="text-[#1a73e8] italic">Digital Nomads.</span>
                            </h2>
                            <p className="text-xl text-[#5F6368] font-medium leading-relaxed">
                                Experience 40+ lifestyle amenities including dedicated co-working hubs, high-speed fiber connectivity, and smart home automation natively built into your living space.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Dedicated co-working spaces with high-speed Wi-Fi",
                                    "Smart home automation (lighting, security, climate)",
                                    "Electric Vehicle (EV) charging stations in every cluster",
                                    "24/7 power backup and enterprise-grade security"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-300 font-medium">
                                        <Wifi size={18} className="text-[#1a73e8]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="/images/projects/universe/clubhouse.webp" alt="Co-working Space" className="rounded-3xl w-full h-64 object-cover" />
                                <img src="/images/gallery/eros/eros-7.jpg" alt="Smart Home" className="rounded-3xl w-full h-64 object-cover mt-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 bg-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-[#202124] mb-8">Ready to upgrade your lifestyle?</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-medium">
                        Join thousands of IT professionals who have already made Life Republic their home.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Button size="lg" className="rounded-full px-12 py-6 font-bold tracking-tight font-medium text-sm shadow-2xl" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>
                            Schedule a VIP Tour
                        </Button>
                        <Link to="/projects">
                            <Button variant="outline" size="lg" className="rounded-full px-12 py-6 font-bold tracking-tight font-medium text-sm">
                                View Projects
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
