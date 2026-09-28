const fs = require('fs');
let file = 'src/components/ui/EnquiryModal.tsx';

const newContent = `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { api } from '../../services/api';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
    projectId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
    isOpen, 
    onClose, 
    projectName = "Life Republic",
    projectId
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const honeyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsSubmitted(false);
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (honeyRef.current?.value) {
            setIsSubmitted(true);
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            await api.submitLead(formData);
            setIsSubmitted(true);
        } catch (err) {
            setError("Unable to submit. Please try again or call us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 md:p-12">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#050505] rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 rainbow-border-wrap"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 backdrop-blur-md rounded-full text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Image & Branding (Hidden on small mobile) */}
                        <div className="hidden md:block w-2/5 relative bg-black">
                            <img 
                                src="https://liferepublic.in/images/webp/popup/echoes-desktop-kpdl.jpeg" 
                                alt="Kolte Patil Life Republic" 
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                    Experience<br/>Life Republic
                                </h3>
                                <p className="text-sm text-white/70 mb-6">390 Acres of Global Lifestyle</p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50">
                                    <ShieldCheck size={14} className="rainbow-text-clip" /> Official Sales Partner
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form Content */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 relative flex flex-col justify-center min-h-[500px]">
                            
                            {!isSubmitted ? (
                                <div className="w-full">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Register Interest</h2>
                                        <p className="text-white/50 text-sm">Fill in your details to access exclusive floor plans, pricing, and schedule a personalized site visit.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Honeypot */}
                                        <input type="text" name="_honey" ref={honeyRef} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                                        <input type="hidden" name="source" value="Website_Modal" />
                                        
                                        {/* Row 1: Name & Phone */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <input required type="text" name="name" id="name" className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors" placeholder="Full Name" />
                                                <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white">Full Name *</label>
                                            </div>
                                            <div className="relative">
                                                <input required type="tel" name="phone" id="phone" pattern="[0-9]{10}" className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors" placeholder="Phone Number" />
                                                <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white">Phone Number *</label>
                                            </div>
                                        </div>

                                        {/* Row 2: Email & Configuration */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <input required type="email" name="email" id="email" className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors" placeholder="Email Address" />
                                                <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white">Email Address *</label>
                                            </div>
                                            <div className="relative">
                                                <select required name="configuration" defaultValue="" className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                                                    <option value="" disabled className="bg-black text-white/50">Configuration Interest</option>
                                                    <option value="1 BHK" className="bg-black">1 BHK</option>
                                                    <option value="2 BHK" className="bg-black">2 BHK</option>
                                                    <option value="2.5 BHK" className="bg-black">2.5 BHK</option>
                                                    <option value="3 BHK" className="bg-black">3 BHK</option>
                                                    <option value="4 BHK" className="bg-black">4 BHK</option>
                                                    <option value="Row House / Villa" className="bg-black">Row House / Villa</option>
                                                </select>
                                                <label className="absolute left-0 -top-3.5 text-xs text-white/50">Configuration *</label>
                                            </div>
                                        </div>

                                        {/* Row 3: Cluster Selection */}
                                        <div className="relative">
                                            <select required name="cluster" defaultValue={projectName !== "Life Republic" ? projectName : ""} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                                                <option value="" disabled className="bg-black text-white/50">Select Cluster</option>
                                                <option value="Qrious" className="bg-black">Qrious</option>
                                                <option value="Canvas" className="bg-black">Canvas</option>
                                                <option value="Atmos" className="bg-black">Atmos</option>
                                                <option value="Aros" className="bg-black">Aros</option>
                                                <option value="Echoes" className="bg-black">Echoes</option>
                                                <option value="Espada" className="bg-black">24K Espada</option>
                                                <option value="Duet" className="bg-black">Duet</option>
                                                <option value="Universe" className="bg-black">Universe</option>
                                                <option value="Oro Avenue" className="bg-black">Oro Avenue</option>
                                                <option value="I Tower" className="bg-black">I Tower</option>
                                                <option value="Sound of Soul" className="bg-black">Sound of Soul</option>
                                            </select>
                                            <label className="absolute left-0 -top-3.5 text-xs text-white/50">Preferred Cluster *</label>
                                        </div>

                                        {/* Row 4: Site Visit Date & Time */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-4 rounded-xl border border-white/10 mt-2">
                                            <div className="relative flex items-center gap-3">
                                                <Calendar size={18} className="text-white/40" />
                                                <div className="w-full">
                                                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Site Visit Date</label>
                                                    <input type="date" name="visit_date" className="w-full bg-transparent border-none p-0 text-sm text-white focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                                                </div>
                                            </div>
                                            <div className="relative flex items-center gap-3 border-t border-white/10 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-4">
                                                <Clock size={18} className="text-white/40" />
                                                <div className="w-full">
                                                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Timing</label>
                                                    <select name="visit_time" defaultValue="" className="w-full bg-transparent border-none p-0 text-sm text-white focus:outline-none focus:ring-0 appearance-none cursor-pointer">
                                                        <option value="" disabled className="bg-black">Select Time</option>
                                                        <option value="Morning (10 AM - 12 PM)" className="bg-black">Morning (10 AM - 12 PM)</option>
                                                        <option value="Afternoon (12 PM - 3 PM)" className="bg-black">Afternoon (12 PM - 3 PM)</option>
                                                        <option value="Evening (3 PM - 6 PM)" className="bg-black">Evening (3 PM - 6 PM)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {error && <p className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-2 rounded-md">{error}</p>}

                                        <p className="text-[10px] text-white/40 leading-relaxed text-center">
                                            By submitting, you agree to our Privacy Policy and consent to receive property updates via Phone, SMS, or WhatsApp.
                                        </p>

                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-full text-sm font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center gap-2 bg-rainbow-hover transition-all duration-300 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Submit Request'}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="w-full py-12 text-center space-y-6 flex flex-col items-center justify-center h-full"
                                >
                                    <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h4 className="text-3xl font-bold text-white">Thank You!</h4>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
                                        Your request has been successfully received. Our official property expert will contact you shortly to provide the complete details.
                                    </p>
                                    <button 
                                        onClick={onClose}
                                        className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-colors"
                                    >
                                        Close Window
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
`
fs.writeFileSync(file, newContent);
