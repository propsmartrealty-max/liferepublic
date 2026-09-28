import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, School, Building2, Train, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';
import { TownshipMap } from '../components/sections/TownshipMap';
import { LocalInfrastructure } from '../components/sections/LocalInfrastructure';
import { SovereignFinancials } from '../components/sections/SovereignFinancials';

export const TownshipGuide: React.FC = () => {
    const [latestPosts, setLatestPosts] = React.useState<BlogPost[]>([]);

    React.useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3);
                
                if (error) throw error;
                if (data) setLatestPosts(data);
            } catch (err) {
                console.error('Error fetching latest posts:', err);
            }
        };
        fetchLatestPosts();
    }, []);

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "The Ultimate Guide to Kolte Patil Life Republic Hinjewadi: A 390-Acre Masterpiece",
        "description": "Explore the complete breakdown of Kolte Patil Life Republic township in Hinjewadi, Pune. Detailed analysis of Atmos, Aros, Canvas, Universe, and Echoes clusters.",
        "image": "https://life-republic.in/images/gallery/eros/master-layout.webp",
        "author": {
            "@type": "Organization",
            "name": "Kolte Patil Developers"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Life Republic",
            "logo": {
                "@type": "ImageObject",
                "url": "https://life-republic.in/logo.png"
            }
        },
        "datePublished": "2024-03-28",
        "dateModified": "2024-03-28",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://life-republic.in/township-guide"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is Kolte Patil Life Republic Hinjewadi a good investment?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Life Republic is one of the most stable investments in Hinjewadi due to its integrated 390-acre infrastructure, RERA-compliant clusters, and proximity to the Hinjewadi Metro Line 3 and IT Phase 1."
                }
            },
            {
                "@type": "Question",
                "name": "How far is Life Republic from Hinjewadi IT Park Phase 1?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The township is strategically located within 4-5 km of major IT hubs in Phase 1, offering a 10-15 minute commute via the main internal spine road."
                }
            }
        ]
    };

    const clusters = [
        { name: "Atmos", sector: "R22", segment: "Premium Apartments", slug: "sector-r22-life-republic", desc: "Modern 2 & 3 BHK residences designed for maximum ventilation and wellness." },
        { name: "Aros", sector: "R13", segment: "Community Homes", slug: "sector-r13-life-republic", desc: "Direct access to the 4km fitness loop and vibrant social spaces." },
        { name: "Universe", sector: "R10", segment: "Smart Homes", slug: "sector-r10-life-republic", desc: "Planet-themed living with phased excellence and futuristic infrastructure." },
        { name: "Canvas", sector: "R3", segment: "Luxury Residences", slug: "sector-r3-life-republic", desc: "Elite 3 & 4 BHK apartments with panoramic township views and infinity amenities." },
        { name: "Echoes", sector: "R17/18", segment: "Architectural Marvel", slug: "sector-r17a-life-republic", desc: "The newest launch designed by Hafeez Contractor near the 3.5-acre Urban Park." },
        { name: "24K Espada", sector: "R9", segment: "Ultra-Luxury Villas", slug: "sector-r31-life-republic", desc: "Rare 4 & 5 Bed row houses for the crème de la crème of Hinjewadi." }
    ];

    return (
        <div className="pt-4 bg-transparent">
            <SEO 
                title="Life Republic Hinjewadi Guide: Portfolio, Clusters & ROI Analysis"
                description="Comprehensive guide to Kolte Patil Life Republic. Explore Atmos, Aros, Universe, and Echoes. Analysis of ROI, schools, and Hinjewadi's 390-acre master township."
                keywords="Life Republic Guide, Hinjewadi Township Analysis, Atmos Life Republic, Aros Hinjewadi price, Universe R10 details, Canvas projects Pune"
                canonical="/township-guide"
                schema={[blogSchema, faqSchema]}
            />
            
            {/* Hero Section */}
            <section className="relative py-12 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-5"></div>
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="rainbow-text-clip font-bold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Pillar Content 2026</span>
                        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
                            The Sovereign Guide to <br />
                            <span className="rainbow-text-clip font-bold underline decoration-accent/30 italic">Life Republic</span>
                        </h1>
                        <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-10 font-light italic">
                            "A community built for thinking minds, where 390 acres meet infinite potential."
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button variant="primary" size="lg" className="rounded-full px-12" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                                Read Full Analysis
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full border-white text-white">Download Master Blueprint</Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pillar Content Body */}
            <article className="py-12 max-w-5xl mx-auto px-4">
                <div className="prose prose-lg prose-headings:font-sans prose-headings:text-white max-w-none text-gray-300 leading-relaxed">
                    <p className="lead text-2xl text-[#5F6368] font-light mb-12 border-l-4 border-accent pl-8">
                        Kolte Patil Life Republic is not just a real estate project; it is a meticulously engineered ecosystem designed to support the next generation of global citizens. Situated in the technology heartland of Hinjewadi, Pune, this 390-acre township integrates residential, commercial, and educational infrastructure into a single, cohesive sovereign domain.
                    </p>

                    <h2 id="infrastructure" className="text-4xl font-bold mb-8">1. Infrastructure Intelligence</h2>
                    <p className="mb-8">
                        The foundation of Life Republic rests on its world-class smart infrastructure. Unlike standalone developments in Hinjewadi, the township provides a managed environment where every utility is professionally maintained.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { icon: <Zap />, title: "Smart Spine", desc: "150ft wide internal spine roads for zero-congestion travel." },
                            { icon: <School />, title: "Global School", desc: "Anisha Global School within the township for world-class education." },
                            { icon: <Shield />, title: "Tier-1 Security", desc: "24/7 centralized surveillance and professional security force." }
                        ].map((item, i) => (
                            <div key={i} className="bg-black p-6 rounded-2xl border border-white/10 hover:shadow-md transition-shadow">
                                <div className="rainbow-text-clip font-bold mb-4">{item.icon}</div>
                                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-sm text-[#5F6368]">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <TownshipMap />

                    <h2 id="clusters" className="text-4xl font-bold mb-8 mt-16">2. The Residential Portfolio: A Cluster Analysis</h2>
                    <p className="mb-12">
                        Life Republic caters to a diverse spectrum of homeowners—from the upwardly mobile IT professional to the discerning HNI seeking a villa retreat. Each residential cluster is themed and optimized for specific lifestyle outcomes.
                    </p>

                    <div className="space-y-16">
                        {clusters.map((cluster, i) => (
                            <div key={i} className="group relative bg-[#0A0A0A] border border-white/10 border border-white/10 rounded-3xl p-8 hover:border-accent/30 transition-all overflow-hidden flex flex-col md:flex-row gap-8 items-center">
                                <div className="md:w-1/3">
                                    <div className="aspect-[4/3] bg-[#0A0A0A] rounded-2xl overflow-hidden">
                                        <img loading="lazy" 
                                            src={`/images/home/${cluster.name.toLowerCase().replace(/\s/g, '-')}-thumb.jpg`} 
                                            alt={cluster.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.currentTarget.src = 'https://life-republic.in/images/gallery/eros/master-layout.webp' }}
                                        />
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <div className="flex items-center gap-2 rainbow-text-clip font-bold mb-2">
                                        <Building2 size={16} />
                                        <span className="text-xs font-bold tracking-tight font-medium">{cluster.segment}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{cluster.name} — <span className="text-[#5F6368] font-light">{cluster.sector}</span></h3>
                                    <p className="text-white/60 mb-6 text-lg">{cluster.desc}</p>
                                    <Link to={`/location/${cluster.slug}`}>
                                        <Button variant="ghost" className="p-0 rainbow-text-clip font-bold hover:bg-transparent group/btn">
                                            Explore Portfolio <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Building2 size={120} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sovereign Comparison Ledger */}
                    <div className="mt-24 overflow-x-auto">
                        <div className="min-w-[800px]">
                            <h2 id="comparison" className="text-4xl font-sans font-bold mb-10 text-white text-center">The Sovereign Comparison Ledger</h2>
                            <table className="w-full border-collapse rounded-[24px] overflow-hidden shadow-2xl border border-white/10 mb-8">
                                <thead>
                                    <tr className="bg-black text-white">
                                        <th className="p-8 text-left font-sans tracking-tight font-semibold text-xs font-bold border-b border-white/10">Sector Cluster</th>
                                        <th className="p-8 text-left font-sans tracking-tight font-semibold text-xs font-bold border-b border-white/10">Typology</th>
                                        <th className="p-8 text-left font-sans tracking-tight font-semibold text-xs font-bold border-b border-white/10">Price Point</th>
                                        <th className="p-8 text-left font-sans tracking-tight font-semibold text-xs font-bold border-b border-white/10">Possession</th>
                                        <th className="p-8 text-left font-sans tracking-tight font-semibold text-xs font-bold border-b border-white/10">Core USP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: "Atmos", type: "2 & 3 BHK", price: "₹75L*", status: "Oct 2027", usp: "Aero-Wellness Design" },
                                        { name: "Aros", type: "2 & 3 BHK", price: "₹82L*", status: "Dec 2026", usp: "Fitness Loop Access" },
                                        { name: "Universe", type: "1 & 2 BHK", price: "₹65L*", status: "Phased", usp: "Planet Theme Living" },
                                        { name: "Canvas", type: "3, 3.5 & 4 BHK", price: "₹1.49Cr*", status: "Dec 2028", usp: "Infinity Amenities & 40-Storey Towers" },
                                        { name: "24K Espada", type: "Row Houses", price: "₹3.5Cr*", status: "Ready/Ongoing", usp: "Ultra-Luxury Villas" }
                                    ].map((row, i) => (
                                        <tr key={i} className={`border-b border-gray-50 transition-all duration-300 ${i % 2 === 0 ? 'bg-black' : 'bg-black/50'} hover:bg-accent/10 group`}>
                                            <td className="p-8">
                                                <span className="font-bold text-white group-hover:rainbow-text-clip font-bold transition-colors">{row.name}</span>
                                            </td>
                                            <td className="p-8 text-white/60 text-sm font-medium">{row.type}</td>
                                            <td className="p-8">
                                                <span className="font-mono rainbow-text-clip font-bold font-bold bg-accent/5 px-3 py-1 rounded-md">{row.price}</span>
                                            </td>
                                            <td className="p-8 text-[#5F6368] text-sm">{row.status}</td>
                                            <td className="p-8">
                                                <span className="font-medium text-white text-sm italic opacity-80 group-hover:opacity-100">"{row.usp}"</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* MahaRERA Sovereign Trust Ledger */}
                    <div className="mt-16 bg-black rounded-[24px] p-4 md:p-12 border border-white/10 shadow-inner">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                            <div className="max-w-md">
                                <h3 className="text-2xl font-sans font-bold text-white mb-2">The Trust Ledger</h3>
                                <p className="text-sm text-[#5F6368]">MahaRERA registration certificates for all active and proposed clusters within the 390-acre domain.</p>
                            </div>
                            <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/10 px-6 py-3 rounded-2xl shadow-sm border border-white/10">
                                <Shield className="rainbow-text-clip font-bold" size={20} />
                                <span className="text-xs font-bold text-white tracking-tight font-medium">100% RERA Compliant</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Atmos (R22)", rera: "P52100051307" },
                                { name: "Aros (R13)", rera: "P52100046648" },
                                { name: "Universe (R10)", rera: "P52100028886" },
                                { name: "Canvas (R3)", rera: "P52100077008" },
                                { name: "Echoes (R17)", rera: "P52100051307" },
                                { name: "24K Espada (R9)", rera: "P52100028246" },
                                { name: "Sound of Soul", rera: "P52100032047" },
                                { name: "ORO Avenue", rera: "P52100017116" }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl border border-white/10 hover:border-accent/30 transition-all text-center group">
                                    <p className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">{item.name}</p>
                                    <p className="text-xs font-mono font-bold text-white group-hover:rainbow-text-clip font-bold transition-colors">{item.rera}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-[#5F6368] mt-8 text-center tracking-tight font-medium italic">
                            Verification available at maharera.mahaonline.gov.in under registered projects.
                        </p>
                    </div>

                    <SovereignFinancials />

                    <h2 id="roi" className="text-4xl font-bold mb-8 mt-16 text-white font-sans leading-tight underline decoration-accent/30 underline-offset-8">3. Strategic ROI & Connectivity</h2>
                    <p className="mb-8">
                        Homebuyers in <strong>Pune</strong> are increasingly looking at Marunji and Hinjewadi through a lens of capital appreciation. Life Republic’s strategic positioning offers a dual advantage of proximity to massive employment hubs and internal lifestyle appreciation.
                    </p>
                    <div className="bg-black p-12 rounded-[2rem] text-white shadow-2xl relative overflow-hidden mb-8">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <h4 className="text-2xl font-bold mb-6 rainbow-text-clip font-bold">Connectivity Metrics 2026:</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="p-2 bg-[#0A0A0A] border border-white/10/10 rounded-lg rainbow-text-clip font-bold"><Train size={20} /></div>
                                <div>
                                    <h5 className="font-bold">Hinjewadi Metro Line 3</h5>
                                    <p className="text-white/60 text-sm">Targeting direct connectivity from the township gate to PMRDA Metro hubs for rapid transit.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-2 bg-[#0A0A0A] border border-white/10/10 rounded-lg rainbow-text-clip font-bold"><Zap size={20} /></div>
                                <div>
                                    <h5 className="font-bold">Hinjewadi Phase 1, 2, & 3</h5>
                                    <p className="text-white/60 text-sm">Under 10 minutes from Global IT majors like Infosys, Wipro, and TCS.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <LocalInfrastructure />

                    {/* Operational Sovereignty proof-grid */}
                    <div className="mt-24 mb-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-sans font-bold text-white mb-4">Operational Sovereignty</h3>
                            <p className="text-[#5F6368] max-w-2xl mx-auto">Life Republic is a mature ecosystem with fully functional critical infrastructure serving 5,000+ resident families.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Anisha Global School", status: "Fully Operational", img: "/images/aerial-sunset.png" },
                                { title: "150ft Spine Road", status: "Zero Congestion", img: "https://life-republic.in/images/gallery/eros/master-layout.webp" },
                                { title: "Township Fire Station", status: "24/7 Response", img: "/images/home/canvas-thumb.jpg" }
                            ].map((item, i) => (
                                <div key={i} className="relative group rounded-3xl overflow-hidden shadow-lg h-64">
                                    <img loading="lazy" src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.currentTarget.src = 'https://life-republic.in/images/gallery/eros/master-layout.webp' }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6">
                                        <p className="text-xs font-bold rainbow-text-clip font-bold tracking-tight font-medium mb-1">{item.status}</p>
                                        <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 id="conclusion" className="text-4xl font-bold mb-8">4. Why Choose Life Republic?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {[
                            "400+ Acres Managed Township",
                            "RERA Registered Components",
                            "Professional Governance & Security",
                            "Operational Schools & Fire Station",
                            "150ft Wide Internal Spine Road",
                            "High Rental Yield Potential"
                        ].map((point, i) => (
                            <div key={i} className="flex items-center gap-4 text-xl text-white">
                                <CheckCircle2 className="rainbow-text-clip font-bold flex-shrink-0" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>

                    {/* Sovereign Intelligence FAQ (VSO) */}
                    <div className="mt-24 pt-4 border-t border-white/10">
                        <h2 id="faq" className="text-4xl font-sans font-bold text-white mb-12 text-center">Township Intelligence FAQ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[
                                { 
                                    q: "Is Kolte Patil Life Republic Hinjewadi a good investment?", 
                                    a: "Yes, Life Republic is one of the most stable investments in Hinjewadi due to its integrated 390-acre infrastructure, RERA-compliant clusters, and proximity to the Hinjewadi Metro Line 3 and IT Phase 1." 
                                },
                                { 
                                    q: "How many residential clusters are in Life Republic?", 
                                    a: "Life Republic features over 10+ residential clusters including Atmos (Premium), Aros (Community), Universe (Smart), Canvas (Luxury), and 24K Espada (Villas)." 
                                },
                                { 
                                    q: "What is the distance to Hinjewadi IT Park Phase 1?", 
                                    a: "The township is strategically located within 4-5 km of major IT hubs in Phase 1, offering a 10-15 minute commute via the main internal spine road." 
                                },
                                { 
                                    q: "Are there schools within the Life Republic township?", 
                                    a: "Yes, the world-class Anisha Global School is operational within the township gates, along with proposed multi-specialty healthcare and high-street retail zones." 
                                }
                            ].map((faq, i) => (
                                <div key={i} className="group">
                                    <h4 className="text-lg font-bold text-white mb-3 group-hover:rainbow-text-clip font-bold transition-colors flex gap-3">
                                        <span className="rainbow-text-clip font-bold">Q:</span> {faq.q}
                                    </h4>
                                    <p className="text-white/60 text-sm leading-relaxed pl-7 border-l-2 border-white/10 group-hover:border-accent/30 transition-all">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="italic text-[#5F6368] text-sm border-t border-white/10 pt-8 mt-12">
                        *This guide is for informational purposes for the Kolte Patil Life Republic digital ecosystem. Pricing and availability of individual clusters vary by possession timelines and market demand.
                    </p>
                </div>
            </article>
            
            {/* Silo Mesh: Latest from Media Center */}
            <section className="py-12 bg-black border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <span className="rainbow-text-clip font-bold font-bold tracking-widest uppercase text-xs mb-2 block">Insights & Intelligence</span>
                            <h2 className="text-4xl font-sans font-bold text-white">Latest Township Updates</h2>
                        </div>
                        <Link to="/media-center">
                            <Button variant="outline" className="rounded-full border-secondary text-white hover:bg-black hover:text-white transition-all">
                                View Media Center <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestPosts.length > 0 ? (
                            latestPosts.map((post) => (
                                <Link 
                                    key={post.id} 
                                    to={`/media-center/${post.slug}`}
                                    className="group bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden border border-white/10 hover:shadow-xl transition-all flex flex-col h-full"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img loading="lazy" 
                                            src={post.image || 'https://life-republic.in/images/gallery/eros/master-layout.webp'} 
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#0A0A0A] border border-white/10/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold rainbow-text-clip font-bold tracking-tight font-medium">
                                                {post.tags?.[0] || 'Updates'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:rainbow-text-clip font-bold transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#5F6368] text-sm line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt || post.meta_description}
                                        </p>
                                        <div className="flex items-center rainbow-text-clip font-bold text-xs font-bold tracking-tight font-medium">
                                            Read Analysis <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-3xl h-80 animate-pulse border border-white/10">
                                    <div className="h-40 bg-[#0A0A0A] rounded-t-3xl"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-[#0A0A0A] w-3/4 rounded-lg"></div>
                                        <div className="h-4 bg-[#0A0A0A] w-1/2 rounded-lg"></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="bg-black py-12">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8">Receive the Sovereign Technical Ledger</h2>
                    <p className="text-white/60 text-lg mb-10">
                        Get the full technical breakdown, possession timelines, and current inventory for all sectors.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button variant="primary" size="lg" className="rounded-full px-12" onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}>
                            Download Comprehensive Guide (PDF)
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
