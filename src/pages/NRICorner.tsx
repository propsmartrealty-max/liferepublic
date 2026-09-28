import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Globe, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import { NRIInvestorHub } from '../components/sections/NRIInvestorHub';
import { ROICalculator } from '../components/sections/ROICalculator';
import { BrochureEngine } from '../components/ui/BrochureEngine';

export const NRICorner: React.FC = () => {
    return (
        <div className="pt-4">
            <SEO
                title="NRI Property Investment in Pune | Kolte Patil Life Republic Hinjewadi"
                description="Ultimate guide for NRI investors looking to buy property in Hinjewadi, Pune. High rental yield, capital appreciation, and hassle-free documentation at Life Republic."
                keywords="NRI Investment Pune, Buy Property in India from USA, Expat Housing Pune, Kolte Patil NRI Services, Invest in Hinjewadi"
                canonical="/nri-corner"
            />
            
            {/* Hero */}
            <section className="relative h-[40vh] flex items-center justify-center bg-white text-[#202124] overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Placeholder for a global/map themed image */}
                <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-80"></div>
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-sans font-bold mb-4"
                    >
                        NRI Investment: Kolte Patil Life Republic
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        Secure your roots in India with Pune's most trusted township.
                    </p>
                </div>
            </section>

            {/* Why Invest */}
            <section className="py-20 bg-[#F8F9FA]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-sans font-bold text-[#202124] mb-4">Why NRIs Choose Life Republic?</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#151822] border border-white/20 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <TrendingUp className="w-12 h-12 rainbow-text-clip font-bold mb-6" />
                            <h3 className="text-xl font-bold mb-3">High Capital Appreciation</h3>
                            <p className="text-gray-600 text-sm">Hinjewadi has seen a consistent 8-10% annual appreciation due to the IT boom and Metro connectivity.</p>
                        </div>
                        <div className="bg-[#151822] border border-white/20 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Landmark className="w-12 h-12 rainbow-text-clip font-bold mb-6" />
                            <h3 className="text-xl font-bold mb-3">Rental Yield</h3>
                            <p className="text-gray-600 text-sm">With thousands of IT professionals nearby, rental demand is perennial, offering 4-5% rental fields.</p>
                        </div>
                        <div className="bg-[#151822] border border-white/20 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <ShieldCheck className="w-12 h-12 rainbow-text-clip font-bold mb-6" />
                            <h3 className="text-xl font-bold mb-3">Trusted Developer</h3>
                            <p className="text-gray-600 text-sm">Kolte Patil Developers is a listed entity (NSE/BSE) ensuring transparency and timely delivery.</p>
                        </div>
                        <div className="bg-[#151822] border border-white/20 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Globe className="w-12 h-12 rainbow-text-clip font-bold mb-6" />
                            <h3 className="text-xl font-bold mb-3">Remote Management</h3>
                            <p className="text-gray-600 text-sm">Our dedicated NRI desk helps with documentation, home loans, and property management from abroad.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NRI Specific Intelligence Hub (Phase 5) */}
            <NRIInvestorHub />

            {/* Investment Growth Calculator */}
            <ROICalculator />

            {/* Dynamic Brochure Engine */}
            <BrochureEngine />

            {/* Remote Buying Process Step-by-Step */}
            <section className="py-20 bg-white text-[#202124]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-sans font-bold mb-4">Seamless Remote Buying Process</h2>
                        <p className="text-gray-300">Own a home in India without stepping out of your country.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -z-0 -translate-y-full"></div>

                        {[
                            { step: '01', title: 'Virtual Tour', desc: 'Schedule a video call with our sales expert for a live site tour.' },
                            { step: '02', title: 'Unit Selection', desc: 'Select your preferred unit and view floor plans digitally.' },
                            { step: '03', title: 'Documentation', desc: 'Complete KYC and booking formalities via secure email/portal.' },
                            { step: '04', title: 'Payment', desc: 'Transfer booking amount via secure NRE/NRO transaction.' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 bg-white border border-gray-700 p-6 rounded-xl text-center hover:border-accent transition-colors">
                                <div className="w-10 h-10 rounded-full bg-accent text-[#202124] flex items-center justify-center font-bold mx-auto mb-4 text-sm">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-[#5F6368] text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-sans font-bold text-[#202124] mb-12 text-center">NRI FAQ</h2>
                    <div className="space-y-6">
                        <div className="border border-white/20 rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-2">Can NRIs buy property in India?</h3>
                            <p className="text-gray-600">Yes, NRIs holding a valid Indian passport or PIO/OCI card can buy both residential and commercial properties in India.</p>
                        </div>
                        <div className="border border-white/20 rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-2">Do I need a power of attorney (POA)?</h3>
                            <p className="text-gray-600">While not mandatory for purchase, a special POA allows someone to complete formalities on your behalf if you cannot be physically present.</p>
                        </div>
                        <div className="border border-white/20 rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-2">Can I get a home loan?</h3>
                            <p className="text-gray-600">Yes, most Indian banks provide home loans to NRIs for up to 80% of the property value, subject to eligibility.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
