import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectorComparison } from '../components/sections/SectorComparison';
import { SectorMesh } from '../components/sections/SectorMesh';

import { RecentlyViewed } from '../components/sections/RecentlyViewed';
import { SEO } from '../components/seo/SEO';

const Projects: React.FC = () => {
    const [allProjects, setAllProjects] = useState<Project[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                if (data && data.length > 0) {
                    setAllProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects from API:', error);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="pt-24 pb-20 bg-[#1A1C23] min-h-[50vh]">
            <Breadcrumbs />
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
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                        Properties in Kolte Patil Life Republic Township Hinjewadi
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore our wide range of residential projects in Kolte Patil Life Republic Township. From affordable housing to ultra-luxury villas, find your dream property in Hinjewadi's most coveted address.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            {/* Semantic Project Cluster Mesh (Phase 15 SEO) */}
            <section className="py-10 bg-[#0B0D14] border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mb-3">
                        <h2 className="text-3xl font-serif font-bold text-white mb-4 italic">The Life Republic Ecosystem</h2>
                        <p className="text-gray-600">
                            Explore specialized residential sectors in Kolte Patil Life Republic Township Hinjewadi, designed for distinctive lifestyles and investment goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-4">
                            <h3 className="font-bold text-accent tracking-tight font-medium text-sm">Luxury Lifestyle</h3>
                            <ul className="space-y-2">
                                <li><Link to="/projects/kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Canvas Luxury Apartments</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi" className="text-white hover:text-accent font-medium text-sm">24K Espada Row Houses</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-villas-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Signature Villas Pune</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-accent tracking-tight font-medium text-sm">Smart Living</h3>
                            <ul className="space-y-2">
                                <li><Link to="/projects/kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Universe Smart Homes</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Arezo Efficient Flats</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Duet Premium Residences</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-accent tracking-tight font-medium text-sm">NRI Investment</h3>
                            <ul className="space-y-2">
                                <li><Link to="/nri-investment-guide" className="text-white hover:text-accent font-medium text-sm">Pune Real Estate ROI Guide</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Atmos Modern Apartments</Link></li>
                                <li><Link to="/projects/kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi" className="text-white hover:text-accent font-medium text-sm">Aros Premium Sector</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-accent tracking-tight font-medium text-sm">Community Hubs</h3>
                            <ul className="space-y-2">
                                <li><Link to="/amenities" className="text-white hover:text-accent font-medium text-sm">Township Amenities Hub</Link></li>
                                <li><Link to="/connectivity" className="text-white hover:text-accent font-medium text-sm">Project Connectivity Analysis</Link></li>
                                <li><Link to="/sustainability" className="text-white hover:text-accent font-medium text-sm">Green Living Initiatives</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recently Viewed (Personalization) */}
            <RecentlyViewed />

            {/* Sector Comparison Matrix */}
            <SectorComparison />

            {/* Sovereign Sector Mesh */}
            <SectorMesh />
        </div>
    );
};

export default Projects;
