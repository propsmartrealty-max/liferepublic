import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Map, Phone, BrainCircuit, MessageSquare, ExternalLink, Calendar } from 'lucide-react';
import { aiService } from '../../services/ai';
import { usePersonalizationStore } from '../../lib/personalizationStore';

export const TownshipAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([
        { 
            role: 'agent', 
            content: "Welcome to Kolte-Patil Life Republic. I am your AI Township Concierge. How may I assist you with cluster availability, floor plans, pricing, or scheduling a VIP site visit?" 
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { updateIntentScore } = usePersonalizationStore();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (forcedQuery?: string) => {
        const query = forcedQuery || input.trim();
        if (!query || isTyping) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setIsTyping(true);
        updateIntentScore(5);

        const history = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model' as 'user' | 'model',
            parts: [{ text: m.content }]
        }));

        const response = await aiService.askTownshipAgent(query, history);
        
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'agent', content: response }]);
    };

    const handleOpenEnquiry = (type: string) => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', {
            detail: {
                project: 'Life Republic Township',
                type: `AI Concierge: ${type}`
            }
        }));
    };

    return (
        <>
            {/* Floating Trigger: Positioned on Bottom Left to avoid collision with WhatsApp Widget */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#151822] text-white rounded-full shadow-2xl border border-white/20 backdrop-blur-md group hover:bg-[#1f2433] transition-all"
                aria-label="Open AI Township Concierge"
            >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-[#E5C07B]">
                    <BrainCircuit size={18} />
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                </div>
                <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold leading-tight">AI Concierge</div>
                    <div className="text-[10px] text-gray-400 font-medium">Ask Anything</div>
                </div>
            </motion.button>

            {/* Chat Modal Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 40 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200 overflow-hidden flex flex-col h-[560px] max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#151822] text-white flex items-center justify-between border-b border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center text-[#E5C07B] border border-white/10">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                                        Township AI Concierge
                                        <span className="px-1.5 py-0.5 bg-emerald-900/60 text-emerald-400 text-[9px] rounded font-semibold border border-emerald-700/50">
                                            Online
                                        </span>
                                    </h3>
                                    <p className="text-[11px] text-gray-400 font-medium">
                                        Kolte-Patil Life Republic Knowledge Base
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Close Concierge"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages Body */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 text-sm">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-[#151822] text-white rounded-br-none' 
                                        : 'bg-white text-[#202124] border border-gray-200 rounded-bl-none'
                                    }`}>
                                        <div dangerouslySetInnerHTML={{ 
                                            __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                                        }} />
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                                        <div className="w-2 h-2 bg-[#E5C07B] rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-[#E5C07B] rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-2 h-2 bg-[#E5C07B] rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Suggested Prompt Chips */}
                        <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
                            {[
                                { label: "2 & 3 BHK Prices", q: "What are the latest 2 and 3 BHK prices at Life Republic?" },
                                { label: "Commute to IT Park", q: "How far is Hinjewadi Phase 1 IT Park from the township?" },
                                { label: "Anisha Global School", q: "Tell me about Crimson Anisha Global School inside the township." },
                                { label: "Rental Yield & ROI", q: "What is the expected rental yield and appreciation in Hinjewadi?" }
                            ].map((chip, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleSend(chip.q)}
                                    className="flex-shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#202124] text-[11px] font-semibold rounded-full transition-colors"
                                >
                                    {chip.label}
                                </button>
                            ))}
                        </div>

                        {/* Instant Action Bar */}
                        <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-2 text-xs">
                            <button
                                onClick={() => handleOpenEnquiry('VIP Site Visit Booking')}
                                className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                            >
                                <Calendar size={13} /> Book VIP Visit
                            </button>
                            <button
                                onClick={() => handleOpenEnquiry('Download Price Sheet')}
                                className="flex-1 py-1.5 px-2 bg-white hover:bg-gray-100 text-[#202124] border border-gray-300 rounded-lg font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                            >
                                <ExternalLink size={13} /> Price Sheet
                            </button>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-gray-100">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about sectors, prices, RERA..."
                                    className="w-full pl-3.5 pr-11 py-2.5 bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-gray-300 focus:outline-none text-xs sm:text-sm text-[#202124] placeholder-gray-500 transition-all"
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-1.5 p-2 bg-[#151822] text-white rounded-lg hover:bg-black transition-all disabled:opacity-40"
                                    aria-label="Send Message"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
