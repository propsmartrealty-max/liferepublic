import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { EnquiryModal } from './EnquiryModal';

export const FloatingContact: React.FC = () => {
    const [isLive, setIsLive] = useState(false);
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [modalContext, setModalContext] = useState("Life Republic");
    const location = useLocation();


    useEffect(() => {
        const hour = new Date().getHours();
        // Live if between 9 AM and 7 PM
        setIsLive(hour >= 9 && hour < 19);
    }, [location.pathname]);

    return (
        <>
            <div className="fixed sm:bottom-8 bottom-6 sm:right-8 right-6 z-50 flex flex-col items-end gap-3">
                <div className="flex flex-col gap-3 bg-[#151822] border border-white/20/10 backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-glass rounded-full shadow-glass">
                    <motion.a
                        href={`https://wa.me/919370552525?text=${encodeURIComponent("Hi PropSmart Realty, I am interested in Kolte Patil Life Republic Hinjewadi. Please share brochure and price details.")}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).gtag) {
                                try {
                                    (window as any).gtag('event', 'contact', {
                                        event_category: 'Engagement',
                                        event_label: 'Floating WhatsApp',
                                        method: 'WhatsApp'
                                    });
                                } catch (_) {}
                            }
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`sm:p-4 p-3 rounded-full border-2 border-primary shadow-none transition-all duration-300 flex items-center justify-center ${
                            !isLive ? 'bg-accent text-[#202124] shadow-none' : 'bg-white text-[#25D366] hover:bg-[#F8F9FA]'
                        }`}
                        aria-label="WhatsApp Enquiry"
                    >
                        <MessageSquare className="sm:size-[24px] size-[20px]" />
                        {!isLive && (
                             <span className="absolute inset-0 rounded-full border-2 border-primary bg-accent animate-ping opacity-20" />
                        )}
                    </motion.a>

                    <motion.button
                        onClick={() => {
                            setModalContext("Request Instant Callback");
                            setIsEnquiryOpen(true);
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ delay: 0.1 }}
                        className={`sm:p-4 p-3 rounded-full border-2 border-primary shadow-none transition-all duration-300 flex items-center justify-center ${
                            isLive ? 'bg-accent text-[#202124] shadow-none' : 'bg-white text-[#202124] hover:bg-[#F8F9FA]'
                        }`}
                        aria-label="Request Instant Callback"
                    >
                        <Phone className="sm:size-[24px] size-[20px]" />
                        {isLive && (
                            <span className="absolute inset-0 rounded-full border-2 border-primary bg-accent animate-ping opacity-20" />
                        )}
                    </motion.button>
                </div>
            </div>

            <EnquiryModal 
                isOpen={isEnquiryOpen} 
                onClose={() => setIsEnquiryOpen(false)} 
                projectName={modalContext}
            />
        </>
    );
};
