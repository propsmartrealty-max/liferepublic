import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Sparkles, Building2, MapPin, Tag, Compass } from 'lucide-react';
import seoMatrix from '../../data/seoMatrix.json';

export const KeywordEcosystem: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const clusterSlugs: Record<string, string> = {
        'atmos': '/projects/kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
        'aros': '/projects/kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
        'duet': '/projects/kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
        'echoes': '/projects/kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
        'canvas': '/projects/kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
        'universe': '/projects/kolte-patil-life-republic-universe-luxury-2-bhk-flats-hinjewadi',
        '24k-espada': '/projects/kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
        'qrious': '/projects/kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
        'nora': '/plots-in-hinjewadi',
        'sound-of-soul': '/projects/kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
        'villas': '/projects/kolte-patil-life-republic-villas-hinjewadi',
        'arezo': '/projects/kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
        'oro-avenue': '/projects/kolte-patil-life-republic-oro-avenue-smart-2-bhk-hinjewadi',
        'i-towers': '/projects/kolte-patil-life-republic-i-towers-smart-homes-hinjewadi',
        'first-avenue': '/projects/kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
        '3rd-avenue': '/location/3rd-avenue-life-republic'
    };

    return (
        <section className="w-full border-t border-gray-200 bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8 text-xs text-gray-700 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase">
                                Kolte Patil Life Republic Keyword & Township Search Ecosystem
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                                Complete index of all 16 residential sectors, configurations, MahaRERA registrations, and buyer search corridors.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold transition-all shadow-sm"
                        aria-expanded={isExpanded}
                    >
                        <span>{isExpanded ? 'Collapse Entire Ecosystem' : 'Explore Entire Ecosystem (500+ Corridors)'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>

                {/* Visible Top Matrix (Always Crawlable for Googlebot) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                    {/* 1. Core Brand Authority */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                            <Building2 size={14} className="text-amber-600" />
                            <span>Official Brand Searches</span>
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-gray-600">
                            {seoMatrix.base.slice(0, 10).map((kw, idx) => (
                                <li key={idx}>
                                    <Link 
                                        to={idx % 2 === 0 ? '/' : '/contact'} 
                                        className="hover:text-amber-600 hover:underline transition-colors block"
                                    >
                                        {kw}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Top Project Clusters */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                            <Compass size={14} className="text-amber-600" />
                            <span>16 Flagship Sectors</span>
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-gray-600">
                            {Object.entries(clusterSlugs).slice(0, 10).map(([key, url]) => (
                                <li key={key}>
                                    <Link 
                                        to={url} 
                                        className="hover:text-amber-600 hover:underline transition-colors block capitalize"
                                    >
                                        Kolte Patil Life Republic {key.replace(/-/g, ' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Verified Configurations (Min ₹58L*) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                            <Tag size={14} className="text-amber-600" />
                            <span>Configurations (₹58L - ₹3.4Cr*)</span>
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-gray-600">
                            <li><Link to="/2-bhk-flats-in-hinjewadi" className="hover:text-amber-600 hover:underline block">2 BHK Flats in Kolte Patil Life Republic (From ₹58L*)</Link></li>
                            <li><Link to="/search/price-2.5-bhk-flats-in-hinjewadi-echoes" className="hover:text-amber-600 hover:underline block">2.5 BHK Flats in Life Republic Echoes (From ₹78L*)</Link></li>
                            <li><Link to="/3-bhk-flats-in-hinjewadi" className="hover:text-amber-600 hover:underline block">3 BHK Luxury Flats in Life Republic (From ₹95L*)</Link></li>
                            <li><Link to="/4-bhk-flats-in-hinjewadi" className="hover:text-amber-600 hover:underline block">4 BHK Premium Residences Canvas & Espada (From ₹1.45Cr*)</Link></li>
                            <li><Link to="/row-houses-in-life-republic" className="hover:text-amber-600 hover:underline block">24K Espada Ultra-Luxury Row Houses Hinjewadi</Link></li>
                            <li><Link to="/luxury-villas-near-hinjewadi" className="hover:text-amber-600 hover:underline block">Sound of Soul & Villas at Life Republic</Link></li>
                            <li><Link to="/plots-in-hinjewadi" className="hover:text-amber-600 hover:underline block">Nora Bungalow Plots in Life Republic</Link></li>
                        </ul>
                    </div>

                    {/* 4. Strategic Micro-Markets */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                            <MapPin size={14} className="text-amber-600" />
                            <span>Location Corridors</span>
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-gray-600">
                            <li><Link to="/location/flats-near-hinjewadi" className="hover:text-amber-600 hover:underline block">Flats Near Hinjewadi Phase 1 IT Park</Link></li>
                            <li><Link to="/location/flats-near-marunji" className="hover:text-amber-600 hover:underline block">Flats on Marunji-Kasarsai Road</Link></li>
                            <li><Link to="/location/flats-near-wakad" className="hover:text-amber-600 hover:underline block">Apartments Near Wakad Bridge Corridor</Link></li>
                            <li><Link to="/location/flats-near-tathawade" className="hover:text-amber-600 hover:underline block">Residences Near Tathawade Education Hub</Link></li>
                            <li><Link to="/location/flats-near-punawale" className="hover:text-amber-600 hover:underline block">Projects Near Punawale Expressway Exit</Link></li>
                            <li><Link to="/search/pune-metro-line-3-connectivity-life-republic" className="hover:text-amber-600 hover:underline block">Pune Metro Line 3 Connectivity Hub</Link></li>
                            <li><Link to="/search/pmrda-ring-road-marunji-life-republic" className="hover:text-amber-600 hover:underline block">PMRDA Ring Road Direct Access</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Collapsible Entire Keyword Ecosystem (All 545 Permutations) */}
                {isExpanded && (
                    <div className="mt-8 pt-8 border-t border-gray-200 space-y-6 transition-all duration-300">
                        {/* High-Converting Buyer Intent */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                High-Intent Buyer Corridors (Price, Floor Plan, RERA, Possession, Reviews)
                            </h4>
                            <div className="flex flex-wrap gap-2 text-[11px]">
                                {seoMatrix.buyer_intent.map((intentKw, i) => (
                                    <Link
                                        key={i}
                                        to={`/search/${intentKw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                        className="px-2.5 py-1 rounded bg-white border border-gray-200 hover:border-amber-500 hover:text-amber-700 transition-colors"
                                    >
                                        {intentKw}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* All 16 Clusters Deep Queries */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                All 16 Sector Clusters & Architectural Phases
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
                                {Object.entries(seoMatrix.projects).map(([projKey, projKws]) => (
                                    <div key={projKey} className="p-3 bg-white border border-gray-200 rounded-lg">
                                        <p className="font-bold text-gray-900 capitalize mb-1.5">
                                            {projKey.replace(/-/g, ' ')}
                                        </p>
                                        <ul className="space-y-1 text-gray-500">
                                            {(projKws as string[]).slice(0, 4).map((pk, pi) => (
                                                <li key={pi}>
                                                    <Link 
                                                        to={clusterSlugs[projKey] || '/projects'}
                                                        className="hover:text-amber-600 hover:underline truncate block"
                                                        title={pk}
                                                    >
                                                        {pk}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* West Pune & IT Corridor Clusters */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                IT Hubs & Connectivity Nodes (Infosys, TCS, Wipro, Metro, Expressway)
                            </h4>
                            <div className="flex flex-wrap gap-2 text-[11px]">
                                {seoMatrix.it_hub.concat(seoMatrix.luxury).map((kw, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px]">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
