import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

const pSEOMatrix = {
    intents: ['luxury', 'premium', 'affordable', 'ready-possession', 'under-construction', 'investment', 'new-launch', 'walk-to-work'],
    configurations: ['1-bhk-flats', '2-bhk-flats', '3-bhk-flats', '4-bhk-flats', 'duplex', 'penthouse', 'villas', 'row-houses', 'plots'],
    locations: ['hinjewadi', 'wakad', 'baner', 'mahalunge', 'pcmc', 'tathawade', 'pune-west', 'it-park'],
    entities: ['kolte-patil-life-republic', 'atmos', 'aros', 'universe', 'canvas', '24k-espada']
};

// Helper to format slug to title
const formatTitle = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const LocationsDirectory: React.FC = () => {
    // Grouping by Location for better UX
    const groupedLinks = useMemo(() => {
        const groups: Record<string, string[]> = {};
        
        for (const location of pSEOMatrix.locations) {
            groups[location] = [];
            for (const config of pSEOMatrix.configurations) {
                // To keep DOM size reasonable per location block, we take top intents
                for (const intent of ['luxury', 'premium', 'ready-possession']) {
                    const entity = 'kolte-patil-life-republic'; 
                    const slug = `${intent}-${config}-in-${location}-${entity}`;
                    groups[location].push(slug);
                }
            }
        }
        return groups;
    }, []);

    return (
        <div className="min-h-[75vh] bg-[#1A1C23] pt-24 pb-20">
            <SEO 
                title="Pune Real Estate Locations Directory | Kolte Patil Life Republic"
                description="Browse our comprehensive directory of premium real estate options across Pune West, including Hinjewadi, Wakad, and Baner."
                canonical="/locations-directory"
            />
            <Breadcrumbs />
            
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Pune Real Estate Directory
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our extensive catalog of properties across prime locations. Find exactly what you're looking for by browsing our specialized property corridors.
                    </p>
                </div>

                <div className="space-y-16">
                    {Object.entries(groupedLinks).map(([location, slugs]) => (
                        <div key={location} className="bg-[#151822] border border-white/10 rounded-3xl p-8 shadow-sm border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-accent mb-6 capitalize border-b border-white/5 pb-4">
                                Properties in {formatTitle(location)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {slugs.map(slug => (
                                    <Link 
                                        key={slug} 
                                        to={`/search/${slug}`}
                                        className="text-sm text-gray-500 hover:text-accent transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-accent transition-colors" />
                                        {formatTitle(slug.replace('-kolte-patil-life-republic', ''))}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Full Index Note */}
                <div className="mt-16 text-center text-xs text-gray-400">
                    Showing top property combinations. For our complete catalog of 3,000+ configurations, please use our <Link to="/projects" className="text-accent hover:underline">Project Finder</Link>.
                </div>
            </div>
        </div>
    );
};

export default LocationsDirectory;
