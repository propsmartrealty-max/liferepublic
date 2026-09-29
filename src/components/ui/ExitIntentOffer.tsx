import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const ExitIntentOffer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if shown in this session
        const shown = sessionStorage.getItem('lr_exit_intent_shown');
        if (shown) setHasShown(true);

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('lr_exit_intent_shown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown]);

    if (!isVisible) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const mobile = formData.get('mobile');
        
        const message = `Hello, I would like to access the Private Beta Price List for Life Republic.

Name: ${name}
Mobile: ${mobile}`;
        window.open(`https://wa.me/917744009295?text=${encodeURIComponent(message)}`, '_blank');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Dark Glass Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    onClick={() => setIsVisible(false)}
                />
                
                {/* Modal Container */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/20 bg-[#0a0a0a]/80 backdrop-blur-3xl"
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                        <X size={20} />
                    </button>

                    {/* Image/Visual Side */}
                    <div className="md:w-[45%] relative p-10 md:p-14 flex flex-col justify-between overflow-hidden min-h-[400px]">
                        {/* Background Image with Luxury Overlay */}
                        <div className="absolute inset-0 bg-[url('/hero-new.jpg')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-black/20"></div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center text-white mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Lock size={20} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-sans font-light text-white mb-6 leading-tight tracking-tight">
                                Access <br />
                                <strong className="font-bold">Private Beta</strong> <br />
                                Price List
                            </h3>
                            <p className="text-white/70 text-lg leading-relaxed font-light max-w-[280px]">
                                Unlock the 2026 pricing and inventory availability before the next market surge.
                            </p>
                        </div>
                        
                        <div className="relative z-10 flex items-center gap-2 text-white/80 text-[10px] tracking-widest font-medium uppercase mt-12">
                            <ShieldCheck size={16} className="text-green-400" /> Sales Desk Verified
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-[55%] p-10 md:p-14 relative flex flex-col justify-center bg-white/5">
                        <h4 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3 tracking-tight">Wait! Don't Leave.</h4>
                        <p className="text-white/60 mb-10 font-light text-sm md:text-base leading-relaxed max-w-sm">
                            Enter your details to receive the digital brochure and current price list instantly on WhatsApp.
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-8 max-w-md">
                            {/* Floating Label Input - Name */}
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-white outline-none transition-all placeholder:text-transparent"
                                    required
                                />
                                <label className="absolute left-0 top-3 text-white/40 text-base transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-white/70 peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text">
                                    Full Name
                                </label>
                            </div>
                            
                            {/* Floating Label Input - Mobile */}
                            <div className="relative group pt-2">
                                <input 
                                    type="tel" 
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-white outline-none transition-all placeholder:text-transparent"
                                    required
                                />
                                <label className="absolute left-0 top-3 text-white/40 text-base transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-white/70 peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text">
                                    Mobile Number
                                </label>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full mt-8 bg-white text-black py-4 md:py-5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                            >
                                <Download size={16} /> Download Price List <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                        
                        <p className="text-[10px] text-white/30 mt-10 font-light max-w-md uppercase tracking-wider">
                            Your privacy is our priority. No spam, only the exclusive price list.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
