import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, User, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { INSIGHTS_DATA } from '../data/market-reports';
import { SEO } from '../components/seo/SEO';

const Article = () => {
    const { slug } = useParams();
    const article = INSIGHTS_DATA.find(a => a.slug === slug);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <Link to="/market-reports" className="text-white/50 hover:text-white transition-colors border-b border-white/20 pb-1">Return to Insights</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-white pb-20">
            <SEO 
                title={`${article.title} | PropSmart Insights`}
                description={article.excerpt}
                canonical={`/market-reports/${article.slug}`}
                type="article"
            />
            
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 to-gray-600 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full mt-16 md:mt-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-10" />
                <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 z-20 pb-12 md:pb-20">
                    <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                        <Link to="/market-reports" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-8">
                            <ChevronLeft size={16} /> Back to Insights
                        </Link>
                        
                        <div className="mb-6 inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                            {article.category}
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold font-sans tracking-tight mb-8 leading-tight">
                            {article.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                {article.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {article.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                {article.readTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="sticky top-32 flex flex-col gap-6 items-center">
                            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors" title="Share Article">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-11">
                        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-blue-400 prose-img:rounded-3xl prose-img:border prose-img:border-white/10">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
                        </article>
                        
                        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <User size={24} className="text-white/70" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/50 uppercase tracking-widest font-bold">Written by</p>
                                    <p className="font-bold text-lg">{article.author}</p>
                                </div>
                            </div>
                            <Link to="/market-reports" className="px-8 py-4 bg-white text-black hover:bg-rainbow-hover rounded-full font-bold uppercase tracking-widest text-sm transition-all text-center w-full md:w-auto">
                                Read More Insights
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
