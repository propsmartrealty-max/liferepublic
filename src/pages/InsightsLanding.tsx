import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { seoClusters } from '../data/seo-clusters';
import { ArrowRight } from 'lucide-react';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const InsightsLanding: React.FC = () => {
    const categories = [
        { title: 'Configurations', data: seoClusters.configurations },
        { title: 'Top Locations', data: seoClusters.locations },
        { title: 'Market Themes', data: seoClusters.themes }
    ];

    return (
        <div className="bg-surface min-h-screen pt-32 pb-24">
            <Helmet>
                <title>Pune Real Estate Insights & Market Trends | Life Republic</title>
                <meta name="description" content="Explore the latest trends, configuration details, and location highlights for premium real estate in Pune West, Hinjewadi, and Mahalunge." />
                <script type="application/ld+json">
                    {JSON.stringify(generateBreadcrumbSchema([
                        { name: 'Home', item: '/' },
                        { name: 'Insights', item: '/insights' }
                    ]))}
                </script>
            </Helmet>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-accent text-sm font-bold uppercase tracking-[0.5em] block mb-4">Market Knowledge Hub</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-dark mb-6">Pune Real Estate Insights</h1>
                    <p className="text-lg text-secondary leading-relaxed">
                        Deep dive into the trends, micro-markets, and premium lifestyle offerings shaping the future of Hinjewadi, Mahalunge, and Baner.
                    </p>
                </div>

                <div className="space-y-24">
                    {categories.map((category) => (
                        <div key={category.title}>
                            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8 pb-4 border-b border-gray-200">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.data.map((item) => (
                                    <Link 
                                        key={item.slug} 
                                        to={`/insights/${item.slug}`}
                                        className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
                                    >
                                        <div>
                                            <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-accent transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-secondary line-clamp-2">
                                                Explore premium opportunities and deep market analysis for {item.name.toLowerCase()} in the thriving Pune West corridor.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest">
                                            Read More
                                            <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
