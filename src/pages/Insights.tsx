import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import { INSIGHTS_DATA } from '../data/market-reports';
import { SEO } from '../components/seo/SEO';

const Insights = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-24 pb-20">
            <SEO 
                title="Pune Real Estate Insights & Market Trends | PropSmart Realty"
                description="Expert analysis on the Pune real estate market, Hinjewadi property trends, Metro Line 3 impact, and ROI metrics for Kolte Patil Life Republic."
                canonical="/market-reports"
            />
            
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-widest text-white/70 mb-6"
                    >
                        <TrendingUp size={16} className="text-white" />
                        Market Intelligence
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-sans font-bold mb-6 tracking-tight"
                    >
                        Pune Real Estate <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
                            Market Insights.
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/60 font-light"
                    >
                        Data-driven analysis, infrastructure updates, and investment strategies for the Hinjewadi IT corridor and beyond.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {INSIGHTS_DATA.map((article, index) => (
                        <motion.div 
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/market-reports/${article.slug}`} className="group block h-full bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                    <img 
                                        src={article.image} 
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-xs text-white/50 font-bold uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            {article.readTime}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-white/60 mb-8 line-clamp-3 font-light text-sm">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                        Read Article <ChevronRight size={16} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;
