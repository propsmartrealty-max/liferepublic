import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Sparkles, ShieldCheck, ArrowRight, ZoomIn, Navigation, X, Play, Video, FileText, Layers, CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SEO } from '../components/seo/SEO';
import { RecentlyViewed } from '../components/sections/RecentlyViewed';
import { SectorMesh } from '../components/sections/SectorMesh';
import { ID_TO_SLUG } from '../data/slug-registry';
import { projectsRegistry } from '../data/projects';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(() => {
        if (!id) return null;
        const rawId = id.trim().replace(/\/$/, '');
        const p = projectsRegistry.find((p: Project) => p.id === rawId) || 
                  projectsRegistry.find((p: Project) => ID_TO_SLUG[p.id] === rawId);
        return p || null;
    });
    const [loading, setLoading] = useState(!project);
    const [activeTab, setActiveTab] = useState<'overview' | 'layouts' | 'amenities' | 'specifications' | 'faqs'>('overview');
    const [selectedFloorPlan, setSelectedFloorPlan] = useState<any>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            if (!id) return;
            try {
                const projectData = await api.projects.getById(id);
                if (projectData) {
                    setProject(projectData);
                    // Default to first floor plan if available
                    if (projectData.floorPlans && projectData.floorPlans.length > 0) {
                        setSelectedFloorPlan(projectData.floorPlans[0]);
                    }
                }
            } catch (error) {
                console.error('Failed to load project:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProject();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-bold tracking-tight font-semibold text-[#5F6368]">Synthesizing Project Monograph</span>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#F8F9FA] p-6">
                <div className="text-center space-y-8 max-w-md">
                    <div className="w-24 h-24 bg-[#151822] border border-[#DADCE0] rounded-[24px] shadow-2xl flex items-center justify-center mx-auto text-[#1a73e8]">
                        <FileText size={48} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-sans font-bold text-[#202124]">Monograph Not Found</h1>
                        <p className="text-[#5F6368] leading-relaxed font-medium">The requested project cluster could not be identified within the Sovereign Registry.</p>
                    </div>
                    <Button variant="primary" size="lg" className="w-full rounded-xl py-6 font-bold" onClick={() => navigate('/projects')}>Return to Registry</Button>
                </div>
            </div>
        );
    }

    const openEnquiry = () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', { 
            detail: { projectName: project.title } 
        }));
    };

    const projectSlug = ID_TO_SLUG[project.id] || project.id;

    return (
        <div className="min-h-[75vh] bg-white">
            <SEO 
                title={`${project.title} | Kolte Patil Life Republic Hinjewadi`}
                description={project.description}
                canonical={`/projects/${projectSlug}`}
            />
            <Breadcrumbs />

            {/* Sovereign Hero Header */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
                    <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-6 py-2 bg-accent text-[#202124] text-[10px] font-bold tracking-tight font-semibold rounded-full mb-8 shadow-2xl">
                        {project.category} Monograph
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-8xl font-sans font-bold text-[#202124] mb-6 tracking-tighter drop-shadow-2xl">
                        {project.title.split('|')[0]}
                    </motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-8 text-[#202124]/80">
                        <div className="flex items-center gap-2 font-bold tracking-tight font-medium text-[10px]">
                            <MapPin size={16} className="text-[#1a73e8]" /> {project.location}
                        </div>
                        <div className="flex items-center gap-2 font-bold tracking-tight font-medium text-[10px]">
                            <Sparkles size={16} className="text-[#1a73e8]" /> {project.price}
                        </div>
                        <div className="flex items-center gap-2 font-bold tracking-tight font-medium text-[10px]">
                            <ShieldCheck size={16} className="text-[#1a73e8]" /> Sovereign Verified
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 flex justify-center gap-6">
                        <Button variant="primary" size="lg" className="rounded-full px-12 py-6 font-bold text-sm tracking-[0.3em] uppercase shadow-2xl" onClick={openEnquiry}>
                            Enquire Now <ArrowRight size={20} className="ml-2" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-12 py-6 font-bold text-sm tracking-[0.3em] uppercase border-[#DADCE0] text-[#202124] hover:bg-white hover:text-[#202124] shadow-2xl" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                            Explore Monograph
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Architectural Monograph Content */}
            <section className="py-12 container mx-auto px-6 max-w-7xl">
                <div className="space-y-32">
                    
                    {/* Section 1: Tectonic Overview */}
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 space-y-12">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                                <Sparkles size={14} className="text-[#1a73e8]" />
                                <span className="text-[10px] font-bold tracking-tight font-semibold text-[#1a73e8]">Strategic Synthesis</span>
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#202124] tracking-tighter leading-none">The <br /><span className="text-[#1a73e8] italic">Architecture.</span></h2>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">{project.overview}</p>
                            <div className="grid grid-cols-2 gap-6">
                                {project.features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 bg-[#F8F9FA] rounded-[24px] border border-[#DADCE0] group hover:bg-[#151822] border border-[#DADCE0] hover:shadow-xl transition-all">
                                        <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform" />
                                        <span className="text-[11px] font-bold text-[#202124] tracking-tight font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="aspect-square rounded-[24px] overflow-hidden shadow-2xl relative group">
                                <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                                <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold">Volume Value</span>
                                        <p className="text-4xl font-sans font-bold text-[#202124] tracking-tighter">{project.price}</p>
                                    </div>
                                    <Button variant="primary" size="lg" className="rounded-xl px-10 py-5 font-bold tracking-tight font-medium text-xs" onClick={openEnquiry}>Enquire Now</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Spatial Synthesis (Floor Plans) */}
                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#DADCE0] pb-16">
                            <div className="max-w-2xl">
                                <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold block mb-4">Precision Blueprints</span>
                                <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#202124] tracking-tighter">Spatial <br /><span className="text-[#1a73e8] italic">Synthesis.</span></h2>
                            </div>
                            <p className="text-[#5F6368] font-medium max-w-sm italic">"Designing the void between the walls to maximize community flow and individual tranquility."</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {project.floorPlans?.map((plan, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -10 }}
                                    className={`p-8 rounded-[24px] border transition-all duration-500 cursor-pointer ${selectedFloorPlan === plan ? 'bg-white border-[#1a73e8] ring-1 ring-[#1a73e8] shadow-google' : 'bg-white border-[#DADCE0] hover:shadow-google'}`}
                                    onClick={() => setSelectedFloorPlan(plan)}
                                >
                                    <div className="aspect-[4/3] rounded-[24px] overflow-hidden bg-[#F8F9FA] p-6 mb-8 group">
                                        <img loading="lazy" src={plan.image} alt={plan.type} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className={`text-xl font-sans font-bold ${'text-[#202124]'}`}>{plan.type}</h3>
                                            <Layers size={18} className="text-[#1a73e8]" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-medium">Carpet Area</span>
                                                <span className={`text-lg font-mono font-bold ${selectedFloorPlan === plan ? 'text-[#202124]/60' : 'text-[#202124]/40'}`}>{plan.size}</span>
                                            </div>
                                            {plan.virtualTourUrl && (
                                                <div className={`flex items-center gap-2 text-[10px] font-bold tracking-tight font-medium px-3 py-1.5 rounded-full ${selectedFloorPlan === plan ? 'bg-accent/20 text-[#1a73e8]' : 'bg-[#151822] text-[#5F6368]'}`}>
                                                    <Video size={12} />
                                                    3D Tour
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {selectedFloorPlan && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-[#F8F9FA] rounded-[24px] p-12 md:p-20 border border-[#DADCE0]">
                                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                                        <div className="lg:w-1/2 p-10 bg-[#151822] border border-[#DADCE0] rounded-[24px] shadow-2xl border border-[#DADCE0] group relative">
                                            <img loading="lazy" src={selectedFloorPlan.image} className="w-full h-auto mix-blend-multiply cursor-zoom-in" alt="Detailed Floor Plan" onClick={() => setIsZoomed(true)} />
                                            <div className="absolute top-10 right-10 p-3 bg-accent text-[#202124] rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={20} /></div>
                                        </div>
                                        <div className="lg:w-1/2 space-y-12">
                                            <div>
                                                <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold block mb-4">Unit Analysis</span>
                                                <h3 className="text-4xl md:text-6xl font-sans font-bold text-[#202124] tracking-tighter mb-6">{selectedFloorPlan.type}</h3>
                                                <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-xl shadow-sm border border-[#DADCE0]">
                                                    <span className="text-sm font-bold text-[#5F6368] tracking-tight font-medium">Validated Carpet Area</span>
                                                    <span className="text-2xl font-mono font-bold text-[#202124]">{selectedFloorPlan.size}</span>
                                                </div>
                                                {selectedFloorPlan.virtualTourUrl && (
                                                    <Button 
                                                        variant="outline" 
                                                        className="mt-6 flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-xs tracking-tight font-semibold border-accent text-[#1a73e8] hover:bg-accent hover:text-[#202124]"
                                                        onClick={() => setIsVirtualTourOpen(true)}
                                                    >
                                                        <Play size={16} /> Enter 3D Virtual Walkthrough
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {selectedFloorPlan.details?.map((d: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-4 p-4 bg-[#151822] border border-[#DADCE0] rounded-xl border border-[#DADCE0]">
                                                        <CheckCircle2 size={16} className="text-[#1a73e8]" />
                                                        <span className="text-[11px] font-bold text-[#202124] tracking-tight font-medium">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="primary" size="lg" className="w-full rounded-xl py-8 font-bold text-xs tracking-tight font-semibold shadow-2xl" onClick={openEnquiry}>Enquire Now</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Section 3: Tectonic Specifications */}
                    <div className="space-y-16">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold block mb-4">Material Monograph</span>
                            <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#202124] tracking-tighter">Tectonic <br /><span className="text-[#1a73e8] italic">Specifications.</span></h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.specifications?.map((spec, i) => (
                                <div key={i} className="group p-10 bg-[#151822] border border-[#DADCE0] rounded-[3.5rem] border border-[#DADCE0] hover:border-accent/20 hover:shadow-2xl transition-all duration-500">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl flex items-center justify-center text-[#1a73e8] group-hover:bg-accent group-hover:text-[#202124] transition-all">
                                            <ShieldCheck size={28} />
                                        </div>
                                        <h3 className="text-2xl font-sans font-bold text-[#202124] tracking-tight">{spec.title}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {spec.items.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 bg-[#F8F9FA]/50 rounded-xl group-hover:bg-[#151822] border border-[#DADCE0] transition-all">
                                                <div className="mt-1.5 w-1.5 h-1.5 bg-accent/40 rounded-full" />
                                                <span className="text-[11px] font-bold text-[#202124]/70 tracking-tight font-medium leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 4: Master Spatial Hub */}
                    <div className="space-y-16 bg-white rounded-[5rem] p-16 md:p-32 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2 space-y-10">
                                <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold">Township Mesh</span>
                                <h2 className="text-4xl md:text-7xl font-sans font-bold text-[#202124] tracking-tighter leading-[0.85]">The <br /><span className="text-[#1a73e8] italic">Master Layout.</span></h2>
                                <p className="text-xl text-[#202124]/40 font-medium leading-relaxed">A strategic blueprint of the 390-acre Life Republic ecosystem. Every cluster is a node in our vision for the future of community living.</p>
                                <div className="flex flex-wrap gap-4 pt-8">
                                    <div className="px-6 py-3 bg-white/5 border border-[#DADCE0] rounded-xl text-[#202124]/60 text-[10px] font-bold tracking-tight font-medium flex items-center gap-3"><MapPin size={14} className="text-[#1a73e8]" /> Prime Hinjewadi Ph 2</div>
                                    <div className="px-6 py-3 bg-white/5 border border-[#DADCE0] rounded-xl text-[#202124]/60 text-[10px] font-bold tracking-tight font-medium flex items-center gap-3"><Navigation size={14} className="text-[#1a73e8]" /> Near Town Center</div>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <div className="relative rounded-[24px] overflow-hidden shadow-2xl border-4 border-[#DADCE0] group cursor-zoom-in">
                                    <img loading="lazy" src={project.masterLayout} className="w-full h-auto opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt="Sovereign Master Plan" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="p-8 bg-[#151822] border border-[#DADCE0]/10 backdrop-blur-md rounded-full border border-[#DADCE0]"><ZoomIn size={48} className="text-[#202124]" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Community Synthesis */}
                    <div className="space-y-16">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-[10px] font-bold text-[#1a73e8] tracking-tight font-semibold block mb-4">Lifestyle Fabric</span>
                                <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#202124] tracking-tighter">Cluster <br /><span className="text-[#1a73e8] italic">Amenities.</span></h2>
                            </div>
                            <Button variant="outline" size="lg" className="rounded-xl px-10 py-5 font-bold tracking-tight font-medium text-[10px]" onClick={openEnquiry}>Full Amenities List</Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {project.amenities?.map((a, i) => (
                                <div key={i} className="p-10 bg-[#F8F9FA] rounded-[24px] border border-[#DADCE0] text-center space-y-6 hover:bg-[#151822] border border-[#DADCE0] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-[#151822] border border-[#DADCE0] rounded-xl mx-auto flex items-center justify-center text-[#1a73e8] shadow-lg group-hover:bg-accent group-hover:text-[#202124] transition-all"><Sparkles size={28} /></div>
                                    <span className="block text-[11px] font-bold text-[#202124] tracking-tight font-semibold">{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-[#F8F9FA] border-t border-[#DADCE0]">
                <RecentlyViewed />
            </section>
            
            <section className="py-12 bg-white">
                <SectorMesh />
            </section>

            {/* Lightbox for zooming floor plans */}
            <AnimatePresence>
                {isZoomed && selectedFloorPlan && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-10">
                        <button onClick={() => setIsZoomed(false)} className="absolute top-10 right-10 p-4 bg-white/10 text-[#202124] rounded-full hover:bg-[#151822] border border-[#DADCE0] hover:text-[#202124] transition-all"><X size={32} /></button>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={selectedFloorPlan.image} className="max-w-full max-h-full object-contain mix-blend-screen" />
                    </motion.div>
                )}

                {/* Virtual Tour Modal */}
                {isVirtualTourOpen && selectedFloorPlan?.virtualTourUrl && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10">
                        <div className="w-full max-w-6xl flex justify-end mb-4">
                            <button onClick={() => setIsVirtualTourOpen(false)} className="flex items-center gap-2 p-3 bg-[#151822] border border-[#DADCE0]/10 text-[#202124] rounded-xl hover:bg-accent hover:text-[#202124] transition-all font-bold tracking-tight font-medium text-xs">
                                Close Tour <X size={16} />
                            </button>
                        </div>
                        <div className="w-full max-w-6xl h-[70vh] md:h-[80vh] bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border border-[#DADCE0] relative">
                            <iframe 
                                src={selectedFloorPlan.virtualTourUrl}
                                className="absolute inset-0 w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetails;
