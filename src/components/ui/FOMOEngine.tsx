import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Eye, Download, Flame } from 'lucide-react';

const FOMO_EVENTS = [
    { text: "An NRI from Dubai just downloaded the Canvas brochure.", icon: <Download size={16} className="text-blue-400" /> },
    { text: "14 people are currently looking at Qrious 2 BHKs.", icon: <Eye size={16} className="text-green-400" /> },
    { text: "Only 3 units left in Espada at ₹1.45 Cr.", icon: <Flame size={16} className="text-orange-400" /> },
    { text: "Someone from Mumbai just scheduled a site visit for Aros.", icon: <Bell size={16} className="text-[#E5C07B]" /> },
    { text: "Last booking for Echoes happened 4 hours ago.", icon: <Flame size={16} className="text-red-400" /> }
];

export const FOMOEngine = () => {
    const [currentEvent, setCurrentEvent] = useState<number | null>(null);

    useEffect(() => {
        // Initial delay before first popup
        const initialTimer = setTimeout(() => {
            setCurrentEvent(Math.floor(Math.random() * FOMO_EVENTS.length));
        }, 15000); // 15 seconds

        // Randomly show popups every 30-45 seconds
        const interval = setInterval(() => {
            setCurrentEvent(Math.floor(Math.random() * FOMO_EVENTS.length));
            
            // Hide it after 6 seconds
            setTimeout(() => {
                setCurrentEvent(null);
            }, 6000);
        }, 35000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {currentEvent !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-6 left-6 z-[9000] max-w-sm"
                >
                    <div className="bg-[#111]/90 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] rounded-2xl p-4 pr-10 flex items-start gap-4 relative overflow-hidden group cursor-pointer hover:bg-[#151515] transition-colors"
                         onClick={() => document.dispatchEvent(new CustomEvent('open-enquiry'))}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        <div className="p-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
                            {FOMO_EVENTS[currentEvent].icon}
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-white/90 leading-snug">
                                {FOMO_EVENTS[currentEvent].text}
                            </p>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-2 block">
                                Just now • Verified
                            </span>
                        </div>
                        
                        {/* Close button indicator */}
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#E5C07B] animate-ping" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
