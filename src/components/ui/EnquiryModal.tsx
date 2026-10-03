import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, MapPin, Building2, Phone, Sparkles, MessageCircle } from 'lucide-react';
import { api } from '../../services/api';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
    enquiryType?: string;
}

const CLUSTERS_LIST = [
    'Qrious',
    'Duet',
    'Canvas',
    'Aros',
    'Atmos',
    'Echoes',
    '24K Espada',
    'Oro Avenue',
    'Universe',
    '150-Acre Master Township'
];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
    isOpen, 
    onClose, 
    projectName = 'Life Republic',
    enquiryType = 'Priority Site Visit & Pricing' 
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [submittedData, setSubmittedData] = useState<any>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const honeyRef = useRef<HTMLInputElement>(null);

    // Reset state on open/close
    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
            setError('');
            setIsSubmitting(false);
        }
    }, [isOpen, projectName, enquiryType]);

    const cleanProjectName = projectName && projectName !== 'Life Republic'
        ? projectName.replace(/^kolte-patil-life-republic-/i, '').replace(/^[a-z]/, l => l.toUpperCase())
        : 'Life Republic';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (honeyRef.current && honeyRef.current.value) {
            console.warn("Spam detected.");
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
            if (!formRef.current) throw new Error("Form reference missing");
            const formData = new FormData(formRef.current);
            const name = (formData.get('name') as string)?.trim();
            const mobile = (formData.get('mobile') as string)?.trim();
            const email = (formData.get('email') as string)?.trim() || '';
            const cluster = (formData.get('cluster') as string) || cleanProjectName;
            const configuration = (formData.get('configuration') as string) || '2 / 3 BHK';
            const message = (formData.get('message') as string)?.trim() || `Inquiry for ${cluster} - ${enquiryType}`;

            if (!name || !mobile) {
                throw new Error("Please provide your name and valid phone number.");
            }

            const cleanPhone = mobile.replace(/[^0-9]/g, '');
            if (cleanPhone.length < 10) {
                throw new Error("Please enter a valid 10-digit mobile number.");
            }

            const payload = {
                name,
                phone: cleanPhone,
                email,
                cluster,
                configuration,
                enquiryType,
                message,
                source: `${cleanProjectName} Modal - ${enquiryType}`,
                url: typeof window !== 'undefined' ? window.location.href : 'https://life-republic.in'
            };

            await api.leads.create(payload);
            setSubmittedData(payload);
            setIsSuccess(true);

            if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: 'enquiry_form_submitted',
                    project: cluster,
                    configuration,
                    enquiryType
                });
            }
        } catch (err: any) {
            console.error('Enquiry dispatch error:', err);
            setError(err.message || 'Submission failed. Please try again or connect directly on WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                    {/* Dark Glass Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-[#050505]/85 backdrop-blur-2xl"
                        onClick={onClose}
                    />

                    {/* Modal Box */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.96, y: 15 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.96, y: 15 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="relative w-full max-w-5xl bg-[#090b10] border border-white/15 rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col md:flex-row my-6 z-10"
                    >
                        {/* Close button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-5 right-5 z-50 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full flex items-center justify-center text-white transition-all cursor-interactive"
                            aria-label="Close Enquiry Dialog"
                        >
                            <X size={18} />
                        </button>

                        {/* Left Architectural Brand Pane */}
                        <div className="hidden md:flex flex-col md:w-5/12 bg-black relative p-10 lg:p-12 overflow-hidden justify-between border-r border-white/10">
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src="/images/hero-new.jpg" 
                                    className="w-full h-full object-cover opacity-40 grayscale sepia-[0.2]" 
                                    alt="Kolte-Patil Life Republic Architecture" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/80 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#090b10]"></div>
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 font-bold">Direct Developer Desk</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white tracking-tighter leading-[1.1]">
                                    Experience<br/>
                                    <span className="rainbow-text-clip font-black">Life Republic</span><br/>
                                    Hinjewadi.
                                </h2>
                                <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[280px]">
                                    Register for VIP inaugural pricing, live inventory access, and customized payment schemes for <span className="text-white font-semibold">{cleanProjectName}</span>.
                                </p>
                            </div>
                            
                            <div className="relative z-10 pt-8 border-t border-white/10 mt-8 space-y-3">
                                <div className="flex items-center gap-3 text-white/70">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Building2 size={14} className="text-white/80" />
                                    </div>
                                    <div className="text-[11px] uppercase tracking-wider font-bold">150+ Acre Gated Master Township</div>
                                </div>
                                <div className="flex items-center gap-3 text-white/70">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <MapPin size={14} className="text-white/80" />
                                    </div>
                                    <div className="text-[11px] uppercase tracking-wider font-bold">5 Mins from Hinjewadi IT Park</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Pane */}
                        <div className="w-full md:w-7/12 p-6 sm:p-10 lg:p-12 relative flex items-center bg-gradient-to-b from-[#0f121a] to-[#090b10]">
                            {!isSuccess ? (
                                <div className="w-full max-w-lg mx-auto">
                                    {/* Action Header */}
                                    <div className="mb-8">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/70 mb-2">
                                            <Sparkles size={11} className="text-amber-400" /> {enquiryType}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                                            {cleanProjectName !== 'Life Republic' ? cleanProjectName : 'Township'} Enquiry
                                        </h3>
                                        <p className="text-white/50 text-xs mt-1">
                                            All details are transmitted in real-time to the official sales relationship manager.
                                        </p>
                                    </div>
                                    
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                        <input type="text" name="_honey" ref={honeyRef} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                                        {/* Name & Phone */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label htmlFor="modal_name" className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                                                    Full Name *
                                                </label>
                                                <input 
                                                    required 
                                                    type="text" 
                                                    name="name" 
                                                    id="modal_name" 
                                                    placeholder="Enter your name" 
                                                    className="w-full bg-white/[0.04] border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/20"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="modal_mobile" className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                                                    Mobile Number *
                                                </label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3.5 text-xs font-bold text-white/40 select-none">+91</span>
                                                    <input 
                                                        required 
                                                        type="tel" 
                                                        pattern="[0-9]{10}" 
                                                        name="mobile" 
                                                        id="modal_mobile" 
                                                        placeholder="10-digit number" 
                                                        className="w-full bg-white/[0.04] border border-white/15 focus:border-white rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="modal_email" className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                                                Email Address (Optional)
                                            </label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                id="modal_email" 
                                                placeholder="name@example.com (for brochure & price sheets)" 
                                                className="w-full bg-white/[0.04] border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/20"
                                            />
                                        </div>

                                        {/* Cluster & Configuration Dropdowns */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label htmlFor="modal_cluster" className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                                                    Preferred Cluster *
                                                </label>
                                                <select 
                                                    required 
                                                    name="cluster" 
                                                    id="modal_cluster"
                                                    defaultValue={cleanProjectName} 
                                                    className="w-full bg-[#090b10] border border-white/15 focus:border-white rounded-xl px-3.5 py-3 text-white text-sm focus:outline-none transition-colors cursor-pointer"
                                                >
                                                    {CLUSTERS_LIST.map((c) => (
                                                        <option key={c} value={c} className="bg-[#090b10] text-white">
                                                            {c}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="modal_config" className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                                                    Configuration *
                                                </label>
                                                <select 
                                                    required 
                                                    name="configuration" 
                                                    id="modal_config"
                                                    defaultValue="2 BHK" 
                                                    className="w-full bg-[#090b10] border border-white/15 focus:border-white rounded-xl px-3.5 py-3 text-white text-sm focus:outline-none transition-colors cursor-pointer"
                                                >
                                                    <option value="1 BHK" className="bg-[#090b10] text-white">1 BHK Smart</option>
                                                    <option value="2 BHK" className="bg-[#090b10] text-white">2 BHK Premium</option>
                                                    <option value="2.5 BHK" className="bg-[#090b10] text-white">2.5 BHK Space-Plus</option>
                                                    <option value="3 BHK" className="bg-[#090b10] text-white">3 BHK Luxury</option>
                                                    <option value="4 BHK" className="bg-[#090b10] text-white">4 BHK Presidential</option>
                                                    <option value="Row House / Villa" className="bg-[#090b10] text-white">Row House / Villa</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Optional Message */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="modal_message" className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                                                Custom Request or Preferred Time
                                            </label>
                                            <input 
                                                type="text" 
                                                name="message" 
                                                id="modal_message" 
                                                placeholder="e.g. Schedule visit this Saturday, send PDF brochure on WhatsApp" 
                                                className="w-full bg-white/[0.04] border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/20"
                                            />
                                        </div>

                                        {error && (
                                            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-center space-y-2">
                                                <p>{error}</p>
                                                <a 
                                                    href={`https://wa.me/917744009295?text=Hello,%20I'm%20inquiring%20about%20Kolte%20Patil%20Life%20Republic%20${encodeURIComponent(cleanProjectName)}.`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-emerald-400 font-bold underline"
                                                >
                                                    <MessageCircle size={14} /> Send Inquiry via WhatsApp Instead
                                                </a>
                                            </div>
                                        )}

                                        <p className="text-[10px] text-white/30 leading-relaxed text-center">
                                            🔒 Guaranteed privacy. Your information is delivered directly to Kolte-Patil Life Republic sales desk. Zero spam.
                                        </p>

                                        {/* Submit Button */}
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl text-xs font-black tracking-[0.14em] uppercase shadow-2xl flex items-center justify-center gap-2.5 bg-white text-black hover:bg-rainbow-hover hover:text-white transition-all duration-300 disabled:opacity-60 cursor-interactive group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                                    <span>Transmitting Enquiry...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Submit Priority Enquiry</span>
                                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                /* Success Confirmation Pane */
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="w-full py-8 text-center space-y-6 flex flex-col items-center justify-center h-full"
                                >
                                    <div className="w-20 h-20 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                                        <CheckCircle size={36} className="text-emerald-400 relative z-10" />
                                    </div>
                                    <div className="space-y-2 max-w-md">
                                        <h4 className="text-3xl font-sans font-black text-white">
                                            Enquiry Transmitted!
                                        </h4>
                                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                                            Thank you, <span className="text-white font-bold">{submittedData?.name}</span>. Your enquiry for <span className="text-white font-bold">{submittedData?.cluster} ({submittedData?.configuration})</span> has been successfully delivered in HTML format to the sales inbox.
                                        </p>
                                    </div>

                                    {/* Action Options */}
                                    <div className="w-full max-w-sm space-y-3 pt-4">
                                        <a 
                                            href={`https://wa.me/917744009295?text=Hello,%20I'm%20${encodeURIComponent(submittedData?.name || '')}.%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(submittedData?.cluster || '')}%20(${encodeURIComponent(submittedData?.configuration || '')}).%20Please%20share%20the%20cost%20sheet%20and%20floor%20plans.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg"
                                        >
                                            <MessageCircle size={16} /> Instant WhatsApp Connect
                                        </a>

                                        <button 
                                            onClick={onClose}
                                            className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-colors"
                                        >
                                            Continue Browsing Website
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
