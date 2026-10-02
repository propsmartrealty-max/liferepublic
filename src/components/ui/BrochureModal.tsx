import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Download, FileText } from 'lucide-react';
import { api } from '../../services/api';

interface BrochureModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, projectName = "Life Republic" }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await api.leads.create({
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
                cluster: projectName,
                project_id: projectName,
                enquiryType: 'Brochure PDF Download',
                message: `Brochure Download Request: ${projectName}`
            });
            setIsSuccess(true);
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'brochure_downloaded', project: projectName });
            }
        } catch (error) {
            console.error("Failed to submit brochure request:", error);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#0F1115] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/5 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Left Info Pane */}
                        <div className="hidden md:flex flex-col md:w-5/12 bg-black relative p-12 overflow-hidden justify-between">
                            <div className="absolute inset-0 z-0">
                                <img src="/images/hero-new.jpg" className="w-full h-full object-cover opacity-40 grayscale sepia-[0.3]" alt="Architecture" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1115]"></div>
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Official Document</span>
                                </div>
                                <h2 className="text-4xl font-sans font-bold text-white tracking-tighter leading-[1.1]">
                                    Project<br/><span className="italic font-light text-white/70">Brochure</span>.
                                </h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-[250px]">
                                    Download the comprehensive master plan, floor layouts, and exact specifications for {projectName}.
                                </p>
                            </div>
                            
                            <div className="relative z-10 pt-12 border-t border-white/10 mt-12">
                                <div className="flex items-center gap-4 text-white/60 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <FileText size={16} className="text-accent" />
                                    </div>
                                    <div className="text-xs uppercase tracking-widest font-bold">PDF Format (14MB)</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Pane */}
                        <div className="w-full md:w-7/12 p-8 sm:p-12 md:p-16 relative flex items-center bg-gradient-to-b from-[#151822] to-[#0F1115]">
                            
                            {!isSuccess ? (
                                <div className="w-full max-w-md mx-auto">
                                    <div className="mb-10 md:hidden">
                                        <h3 className="text-3xl font-sans font-bold text-white tracking-tight mb-2">Brochure Download</h3>
                                        <p className="text-white/50 text-sm">Access the official master plan for {projectName}.</p>
                                    </div>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <input type="hidden" name="source" value={`${projectName} - Brochure Download`} />

                                        {/* Floating Label Inputs */}
                                        <div className="relative group">
                                            <input required type="text" name="name" id="b_name" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors placeholder-transparent" />
                                            <label htmlFor="b_name" className="absolute left-0 top-3 text-white/40 text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                                                Full Name *
                                            </label>
                                        </div>

                                        <div className="relative group">
                                            <input required type="tel" pattern="[0-9]{10}" name="phone" id="b_phone" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors placeholder-transparent" />
                                            <label htmlFor="b_phone" className="absolute left-0 top-3 text-white/40 text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                                                Phone Number *
                                            </label>
                                        </div>

                                        <div className="relative group">
                                            <input required type="email" name="email" id="b_email" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors placeholder-transparent" />
                                            <label htmlFor="b_email" className="absolute left-0 top-3 text-white/40 text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                                                Email Address *
                                            </label>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3 bg-white text-black hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-50 group mt-4"
                                        >
                                            {isSubmitting ? 'Generating File...' : 'Download PDF'}
                                            {!isSubmitting && <Download size={14} className="group-hover:translate-y-1 transition-transform" />}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="w-full py-12 text-center space-y-8 flex flex-col items-center justify-center h-full"
                                >
                                    <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
                                        <CheckCircle size={32} className="text-accent relative z-10" />
                                    </div>
                                    <div>
                                        <h4 className="text-4xl font-sans font-bold text-white mb-4">Brochure Sent</h4>
                                        <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                                            The official master plan for {projectName} has been securely delivered to your provided contact details.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={onClose}
                                        className="mt-4 px-10 py-4 bg-transparent border border-white/20 hover:bg-white hover:text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                                    >
                                        Return to Site
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
