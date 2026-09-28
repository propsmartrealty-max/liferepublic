import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { CLUSTERS } from '../lib/clusters';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SEO } from '../components/seo/SEO';

const ProjectDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<any>(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const found = CLUSTERS.find(c => c.slug === slug);
        if (!found) {
            navigate('/projects', { replace: true });
        } else {
            setProject(found);
        }
    }, [slug, navigate]);

    if (!project) return null; // Prevent flicker before redirect

    // MahaRERA verification URL structure
    const reraVerificationUrl = `https://maharerait.mahaonline.gov.in/PrintPreview/PrintPreview/?q=${project.rera}`;

    return (
        <div className="bg-black min-h-screen text-white">
            <SEO 
                title={`${project.name} | Kolte Patil Life Republic Hinjewadi | Price, Floor Plan`}
                description={project.description}
                canonical={`/projects/${project.slug}`}
            />
            
            {/* Cinematic Hero */}
            <div className="relative h-[60vh] w-full bg-[#0A0A0A]">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-12 left-0 w-full">
                    <div className="container mx-auto px-4">
                        <Breadcrumbs />
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-sans font-bold text-white mb-4"
                        >
                            {project.name}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/70 max-w-2xl"
                        >
                            {project.description}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Data */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        {/* Floor Plans & Configurations */}
                        <section>
                            <h2 className="text-3xl font-sans font-bold mb-8 border-b border-white/10 pb-4">Floor Plans & Pricing</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.configurations.map((config: any, i: number) => (
                                    <div key={i} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl hover:border-white/30 transition-colors">
                                        <h3 className="text-xl font-bold mb-2">{config.type}</h3>
                                        <p className="text-white/60 mb-4">Carpet Area: {config.size}</p>
                                        <div className="text-2xl text-white mb-6">{config.price}</div>
                                        <button 
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: project.name, type: config.type } }))}
                                            className="w-full py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                                        >
                                            Request Floor Plan
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Master Layout */}
                        <section>
                            <h2 className="text-3xl font-sans font-bold mb-8 border-b border-white/10 pb-4">Master Layout</h2>
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
                                <img src={project.masterLayout} alt={`${project.name} Master Layout`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                                        className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm"
                                    >
                                        Download Master Plan PDF
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: MahaRERA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl">
                            <h3 className="text-xl font-sans font-bold mb-6 text-center border-b border-white/10 pb-4">MahaRERA Registration</h3>
                            
                            <div className="flex justify-center mb-8 bg-white p-4 rounded-xl">
                                <QRCode 
                                    value={reraVerificationUrl} 
                                    size={200}
                                    level="H"
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                />
                            </div>
                            
                            <div className="text-center">
                                <p className="text-white/60 text-sm mb-2">Registration Number</p>
                                <p className="text-2xl font-mono font-bold tracking-wider">{project.rera}</p>
                                <p className="text-xs text-white/40 mt-4">
                                    Scan the QR code to verify this project directly on the official MahaRERA website.
                                </p>
                            </div>

                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                                className="w-full mt-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
                            >
                                Schedule Site Visit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
