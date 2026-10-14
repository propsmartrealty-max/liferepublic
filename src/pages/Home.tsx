import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Building, 
    MapPin, 
    Shield, 
    CheckCircle2, 
    ArrowRight, 
    Download, 
    Calendar, 
    ChevronDown, 
    Sparkles, 
    Clock, 
    Trees, 
    GraduationCap, 
    Car, 
    FileCheck,
    PhoneCall
} from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { projectsRegistry } from '../data/projects';
import { RERA_REGISTRY, RERA_DISCLAIMER } from '../data/rera';

const HOME_FAQS = [
    {
        question: "What is Kolte Patil Life Republic and where is it located?",
        answer: "Kolte Patil Life Republic is a 390-acre integrated gated township developed by Kolte-Patil Developers Ltd. in Marunji, Hinjewadi, Pune (PIN 411057). Located just 4.5 km from Rajiv Gandhi Infotech Park Phase 1, the township features over 20,000 residents, operational schools, commercial high streets, and 11 distinct residential sectors."
    },
    {
        question: "What are the starting prices for flats in Life Republic Hinjewadi?",
        answer: "Prices in Kolte Patil Life Republic start at ₹40 Lakhs* for smart 1 BHK apartments in Sector R10 (The Universe). Premium 2 BHK apartments start from ₹79 Lakhs* in Duet (Sector R34) and ₹92 Lakhs* in Aros (Sector R13). Luxury 3 BHK homes in Atmos (Sector R22) start from ₹1.15 Cr*, 3 & 4 BHK presidential suites in Canvas (Sector R5) start from ₹1.59 Cr*, while ultra-luxury 4 & 5 BHK row houses in 24K Espada (Sector R31) start from ₹3.40 Cr*."
    },
    {
        question: "Which residential clusters are currently available for booking?",
        answer: "Active clusters with live inventory include Atmos (Sector R22: 2 & 3 BHK), Aros (Sector R13: 2 & 3 BHK), Echoes (Sector R31: 2 & 2.5 BHK New Launch), Duet (Sector R34: 2 BHK Eterna & Infinite), Canvas (Sector R5: 3, 3.5 & 4 BHK), Qrious (Sector R14: 2 & 3 BHK Smart Homes), The Universe (Sector R10: 1 & 2 BHK), 24K Espada (Sector R31: Luxury Row Houses), and Nora (Sector R17B: Bungalow Plots)."
    },
    {
        question: "Is Kolte Patil Life Republic approved by MahaRERA?",
        answer: "Yes, every cluster within Kolte Patil Life Republic is fully registered and approved by MahaRERA. For example, Atmos is registered under P52100051765 (Sector R22), Aros under P52100047921 (Sector R13), Echoes under PM1261012502409 (Sector R31), Duet under P52100079424 (Sector R34), Canvas under P52100077008 (Sector R5), Qrious under P52100079623 (Sector R14), The Universe under P52100027629 (Sector R10), and 24K Espada under P52100002646 (Sector R31)."
    },
    {
        question: "How far is Life Republic from Hinjewadi IT Park and Pune Metro?",
        answer: "Life Republic is located approximately 4.5 km (5-8 minutes) from Rajiv Gandhi Infotech Park Phase 1 (hosting Infosys, Wipro, TCS, and Cognizant). The upcoming Hinjewadi Metro Line 3 station is within a 3-minute drive (1.5 km), offering fast transit to Baner, Shivajinagar, and Central Pune."
    },
    {
        question: "Are there ready-to-move-in flats available at Life Republic?",
        answer: "Yes, ready possession and near-possession residences are available in established clusters including First Avenue (Sector R1), Third Avenue (Sector R3), Arezo (Sector R16), and select inventory in 24K Espada (Sector R31). Other towers are slated for phased delivery between 2026 and 2030."
    },
    {
        question: "What educational facilities are located inside the township campus?",
        answer: "Life Republic houses the operational Crimson Anisha Global School directly within its 390-acre gated boundary. Children can safely walk or cycle to school without navigating public highways or heavy city traffic."
    },
    {
        question: "What are the lifestyle and sports amenities available to residents?",
        answer: "Residents enjoy access to the 3.5-acre Central Urban Park, Crimson Clubhouse, Olympic-spec swimming pools, badminton courts, tennis courts, cricket practice pitches, jogging tracks, multi-tier security, dedicated township fire station, and daily convenience shopping high streets."
    },
    {
        question: "Can Non-Resident Indians (NRIs) invest in Kolte Patil Life Republic?",
        answer: "Yes, Life Republic has a dedicated NRI desk facilitating digital documentation, remote virtual tours, power-of-attorney execution, and attractive rental yield property management for international buyers."
    },
    {
        question: "How can I schedule a private site visit to Kolte Patil Life Republic?",
        answer: "You can book a private VIP site tour with township concierge assistance by clicking the 'Schedule Site Visit' button on this page or reaching out via phone or WhatsApp. Complimentary pickup and drop services are available from Hinjewadi Phase 1."
    }
];

