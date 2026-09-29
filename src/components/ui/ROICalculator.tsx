import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { CLUSTERS } from '../../lib/clusters';

export const ROICalculator = () => {
    const [selectedProject, setSelectedProject] = useState(CLUSTERS[0]);
    const [selectedConfig, setSelectedConfig] = useState(CLUSTERS[0].configurations[0]);
    const [downPaymentPct, setDownPaymentPct] = useState(20);
    const [tenureYears, setTenureYears] = useState(20);
    const [interestRate, setInterestRate] = useState(8.5);

    // Extract numerical value from price string (e.g., "₹89 Lakhs*" -> 8900000)
    const getBasePrice = (priceStr: string) => {
        const val = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        if (priceStr.toLowerCase().includes('cr')) return val * 10000000;
        if (priceStr.toLowerCase().includes('lac') || priceStr.toLowerCase().includes('lakh')) return val * 100000;
        return val;
    };

    const basePrice = getBasePrice(selectedConfig.price) || 8500000;
    const downPayment = (basePrice * downPaymentPct) / 100;
    const loanAmount = basePrice - downPayment;
    
    // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const emi = loanAmount > 0 
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : 0;

    // ROI Projection (Hinjewadi Historical 12% YoY Appreciation)
    const projectedAppreciation = 0.12;
    const valueIn5Years = basePrice * Math.pow(1 + projectedAppreciation, 5);
    const totalProfit = valueIn5Years - basePrice;

    useEffect(() => {
        if (selectedProject.configurations.length > 0) {
            setSelectedConfig(selectedProject.configurations[0]);
        }
    }, [selectedProject]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Calculator className="text-[#E5C07B]" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Smart Investment Calculator</h3>
                    <p className="text-sm text-white/50">Calculate EMI & Projected Returns</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Select Cluster</label>
                        <select 
                            className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#E5C07B] outline-none transition-colors"
                            value={selectedProject.id}
                            onChange={(e) => setSelectedProject(CLUSTERS.find(c => c.id === e.target.value) || CLUSTERS[0])}
                        >
                            {CLUSTERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Configuration</label>
                        <select 
                            className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#E5C07B] outline-none transition-colors"
                            value={selectedConfig.type}
                            onChange={(e) => setSelectedConfig(selectedProject.configurations.find(c => c.type === e.target.value) || selectedProject.configurations[0])}
                        >
                            {selectedProject.configurations.map(c => <option key={c.type} value={c.type}>{c.type} ({c.size}) - {c.price}</option>)}
                        </select>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Down Payment ({downPaymentPct}%)</label>
                            <span className="text-sm font-bold text-[#E5C07B]">{formatCurrency(downPayment)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="10" max="90" step="5"
                            value={downPaymentPct}
                            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                            className="w-full accent-[#E5C07B]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Tenure (Years)</label>
                            <input 
                                type="number" 
                                value={tenureYears}
                                onChange={(e) => setTenureYears(Number(e.target.value))}
                                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:border-[#E5C07B] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Interest Rate (%)</label>
                            <input 
                                type="number" step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:border-[#E5C07B] outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-white/50 mb-2">
                            <PieChart size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Estimated EMI</span>
                        </div>
                        <div className="text-4xl font-bold font-sans tracking-tight text-white mb-1">
                            {formatCurrency(emi)}<span className="text-lg text-white/40 font-light">/month</span>
                        </div>
                        <div className="text-sm text-white/40">Principal Loan: {formatCurrency(loanAmount)}</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#151515] to-[#1a1a1a] border border-[#E5C07B]/30 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E5C07B]/0 via-[#E5C07B]/5 to-[#E5C07B]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-[#E5C07B]">
                                <TrendingUp size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">5-Year ROI Projection</span>
                            </div>
                            <span className="text-[10px] bg-[#E5C07B]/10 text-[#E5C07B] px-2 py-1 rounded-full font-bold">12% YoY</span>
                        </div>
                        
                        <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                            <div>
                                <div className="text-xs text-white/40 mb-1">Current Value</div>
                                <div className="text-lg font-bold text-white/80">{formatCurrency(basePrice)}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-white/40 mb-1">Projected Value (2031)</div>
                                <div className="text-xl font-bold text-[#E5C07B]">{formatCurrency(valueIn5Years)}</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">Estimated Profit</span>
                            <span className="text-lg font-bold text-green-400">+{formatCurrency(totalProfit)}</span>
                        </div>
                    </div>
                    
                    <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#E5C07B] transition-colors">
                        Download Cost Sheet
                    </button>
                </div>
            </div>
        </div>
    );
};
