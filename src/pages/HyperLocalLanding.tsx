import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { TrendingUp, Clock, Shield, ArrowRight, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { api } from '../services/api';
import type { Project } from '../lib/types';

import { pseoRegistry } from '../data/pseo-registry';
import sectorsData from '../data/sectors.json';

export const HyperLocalLanding: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [projects, setProjects] = React.useState<Project[]>([]);
    
    const config = useMemo(() => {
        if (!slug) return pseoRegistry['flats-near-marunji-road'];
        if (pseoRegistry[slug]) return pseoRegistry[slug];

        // Check sectors.json
        const allItems = [
            ...(sectorsData.sectors || []),
            ...(sectorsData.avenues || []),
            ...(sectorsData.localities || [])
        ];
        
        const sectorIdMatch = slug.match(/sector-(r[0-9]+[a-z]?)/i);
        const sectorId = sectorIdMatch ? sectorIdMatch[1].toLowerCase() : null;

        const sectorMatch = allItems.find(item => 
            item.slug === slug || 
            (sectorId && item.id?.toLowerCase() === sectorId) ||
            item.slug?.includes(slug) ||
            (sectorId && item.slug?.toLowerCase().includes(sectorId))
        );

        if (sectorMatch) {
            return {
                title: `${sectorMatch.name} | Kolte Patil Life Republic Hinjewadi`,
                description: `${sectorMatch.usp || `Explore ${sectorMatch.name} at Kolte Patil Life Republic Hinjewadi Pune.`} Possession: ${(sectorMatch as any).rera_possession || 'RERA Compliant'}.`,
                keywords: `${sectorMatch.name}, ${sectorMatch.name} Life Republic, Kolte Patil ${(sectorMatch as any).id || ''}, flats in Hinjewadi`,
                infraScore: (sectorMatch as any).occupancy ? 97 : 94,
                rentalYield: '5.8% - 6.8%',
                commutePhase1: (sectorMatch as any).distance || '8 mins',
                highlights: [
                    sectorMatch.usp || 'Master-planned township infrastructure with 70% open spaces',
                    (sectorMatch as any).infrastructure || 'Direct arterial connectivity to 150-ft Spine Road',
                    `Possession status: ${(sectorMatch as any).rera_possession || 'MahaRERA Approved'}`
                ]
            };
        }

        // Resilient fallback for any location slug
        const cleanName = slug
            .replace(/-/g, ' ')
            .replace(/\blife republic\b/gi, '')
            .trim()
            .replace(/\b\w/g, l => l.toUpperCase());

        return {
            title: `${cleanName} | Kolte Patil Life Republic Hinjewadi`,
            description: `Explore premium residential clusters and high-yield properties in ${cleanName} at Kolte Patil Life Republic 390-acre township Hinjewadi Pune.`,
            keywords: `${cleanName}, ${cleanName} Life Republic, flats in ${cleanName}, property in Hinjewadi`,
            infraScore: 95,
            rentalYield: '5.8% - 6.8%',
            commutePhase1: '8-10 mins',
            highlights: [
                'Direct 150-ft Spine Road connectivity to Hinjewadi IT Park Phases 1, 2 & 3',
                'Crimson Anisha Global School & 3.5-acre Central Park within walking distance',
                '100% MahaRERA approved with clear legal titles and high rental yield'
            ]
        };
    }, [slug]);

    React.useEffect(() => {
        const loadProjects = async () => {
            const allProjects = await api.projects.getAll();
            if (slug) {
                const sLower = slug.toLowerCase();
                const matched = allProjects.filter(p => 
                    p.id.toLowerCase().includes(sLower) || 
                    (sLower.includes('r3') && p.title.toLowerCase().includes('canvas')) ||
                    (sLower.includes('r22') && p.title.toLowerCase().includes('atmos')) ||
                    (sLower.includes('r13') && p.title.toLowerCase().includes('aros')) ||
                    (sLower.includes('r10') && p.title.toLowerCase().includes('universe')) ||
                    (sLower.includes('r17') && (p.title.toLowerCase().includes('echoes') || p.title.toLowerCase().includes('nora'))) ||
                    (sLower.includes('r31') && (p.title.toLowerCase().includes('espada') || p.title.toLowerCase().includes('echoes'))) ||
                    (sLower.includes('r2') && p.title.toLowerCase().includes('qrious')) ||
                    (sLower.includes('r34') && p.title.toLowerCase().includes('duet'))
                );
                const remaining = allProjects.filter(p => !matched.some(m => m.id === p.id));
                setProjects([...matched, ...remaining].slice(0, 3));
            } else {
                setProjects(allProjects.slice(0, 3));
            }
        };
        loadProjects();
    }, [slug]);

    return (
        <div className="pt-4 pb-20 bg-transparent">
            <SEO 
                title={config.title}
                description={config.description}
                keywords={config.keywords}
                canonical={`/location/${slug}`}
            />

            <div className="container mx-auto px-4">
                {/* Authority Header */}
                <div className="flex flex-col lg:flex-row gap-8 items-start mb-32">
                    <div className="lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 rainbow-text-clip font-bold text-[10px] font-bold tracking-tight font-semibold mb-8"
                        >
                            <Target size={14} /> Market Intelligence Report 2026
                        </motion.div>
                        <h1 className="text-5xl md:text-5xl font-sans font-bold text-[#202124] mb-10 leading-[1.1]">
                            {config.title.split('|')[0]}
                        </h1>
                        <p className="text-[#5F6368] text-xl font-light leading-relaxed max-w-2xl mb-12">
                            A deep-dive analysis of real estate dynamics, infrastructure velocity, and investment potential for <strong>{slug?.replace(/-/g, ' ')}</strong>.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" className="rounded-full px-8 h-14" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>Enquire Now for Price List</Button>
                            <Button variant="outline" className="rounded-full px-8 h-14" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>Download Area Report</Button>
                        </div>
                    </div>

                    <div className="lg:w-1/3 grid grid-cols-1 gap-6">
                        <div className="bg-[#F8F9FA] p-8 rounded-[2rem] border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold tracking-tight font-medium text-[#5F6368]">Infra Score</span>
                                <Zap size={16} className="rainbow-text-clip font-bold" />
                            </div>
                            <div className="text-4xl font-sans font-bold text-[#202124]">{config.infraScore}/100</div>
                            <div className="w-full h-1 bg-gray-200 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${config.infraScore}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] text-[#202124]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold tracking-tight font-medium text-[#202124]/40">Rental Yield</span>
                                <TrendingUp size={16} className="rainbow-text-clip font-bold" />
                            </div>
                            <div className="text-4xl font-sans font-bold">{config.rentalYield}</div>
                            <p className="text-[#202124]/40 text-[10px] mt-4 tracking-tight font-medium">Projected for Hinjewadi West</p>
                        </div>
                    </div>
                </div>

                {/* Intelligence Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-40">
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-[#E5C07B]/20 rounded-2xl flex items-center justify-center rainbow-text-clip font-bold">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-xl font-sans font-bold text-[#202124]">Velocity Matrix</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-white/20 pb-2">
                                <span className="text-[#5F6368] text-sm">Hinjewadi Phase 1</span>
                                <span className="font-bold text-[#202124]">{config.commutePhase1}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/20 pb-2">
                                <span className="text-[#5F6368] text-sm">Mumbai-Pune Expy</span>
                                <span className="font-bold text-[#202124]">12 mins</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-[#E5C07B]/20 rounded-2xl flex items-center justify-center rainbow-text-clip font-bold">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-sans font-bold text-[#202124]">Sovereign Safety</h3>
                        <ul className="space-y-3">
                            {config.highlights.map((h, i) => (
                                <li key={i} className="flex gap-2 text-sm text-[#5F6368]">
                                    <span className="rainbow-text-clip font-bold">•</span> {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-900 rounded-[2rem] p-10 text-[#202124] flex flex-col justify-between">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Market View</h4>
                            <p className="text-[#202124]/60 text-sm leading-relaxed">
                                Demand for premium housing near {slug?.split('-')[0]} has spiked by 18% in the last quarter due to the Hinjewadi-Shivajinagar Metro progress.
                            </p>
                        </div>
                        <Link to="/township-intelligence" className="flex items-center gap-2 rainbow-text-clip font-bold text-xs font-bold tracking-tight font-medium group">
                            Explore Stats <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Relevant Projects Section */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-4xl font-sans font-bold text-[#202124]">Matching Inventory</h2>
                        <Link to="/projects" className="rainbow-text-clip font-bold font-bold border-b border-accent/20 pb-1">View All Sectors</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HyperLocalLanding;
