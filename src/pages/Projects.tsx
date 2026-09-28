import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CLUSTERS } from '../lib/clusters';
import { ProjectCard } from '../components/ui/ProjectCard';
import { SectorComparison } from '../components/sections/SectorComparison';
import { SectorMesh } from '../components/sections/SectorMesh';
import { RecentlyViewed } from '../components/sections/RecentlyViewed';
import { SEO } from '../components/seo/SEO';

const Projects: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-4 pb-20 bg-black min-h-[50vh]">
                        <SEO
                title="Projects in Kolte Patil Life Republic Township Hinjewadi | 1, 2, 3 BHK & Villas"
                description="Explore all residential projects in Kolte Patil Life Republic Township Hinjewadi. Choose from 1, 2, 3 BHK flats, row houses, and luxury villas. Check current pricing, floor plans, and availability."
                keywords="Kolte Patil Life Republic Projects, Kolte Patil Life Republic Township Hinjewadi, Flats in Hinjewadi, 2 BHK in Life Republic, 3 BHK Flats Pune, Row Houses in Hinjewadi, Villas in Pune, New Launch Projects Hinjewadi, Ready Possession Flats"
                canonical="/projects"
            />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-3">
                        Properties in Kolte Patil Life Republic Township
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed">
                        Explore the distinct residential clusters across the 390-acre Life Republic ecosystem. From smart apartments to ultra-luxury villas.
                    </p>
                </motion.div>

                {/* Grid displaying the exact ordered clusters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CLUSTERS.map((cluster) => (
                        <ProjectCard key={cluster.id} project={cluster} />
                    ))}
                </div>
            </div>

            {/* Semantic Project Cluster Mesh */}
            <section className="py-16 bg-[#0A0A0A] border-t border-white/10 mt-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mb-8">
                        <h2 className="text-3xl font-sans font-bold text-white mb-4 italic">The Life Republic Clusters</h2>
                        <p className="text-white/60">
                            Navigate specific residential categories tailored for your investment goals and lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-4">
                            <h3 className="font-bold text-white/80 tracking-tight font-medium text-sm">Luxury Lifestyle</h3>
                            <ul className="space-y-2">
                                <li><Link to="/projects/kolte-patil-life-republic-canvas" className="text-white hover:text-white/80 font-medium text-sm">Canvas Luxury Apartments</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi" className="text-white hover:text-white/80 font-medium text-sm">24K Espada Row Houses</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-white/80 tracking-tight font-medium text-sm">Smart Living</h3>
                            <ul className="space-y-2">
                                <li><Link to="/projects/kolte-patil-life-republic-qrious" className="text-white hover:text-white/80 font-medium text-sm">Qrious Smart Homes</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-duet" className="text-white hover:text-white/80 font-medium text-sm">Duet Compact Living</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-universe" className="text-white hover:text-white/80 font-medium text-sm">Universe Residences</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-white/80 tracking-tight font-medium text-sm">Premium & Newest</h3>
                            <ul className="space-y-2">
                                <li><Link to="/projects/kolte-patil-life-republic-echoes" className="text-white hover:text-white/80 font-medium text-sm">Echoes (New Launch)</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-atmos" className="text-white hover:text-white/80 font-medium text-sm">Atmos Modern Apartments</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-aros" className="text-white hover:text-white/80 font-medium text-sm">Aros Premium Sector</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-white/80 tracking-tight font-medium text-sm">Community Hubs</h3>
                            <ul className="space-y-2">
                                <li><Link to="/amenities" className="text-white hover:text-white/80 font-medium text-sm">Township Amenities Hub</Link></li>
                                <li><Link to="/township-guide" className="text-white hover:text-white/80 font-medium text-sm">Township Experience</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <RecentlyViewed />
            <SectorComparison />
            <SectorMesh />
        </div>
    );
};

export default Projects;
