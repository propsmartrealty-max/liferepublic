import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { extractSiloData } from '../lib/pSEO-engine';
import { MapPin, CheckCircle2, ChevronRight, Home, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SiloLanding: React.FC = () => {
    const { siloSlug } = useParams<{ siloSlug: string }>();
    const siloData = siloSlug ? extractSiloData(siloSlug) : null;

    if (!siloData) {
        return <div className="min-h-screen pt-32 text-center">Silo not found.</div>;
    }

    // Schema Generator for this silo
    const generateSchema = () => {
        return {
            '@context': 'https://schema.org',
            '@type': siloData.schemaType,
            'name': siloData.h1,
            'description': siloData.metaDescription,
            'url': `https://life-republic.in/search/${siloSlug}`,
            'brand': {
                '@type': 'Brand',
                'name': 'Kolte Patil'
            }
        };
    };

    return (
        <div className="pt-20">
            <Helmet>
                <title>{siloData.metaTitle}</title>
                <meta name="description" content={siloData.metaDescription} />
                <link rel="canonical" href={`https://life-republic.in/search/${siloSlug}`} />
                <script type="application/ld+json">
                    {JSON.stringify(generateSchema())}
                </script>
            </Helmet>

            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1"><Home size={12}/> Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-primary-dark">Search</span>
                        <ChevronRight size={12} />
                        <span className="text-accent truncate">{siloData.h1}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                Verified Listings
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary tracking-tighter leading-[1.1] mb-6">
                                {siloData.h1}
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                                {siloData.metaDescription}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-12">
                                <Button size="lg" className="rounded-2xl px-8 py-4 text-xs font-bold uppercase tracking-widest" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>
                                    Get Price Sheet
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-2xl px-8 py-4 text-xs font-bold uppercase tracking-widest" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                                    Read Analysis
                                </Button>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                {siloData.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <CheckCircle2 size={20} className="text-accent" />
                                        <span className="text-sm font-bold text-secondary">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Dynamic SEO Article */}
                            <article 
                                className="prose prose-lg prose-headings:font-serif prose-headings:text-secondary prose-p:text-gray-600 max-w-none border-t border-gray-100 pt-12"
                                dangerouslySetInnerHTML={{ __html: siloData.content }}
                            />
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 bg-secondary text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />
                                <h3 className="text-2xl font-serif font-bold mb-2">Request Callback</h3>
                                <p className="text-gray-400 text-sm mb-8 font-medium">Register for priority access and exclusive inventory for this configuration.</p>
                                {/* Note: we use button to trigger modal here to avoid importing EnquiryForm if it doesn't exist */}
                                <Button 
                                    className="w-full bg-accent text-secondary hover:bg-white transition-colors rounded-xl py-6 font-bold uppercase tracking-widest text-xs"
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { source: siloData.h1 }}))}
                                >
                                    Book Site Visit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
