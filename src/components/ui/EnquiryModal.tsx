import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, User, Phone, MapPin, Building2, Calendar, Clock } from 'lucide-react';
import { api } from '../../services/api';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, projectName = 'Life Republic' }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const honeyRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (honeyRef.current && honeyRef.current.value) {
            console.warn("Bot detected.");
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
            if (!formRef.current) throw new Error("Form reference missing");
            const formData = new FormData(formRef.current);
            await api.forms.submitEnquiry(formData);
            
            setIsSuccess(true);
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'enquiry_form_submitted', project: projectName });
            }
        } catch (err: any) {
            setError('Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
                        className="relative w-full max-w-5xl bg-[#0F1115] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row my-8"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/5 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Left Architectural Pane */}
                        <div className="hidden md:flex flex-col md:w-5/12 bg-black relative p-12 overflow-hidden justify-between">
                            <div className="absolute inset-0 z-0">
                                <img src="/images/hero-new.jpg" className="w-full h-full object-cover opacity-40 grayscale sepia-[0.3]" alt="Architecture" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1115]"></div>
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Priority Access</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white tracking-tighter leading-[1.1]">
                                    Experience<br/><span className="italic font-light text-white/70">The Sovereign</span><br/>Lifestyle.
                                </h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-[250px]">
                                    Register for an exclusive preview of {projectName}. Secure inaugural pricing and premium inventory access.
                                </p>
                            </div>
                            
                            <div className="relative z-10 pt-12 border-t border-white/10 mt-12">
                                <div className="flex items-center gap-4 text-white/60 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Building2 size={16} className="text-accent" />
                                    </div>
                                    <div className="text-xs uppercase tracking-widest font-bold">390-Acre Township</div>
                                </div>
                                <div className="flex items-center gap-4 text-white/60">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <MapPin size={16} className="text-accent" />
                                    </div>
                                    <div className="text-xs uppercase tracking-widest font-bold">Hinjewadi IT Corridor</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Pane */}
                        <div className="w-full md:w-7/12 p-8 sm:p-12 md:p-16 relative flex items-center bg-gradient-to-b from-[#151822] to-[#0F1115]">
                            
                            {!isSuccess ? (
                                <div className="w-full max-w-md mx-auto">
                                    <div className="mb-10 md:hidden">
                                        <h3 className="text-3xl font-sans font-bold text-white tracking-tight mb-2">Priority Access</h3>
                                        <p className="text-white/50 text-sm">Register for an exclusive preview of {projectName}.</p>
                                    </div>
                                    
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                                        <input type="text" name="_honey" ref={honeyRef} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                                        <input type="hidden" name="source" value={`${projectName} - Enquiry Modal`} />

                                        {/* Floating Label Inputs */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="relative group">
                                                <input required type="text" name="name" id="name" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors placeholder-transparent" />
                                                <label htmlFor="name" className="absolute left-0 top-3 text-white/40 text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                                                    Full Name *
                                                </label>
                                            </div>
                                            <div className="relative group">
                                                <input required type="tel" pattern="[0-9]{10}" name="mobile" id="mobile" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors placeholder-transparent" />
                                                <label htmlFor="mobile" className="absolute left-0 top-3 text-white/40 text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                                                    Phone Number *
                                                </label>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <input required type="email" name="email" id="email" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors placeholder-transparent" />
                                            <label htmlFor="email" className="absolute left-0 top-3 text-white/40 text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                                                Email Address *
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                                            <div className="relative">
                                                <select required name="configuration" defaultValue="" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                                                    <option value="" disabled className="bg-[#0F1115]">Select Config</option>
                                                    <option value="1 BHK" className="bg-[#0F1115]">1 BHK</option>
                                                    <option value="2 BHK" className="bg-[#0F1115]">2 BHK</option>
                                                    <option value="3 BHK" className="bg-[#0F1115]">3 BHK</option>
                                                    <option value="4 BHK" className="bg-[#0F1115]">4 BHK</option>
                                                    <option value="Villa / Plot" className="bg-[#0F1115]">Villa / Plot</option>
                                                </select>
                                                <label className="absolute left-0 -top-4 text-[10px] text-white/40 uppercase tracking-widest">Configuration *</label>
                                            </div>
                                            <div className="relative">
                                                <select required name="cluster" defaultValue={projectName !== "Life Republic" ? projectName : ""} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                                                    <option value="" disabled className="bg-[#0F1115]">Select Cluster</option>
                                                    <option value="Qrious" className="bg-[#0F1115]">Qrious</option>
                                                    <option value="Canvas" className="bg-[#0F1115]">Canvas</option>
                                                    <option value="Atmos" className="bg-[#0F1115]">Atmos</option>
                                                    <option value="Aros" className="bg-[#0F1115]">Aros</option>
                                                    <option value="Echoes" className="bg-[#0F1115]">Echoes</option>
                                                    <option value="Espada" className="bg-[#0F1115]">24K Espada</option>
                                                </select>
                                                <label className="absolute left-0 -top-4 text-[10px] text-white/40 uppercase tracking-widest">Preferred Cluster *</label>
                                            </div>
                                        </div>

                                        {error && <p className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-2 rounded-md">{error}</p>}

                                        <p className="text-[10px] text-white/30 leading-relaxed text-center py-2">
                                            By submitting this form, you consent to receive updates via Email, SMS, and WhatsApp regarding Kolte Patil projects.
                                        </p>

                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3 bg-white text-black hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-50 group"
                                        >
                                            {isSubmitting ? 'Authenticating...' : 'Secure Priority Access'}
                                            {!isSubmitting && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
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
                                        <h4 className="text-4xl font-sans font-bold text-white mb-4">Request Verified</h4>
                                        <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                                            Your priority access request for {projectName} has been authenticated. A dedicated property expert is reviewing your requirements.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={onClose}
                                        className="mt-4 px-10 py-4 bg-transparent border border-white/20 hover:bg-white hover:text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                                    >
                                        Return to Experience
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
