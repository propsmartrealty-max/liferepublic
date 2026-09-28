import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { CLUSTERS } from '../lib/clusters';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SEO } from '../components/seo/SEO';
import { MapPin, CheckCircle, Download, Calendar, Layers, ShieldCheck } from 'lucide-react';

const ProjectDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<any>(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const found = CLUSTERS.find(c => c.slug === slug || c.id === slug);
        if (!found) {
            navigate('/projects', { replace: true });
        } else {
            setProject(found);
        }
    }, [slug, navigate]);

    if (!project) return null; 

    const reraVerificationUrl = `https://maharera.maharashtra.gov.in/`;

    const commonAmenities = [
        "Clubhouse & Lounge", "Infinity Swimming Pool", "State-of-the-art Gym", "Jogging & Cycling Tracks", 
        "Kids Play Area", "Multi-purpose Hall", "Landscaped Gardens", "24/7 Security"
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <SEO 
                title={`${project.name} | Kolte Patil Life Republic Hinjewadi | Price, Floor Plan`}
                description={project.description}
                canonical={`/projects/${project.slug}`}
            />
            
            {/* Cinematic Hero */}
            <div className="relative h-[80vh] w-full bg-black overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full pb-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <Breadcrumbs />
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-6 backdrop-blur-md"
                                >
                                    <ShieldCheck size={14} className="rainbow-text-clip font-bold" />
                                    <span className="text-xs font-bold tracking-widest uppercase">MahaRERA: {project.rera}</span>
                                </motion.div>
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight leading-none"
                                >
                                    {project.name}
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl md:text-2xl text-white/70 max-w-2xl font-light"
                                >
                                    {project.description}
                                </motion.p>
                            </div>
                            
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col gap-4 min-w-[300px]"
                            >
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                    <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Starting Price</p>
                                    <p className="text-4xl font-bold rainbow-text-clip">{project.configurations[0]?.price}</p>
                                </div>
                                <button 
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: 'Download Brochure' } }))}
                                    className="w-full py-5 bg-white text-black hover:bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Download size={18} className="group-hover:animate-bounce" />
                                    Download Brochure
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Data */}
                    <div className="lg:col-span-8 space-y-24">
                        
                        {/* Floor Plans & Configurations */}
                        <section id="pricing">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-[1px] bg-rainbow"></div>
                                <h2 className="text-4xl font-sans font-bold">Configurations & Pricing</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.configurations.map((config: any, i: number) => (
                                    <div key={i} className="group relative bg-[#0A0A0A] border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all hover:-translate-y-1">
                                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <Layers size={18} />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-2">{config.type}</h3>
                                        <p className="text-white/50 text-lg mb-8 font-light">Carpet Area: <span className="text-white font-medium">{config.size}</span></p>
                                        <div className="text-4xl font-bold text-white mb-8">{config.price}</div>
                                        
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: `${config.type} Floor Plan` } }))}
                                                className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold uppercase tracking-widest transition-colors"
                                            >
                                                Floor Plan
                                            </button>
                                            <button 
                                                onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: `${config.type} Cost Sheet` } }))}
                                                className="flex-1 py-4 bg-white text-black hover:bg-rainbow-hover rounded-2xl text-sm font-bold uppercase tracking-widest transition-colors"
                                            >
                                                Cost Sheet
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        
                        {/* Dynamic Floor Plans Gallery */}
                        {project.floorPlans && project.floorPlans.length > 0 && (
                            <section id="floor-plans" className="mt-16">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-[1px] bg-rainbow"></div>
                                    <h2 className="text-4xl font-sans font-bold">Master & Floor Plans</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.floorPlans.map((plan, i) => (
                                        <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 cursor-interactive">
                                            <img src={plan} alt={`Floor Plan ${i+1}`} className="w-full h-auto object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Dynamic Project Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <section id="gallery" className="mt-24">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-[1px] bg-rainbow"></div>
                                    <h2 className="text-4xl font-sans font-bold">Project Gallery</h2>
                                </div>
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 relative group">
                                            <img src={img} alt={`Gallery ${i+1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Dynamic Amenities */}
                        <section id="amenities" className="mt-24">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-[1px] bg-rainbow"></div>
                                <h2 className="text-4xl font-sans font-bold">World-Class Amenities</h2>
                            </div>
                            
                            {project.amenitiesList && project.amenitiesList.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {project.amenitiesList.map((amenity, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                                            <img src={amenity.icon} alt={amenity.name} className="w-20 h-20 object-cover rounded-xl mix-blend-lighten opacity-90" loading="lazy" />
                                            <span className="text-xs font-bold text-white/80 text-center uppercase tracking-widest">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {commonAmenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <CheckCircle size={20} className="text-white/50" />
                                            <span className="text-sm font-bold text-white/80">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>


                        {/* Master Layout */}
                        <section id="master-plan">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-[1px] bg-rainbow"></div>
                                <h2 className="text-4xl font-sans font-bold">Master Layout</h2>
                            </div>
                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] group">
                                <img src={project.masterLayout} alt={`${project.name} Master Layout`} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 gap-6">
                                    <p className="text-2xl font-bold tracking-widest uppercase">Unlock High-Res Plan</p>
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: 'Master Plan' } }))}
                                        className="px-10 py-5 bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm text-white hover:scale-105 transition-transform"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            
                            {/* MahaRERA Card */}
                            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-white/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-rainbow/20 transition-colors"></div>
                                
                                <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-8 flex items-center gap-2">
                                    <ShieldCheck size={16} /> Official MahaRERA
                                </h3>
                                
                                <div className="flex justify-center mb-8 bg-white p-6 rounded-2xl">
                                    <QRCode 
                                        value={reraVerificationUrl} 
                                        size={200}
                                        level="H"
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                    />
                                </div>
                                
                                <div className="text-center mb-8">
                                    <p className="text-white/50 text-sm mb-2 uppercase tracking-widest">Registration ID</p>
                                    <p className="text-2xl font-mono font-bold tracking-wider">{project.rera}</p>
                                </div>

                                <button 
                                    onClick={() => window.open(reraVerificationUrl, '_blank')}
                                    className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-sm font-bold uppercase tracking-widest transition-colors"
                                >
                                    Verify on MahaRERA
                                </button>
                            </div>

                            {/* Site Visit Card */}
                            <div className="bg-gradient-to-br from-[#111] to-[#050505] p-[1px] rounded-3xl overflow-hidden bg-rainbow">
                                <div className="bg-[#050505] p-8 rounded-[23px] h-full">
                                    <h3 className="text-2xl font-bold mb-4">Experience {project.name}</h3>
                                    <p className="text-white/60 mb-8 font-light leading-relaxed">
                                        Schedule a personalized guided tour with our township experts. Free pickup and drop facility available across Pune.
                                    </p>
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: 'Site Visit' } }))}
                                        className="w-full py-5 bg-white text-black hover:bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
                                    >
                                        <Calendar size={18} />
                                        Book Site Visit
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
