import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Briefcase, Plane, GraduationCap, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';
import { HeroSlider } from '../components/sections/HeroSlider';
import { MasterPlan } from '../components/sections/MasterPlan';
import { BrochureEngine } from '../components/ui/BrochureEngine';
import { AmenitiesCarousel } from '../components/sections/AmenitiesCarousel';
import { FAQ } from '../components/sections/FAQ';
import { SEO } from '../components/seo/SEO';
import { generateCollectionSchema, generateGlobalSchema, generateLocalBusinessSchema, generateReviewSchema } from '../utils/schemaGenerator';

import { TestimonialCarousel } from '../components/sections/TestimonialCarousel';
import { NeuralErrorBoundary } from '../components/ui/NeuralErrorBoundary';

const Home: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = React.useState<Project[]>([]);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.projects.getFeatured(3);
                if (data && data.length > 0) {
                    setFeaturedProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects from API:', error);
            }
        };
        loadData();
    }, []);

    const schema = useMemo(() => {
        const globalSchema = generateGlobalSchema();
        const localBusinessSchema = generateLocalBusinessSchema();
        const reviewSchema = generateReviewSchema();
        const baseSchemas = [globalSchema, localBusinessSchema, reviewSchema];
        
        if (featuredProjects.length > 0) {
            return [...baseSchemas, generateCollectionSchema(featuredProjects)];
        }
        return baseSchemas;
    }, [featuredProjects]);

    return (
        <div className="w-full">
            <SEO
                description="Discover Kolte Patil Life Republic in Hinjewadi, Pune. A 400-acre premium township offering luxury 1, 2, 3, and 4 BHK flats, villas, and commercial spaces. Thriving Community Living Hinjewadi."
                keywords="Kolte Patil Life Republic, Life Republic Hinjewadi, Life Republic Township Pune, 2 BHK flats in Hinjewadi, 3 BHK flats in Hinjewadi, 4 BHK flats in Hinjewadi, Premium homes in Hinjewadi Pune, Best township project in Pune, 400 Acres of Community Living, Integrated Townships in Pune, Real Estate Developer Company in Pune"
                canonical="/"
                schema={schema}
            />
            
            {/* SEO Static H1 */}
            <h1 className="sr-only">Kolte Patil Life Republic Township Hinjewadi</h1>

            {/* Phase 1: Captivation */}
            <HeroSlider />
      {/* Ultra Fluid Content Body */}
      <div className="relative z-20 -mt-[100px] bg-[#0A0A0A]/80 backdrop-blur-[50px] rounded-t-[3rem] border-t border-white/[0.05] shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
            
            {/* Phase 2: Introduction & Scale */}
            <section className="py-16 md:py-32 bg-transparent overflow-hidden relative" aria-label="Township Architecture and Volumes">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 rounded-bl-[100%] pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-accent text-xs font-bold tracking-tight font-semibold block mb-6">The Masterplan</motion.span>
                            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1] mb-8">A 390-Acre <br /><span className="text-golden-gradient">Vision</span></motion.h2>
                            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-text-muted text-lg font-light leading-relaxed mb-10"><strong>Kolte Patil Life Republic</strong> is a premium integrated township located in the heart of <strong>Hinjewadi, Pune</strong>. Designed around the principles of spatial harmony and sustainable community flow, it offers an unparalleled holistic lifestyle near Rajiv Gandhi Infotech Park.</motion.p>
                            
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col gap-8">
                                {[
                                    { label: '01', title: 'Macro Infrastructure', desc: 'A 150ft wide spine road connecting the entire ecosystem.' },
                                    { label: '02', title: 'Micro Habitats', desc: 'Lush green clusters designed for intimate community living.' },
                                    { label: '03', title: 'Neural Connectivity', desc: 'Seamless integration with Pune Metro and Mumbai-Pune Expressway.' }
                                ].map((vol, idx) => (
                                    <div key={idx} className="group cursor-pointer hover:pl-2 transition-all duration-300">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-accent font-bold text-xs font-sans tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">{vol.label}</span>
                                            <h4 className="text-white font-bold uppercase text-xs tracking-widest">{vol.title}</h4>
                                        </div>
                                        <p className="text-text-muted text-sm pl-8 group-hover:text-text-muted transition-colors">{vol.desc}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4 md:gap-8">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <img loading="lazy" src="/images/home/canvas-thumb.jpg" alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <h3 className="text-2xl font-serif font-bold">The Park</h3>
                                    <p className="text-[10px] tracking-tight font-medium text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">3.5 Acre Urban Lung</p>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.5)] md:mt-16">
                                <img loading="lazy" src="/images/home/sound-of-soul-thumb.jpg" alt="Community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <h3 className="text-2xl font-serif font-bold">The Club</h3>
                                    <p className="text-[10px] tracking-tight font-medium text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Social Synthesis</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase 3: The Core Offering (Projects) */}
            <section className="py-16 md:py-32 bg-transparent" aria-label="Featured Township Projects">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="text-[#E5C07B] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-4"><span className="text-xl">✦</span> SOVEREIGN PROJECT PORTFOLIO</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
                            Explore Life Republic <span className="text-[#E5C07B]">Complete Enclaves</span>
                        </h2>
                        
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-10 font-light">390 Acres of master-planned luxury NA plots, private villas, hillside apartments, and senior retirement enclaves.</p>
                    {/* Category Filter Pills (Static representation) */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto border border-white/10 p-2 rounded-full bg-[#151822]/50 backdrop-blur-md">
                        <button className="bg-[#7F1D1D] text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-red-900/50 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#151822] border border-white/10 rounded-full animate-pulse"></span> All Enclaves <span className="bg-black/20 px-2 py-0.5 rounded-full ml-1">16</span></button>
                        <button className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors">🏡 NA Plots <span className="bg-[#151822] border border-white/10/5 px-2 py-0.5 rounded-full ml-1">1</span></button>
                        <button className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors">🏰 Luxury Villas <span className="bg-[#151822] border border-white/10/5 px-2 py-0.5 rounded-full ml-1">2</span></button>
                        <button className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors">🏢 Apartments <span className="bg-[#151822] border border-white/10/5 px-2 py-0.5 rounded-full ml-1">12</span></button>
                    </div>

                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="hover:-translate-y-2 transition-transform duration-500">
                                <ProjectCard project={project} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-20">
                        <Link to="/projects">
                            <Button variant="outline" size="lg" className="gap-2 px-10 py-4 text-sm tracking-[0.2em] border-secondary text-white hover:bg-[#0B0D14] hover:text-white transition-all duration-300">
                                View Entire Collection <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Phase 4: Lifestyle */}
            <AmenitiesCarousel />

            
            {/* Phase 5: Location Authority */}
            <section className="py-24 bg-[#0B0D14] text-white border-y border-white/5 relative overflow-hidden" aria-label="Hinjewadi Investment Location Advantage">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block py-1 px-4 rounded-full border border-[#E5C07B]/30 text-[#E5C07B] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                            📍 STRATEGIC CONNECTIVITY & PROXIMITY
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">
                            Minutes From Everywhere, <span className="text-[#E5C07B]">Miles From Chaos</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
                            Seamless access to Hinjewadi IT Park, Wakad, and Pune-Mumbai Expressway via the multi-level Wakad junction.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        {[
                            { time: '5 Mins', title: 'Hinjewadi IT Park', desc: 'Phase 1 • Direct IT Hub Access' },
                            { time: '10 Mins', title: 'Wakad Junction', desc: '4.5 km • Mumbai-Bengaluru Hwy' },
                            { time: '15 Mins', title: 'Ruby Hall Clinic', desc: '7 km • Multi-Specialty Healthcare' },
                            { time: 'On-Campus', title: 'Anisha Global', desc: '0 km • Inside 390-Acre Township' },
                            { time: 'Walking Dist', title: 'High Street', desc: '100 m • Premium Retail Hub' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-xl border border-white/10 bg-[#151822]/50 hover:bg-[#151822] hover:border-[#E5C07B]/30 transition-all duration-300 text-center flex flex-col justify-center min-h-[140px]"
                            >
                                <h3 className="text-[#E5C07B] text-xl font-serif font-bold mb-2">{item.time}</h3>
                                <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
                                <p className="text-gray-500 text-[10px] uppercase tracking-wider">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
{/* Phase 6: Interactive Depth */}
            <NeuralErrorBoundary>
                <MasterPlan />
            </NeuralErrorBoundary>

            {/* Phase 7: Social Proof & Trust */}
            <TestimonialCarousel />

            {/* Phase 8: Conversion & Info */}
            <FAQ />
            <BrochureEngine />

            {/* Phase 9: SEO & Discovery */}
            <section className="py-12 bg-transparent border-t border-white/10" aria-label="Popular Real Estate Searches">
                <div className="container mx-auto px-4">
                    <h3 className="text-sm font-bold text-text-muted tracking-tight font-medium mb-6">Popular Searches</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-300">By Configuration</h4>
                            <ul className="space-y-1 text-text-muted">
                                <li><Link to="/2-bhk-flats-in-hinjewadi" className="hover:text-accent">2 BHK Flats in Hinjewadi</Link></li>
                                <li><Link to="/3-bhk-flats-in-hinjewadi" className="hover:text-accent">3 BHK Flats in Hinjewadi</Link></li>
                                <li><Link to="/4-bhk-flats-in-hinjewadi" className="hover:text-accent">4 BHK Villas in Hinjewadi</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-300">By Location</h4>
                            <ul className="space-y-1 text-text-muted">
                                <li><Link to="/location/flats-near-marunji" className="hover:text-accent">Flats in Marunji</Link></li>
                                <li><Link to="/location/flats-near-wakad" className="hover:text-accent">Flats near Wakad</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                        </section>
        </div>
        </div>
    );
};

export default Home;
