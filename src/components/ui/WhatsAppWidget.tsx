import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/917744009295?text=${encodedMessage}`, '_blank');
        setIsOpen(false);
        setMessage('');
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl bg-[#151822] border border-white/20/10 backdrop-blur-2xl border border-white/20 shadow-glass text-[#202124] p-6 mb-4 w-[320px]"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-[#202124] text-lg">Life Republic Desk</h3>
                            <button onClick={() => setIsOpen(false)} className="text-[#5F6368] hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Connect with our platinum advisors instantly via WhatsApp for priority service.
                        </p>
                        <textarea
                            className="w-full bg-[#F8F9FA] border border-white/20 rounded-2xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none text-sm mb-4 text-[#202124]"
                            rows={3}
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            onClick={handleSend}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-[#202124] font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <MessageCircle size={18} />
                            Start Chat
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#25D366] text-[#202124] rounded-2xl border-2 border-primary flex items-center justify-center shadow-glass hover:shadow-glass-hover transition-all"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};
