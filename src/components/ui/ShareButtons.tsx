import React from 'react';
import { Twitter, Linkedin, Copy, Check, Send, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
    url: string;
    title: string;
    className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = '' }) => {
    const [copied, setCopied] = React.useState(false);

    // Sovereign Clean URL Synthesis v6.5: Strips PII while maintaining 2026 intent attribution
    const getCleanUrl = (rawUrl: string) => {
        try {
            const domain = typeof window !== 'undefined' ? window.location.origin : 'https://life-republic.in';
            const base = rawUrl.startsWith('http') ? rawUrl : `${domain}${rawUrl}`;
            const urlObj = new URL(base);
            // Remove common session/tracking parameters for structural privacy
            ['session', 'uid', 'utm_source', 'utm_medium', 'fbclid', 'gclid', 'msclkid'].forEach(p => urlObj.searchParams.delete(p));
            // Add Sovereign intent signature
            urlObj.searchParams.set('intent', 'sovereign_synthesis_v6.5');
            return urlObj.toString();
        } catch (e) {
            return rawUrl;
        }
    };

    const fullUrl = getCleanUrl(url);
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: <Send size={16} strokeWidth={2} />,
            href: `https://wa.me/?text=${encodedTitle}%20%7C%20${encodedUrl}`,
            color: 'hover:bg-green-500',
            bg: 'bg-green-50 text-green-600'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={16} strokeWidth={2} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:bg-blue-700',
            bg: 'bg-blue-50 rainbow-text-clip font-bold'
        },
        {
            name: 'Twitter',
            icon: <Twitter size={16} strokeWidth={2} />,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:bg-slate-900',
            bg: 'bg-slate-50 text-slate-900'
        }
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error('[SHARE ERROR] Failed to copy synthesis link', err);
        }
    };

    return (
        <div className={`flex items-center gap-6 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-[#1a73e8] animate-pulse border border-accent/20">
                    <Zap size={14} />
                </div>
                <span className="text-[11px] font-bold text-[#202124] tracking-tight font-semibold hidden md:block">
                    Synthesis Hub
                </span>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-[#F8F9FA]/50 backdrop-blur-xl border border-[#DADCE0] rounded-full shadow-inner group/hub">
                {shareLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        whileHover={{ y: -4, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${link.bg} ${link.color} hover:text-[#202124] hover:border-transparent hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-transparent`}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </motion.a>
                ))}
                
                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                
                <motion.button
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all relative overflow-hidden group/copy ${copied ? 'bg-emerald-500 text-[#202124]' : 'bg-white border border-[#DADCE0] text-[#5F6368] hover:bg-accent hover:text-[#202124] hover:border-transparent'} hover:shadow-xl`}
                    title="Copy Synthesis Link"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-center"
                            >
                                <ShieldCheck size={18} strokeWidth={2} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-center"
                            >
                                <Copy size={18} strokeWidth={2} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
            
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-[10px] font-bold text-emerald-500 tracking-tight font-semibold flex items-center gap-2"
                    >
                        <Check size={12} /> Synthesis Copied
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
