import React, { useState } from 'react';
import { useNRI } from '../../lib/useNRI';
import { Globe2, MessageCircle, ArrowRight, X } from 'lucide-react';

export const NRIBar: React.FC = () => {
    const { isNRI, country, currency } = useNRI();
    const [isDismissed, setIsDismissed] = useState(false);

    if (!isNRI || isDismissed) return null;

    const handleOpenEnquiry = () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', {
            detail: {
                project: 'Life Republic Township',
                type: `NRI Desk (${country} / ${currency})`
            }
        }));
    };

    return (
        <aside 
            className="fixed top-[3.5px] left-0 right-0 z-[115] bg-[#0b0f19]/95 backdrop-blur-md border-b border-amber-500/30 text-white text-[11px] sm:text-xs py-1.5 px-4 shadow-xl"
            role="region"
            aria-label="NRI Assistance Desk"
        >
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Globe2 size={13} className="text-amber-400 animate-pulse flex-shrink-0" />
                    <span className="font-semibold text-gray-200">
                        NRI Investment Desk ({country})
                    </span>
                    <span className="hidden md:inline text-gray-400">|</span>
                    <span className="hidden md:inline text-gray-400">
                        USD / AED Real-time Currency Estimates & FEMA Compliance
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleOpenEnquiry}
                        className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors underline-offset-2 hover:underline"
                        aria-label="Schedule Virtual Monograph Tour for NRI"
                    >
                        Virtual Tour <ArrowRight size={11} />
                    </button>
                    <a
                        href={`https://wa.me/919370552525?text=${encodeURIComponent(`Hi, I am an NRI connecting from ${country}. I am interested in Kolte-Patil Life Republic properties.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full text-[10px] transition-colors"
                        aria-label="Open WhatsApp Desk for NRI assistance"
                    >
                        <MessageCircle size={10} /> WhatsApp Desk
                    </a>
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="text-gray-400 hover:text-white p-0.5 rounded transition-colors ml-1"
                        aria-label="Close NRI notice"
                    >
                        <X size={12} />
                    </button>
                </div>
            </div>
        </aside>
    );
};
