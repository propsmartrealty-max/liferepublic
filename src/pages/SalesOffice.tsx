import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, ShieldCheck, Car, Calendar, ArrowRight, Building2, PhoneCall, Sparkles } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { EnquiryModal } from '../components/ui/EnquiryModal';

export const SalesOffice: React.FC = () => {
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    const salesOfficeSchemas = [
        {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Kolte Patil Life Republic Sales Office & Main Office Mulshi",
            "alternateName": [
                "Life Republic Sales Office",
                "Life Republic Sales Office or Main Office Mulshi",
                "Life Republic Kolte Patil Sales Office",
                "Kolte Patil Life Republic Experience Centre",
                "Life Republic Customer Experience Centre Hinjewadi"
            ],
            "image": "https://life-republic.in/images/brand/logo.webp",
            "url": "https://life-republic.in/life-republic-sales-office-hinjewadi",
            "telephone": "+91-7744009295",
            "priceRange": "₹58L - ₹3.5Cr",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Survey No. 74, Marunji, Hinjawadi-Kasarsai Road, Taluka Mulshi",
                "addressLocality": "Hinjewadi, Pune",
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
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "19:00"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "2150",
                "reviewCount": "2150"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the exact address of Life Republic Sales Office or Main Office Mulshi?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The official Kolte Patil Life Republic Sales Office and Main Township Experience Centre is located at Survey No. 74, Marunji, Hinjawadi-Kasarsai Road, Taluka Mulshi, Pune 411057, Maharashtra. It is approximately 4.5 km from Hinjewadi Phase 1 IT Park."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are the visiting hours for Kolte Patil Life Republic Sales Office?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Life Republic Sales Office is open all 7 days a week from 9:00 AM to 7:00 PM, including Saturdays, Sundays, and public holidays. Dedicated visitor parking, golf cart tours, and refreshments are available."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How can I book a site visit with free cab pickup?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can schedule a complimentary VIP cab pickup from anywhere in Pune or PCMC directly through this portal. Our certified property advisor under MahaRERA Reg No: A0321262401295 will coordinate your private township walkthrough and sample flat tour."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which residential sample flats are available for viewing at the Sales Office?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Visitors can experience live scale models and furnished sample flats for Atmos (2 & 3 BHK), Aros (2 & 3 BHK), Canvas (Luxury 3 & 4 BHK), Echoes (2 & 2.5 BHK), Duet, and 24K Espada Ultra-Luxury Row Houses."
                    }
                }
            ]
        }
    ];

    const drivingRoutes = [
        {
            from: "From Hinjewadi Phase 1 (Wipro / Infosys Circle)",
            distance: "4.5 km",
            time: "10-12 Mins",
            route: "Drive via Hinjewadi-Marunji Link Road directly to Survey No. 74 township entry gate."
        },
        {
            from: "From Wakad & Bhumkar Chowk",
            distance: "7.2 km",
            time: "15-18 Mins",
            route: "Take Shivaji Chowk Hinjewadi road or Marunji flyover corridor with direct four-lane access."
        },
        {
            from: "From Mumbai-Pune Expressway (Gahunje Exit)",
            distance: "8.5 km",
            time: "12-15 Mins",
            route: "Exit at MCA Cricket Stadium Gahunje and take the expressway bypass corridor to Life Republic."
        },
        {
            from: "From Baner & Balewadi High Street",
            distance: "12 km",
            time: "20-22 Mins",
            route: "Follow NH-48 towards Hinjewadi bridge, then proceed along the PMRDA Marunji township corridor."
        }
    ];

    return (
        <div className="w-full bg-[#0a0a0a] text-white selection:bg-[#E5C07B] selection:text-black">
            <SEO
                title="Life Republic Sales Office or Main Office Mulshi | Kolte Patil Experience Centre"
                description="Official Kolte Patil Life Republic Sales Office & Experience Centre, Survey No. 74, Marunji, Mulshi Pune 411057. Timings: 9 AM–7 PM Daily. Book VIP Site Visit & Cab!"
                keywords="life republic sales office, life republic sales office or main office mulshi, life republic kolte patil sales office, kolte patil life republic sales office, life republic experience centre, life republic sales office hinjewadi, life republic contact number, life republic site visit"
                canonical="/life-republic-sales-office-hinjewadi"
                schema={salesOfficeSchemas}
            />

            {/* HERO SECTION */}
            <header className="relative pt-32 pb-20 px-4 md:px-8 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#151822] via-[#0a0a0a] to-[#0a0a0a]">
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6"
                    >
                        <Sparkles size={14} />
                        Official Township Experience Centre & Sales Desk
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                        Kolte Patil Life Republic <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C07B] via-amber-200 to-amber-400">
                            Sales Office & Main Office Mulshi
                        </span>
                    </h1>

                    <p className="text-gray-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                        Visit the grand 390-acre township experience centre at Survey No. 74, Marunji Road, Hinjewadi. 
                        Explore full-scale architectural models, live sample flats, and verified MahaRERA documentation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsEnquiryOpen(true)}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base transition-all shadow-xl hover:shadow-amber-500/25 flex items-center justify-center gap-2"
                        >
                            <Car size={18} />
                            <span>Book Free VIP Cab & Site Visit</span>
                        </button>
                        <a
                            href="https://maps.google.com/?cid=1236873151214041762"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
                        >
                            <Navigation size={18} className="text-amber-400" />
                            <span>Open in Google Maps</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* KEY HIGHLIGHTS STATS BAR */}
            <section className="border-b border-white/10 bg-[#10121a] py-6 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-2xl font-bold text-amber-400">9:00 AM – 7:00 PM</p>
                        <p className="text-xs text-gray-400 mt-1">Open 7 Days a Week</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">Survey No. 74</p>
                        <p className="text-xs text-gray-400 mt-1">Marunji, Mulshi, Hinjewadi</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-amber-400">A0321262401295</p>
                        <p className="text-xs text-gray-400 mt-1">Authorized MahaRERA Reg No</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">₹58L – ₹3.40 Cr*</p>
                        <p className="text-xs text-gray-400 mt-1">2, 3, 4 BHK & Luxury Villas</p>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT: ADDRESS & VISITOR DETAILS */}
            <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Coordinates & Amenities */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Township Experience Centre & Customer Desk
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                The Kolte Patil Life Republic Sales Office or Main Office Mulshi serves as the centralized 
                                hospitality hub for the entire 390-acre township. Whether you are inspecting the new launch 
                                high-rise towers in <strong>Echoes</strong> and <strong>Canvas</strong>, looking for ready-to-move 
                                luxury in <strong>Aros</strong> and <strong>Atmos</strong>, or surveying the 
                                <strong>24K Espada</strong> row houses, our dedicated sales desk provides transparent unit allotments, 
                                live inventory availability, and customized bank home loan assistance.
                            </p>
                        </div>

                        {/* Visiting Amenities */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Dedicated Visitor Parking", desc: "Spacious multi-car parking with EV fast-chargers." },
                                { title: "Guided Golf Cart Tours", desc: "Private buggy tours across all 16 residential sectors." },
                                { title: "Furnished Sample Flats", desc: "Walk through actual 2, 2.5, 3 & 4 BHK layouts." },
                                { title: "Kids Play Area & Café", desc: "Family-friendly visitor lounges with hospitality refreshments." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Address Card */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 mt-1">
                                    <MapPin size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-white text-lg">Sales Office Exact Location</h3>
                                    <p className="text-gray-300 text-sm">
                                        Life Republic Sales Office or Main Office, Survey No. 74 Hinjawadi - Marunji, 
                                        Hinjawadi - Kasarsai Rd, Taluka Mulshi, Pune, Maharashtra 411057.
                                    </p>
                                    <p className="text-xs text-amber-400/90 font-mono mt-2">
                                        GPS Coordinates: 18.6186° N, 73.7147° E
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Site Visit Request Card */}
                    <div className="lg:col-span-5">
                        <div className="p-8 rounded-2xl bg-[#141620] border border-white/15 shadow-2xl sticky top-28 space-y-6">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                                    Priority Booking
                                </span>
                                <h3 className="text-xl font-bold text-white">
                                    Schedule Your VIP Experience
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Avail complimentary AC cab pickup and personalized township presentation.
                                </p>
                            </div>

                            <div className="space-y-3 text-xs text-gray-300">
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-amber-400 shrink-0" />
                                    <span>Timings: 9:00 AM – 7:00 PM (Daily)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                                    <span>RERA Agent Reg No: A0321262401295</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Car size={16} className="text-amber-400 shrink-0" />
                                    <span>Free Cab Pickup & Drop across Pune / PCMC</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEnquiryOpen(true)}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Request VIP Site Visit Slot</span>
                                <ArrowRight size={16} />
                            </button>

                            <p className="text-[10px] text-gray-500 text-center">
                                *Zero commission direct channel partner sales desk. By submitting, you consent to visit coordination.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* DRIVING DIRECTIONS & CORRIDORS */}
            <section className="py-16 px-4 md:px-8 border-t border-white/10 bg-[#0d0f16]">
                <div className="max-w-6xl mx-auto space-y-10">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                            Commute & Connectivity
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white">
                            Driving Directions to Life Republic Sales Office
                        </h2>
                        <p className="text-xs md:text-sm text-gray-400">
                            Clear turn-by-turn routes from major IT hubs, expressways, and residential nodes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {drivingRoutes.map((route, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-white text-base">{route.from}</h3>
                                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono">
                                        {route.time}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">{route.route}</p>
                                <p className="text-xs text-gray-500 font-semibold">Distance: {route.distance}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Sales Office Frequently Asked Questions
                    </h2>
                    <p className="text-xs text-gray-400">
                        Official answers regarding visiting, appointments, and township tours.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: "What is the exact location of Life Republic Sales Office or Main Office Mulshi?",
                            a: "The sales office is situated at Survey No. 74, Marunji Road, Taluka Mulshi, Hinjewadi, Pune 411057. It is directly accessible via the four-lane Hinjewadi-Marunji corridor."
                        },
                        {
                            q: "Are the sample flats open on Sundays and bank holidays?",
                            a: "Yes. The Life Republic Sales Office and Experience Centre operates from 9:00 AM to 7:00 PM every day including Sundays and national holidays."
                        },
                        {
                            q: "Can I get on-spot price quotes and cost sheets at the office?",
                            a: "Yes. Our team provides transparent unit-level cost sheets including base price, stamp duty (7%), registration, GST (5%), and possession timeline details."
                        },
                        {
                            q: "Is there any charge for the VIP site visit cab service?",
                            a: "No, the VIP cab service is 100% complimentary for prospective home buyers visiting Kolte Patil Life Republic."
                        }
                    ].map((faq, idx) => (
                        <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
                            <h3 className="font-bold text-white text-sm md:text-base">{faq.q}</h3>
                            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                projectName="Life Republic Sales Office VIP Visit"
            />
        </div>
    );
};
export default SalesOffice;