const PRICING_MATRIX = [
    {
        typology: "1 BHK Smart Residences",
        carpet: "393 - 444 sq.ft.",
        sectors: "The Universe (Sector R10)",
        price: "₹40 Lakhs*",
        possession: "Dec 2027",
        link: "/projects/kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi"
    },
    {
        typology: "2 BHK Compact Homes",
        carpet: "560 - 629 sq.ft.",
        sectors: "The Universe (Sector R10) / Arezo (Sector R16)",
        price: "₹58 L - ₹72 Lakhs*",
        possession: "Ready / Dec 2027",
        link: "/projects/kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi"
    },
    {
        typology: "2 BHK Premium Flats",
        carpet: "740 - 840 sq.ft.",
        sectors: "Duet (Sector R34) / Echoes (Sector R31) / Aros (Sector R13)",
        price: "₹79 L - ₹92 Lakhs*",
        possession: "2028 - 2030",
        link: "/projects/kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi"
    },
    {
        typology: "2.5 BHK Study Residences",
        carpet: "963 - 978 sq.ft.",
        sectors: "Echoes (Sector R31)",
        price: "₹85 Lakhs*",
        possession: "Dec 2030",
        link: "/projects/kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi"
    },
    {
        typology: "3 BHK Luxury High-Rise",
        carpet: "1,007 - 1,176 sq.ft.",
        sectors: "Atmos (Sector R22) / Aros (Sector R13)",
        price: "₹1.15 Cr*",
        possession: "June 2028 - Dec 2028",
        link: "/projects/kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi"
    },
    {
        typology: "3.5 & 4 BHK Presidential Towers",
        carpet: "1,332 - 2,023 sq.ft.",
        sectors: "Canvas (Sector R5)",
        price: "₹1.59 Cr*",
        possession: "Dec 2030",
        link: "/projects/kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi"
    },
    {
        typology: "4 & 5 BHK Row Houses",
        carpet: "1,876 - 2,274 sq.ft.",
        sectors: "24K Espada (Sector R31)",
        price: "₹3.40 Cr*",
        possession: "Ready / Handover",
        link: "/projects/kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi"
    },
    {
        typology: "Bespoke Bungalow Plots",
        carpet: "Various Plot Sizes",
        sectors: "Nora (Sector R17B)",
        price: "₹1.80 Cr*",
        possession: "Immediate Infrastructure Ready",
        link: "/projects/kolte-patil-life-republic-nora-bungalow-plots-hinjewadi"
    }
];

const CONNECTIVITY_LANDMARKS = [
    { title: "Rajiv Gandhi IT Park Phase 1", distance: "4.5 km", time: "5 - 8 mins", desc: "Infosys, Wipro, Tata Consultancy Services, Cognizant, Tech Mahindra" },
    { title: "Hinjewadi Metro Line 3", distance: "1.5 km", time: "3 - 5 mins", desc: "Direct rapid metro connectivity to Baner, Aundh, and Shivajinagar" },
    { title: "Mumbai-Pune Expressway", distance: "6.0 km", time: "10 mins", desc: "Signal-free expressway connectivity to Navi Mumbai and Mumbai" },
    { title: "Wakad & Phoenix Mall of the Millennium", distance: "7.0 km", time: "12 mins", desc: "Premium shopping, multiplexes, luxury retail, and dining avenues" },
    { title: "PMRDA Ring Road Corridor", distance: "2.0 km", time: "4 mins", desc: "110-meter wide arterial expressway connecting PCMC and Pune City" },
    { title: "Pune International Airport (PNQ)", distance: "24.0 km", time: "45 mins", desc: "Direct access via Aundh-Ravet BRTS and University Road Flyover" }
];

