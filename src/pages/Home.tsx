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
            
            <section id="projects" className="py-32 bg-black relative z-10" aria-label="Featured Projects">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
                                Architectural <br/> <span className="text-gray-500">Masterpieces.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">
                                Discover a curated portfolio of spatial environments engineered for modern sovereignty.
                            </p>
                        </div>
                        <Link to="/projects" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all flex items-center gap-2">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.slice(0, 6).map((project, index) => (
                            <div key={project.id} className={`${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                                <ProjectCard project={project} priority={index < 2} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Phase 4: Lifestyle */}
            <AmenitiesCarousel />

            
            {/* Phase 5: Location Authority */}
            
            <section className="py-32 bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none blur-3xl"></div>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
                            Hyperconnected <span className="text-primary">Ecosystem.</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light">
                            Seamless velocity. Strategically positioned 10 minutes from Hinjewadi Phase 1 via the multi-level transit corridor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bento-card p-8 md:col-span-2 min-h-[300px] flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">📍</div>
                                <h3 className="text-3xl font-display font-bold text-white mb-2">Hinjewadi IT Park</h3>
                                <p className="text-gray-400">Direct access to Pune's largest tech cluster.</p>
                            </div>
                            <div className="text-6xl font-display font-bold text-white/20 mt-8">10 MINS</div>
                        </div>
                        <div className="bento-card p-8 min-h-[300px] flex flex-col justify-between bg-gradient-to-br from-surface to-primary/10">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">🚇</div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Metro Line 3</h3>
                                <p className="text-gray-400">Upcoming massive connectivity upgrade.</p>
                            </div>
                            <div className="text-5xl font-display font-bold text-primary/30 mt-8">5 KM</div>
                        </div>
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
