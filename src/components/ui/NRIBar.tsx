import React from 'react';
import { useNRI } from '../../lib/useNRI';
import { Globe2, MessageCircle, ArrowRight } from 'lucide-react';

export const NRIBar: React.FC = () => {
    const { isNRI, country, currency } = useNRI();

    if (!isNRI) return null;

    const handleOpenEnquiry = () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', {
            detail: {
                project: 'Life Republic Township',
                type: `NRI Desk (${country} / ${currency})`
            }
        }));
    };

    return (
        <div className="bg-[#0b0f19] border-b border-amber-500/20 text-white text-[11px] sm:text-xs py-2 px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Globe2 size={13} className="text-amber-400 animate-pulse flex-shrink-0" />
                    <span className="font-semibold text-gray-200">
                        NRI Investment Desk ({country})
                    </span>
                    <span className="hidden md:inline text-gray-400">|</span>
                    <span className="hidden md:inline text-gray-400">
                        USD / AED Real-time Currency Estimates & FEMA Tax Compliance
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleOpenEnquiry}
                        className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors underline-offset-2 hover:underline"
                    >
                        Schedule Virtual Monograph Tour <ArrowRight size={11} />
                    </button>
                    <a
                        href={`https://wa.me/919370552525?text=${encodeURIComponent(`Hi, I am an NRI connecting from ${country}. I am interested in Kolte-Patil Life Republic properties.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full text-[10px] transition-colors"
                    >
                        <MessageCircle size={10} /> WhatsApp Desk
                    </a>
                </div>
            </div>
        </div>
    );
};
