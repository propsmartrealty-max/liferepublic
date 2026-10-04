import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useLocation } from 'react-router-dom';
import { extractSiloData } from '../lib/pSEO-engine';
import { 
    CheckCircle2, ChevronRight, Home, Star, MapPin, 
    Clock, ShieldCheck, ArrowRight, ChevronDown, 
    Sparkles, PhoneCall, MessageCircle, FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EMICalculator } from '../components/ui/EMICalculator';

export const SiloLanding: React.FC = () => {
    const { siloSlug } = useParams<{ siloSlug?: string }>();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search).get('q') || 
                       new URLSearchParams(location.search).get('query') || 
                       new URLSearchParams(location.search).get('keyword') || '';
    const activeSlug = siloSlug || queryParam || 'kolte-patil-life-republic-township-hinjewadi';
    const siloData = extractSiloData(activeSlug);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const currentUrl = `https://life-republic.in/search/${activeSlug}`;

    // Schema: Product / RealEstateListing + Breadcrumbs + FAQPage
    const jsonLdSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                '@id': `${currentUrl}#breadcrumb`,
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Home',
                        'item': 'https://life-republic.in'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'Search',
                        'item': 'https://life-republic.in/locations-directory'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': siloData.h1,
                        'item': currentUrl
                    }
                ]
            },
            {
                '@type': siloData.schemaType,
                '@id': `${currentUrl}#listing`,
                'name': `${siloData.h1} - Kolte Patil Life Republic`,
                'description': siloData.metaDescription,
                'url': currentUrl,
                'image': 'https://life-republic.in/images/projects/walkthrough.jpg',
                'brand': {
                    '@type': 'Brand',
                    'name': 'Kolte Patil Developers Ltd.'
                },
                'offers': {
                    '@type': 'AggregateOffer',
                    'priceCurrency': 'INR',
                    'lowPrice': siloData.lowPriceNum,
                    'highPrice': siloData.highPriceNum,
                    'price': siloData.lowPriceNum,
                    'offerCount': 24,
                    'availability': 'https://schema.org/InStock',
                    'seller': {
                        '@type': 'RealEstateAgent',
                        'name': 'Kolte-Patil Life Republic Authorized Sales Office'
                    }
                },
                'aggregateRating': {
                    '@type': 'AggregateRating',
                    'ratingValue': '4.9',
                    'bestRating': '5',
                    'worstRating': '1',
                    'ratingCount': '1280',
                    'reviewCount': '1280'
                }
            },
            {
                '@type': 'FAQPage',
                '@id': `${currentUrl}#faq`,
                'mainEntity': siloData.faqs.map(faq => ({
                    '@type': 'Question',
                    'name': faq.question,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': faq.answer
                    }
                }))
            },
            {
                '@type': 'ApartmentComplex',
                'name': 'Kolte-Patil Life Republic Township Hinjewadi',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': 'Survey No. 74, Marunji-Kasararsai Road, Hinjewadi',
                    'addressLocality': 'Pune',
                    'addressRegion': 'Maharashtra',
                    'postalCode': '411057',
                    'addressCountry': 'IN'
                },
                'geo': {
                    '@type': 'GeoCoordinates',
                    'latitude': '18.5913',
                    'longitude': '73.7389'
                }
            }
        ]
    };

    const handleOpenEnquiry = (type = 'Price Sheet') => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', {
            detail: {
                project: siloData.entity,
                type: `${type}: ${siloData.h1}`
            }
        }));
    };

    return (
        <div className="pt-2 bg-gradient-to-b from-gray-50/50 to-white min-h-screen">
            <Helmet>
                <title>{siloData.metaTitle}</title>
                <meta name="description" content={siloData.metaDescription} />
                <link rel="canonical" href={currentUrl} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta property="og:title" content={siloData.metaTitle} />
                <meta property="og:description" content={siloData.metaDescription} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://life-republic.in/images/projects/walkthrough.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siloData.metaTitle} />
                <meta name="twitter:description" content={siloData.metaDescription} />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLdSchema)}
                </script>
            </Helmet>

            {/* Breadcrumbs Navigation */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5F6368] overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-[#202124] transition-colors flex items-center gap-1">
                            <Home size={13} /> Home
                        </Link>
                        <ChevronRight size={12} className="text-gray-400" />
                        <Link to="/locations-directory" className="hover:text-[#202124] transition-colors">
                            Search Directory
                        </Link>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span className="text-[#202124] font-semibold truncate">{siloData.h1}</span>
                    </nav>
                </div>
            </div>

            {/* Hero / Header Section */}
            <section className="pt-8 pb-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Main Content (8 cols) */}
                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                                    <ShieldCheck size={14} /> MahaRERA Registered
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                                    <Star size={13} className="fill-amber-400 text-amber-400" /> 4.9 / 5 (1,280+ Reviews)
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                                    <Clock size={13} /> {siloData.commuteTime}
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#202124] tracking-tight leading-[1.15] mb-4">
                                {siloData.h1}
                            </h1>

                            <p className="text-base sm:text-lg text-[#5F6368] mb-6 leading-relaxed">
                                {siloData.metaDescription}
                            </p>

                            {/* Quick Metrics Strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
                                <div className="p-2">
                                    <div className="text-xs text-[#5F6368]">Starting Price</div>
                                    <div className="text-lg sm:text-xl font-bold text-[#202124]">{siloData.priceRangeText}</div>
                                </div>
                                <div className="p-2 border-l border-gray-100">
                                    <div className="text-xs text-[#5F6368]">Township Scale</div>
                                    <div className="text-lg sm:text-xl font-bold text-[#202124]">390+ Acres</div>
                                </div>
                                <div className="p-2 col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-gray-100">
                                    <div className="text-xs text-[#5F6368]">Hinjewadi Commute</div>
                                    <div className="text-lg sm:text-xl font-bold text-emerald-600">{siloData.commuteTime.split(' ')[0]} mins</div>
                                </div>
                            </div>

                            {/* Hero Action Buttons */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                <Button 
                                    size="lg" 
                                    className="rounded-xl px-7 py-3.5 text-xs font-bold tracking-wide shadow-md flex items-center gap-2"
                                    onClick={() => handleOpenEnquiry('Get Price Sheet')}
                                >
                                    <FileText size={16} /> Get Price Sheet & Floor Plans
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="rounded-xl px-7 py-3.5 text-xs font-bold tracking-wide border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                                    onClick={() => handleOpenEnquiry('Book VIP Site Visit')}
                                >
                                    <PhoneCall size={16} /> Book VIP Site Visit
                                </Button>
                                <a 
                                    href={`https://wa.me/919370552525?text=${encodeURIComponent(`Hello, I am interested in ${siloData.h1}. Please share pricing details.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide transition-colors shadow-sm"
                                >
                                    <MessageCircle size={16} /> WhatsApp Inquiry
                                </a>
                            </div>

                            {/* Features Check Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                                {siloData.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                                        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-semibold text-[#202124]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Matching Project Monographs */}
                            {siloData.matchingProjects.length > 0 && (
                                <div className="mb-12">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
                                                Available Clusters for this Configuration
                                            </h2>
                                            <p className="text-xs text-[#5F6368]">
                                                Explore RERA registered towers matching your criteria inside Life Republic
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {siloData.matchingProjects.map((project) => (
                                            <Link 
                                                key={project.id} 
                                                to={`/projects/${project.id}`}
                                                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                                            >
                                                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                                                    <img 
                                                        src={project.image} 
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                    <span className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-full">
                                                        {project.price}
                                                    </span>
                                                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#202124] text-[10px] font-bold rounded-lg flex items-center gap-1">
                                                        <MapPin size={10} /> {project.location}
                                                    </span>
                                                </div>
                                                <div className="p-4 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-sm text-[#202124] group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
                                                            {project.title.split('|')[0]}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                                            {project.features.slice(0, 3).map((f, i) => (
                                                                <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                                                        <span>View Floor Plans & Pricing</span>
                                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Interactive Mortgage EMI & Affordability Calculator */}
                            <EMICalculator 
                                initialAmount={siloData.lowPriceNum} 
                                clusterName={siloData.entity} 
                            />

                            {/* Deep Dynamic SEO Article */}
                            <div className="border-t border-gray-200 pt-8 mb-12">
                                <article 
                                    className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-[#202124]"
                                    dangerouslySetInnerHTML={{ __html: siloData.content }}
                                />
                            </div>

                            {/* Structured FAQ Accordion */}
                            <div className="border-t border-gray-200 pt-8 mb-12">
                                <h2 className="text-2xl font-bold text-[#202124] tracking-tight mb-2">
                                    Frequently Asked Questions ({siloData.config} in {siloData.location})
                                </h2>
                                <p className="text-xs text-[#5F6368] mb-6">
                                    Official answers regarding prices, possession, RERA compliance, and connectivity
                                </p>

                                <div className="space-y-3">
                                    {siloData.faqs.map((faq, index) => {
                                        const isOpen = openFaqIndex === index;
                                        return (
                                            <div 
                                                key={index} 
                                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                                            >
                                                <button
                                                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#202124] hover:bg-gray-50 transition-colors"
                                                    aria-expanded={isOpen}
                                                >
                                                    <span>{faq.question}</span>
                                                    <ChevronDown 
                                                        size={18} 
                                                        className={`text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-[#5F6368] leading-relaxed border-t border-gray-100 pt-3">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Internal Links Graph: Related Programmatic Searches */}
                            {siloData.relatedSearches && siloData.relatedSearches.length > 0 && (
                                <div className="border-t border-gray-200 pt-10 mt-12 mb-8">
                                    <h3 className="text-xl font-bold text-[#202124] mb-2 tracking-tight">
                                        Popular Property Searches in {siloData.location}
                                    </h3>
                                    <p className="text-xs text-[#5F6368] mb-6">
                                        Explore related configurations, cluster phases, and investment typologies across Kolte Patil Life Republic
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {siloData.relatedSearches.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                to={`/search/${item.slug}`}
                                                className="p-3.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-[#202124] hover:text-emerald-700 transition-all shadow-sm flex items-center justify-between group"
                                            >
                                                <span className="truncate">{item.title}</span>
                                                <ChevronRight size={14} className="text-gray-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Sidebar (4 cols) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* Lead Capture Box */}
                                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xl relative overflow-hidden">
                                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
                                        <Sparkles size={14} /> Direct Developer Pricing
                                    </div>
                                    <h3 className="text-xl font-bold text-[#202124] mb-2">
                                        Request Exact Price Sheet
                                    </h3>
                                    <p className="text-xs text-[#5F6368] mb-6 leading-relaxed">
                                        Get instant access to inventory availability, tower-wise cost breakdowns, and exclusive launch offers.
                                    </p>

                                    <div className="space-y-3">
                                        <Button 
                                            className="w-full py-4 text-xs font-bold tracking-wide rounded-xl shadow-md"
                                            onClick={() => handleOpenEnquiry('Sidebar Instant Price Request')}
                                        >
                                            Get Detailed Price Breakdown
                                        </Button>

                                        <Button 
                                            variant="outline" 
                                            className="w-full py-4 text-xs font-bold tracking-wide rounded-xl border-gray-300 hover:bg-gray-50"
                                            onClick={() => handleOpenEnquiry('Schedule Spatial Visit')}
                                        >
                                            Schedule Guided Site Visit
                                        </Button>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-[#5F6368]">
                                        <span>Official Sales Desk:</span>
                                        <span className="font-semibold text-[#202124]">Life Republic Sales Desk</span>
                                    </div>
                                    <div className="text-[11px] text-[#5F6368] mt-1 text-center">
                                        MahaRERA Registered Project
                                    </div>
                                </div>

                                {/* Quick Contact Card */}
                                <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-900 shadow-md">
                                    <h4 className="font-bold text-base mb-1">Need Urgent Assistance?</h4>
                                    <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
                                        Speak directly with our senior township sales advisor.
                                    </p>
                                    <div className="space-y-2.5">
                                        <a 
                                            href="tel:+917744009295" 
                                            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-emerald-950 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shadow-sm"
                                        >
                                            <PhoneCall size={14} /> Call Sales Advisor
                                        </a>
                                        <a 
                                            href={`https://wa.me/919370552525?text=${encodeURIComponent(`Hi, I need assistance regarding ${siloData.h1} at Kolte Patil Life Republic.`)}`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-colors shadow-sm"
                                        >
                                            <MessageCircle size={14} /> Chat on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
