import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, TrendingUp, ShieldAlert } from 'lucide-react';

export const DemandHeatmap: React.FC = () => {
    const [stats, setStats] = useState({
        visits: 42,
        unitsLeft: 12,
        lastBooking: '4 mins ago'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                visits: prev.visits + Math.floor(Math.random() * 2)
            }));
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#151822] border border-white/20 rounded-[2rem] p-8 border border-white/20 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white text-[#202124] rounded-2xl flex items-center justify-center">
                    <Zap size={20} className="animate-pulse" />
                </div>
                <div>
                    <h3 className="font-sans font-bold text-xl text-[#202124]">Live Velocity Hub</h3>
                    <p className="text-[10px] tracking-tight font-medium text-[#5F6368]">Sector R7 Status</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Visits Counter */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={16} className="text-[#5F6368]" />
                        <span className="text-sm text-gray-600">Active Discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <span className="font-bold text-[#202124]">{stats.visits} Browsing Now</span>
                    </div>
                </div>

                {/* Scarcity Meter */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold tracking-tight font-medium">
                        <span className="text-[#5F6368]">Inventory Status</span>
                        <span className="rainbow-text-clip font-bold">{stats.unitsLeft} Units Remaining</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#151822] rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: '100%' }}
                            animate={{ width: '15%' }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-accent"
                        />
                    </div>
                </div>

                {/* Last Booking */}
                <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp size={16} className="text-[#202124]" />
                        <span className="text-xs font-medium text-gray-600">Last Token Confirmed</span>
                    </div>
                    <span className="text-xs font-bold text-[#202124]">{stats.lastBooking}</span>
                </div>

                <div className="pt-4 flex items-center gap-3 text-red-500">
                    <ShieldAlert size={14} />
                    <span className="text-[10px] font-bold tracking-tight font-medium">High Demand: Price Revision Expected Q3 2026</span>
                </div>
            </div>
        </div>
    );
};
