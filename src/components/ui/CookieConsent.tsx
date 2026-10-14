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
                <motion.aside
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md z-[9999]"
                    role="region"
                    aria-label="Cookie and Privacy Consent"
                >
                    <div className="bg-[#151822] border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/10 rounded-full text-[#E5C07B]">
                                    <Cookie size={20} />
                                </div>
                                <h3 className="font-bold text-white text-sm">We Value Your Privacy</h3>
                            </div>
                            <button 
                                onClick={declineCookies} 
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Dismiss cookie policy notice"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our <Link to="/privacy-policy" className="text-[#E5C07B] font-semibold hover:underline">Privacy Policy</Link>.
                        </p>

                        <div className="flex gap-3 mt-2">
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-xl py-3 text-[10px] font-bold tracking-tight border-white/20 text-white hover:bg-white/10"
                                onClick={declineCookies}
                                aria-label="Decline cookies"
                            >
                                Decline
                            </Button>
                            <Button 
                                className="flex-1 rounded-xl py-3 text-[10px] font-bold tracking-tight bg-[#E5C07B] text-black hover:bg-white"
                                onClick={acceptCookies}
                                aria-label="Accept all cookies"
                            >
                                Accept All
                            </Button>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};