export const Home: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleEnquire = (project?: string, type: string = 'General Enquiry') => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('open-enquiry-modal', {
                detail: { project: project || 'Kolte Patil Life Republic', type }
            }));
        }
    };

    // Google 5-Star Review Snippets & Real Estate Properties Enterprise Schema
    const homeCustomSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": "https://life-republic.in/#township-residences",
            "name": "Kolte Patil Life Republic Hinjewadi",
            "description": "390-Acre Integrated Gated Township in Marunji, Hinjewadi, Pune offering premium 1, 2, 2.5, 3 & 4 BHK apartments, luxury row houses, and bungalow plots.",
            "image": "https://life-republic.in/hero-new.jpg",
            "brand": {
                "@type": "Brand",
                "name": "Kolte-Patil Developers Ltd."
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "4000000",
                "highPrice": "35000000",
                "price": "4000000",
                "offerCount": "11",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "1450",
                "reviewCount": "1280"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Aditya Deshmukh" },
                    "datePublished": "2026-07-18",
                    "reviewBody": "Living in Kolte Patil Life Republic Hinjewadi has been phenomenal. The 390-acre township infrastructure, 3.5-acre urban park, and effortless 5-minute commute to Hinjewadi Phase 1 IT Park make it the best residential project in Pune.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Dr. Sneha Joshi" },
                    "datePublished": "2026-08-25",
                    "reviewBody": "Outstanding construction quality, expansive floor layouts, and world-class educational infrastructure with Crimson Anisha Global School right inside the township gates.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    }
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            "@id": "https://life-republic.in/#complex",
            "name": "Kolte Patil Life Republic Hinjewadi",
            "alternateName": ["Life Republic Pune", "Kolte Patil Life Republic Township"],
            "url": "https://life-republic.in",
            "description": "A 390-acre integrated gated township in Marunji, Hinjewadi, Pune offering 1, 2, 2.5, 3 & 4 BHK apartments, row houses, and bungalow plots.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Life Republic Township, Marunji Road",
                "addressLocality": "Hinjewadi",
                "addressRegion": "Maharashtra",
                "postalCode": "411057",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.6186,
                "longitude": 73.7147
            },
            "hasMap": "https://maps.google.com/?cid=1236873151214041762",
            "numberOfBedrooms": "1 to 5",
            "petsAllowed": true
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://life-republic.in/#faq",
            "mainEntity": HOME_FAQS.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        }
    ];

    return (
        <div className="w-full bg-[#0a0a0a] text-white selection:bg-[#E5C07B] selection:text-black">
            <SEO
                title="Kolte Patil Life Republic Hinjewadi | 390-Acre Township"
                description="Explore Kolte Patil Life Republic Hinjewadi Pune. A 390-acre gated integrated township offering premium 1, 2, 3 BHK apartments and luxury villas near Rajiv Gandhi Infotech Park."
                keywords="kolte patil life republic, life republic hinjewadi, life republic pune, kolte patil hinjewadi, flats in hinjewadi, 2 bhk flats in hinjewadi, 3 bhk in hinjewadi, life republic atmos, life republic aros, life republic echoes, life republic duet, life republic 24k espada, life republic floor plan, life republic price, life republic rera"
                canonical="/"
                schema={homeCustomSchema}
            />

            {/* SECTION 1: HERO MONUMENT */}
            <header className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 md:px-8 border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <picture>
                        <source media="(max-width: 640px)" srcSet="/hero-new-mobile.webp" type="image/webp" />
                        <source srcSet="/hero-new.webp" type="image/webp" />
                        <img
                            src="/hero-new.jpg"
                            alt="Kolte Patil Life Republic Hinjewadi Pune 390-Acre Township"
                            className="w-full h-full object-cover opacity-60 scale-100"
                            loading="eager"
                            fetchPriority="high"
                            width="1000"
                            height="563"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-black/70" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center pt-24 pb-16 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E5C07B] text-xs font-semibold uppercase tracking-widest mb-6">
                        <Sparkles size={14} className="text-[#E5C07B]" />
                        <span>MahaRERA Registered 390-Acre Integrated Township</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Kolte Patil Life Republic <span className="text-[#E5C07B]">Hinjewadi</span>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-3xl mb-8 leading-relaxed">
                        Pune’s benchmark 390-acre integrated smart township in Marunji, Hinjewadi. 
                        Offering premium 1, 2, 2.5, 3 &amp; 4 BHK residences, bespoke villas, and row houses just 4.5 km from Rajiv Gandhi Infotech Park.
                    </p>

                    {/* Township Highlights Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mb-10 text-left">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
                            <span className="text-2xl font-bold text-[#E5C07B] block">390+</span>
                            <span className="text-xs text-gray-300 uppercase tracking-wider">Acres Master City</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
                            <span className="text-2xl font-bold text-[#E5C07B] block">20,000+</span>
                            <span className="text-xs text-gray-300 uppercase tracking-wider">Happy Residents</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
                            <span className="text-2xl font-bold text-[#E5C07B] block">11+</span>
                            <span className="text-xs text-gray-300 uppercase tracking-wider">Active Sectors</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
                            <span className="text-2xl font-bold text-[#E5C07B] block">₹40L*</span>
                            <span className="text-xs text-gray-300 uppercase tracking-wider">Starting Price</span>
                        </div>
                    </div>

                    {/* Primary CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#clusters"
                            className="px-8 py-4 bg-[#E5C07B] text-black font-semibold rounded-full hover:bg-white transition-colors duration-300 flex items-center gap-2 text-sm tracking-wide shadow-lg"
                        >
                            <span>Explore Active Clusters</span>
                            <ArrowRight size={16} />
                        </a>
                        <button
                            onClick={() => handleEnquire(undefined, 'Price Sheet Download')}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/30 backdrop-blur-md transition-all duration-300 flex items-center gap-2 text-sm tracking-wide"
                        >
                            <Download size={16} className="text-[#E5C07B]" />
                            <span>Download 2026 Price Sheet</span>
                        </button>
                        <button
                            onClick={() => handleEnquire(undefined, 'VIP Site Visit')}
                            className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded-full border border-white/20 transition-all duration-300 flex items-center gap-2 text-sm tracking-wide"
                        >
                            <Calendar size={16} className="text-[#E5C07B]" />
                            <span>Schedule VIP Site Tour</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* SECTION 2: EXECUTIVE SUMMARY & MASTER PLAN NARRATIVE */}
            <section id="master-plan" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 text-[#E5C07B] text-xs uppercase font-semibold tracking-widest">
                            <Building size={14} />
                            <span>The Township Benchmark</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
                            A 390-Acre Master Planned Integrated Smart City in Hinjewadi
                        </h2>
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                            Conceived and engineered by Kolte-Patil Developers Ltd., <strong>Kolte Patil Life Republic</strong> is a globally celebrated integrated township situated along Marunji Road, Hinjewadi, Pune. Spread across a sprawling 390-acre landscape, the township provides a harmonious synthesis of nature, futuristic architecture, and high-tech urban convenience.
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                            Engineered around an expansive 150-foot wide central spine road, Life Republic eliminates city congestion through zoned neighborhood planning. The master plan seamlessly integrates gated residential enclaves, dedicated healthcare hubs, convenience high streets, a private fire station, and the operational <strong>Crimson Anisha Global School</strong>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <Trees className="text-[#E5C07B] shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-white text-sm">3.5-Acre Urban Park</h3>
                                    <p className="text-xs text-gray-400 mt-1">Lush green forest reserve, botanical paths, and jogging spines.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <GraduationCap className="text-[#E5C07B] shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-white text-sm">Anisha Global School</h3>
                                    <p className="text-xs text-gray-400 mt-1">Operational K-12 campus right inside the secured perimeter.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <Car className="text-[#E5C07B] shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-white text-sm">150-Ft Spine Road</h3>
                                    <p className="text-xs text-gray-400 mt-1">Signal-free arterial internal roads ensuring effortless mobility.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <Shield className="text-[#E5C07B] shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-white text-sm">Township Fire Station</h3>
                                    <p className="text-xs text-gray-400 mt-1">Dedicated emergency response and 24x7 biometric surveillance.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                            <img
                                src="/images/home/master-township.webp"
                                alt="Kolte Patil Life Republic Master Layout 390 Acres"
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                <div>
                                    <span className="text-xs text-[#E5C07B] font-semibold uppercase tracking-wider block">Integrated Master Plan</span>
                                    <h4 className="text-lg font-bold text-white">390 Acres of Spatial Engineering</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: ACTIVE RESIDENTIAL CLUSTERS SHOWCASE */}
            <section id="clusters" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-[#E5C07B] text-xs uppercase font-semibold tracking-widest mb-3">
                        <Sparkles size={14} />
                        <span>The Residential Portfolio</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
                        Explore Active Clusters &amp; Sectors
                    </h2>
                    <p className="text-gray-400 mt-4 text-base">
                        From compact smart homes for IT professionals to grand 4 BHK row houses and bungalow plots, Life Republic offers an expansive spectrum of luxury living.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsRegistry.map((project) => (
                        <article
                            key={project.id}
                            className="bg-[#121212] rounded-2xl overflow-hidden border border-white/10 hover:border-[#E5C07B]/50 transition-all duration-300 flex flex-col group shadow-lg"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    width="400"
                                    height="240"
                                />
                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#E5C07B] border border-white/10">
                                    {project.location}
                                </div>
                                <div className="absolute bottom-4 right-4 bg-[#E5C07B] text-black px-3.5 py-1 rounded-full text-sm font-bold shadow-md">
                                    {project.price}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#E5C07B] transition-colors leading-snug">
                                        <Link to={`/projects/${project.id}`}>
                                            {project.title.split('|')[0].trim()}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                                    {project.features?.map((feat, idx) => (
                                        <span key={idx} className="text-[11px] bg-white/5 text-gray-300 px-2.5 py-1 rounded-md border border-white/10">
                                            {feat}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 flex items-center justify-between gap-3">
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="text-xs uppercase font-semibold text-white hover:text-[#E5C07B] flex items-center gap-1.5 transition-colors"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                    <button
                                        onClick={() => handleEnquire(project.title, 'Floor Plan & Pricing')}
                                        className="px-4 py-2 bg-white/10 hover:bg-[#E5C07B] hover:text-black text-white text-xs font-semibold rounded-lg transition-all"
                                    >
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* SECTION 4: 2026 PRICE LIST & CONFIGURATION MATRIX */}
            <section id="pricing-matrix" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-[#E5C07B] text-xs uppercase font-semibold tracking-widest mb-3">
                        <FileCheck size={14} />
                        <span>Transparent Commercial Matrix</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
                        Kolte Patil Life Republic Price List (2026 Updated)
                    </h2>
                    <p className="text-gray-400 mt-4 text-base">
                        Comprehensive configuration breakdown, carpet area spectrum, and official starting price quotes across sectors.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-300 text-xs uppercase tracking-wider">
                                <th className="p-4 sm:p-5">Typology</th>
                                <th className="p-4 sm:p-5">Carpet Area</th>
                                <th className="p-4 sm:p-5">Key Sectors / Clusters</th>
                                <th className="p-4 sm:p-5">Starting Price</th>
                                <th className="p-4 sm:p-5">Possession Timeline</th>
                                <th className="p-4 sm:p-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {PRICING_MATRIX.map((row, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                                    <td className="p-4 sm:p-5 font-semibold text-white">{row.typology}</td>
                                    <td className="p-4 sm:p-5 text-gray-300">{row.carpet}</td>
                                    <td className="p-4 sm:p-5 text-gray-300">{row.sectors}</td>
                                    <td className="p-4 sm:p-5 text-[#E5C07B] font-bold text-base">{row.price}</td>
                                    <td className="p-4 sm:p-5 text-gray-400">{row.possession}</td>
                                    <td className="p-4 sm:p-5 text-right">
                                        <Link
                                            to={row.link}
                                            className="inline-flex items-center gap-1 text-xs text-[#E5C07B] hover:text-white font-medium"
                                        >
                                            <span>Explore</span>
                                            <ArrowRight size={12} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    *Disclaimer: Prices mentioned are indicative starting quotes, subject to change without prior notice. Government taxes, stamp duty, and registration charges are extra as applicable.
                </p>
            </section>

            {/* SECTION 5: STRATEGIC HINJEWADI CONNECTIVITY MATRIX */}
            <section id="location-connectivity" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 text-[#E5C07B] text-xs uppercase font-semibold tracking-widest">
                            <MapPin size={14} />
                            <span>Unrivaled Strategic Location</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
                            At the Epicenter of Hinjewadi IT Park &amp; Expressway
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            Kolte Patil Life Republic is situated in Marunji, right beside Hinjewadi Phase 1, the heart of Pune’s trillion-rupee IT corridor. With seamless access to the upcoming Pune Metro Line 3, the Mumbai-Pune Expressway, and the PMRDA Ring Road, residents experience effortless daily commutes.
                        </p>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                            <h3 className="font-semibold text-[#E5C07B] text-sm">Direct IT Corridor Proximity</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                More than 400,000 IT professionals work within a 10-minute radius of Life Republic across Infosys, Wipro, TCS, Cognizant, and Tech Mahindra campuses.
                            </p>
                        </div>
                        <button
                            onClick={() => handleEnquire(undefined, 'Location & Commute Brochure')}
                            className="px-6 py-3 bg-[#E5C07B] text-black font-semibold rounded-full hover:bg-white transition-colors duration-300 text-xs tracking-wider uppercase inline-flex items-center gap-2"
                        >
                            <span>Download Location &amp; Commute Map</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {CONNECTIVITY_LANDMARKS.map((item, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#E5C07B]/40 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-[#E5C07B]">{item.distance}</span>
                                        <span className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">{item.time}</span>
                                    </div>
                                    <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: MAHARERA COMPLIANCE REGISTRY */}
            <section id="rera-compliance" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-[#E5C07B] text-xs uppercase font-semibold tracking-widest mb-3">
                        <Shield size={14} />
                        <span>Sovereign Legal Compliance</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
                        MahaRERA Registration &amp; Sector Verification
                    </h2>
                    <p className="text-gray-400 mt-4 text-base">
                        Every cluster in Life Republic is verified, approved, and regulated under Maharashtra Real Estate Regulatory Authority (MahaRERA).
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {RERA_REGISTRY.map((sector, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#121212] border border-white/10 hover:border-white/20 transition-all">
                            <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">{sector.title}</span>
                            <span className="text-sm font-mono font-bold text-[#E5C07B] block mb-2">{sector.rera}</span>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className={`px-2 py-0.5 rounded-full ${sector.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                    {sector.status}
                                </span>
                                <a
                                    href="https://maharera.maharashtra.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white underline"
                                >
                                    Verify on MahaRERA
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-xs text-gray-400 leading-relaxed">
                        {RERA_DISCLAIMER}
                    </p>
                </div>
            </section>

            {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQPAGE SCHEMA) */}
            <section id="faqs" className="py-20 px-4 md:px-8 max-w-5xl mx-auto border-b border-white/10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-[#E5C07B] text-xs uppercase font-semibold tracking-widest mb-3">
                        <Clock size={14} />
                        <span>Homebuyer &amp; Investor Guide</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 mt-4 text-base">
                        Get clear answers regarding township layout, pricing, RERA numbers, possession schedules, and site visits.
                    </p>
                </div>

                <div className="space-y-4">
                    {HOME_FAQS.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-white/10 rounded-2xl overflow-hidden bg-[#121212] transition-colors"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="font-semibold text-base sm:text-lg text-white">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#E5C07B] transition-transform duration-300 shrink-0 ml-4 ${openFaq === idx ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 8: VIP SITE VISIT & CONVERSION BANNER */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-800 to-black p-8 sm:p-12 md:p-16 border border-[#E5C07B]/30 shadow-2xl text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C07B]/10 border border-[#E5C07B]/30 text-[#E5C07B] text-xs font-semibold uppercase tracking-widest mb-6">
                        <CheckCircle2 size={14} />
                        <span>Direct Developer Inventory &amp; VIP Access</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight max-w-3xl mb-6">
                        Ready to Experience Kolte Patil Life Republic in Person?
                    </h2>

                    <p className="text-gray-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-light">
                        Book your exclusive private tour of the 390-acre township. Inspect sample flats in Atmos, Aros, Duet, and 24K Espada, explore the 3.5-acre Urban Park, and unlock official launch pricing.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => handleEnquire(undefined, 'VIP Site Visit Concierge')}
                            className="px-8 py-4 bg-[#E5C07B] text-black font-semibold rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2 text-sm tracking-wide shadow-xl"
                        >
                            <Calendar size={16} />
                            <span>Schedule Free Private Site Visit</span>
                        </button>
                        <a
                            href="tel:+917744009295"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/30 backdrop-blur-md transition-all duration-300 flex items-center gap-2 text-sm tracking-wide"
                        >
                            <PhoneCall size={16} className="text-[#E5C07B]" />
                            <span>Speak to Township Specialist</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
