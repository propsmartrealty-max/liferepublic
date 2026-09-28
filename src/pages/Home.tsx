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
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-[4/5]  overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <img loading="lazy" src="/images/home/canvas-thumb.jpg" alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <h3 className="text-2xl font-serif font-bold">The Park</h3>
                                    <p className="text-[10px] tracking-tight font-medium text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">3.5 Acre Urban Lung</p>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5]  overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.5)] md:mt-16">
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
            
            
            
            <section id="projects" className="py-40 bg-[#030508] relative" aria-label="Featured Projects">
                
                {/* Fluid background orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

                <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                    <div className="flex flex-col items-center text-center mb-24">
                        <div className="glass-pill px-6 py-2 mb-6">
                            <span className="slim-text text-[9px] uppercase">The Portfolio</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-sans font-thin text-white leading-tight">
                            Unbounded <span className="font-serif italic text-white/60">Environments.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {featuredProjects.slice(0, 3).map((project, index) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <ProjectCard project={project} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-20 flex justify-center">
                        <Link to="/projects" className="glass-pill px-10 py-4 text-white hover:bg-white/10 transition-colors duration-500 flex items-center gap-4 group">
                            <span className="font-sans font-light tracking-[0.2em] text-[10px] uppercase">View All Projects</span>
                            <div className="w-8 h-[0.5px] bg-white/30 group-hover:bg-white transition-colors duration-500"></div>
                        </Link>
                    </div>
                </div>
            </section>




            {/* Phase 4: Lifestyle */}
            <AmenitiesCarousel />

            
            {/* Phase 5: Location Authority */}
            
            
            
            <section className="py-40 bg-[#030508] relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none animate-float"></div>

                <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                    <div className="glass-panel rounded-[3rem] p-8 md:p-16 lg:p-24 overflow-hidden relative">
                        {/* Inner fluid effect */}
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                            <div>
                                <div className="glass-pill px-6 py-2 mb-8 inline-block">
                                    <span className="slim-text text-[9px] uppercase">Fluid Connectivity</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-thin text-white leading-tight mb-8">
                                    Flow into the <br/> <span className="font-serif italic text-white/60">City Center.</span>
                                </h2>
                                <p className="slim-text text-sm leading-relaxed mb-16 max-w-lg">
                                    A frictionless transit experience. Seamlessly glide from the serenity of your enclave to the heart of the Hinjewadi tech ecosystem.
                                </p>
                                
                                <div className="space-y-4">
                                    {[
                                        { title: 'Hinjewadi Phase 1', dist: '10 Mins' },
                                        { title: 'Mumbai Expressway', dist: '15 Mins' },
                                        { title: 'Metro Line 3', dist: 'Upcoming' }
                                    ].map((loc, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 group">
                                            <p className="text-white/70 font-sans font-light text-sm group-hover:text-white transition-colors">{loc.title}</p>
                                            <p className="text-white/40 font-sans font-extralight text-xs tracking-widest">{loc.dist}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-square w-full max-w-md mx-auto">
                                <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_60s_linear_infinite]"></div>
                                <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                                <div className="absolute inset-8 rounded-full overflow-hidden">
                                    <img src="/images/home/overview-img.jpg" alt="Life Republic Location" className="w-full h-full object-cover opacity-50 scale-110" />
                                </div>
                                {/* Floating marker */}
                                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.5)] animate-pulse"></div>
                            </div>
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
