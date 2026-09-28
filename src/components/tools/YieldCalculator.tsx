import React, { useState, useMemo } from 'react';
import { Percent, Home, Wallet, Info, ArrowRight } from 'lucide-react';

export const YieldCalculator: React.FC = () => {
    const [investment, setInvestment] = useState(8500000);
    const [monthlyRent, setMonthlyRent] = useState(25000);
    const [appreciation, setAppreciation] = useState(8); // 8% per year
    const [years, setYears] = useState(5);

    const metrics = useMemo(() => {
        const annualRent = monthlyRent * 12;
        const grossYield = (annualRent / investment) * 100;
        
        // Net ROI Calculation
        const maintenance = annualRent * 0.1; // 10% for maintenance/taxes
        const netAnnualRent = annualRent - maintenance;
        const capitalAppreciation = investment * (Math.pow(1 + appreciation / 100, years) - 1);
        const totalProfit = (netAnnualRent * years) + capitalAppreciation;
        const totalROI = (totalProfit / investment) * 100;

        return {
            grossYield: grossYield.toFixed(2),
            capitalGains: Math.round(capitalAppreciation).toLocaleString(),
            totalReturn: Math.round(totalProfit).toLocaleString(),
            overallROI: totalROI.toFixed(1)
        };
    }, [investment, monthlyRent, appreciation, years]);

    return (
        <section className="py-12 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-[#202124] rounded-full text-xs font-bold tracking-tight font-medium mb-6 border border-[#DADCE0]">
                        <Percent size={14} className="text-[#1a73e8]" /> Sovereign Yield Analytics
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#202124] mb-6">Investment Yield & ROI Simulator</h2>
                    <p className="text-[#202124]/60 max-w-2xl mx-auto text-lg">
                        Simulate your wealth growth in the Life Republic ecosystem. Calculate direct rental yields and long-term capital appreciation for Hinjewadi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Controls */}
                    <div className="bg-[#151822] border border-[#DADCE0]/5 backdrop-blur-xl p-10 rounded-[24px] border border-[#DADCE0] space-y-8">
                        <div>
                            <label className="block text-[#202124]/60 text-sm font-bold tracking-tight font-medium mb-4 flex justify-between">
                                Capital Investment <span>₹ {(investment / 100000).toFixed(1)} L</span>
                            </label>
                            <input 
                                type="range" 
                                min="5000000" 
                                max="25000000" 
                                step="500000"
                                value={investment}
                                onChange={(e) => setInvestment(Number(e.target.value))}
                                className="w-full h-2 bg-[#151822] border border-[#DADCE0]/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        <div>
                            <label className="block text-[#202124]/60 text-sm font-bold tracking-tight font-medium mb-4 flex justify-between">
                                Monthly Rental Projection <span>₹ {monthlyRent.toLocaleString()}</span>
                            </label>
                            <input 
                                type="range" 
                                min="15000" 
                                max="100000" 
                                step="1000"
                                value={monthlyRent}
                                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                                className="w-full h-2 bg-[#151822] border border-[#DADCE0]/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        <div>
                            <label className="block text-[#202124]/60 text-sm font-bold tracking-tight font-medium mb-4 flex justify-between">
                                Annual Appreciation <span>{appreciation}%</span>
                            </label>
                            <input 
                                type="range" 
                                min="5" 
                                max="15" 
                                step="0.5"
                                value={appreciation}
                                onChange={(e) => setAppreciation(Number(e.target.value))}
                                className="w-full h-2 bg-[#151822] border border-[#DADCE0]/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        <div>
                            <label className="block text-[#202124]/60 text-sm font-bold tracking-tight font-medium mb-4 flex justify-between">
                                Horizon (Years) <span>{years} Yrs</span>
                            </label>
                            <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                step="1"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-[#151822] border border-[#DADCE0]/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>
                    </div>

                    {/* Results Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-[#151822] border border-[#DADCE0] rounded-[24px] flex flex-col justify-between hover:shadow-2xl transition-all group">
                            <div>
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-[#1a73e8] mb-4 group-hover:bg-accent group-hover:text-[#202124] transition-all">
                                    <Percent size={24} />
                                </div>
                                <div className="text-[#202124]/60 text-xs font-bold tracking-tight font-medium mb-2">Annual Rental Yield</div>
                                <div className="text-4xl font-sans font-bold text-[#202124]">{metrics.grossYield}%</div>
                            </div>
                            <div className="pt-4 border-t border-[#DADCE0] mt-4 text-[10px] text-[#5F6368] font-bold tracking-tight font-medium flex items-center gap-2">
                                <Info size={12} /> Target: 4.5%+
                            </div>
                        </div>

                        <div className="p-8 bg-accent rounded-[24px] text-[#202124] flex flex-col justify-between hover:scale-[1.02] transition-all">
                            <div>
                                <div className="w-12 h-12 bg-[#151822] border border-[#DADCE0]/20 rounded-2xl flex items-center justify-center text-[#202124] mb-4">
                                    <Home size={24} />
                                </div>
                                <div className="text-[#202124]/60 text-xs font-bold tracking-tight font-medium mb-2">Capital Gains</div>
                                <div className="text-3xl font-sans font-bold">₹ {metrics.capitalGains}</div>
                            </div>
                            <div className="pt-4 border-t border-[#DADCE0] mt-4 text-[10px] text-[#202124]/40 font-bold tracking-tight font-medium">
                                Est. Appreciation
                            </div>
                        </div>

                        <div className="p-8 bg-[#151822] border border-[#DADCE0] rounded-[24px] flex flex-col justify-between md:col-span-2 shadow-xl">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <div className="text-[#202124]/60 text-xs font-bold tracking-tight font-medium mb-2">Total Estimated Profit</div>
                                    <div className="text-5xl font-sans font-bold text-[#202124]">₹ {metrics.totalReturn}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[#1a73e8] text-5xl font-sans font-bold mb-1">{metrics.overallROI}%</div>
                                    <div className="text-[#202124]/40 text-[10px] font-bold tracking-tight font-medium">Growth Over {years} Yrs</div>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                                className="mt-8 w-full py-4 bg-white text-[#202124] rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all"
                            >
                                <Wallet size={18} /> Request Professional ROI Audit <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
