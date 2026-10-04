import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Home, TrendingUp, Shield, MapPin, X } from 'lucide-react';
import { CLUSTERS } from '../../lib/clusters';
import { INSIGHTS_DATA } from '../../data/market-reports';

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Toggle on Cmd+K, Ctrl+K, or custom event
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleCustomOpen = () => setIsOpen(true);

        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-palette', handleCustomOpen);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-palette', handleCustomOpen);
        };
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery(''); // reset query on close
        }
    }, [isOpen]);

    const handleSelect = (url: string) => {
        setIsOpen(false);
        navigate(url);
    };

    // Predictive Search Logic
    const getResults = () => {
        const q = query.toLowerCase();
        if (!q) return [];

        const results = [];

        // 1. Search Clusters
        CLUSTERS.forEach(cluster => {
            if (cluster.name.toLowerCase().includes(q) || cluster.category.toLowerCase().includes(q) || cluster.description.toLowerCase().includes(q)) {
                results.push({
                    type: 'Cluster',
                    title: cluster.name,
                    subtitle: cluster.category,
                    url: `/projects/${cluster.slug}`,
                    icon: <Home size={16} className="text-[#E5C07B]" />
                });
            }
            
            // Search configurations inside clusters
            cluster.configurations.forEach(config => {
                if (config.type.toLowerCase().includes(q) || config.price.toLowerCase().includes(q)) {
                    results.push({
                        type: 'Configuration',
                        title: `${config.type} in ${cluster.name}`,
                        subtitle: `${config.size} | ${config.price}`,
                        url: `/projects/${cluster.slug}`,
                        icon: <MapPin size={16} className="text-white/50" />
                    });
                }
            });
        });

        // 2. Search Market Reports
        INSIGHTS_DATA.forEach(article => {
            if (article.title.toLowerCase().includes(q) || article.category.toLowerCase().includes(q)) {
                results.push({
                    type: 'Market Report',
                    title: article.title,
                    subtitle: article.readTime,
                    url: `/market-reports/${article.slug}`,
                    icon: <TrendingUp size={16} className="text-blue-400" />
                });
            }
        });

        // 3. Search Static / Legal Pages
        const staticPages = [
            { title: "RERA Registration & Legal", url: "/disclaimer", icon: <Shield size={16} className="text-green-400" /> },
            { title: "Contact Sales Desk", url: "/contact", icon: <Search size={16} className="text-white/50" /> },
            { title: "Locations Directory", url: "/locations-directory", icon: <MapPin size={16} className="text-white/50" /> }
        ];

        staticPages.forEach(page => {
            if (page.title.toLowerCase().includes(q)) {
                results.push({
                    type: 'Page',
                    title: page.title,
                    subtitle: 'System',
                    url: page.url,
                    icon: page.icon
                });
            }
        });

        return results.slice(0, 8); // Limit to top 8 results
    };

    const results = getResults();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                    />

                    {/* Palette */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#111] border border-white/20 rounded-2xl shadow-2xl z-[9999] overflow-hidden"
                    >
                        <div className="flex items-center px-4 py-4 border-b border-white/10">
                            <Search size={20} className="text-white/50 mr-3" />
                            <input 
                                ref={inputRef}
                                type="text" 
                                placeholder="Search configurations, prices, market reports..." 
                                className="w-full bg-transparent text-white text-lg outline-none placeholder:text-white/30"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {query.length === 0 ? (
                                <div className="px-4 py-8 text-center text-white/40 text-sm">
                                    Type <kbd className="bg-white/10 px-2 py-1 rounded-md font-mono text-xs text-white">3 BHK</kbd> or <kbd className="bg-white/10 px-2 py-1 rounded-md font-mono text-xs text-white">RERA</kbd> to start searching...
                                </div>
                            ) : results.length === 0 ? (
                                <div className="px-4 py-8 text-center text-white/40 text-sm">
                                    No results found for "{query}".
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {results.map((result, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSelect(result.url)}
                                            className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors text-left group"
                                        >
                                            <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                                                {result.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white group-hover:text-[#E5C07B] transition-colors">{result.title}</div>
                                                <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{result.subtitle}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="px-4 py-3 border-t border-white/10 bg-[#0A0A0A] flex items-center justify-between text-xs text-white/40">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd> to navigate</span>
                                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Enter</kbd> to select</span>
                            </div>
                            <span>AI Predictive Search</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
