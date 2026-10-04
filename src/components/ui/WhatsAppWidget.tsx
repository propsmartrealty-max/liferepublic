import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const WhatsAppWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const location = useLocation();

    // Context-Aware Default Message Formulation
    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/projects/')) {
            const slug = path.split('/').pop() || '';
            const clusterName = slug.replace(/^kolte-patil-life-republic-/, '').replace(/-/g, ' ').toUpperCase();
            setMessage(`Hello, I am interested in Life Republic ${clusterName}. Please share the floor plans, brochure, and current price sheet.`);
        } else if (path.startsWith('/search/')) {
            const siloSlug = path.split('/').pop() || '';
            const formatted = siloSlug.replace(/-/g, ' ');
            setMessage(`Hello, I found your listing for ${formatted}. Please share the pricing and inventory availability.`);
        } else if (path.startsWith('/market-reports/') || path.startsWith('/insights/')) {
            setMessage('Hello, I was reading your Hinjewadi real estate market analysis and would like advisory on Life Republic.');
        } else {
            setMessage('Hello, I am interested in Kolte-Patil Life Republic Hinjewadi. Please share brochure and project details.');
        }
    }, [location.pathname]);

    const handleSend = () => {
        if (!message.trim()) return;
        if (typeof window !== 'undefined' && (window as any).gtag) {
            try {
                (window as any).gtag('event', 'contact', {
                    event_category: 'Engagement',
                    event_label: 'WhatsApp Chat',
                    method: 'WhatsApp'
                });
            } catch (_) {}
        }
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919370552525?text=${encodedMessage}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-2xl text-[#202124] p-5 mb-3 w-[320px] sm:w-[350px] overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                            <div>
                                <h3 className="font-bold text-sm text-[#202124]">Life Republic VIP WhatsApp</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <p className="text-[11px] text-emerald-700 font-medium">Senior Advisor Online</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Close WhatsApp Chat"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                            Connect directly with our authorized sales advisors for instant price sheets, video walkthroughs, and VIP site visit reservations.
                        </p>

                        <div className="relative mb-3">
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none text-xs text-[#202124] leading-relaxed"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                            />
                        </div>

                        <button
                            onClick={handleSend}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-md shadow-emerald-900/10"
                        >
                            <Send size={14} /> Send WhatsApp Message
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified Township Advisory Desk
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-13 h-13 p-3.5 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-all border border-emerald-500"
                aria-label="Open WhatsApp Desk"
            >
                {isOpen ? <X size={22} /> : <MessageCircle size={22} className="fill-white/20" />}
            </motion.button>
        </div>
    );
};
