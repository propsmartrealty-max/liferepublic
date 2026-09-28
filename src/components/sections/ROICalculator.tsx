import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, ShieldCheck, ChevronRight, Zap, Target, Sparkles } from 'lucide-react';

export const ROICalculator: React.FC = () => {
    const [investment, setInvestment] = useState(8500000); 
    const [years, setYears] = useState(5);
    const [strategy, setStrategy] = useState<'conservative' | 'aggressive'>('aggressive');
    
    const appreciationRate = strategy === 'aggressive' ? 0.12 : 0.08;
    
    const futureValue = useMemo(() => {
        return Math.floor(investment * Math.pow(1 + appreciationRate, years));
    }, [investment, years, appreciationRate]);

    const profit = futureValue - investment;

    const getVerdict = () => {
        if (years >= 10) return "Strategic Multi-Generational Asset";
        if (years >= 5) return "High-Yield Growth Corridor Acquisition";
        return "Tactical Mid-Term Capital Appreciation";
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section className="py-12 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-8">
                    <div className="max-w-2xl text-left">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-6"
                        >
                            <Target size={14} className="rainbow-text-clip font-bold" />
                            <span className="text-[10px] font-bold tracking-tight font-semibold rainbow-text-clip font-bold">Tectonic ROI Engine v2.0</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] mb-6 leading-tight">
                            Project Your <br /> <span className="rainbow-text-clip font-bold italic">Wealth Velocity.</span>
                        </h2>
                        <p className="text-[#5F6368] text-lg leading-relaxed font-medium">
                            Synthesize your portfolio's growth based on Hinjewadi's 2026 infrastructure roadmap. Our engine accounts for the **Metro Expansion** and the **Spine Road Connectivity** delta.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls */}
                    <div className="lg:col-span-5 bg-[#F8F9FA] rounded-[24px] p-10 md:p-14 border border-white/20 flex flex-col justify-between">
                        <div className="space-y-16">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-sm font-bold text-[#202124] tracking-tight font-medium flex items-center gap-2">
                                        <TrendingUp className="rainbow-text-clip font-bold" size={18} />
                                        Capital Input
                                    </label>
                                    <span className="text-2xl font-sans font-bold text-[#202124]">{formatCurrency(investment)}</span>
                                </div>
                                <input 
                                    type="range"
                                    min="6000000"
                                    max="50000000"
                                    step="500000"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between mt-4 text-[9px] font-bold text-[#5F6368] tracking-tight font-medium">
                                    <span>60 Lacs</span>
                                    <span>5 Cr</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-sm font-bold text-[#202124] tracking-tight font-medium flex items-center gap-2">
                                        <Calculator className="text-[#202124]" size={18} />
                                        Time Horizon
                                    </label>
                                    <span className="text-2xl font-sans font-bold text-[#202124]">{years} Years</span>
                                </div>
                                <input 
                                    type="range"
                                    min="1"
                                    max="15"
                                    step="1"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                                <div className="flex justify-between mt-4 text-[9px] font-bold text-[#5F6368] tracking-tight font-medium">
                                    <span>Launch (2024)</span>
                                    <span>Maturity (2039)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button 
                                    onClick={() => setStrategy('conservative')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-bold tracking-tight font-medium transition-all ${strategy === 'conservative' ? 'bg-white text-[#202124] shadow-lg' : 'bg-white border border-white/20 text-[#5F6368] hover:bg-[#F8F9FA]'}`}
                                >
                                    Conservative (8%)
                                </button>
                                <button 
                                    onClick={() => setStrategy('aggressive')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-bold tracking-tight font-medium transition-all ${strategy === 'aggressive' ? 'bg-accent text-[#202124] shadow-lg' : 'bg-white border border-white/20 text-[#5F6368] hover:bg-[#F8F9FA]'}`}
                                >
                                    Metro Adjusted (12%)
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-[#151822] border border-white/20 rounded-3xl border border-white/20 shadow-sm flex items-start gap-4">
                            <ShieldCheck className="rainbow-text-clip font-bold shrink-0" size={20} />
                            <p className="text-xs text-[#5F6368] leading-relaxed font-bold tracking-tight font-medium">
                                Projections account for the 2026 Metro Correction and IT Phase 3 cluster delivery.
                            </p>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:col-span-7 bg-white rounded-[3.5rem] p-10 md:p-16 text-[#202124] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                        
                        <div className="relative z-10 space-y-12">
                            <div>
                                <div className="flex items-center gap-2 rainbow-text-clip font-bold mb-4">
                                    <Zap size={14} className="animate-pulse" />
                                    <span className="text-[10px] font-bold tracking-tight font-semibold">Sovereign Valuation</span>
                                </div>
                                <p className="text-[#202124]/40 text-xs font-bold tracking-tight font-semibold mb-4">Projected Market Value (Year {2024 + years})</p>
                                <motion.h3 
                                    key={futureValue}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-5xl md:text-5xl font-sans font-bold text-[#202124] tracking-tighter"
                                >
                                    {formatCurrency(futureValue)}
                                </motion.h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-white/20">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp size={14} className="text-green-400" />
                                        <p className="text-[#202124]/40 text-[10px] font-bold tracking-tight font-medium">Growth Premium</p>
                                    </div>
                                    <p className="text-3xl font-sans font-bold text-green-400">+{formatCurrency(profit)}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={14} className="rainbow-text-clip font-bold" />
                                        <p className="text-[#202124]/40 text-[10px] font-bold tracking-tight font-medium">Yield Signal</p>
                                    </div>
                                    <p className="text-3xl font-sans font-bold text-[#202124] italic">{getVerdict()}</p>
                                </div>
                            </div>

                            <div className="pt-12">
                                <button 
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                                    className="w-full py-6 px-10 bg-white text-[#202124] rounded-[2rem] flex items-center justify-between font-bold hover:bg-accent hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
                                >
                                    <span className="text-lg">Enquire Now for Detailed Monograph</span>
                                    <div className="w-12 h-12 bg-white text-[#202124] rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all">
                                        <ChevronRight size={24} />
                                    </div>
                                </button>
                                <p className="text-center mt-6 text-[10px] text-[#202124]/20 font-bold tracking-tight font-semibold">Secure Ledger Access Protocol v5.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
