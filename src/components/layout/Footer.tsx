import React from 'react';
import { Link } from 'react-router-dom';
import { RERA_REGISTRY } from '../../data/rera';
import { Facebook, Instagram, Twitter, Linkedin, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { pseoSlugs, pseoRegistry } from '../../data/pseo-registry';
import { seoClusters } from '../../data/seo-clusters';
import { EnquiryModal } from '../ui/EnquiryModal';

export const Footer: React.FC = () => {
    const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false);

    return (
        <>
        <footer className="relative bg-white text-[#202124] font-bold pt-24 pb-12 overflow-hidden">
            {/* Fluid Curve Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] md:h-[100px] fill-primary">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">

                    {/* Brand Column (Span 3) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="flex flex-col gap-6">
                            <div className="w-16 h-16 bg-[#151822] border border-white/20 rounded-2xl flex items-center justify-center p-2 shadow-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                <img loading="lazy" src="/images/brand/logo.webp" alt="Life Republic" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-sans font-bold tracking-wider text-[#202124] font-bold">
                                    LIFE REPUBLIC
                                </span>
                                <span className="text-xs tracking-tight font-semibold rainbow-text-clip font-bold/80 mt-1">
                                    By Kolte Patil
                                </span>
                            </div>
                        </div>
                        <p className="text-[#202124] leading-relaxed max-w-sm">
                            <strong>Kolte Patil Life Republic Township Hinjewadi</strong> is a premium 390+ acre integrated township. Offering 1, 2, 3 BHK flats and villas near Rajiv Gandhi IT Park.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Twitter, label: 'Twitter' },
                                { Icon: Linkedin, label: 'LinkedIn' }
                            ].map(({ Icon, label }, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="h-12 w-12 rounded-full border border-strong flex items-center justify-center hover:bg-accent hover:border-accent hover:text-[#202124] font-bold transition-all duration-300 group"
                                    aria-label={label}
                                >
                                    <Icon size={20} className="text-[#202124] font-bold/60 group-hover:text-[#202124] font-bold transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Link Columns (Span 2 each) */}
                    <div className="lg:col-span-2 lg:col-start-4">
                        <h4 className="text-lg font-sans font-bold mb-8 text-[#202124] font-bold">Explore</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Township Guide', path: '/township-guide' },
                                { name: 'Projects', path: '/projects' },
                                { name: 'Amenities', path: '/amenities' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'About Us', path: '/about' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-[#202124] hover:rainbow-text-clip font-bold flex items-center gap-2 group transition-all duration-300"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-sans font-bold mb-8 text-[#202124] font-bold">Project Clusters</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Atmos (2 & 3 BHK)', path: '/projects/kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi' },
                                { name: 'Aros (Premium 2 & 3 BHK)', path: '/projects/kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi' },
                                { name: 'Canvas (Ultra Luxury)', path: '/projects/kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi' },
                                { name: 'Universe (Smart Homes)', path: '/projects/kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi' },
                                { name: '24K Espada (Row Houses)', path: '/projects/kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-[#202124] hover:text-[#202124] font-bold group flex items-center gap-2 transition-all duration-300"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 rainbow-text-clip font-bold" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-sans font-bold mb-8 text-[#202124] font-bold">Location Index</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Near Hinjewadi Phase 1', path: '/location/flats-near-hinjewadi' },
                                { name: 'Near Marunji Road', path: '/location/flats-near-marunji' },
                                { name: 'Near Tathawade IT Hub', path: '/location/flats-near-tathawade' },
                                { name: 'Near Punawale Sector', path: '/location/flats-near-punawale' },
                                { name: 'Near Wakad Corridor', path: '/location/flats-near-wakad' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-[#202124] hover:text-[#202124] font-bold group flex items-center gap-2 transition-all duration-300"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 rainbow-text-clip font-bold" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column (Span 3) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-lg font-sans font-bold mb-8 text-[#202124] font-bold">Visit Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-2xl bg-transparent border-2 border-strong group-hover:bg-accent/20 transition-colors">
                                    <MapPin size={20} className="rainbow-text-clip font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[#202124] font-medium">Site Address</p>
                                    <p className="text-sm text-text-muted hover:text-[#202124]">Marunji, Hinjewadi, Pune, Maharashtra 411057</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-2xl bg-transparent border-2 border-strong group-hover:bg-accent/20 transition-colors">
                                    <Phone size={20} className="rainbow-text-clip font-bold" />
                                </div>
                                <div>
                                    <p className="text-[#202124] font-medium">Get in touch</p>
                                    <button 
                                        onClick={() => setIsEnquiryOpen(true)}
                                        className="text-sm text-text-muted hover:text-[#202124] hover:text-[#202124] font-bold transition-colors cursor-pointer"
                                    >
                                        Request Callback
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Township FAQs */}
                <div className="border-t border-strong py-12 mt-12">
                    <h5 className="text-xl font-bold text-[#202124] tracking-tight mb-8">Frequently Asked Questions: Kolte Patil Life Republic Pune</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-6">
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">What is Kolte Patil Life Republic?</h6>
                                <p className="text-text-muted">Life Republic by Kolte-Patil is a ~390-acre integrated township in Hinjewadi, Pune. It features premium residential clusters (like Canvas, Qrious, Duet, and Echoes), high-street retail, schools, and 50+ world-class amenities designed for a holistic community lifestyle.</p>
                            </div>
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">Where is Life Republic located?</h6>
                                <p className="text-text-muted">The township is strategically located at <a href="https://www.google.com/maps/dir//Life+Republic+Sales+Office+Or+Main+Office,+Survey+No.+74+Hinjawadi+-+Marunji,+Hinjawadi+-+Kasarsai+Rd,+Taluka,+Mulshi,+Maharashtra+411033/@18.6459725,73.7360171,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2ba5053b55b4b:0x14d3205e23f3f5f7!2m2!1d73.7093735!2d18.6182576?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-accent transition-colors">Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi, Pune 411057</a>, just ~4.5 km from the Hinjewadi IT Park Phase 1, offering excellent connectivity to Mumbai-Bengaluru Highway.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">What are the configurations and price range?</h6>
                                <p className="text-text-muted">Life Republic offers smart 2 & 3 BHKs (Qrious, Echoes) starting from ₹75 Lakhs, to Ultra-Luxury 3 & 4 BHKs (Canvas) starting at ₹1.45 Cr, catering to IT professionals and luxury home buyers.</p>
                            </div>
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">Are the projects MahaRERA registered?</h6>
                                <p className="text-text-muted">Yes, all active clusters within the Life Republic township are fully registered under MahaRERA. Specific numbers (e.g., P52100077008 for Canvas) are listed below for verification.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RERA Numbers Section */}
                <div className="border-t border-strong py-8">
                    <h5 className="text-sm font-bold text-[#202124] tracking-tight font-medium mb-4">RERA Registration Numbers</h5>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-text-muted hover:text-[#202124]">
                        {RERA_REGISTRY.map((item: { title: string, rera: string }, index: number) => (
                            <span key={index} className="flex items-center gap-1">
                                <span className="text-[#202124]">{item.title}:</span>
                                <span className="font-mono rainbow-text-clip font-bold/80">{item.rera}</span>
                            </span>
                        ))}
                    </div>
                    <p className="text-[10px] text-text-muted mt-4 italic">
                        The projects have been registered via MahaRERA registration numbers and are available on the website <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noreferrer" className="text-text-muted hover:text-[#202124] hover:rainbow-text-clip font-bold underline">https://maharera.maharashtra.gov.in</a> under registered projects.
                    </p>
                </div>

                <div className="pt-8 border-t border-strong flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-text-muted">
                    <p>© 2025 Life Republic. Designed with precision.</p>
                    <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
                        <Link to="/privacy-policy" className="hover:rainbow-text-clip font-bold transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:rainbow-text-clip font-bold transition-colors">Terms of Service</Link>
                        <Link to="/disclaimer" className="hover:rainbow-text-clip font-bold transition-colors">Disclaimer</Link>
                        <Link to="/locations-directory" className="hover:rainbow-text-clip font-bold transition-colors">Locations Directory</Link>
                        <Link to="/sitemap" className="hover:rainbow-text-clip font-bold transition-colors">HTML Sitemap</Link>
                        <a href="/sitemap.xml" className="hover:rainbow-text-clip font-bold transition-colors">XML Sitemap</a>
                    </div>
                </div>
                
                
                {/* Massive SEO Silo - Compacted */}
                <div className="border-t border-strong pt-6 pb-2 mt-8 text-[10px] text-text-muted">
                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="font-bold text-[#202124] mr-2 uppercase tracking-widest">Configurations:</span>
                            <div className="inline-flex flex-wrap gap-x-3 gap-y-1">
                                {seoClusters.configurations.map((item, idx) => (
                                    <span key={item.slug} className="flex items-center gap-3">
                                        <Link to={`/insights/${item.slug}`} className="hover:text-[#202124] hover:rainbow-text-clip font-bold transition-colors">{item.name}</Link>
                                        {idx !== seoClusters.configurations.length - 1 && <span className="text-strong">|</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-[#202124] mr-2 uppercase tracking-widest">Locations:</span>
                            <div className="inline-flex flex-wrap gap-x-3 gap-y-1">
                                {seoClusters.locations.map((item, idx) => (
                                    <span key={item.slug} className="flex items-center gap-3">
                                        <Link to={`/insights/${item.slug}`} className="hover:text-[#202124] hover:rainbow-text-clip font-bold transition-colors">{item.name}</Link>
                                        <span className="text-strong">|</span>
                                    </span>
                                ))}
                                {pseoSlugs.slice(0, 15).map((slug, idx) => (
                                    <span key={slug} className="flex items-center gap-3">
                                        <Link to={`/location/${slug}`} className="hover:text-[#202124] hover:rainbow-text-clip font-bold transition-colors">{pseoRegistry[slug].title.split('|')[0].trim()}</Link>
                                        {idx !== 14 && <span className="text-strong">|</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-[#202124] mr-2 uppercase tracking-widest">Themes:</span>
                            <div className="inline-flex flex-wrap gap-x-3 gap-y-1">
                                {seoClusters.themes.map((item, idx) => (
                                    <span key={item.slug} className="flex items-center gap-3">
                                        <Link to={`/insights/${item.slug}`} className="hover:text-[#202124] hover:rainbow-text-clip font-bold transition-colors">{item.name}</Link>
                                        {idx !== seoClusters.themes.length - 1 && <span className="text-strong">|</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-strong text-[9px] text-text-muted text-center leading-relaxed">
                    Disclaimer: This website is for informational purposes only and does not constitute an offer or solicitation. The visual representations, including images and 3D walkthroughs, are artistic impressions and may differ from the actual project. Pricing and specifications are subject to change without notice. By submitting your contact details, you authorize our partners to contact you via phone, SMS, or email, overriding any NDNC registration.
                </div>
            </div>
            
        </footer>
        <EnquiryModal 
            isOpen={isEnquiryOpen} 
            onClose={() => setIsEnquiryOpen(false)} 
            projectName="Request Callback"
        />
        </>
    );
};
