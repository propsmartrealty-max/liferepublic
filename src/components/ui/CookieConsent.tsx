import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show after a small delay so it doesn't block immediate initial render
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md z-[9999]"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/10 rounded-full text-accent">
                                    <Cookie size={20} />
                                </div>
                                <h3 className="font-bold text-secondary text-sm">We Value Your Privacy</h3>
                            </div>
                            <button onClick={declineCookies} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
                        </p>

                        <div className="flex gap-3 mt-2">
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-xl py-3 text-[10px] font-bold uppercase tracking-widest border-gray-200"
                                onClick={declineCookies}
                            >
                                Decline
                            </Button>
                            <Button 
                                className="flex-1 rounded-xl py-3 text-[10px] font-bold uppercase tracking-widest"
                                onClick={acceptCookies}
                            >
                                Accept All
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
