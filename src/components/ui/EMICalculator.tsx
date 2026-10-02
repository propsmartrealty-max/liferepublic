import React, { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, ArrowRight, IndianRupee, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface EMICalculatorProps {
    initialAmount?: number;
    clusterName?: string;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ 
    initialAmount = 7500000, 
    clusterName = 'Life Republic' 
}) => {
    const [loanAmount, setLoanAmount] = useState<number>(initialAmount);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenureYears, setTenureYears] = useState<number>(20);

    const calculations = useMemo(() => {
        const principal = loanAmount;
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = tenureYears * 12;

        if (monthlyRate === 0) {
            return {
                emi: Math.round(principal / totalMonths),
                totalInterest: 0,
                totalAmount: principal,
                principalPercent: 100,
                interestPercent: 0,
                annualTaxSaving: 75000
            };
        }

        const emi = Math.round(
            (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        );

        const totalAmount = emi * totalMonths;
        const totalInterest = totalAmount - principal;

        const principalPercent = Math.round((principal / totalAmount) * 100);
        const interestPercent = 100 - principalPercent;

        // Tax Savings calculation: Section 80C (up to 1.5L) + Section 24b (up to 2.0L interest) at 30% slab
        const annualInterest = Math.min(principal * (interestRate / 100), 200000);
        const annualPrincipal = Math.min(emi * 12 - annualInterest, 150000);
        const annualTaxSaving = Math.round((annualInterest + annualPrincipal) * 0.312); // with 4% cess

        return {
            emi,
            totalInterest,
            totalAmount,
            principalPercent,
            interestPercent,
            annualTaxSaving
        };
    }, [loanAmount, interestRate, tenureYears]);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) {
            return `₹${(val / 10000000).toFixed(2)} Cr`;
        }
        if (val >= 100000) {
            return `₹${(val / 100000).toFixed(2)} Lakhs`;
        }
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const handleApplyLoan = () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', {
            detail: {
                project: clusterName,
                type: `Home Loan Pre-Approval (${formatCurrency(loanAmount)} @ ${interestRate}%)`
            }
        }));
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg my-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Calculator size={22} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg sm:text-xl text-[#202124]">
                            Mortgage EMI & Affordability Calculator
                        </h3>
                        <p className="text-xs text-[#5F6368]">
                            Calculate monthly commitments, interest amortizations, and tax incentives
                        </p>
                    </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                    <ShieldCheck size={14} /> SBI, HDFC & ICICI Pre-Approved
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Interactive Sliders (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Loan Amount */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-[#202124] uppercase tracking-wide">
                                Desired Home Loan Amount
                            </label>
                            <span className="text-sm font-bold text-emerald-700 px-3 py-1 bg-emerald-50 rounded-lg">
                                {formatCurrency(loanAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={2000000}
                            max={35000000}
                            step={250000}
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                            <span>₹20 Lakhs</span>
                            <span>₹1.50 Cr</span>
                            <span>₹3.50 Cr</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-[#202124] uppercase tracking-wide">
                                Annual Interest Rate (%)
                            </label>
                            <span className="text-sm font-bold text-amber-700 px-3 py-1 bg-amber-50 rounded-lg">
                                {interestRate.toFixed(2)}% p.a.
                            </span>
                        </div>
                        <input
                            type="range"
                            min={7.5}
                            max={11.0}
                            step={0.1}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                            <span>7.5% (Prime)</span>
                            <span>8.5% (Standard)</span>
                            <span>11.0%</span>
                        </div>
                    </div>

                    {/* Loan Tenure */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-[#202124] uppercase tracking-wide">
                                Repayment Tenure (Years)
                            </label>
                            <span className="text-sm font-bold text-blue-700 px-3 py-1 bg-blue-50 rounded-lg">
                                {tenureYears} Years ({tenureYears * 12} Months)
                            </span>
                        </div>
                        <input
                            type="range"
                            min={5}
                            max={30}
                            step={1}
                            value={tenureYears}
                            onChange={(e) => setTenureYears(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                            <span>5 Years</span>
                            <span>15 Years</span>
                            <span>30 Years</span>
                        </div>
                    </div>
                </div>

                {/* Calculation Summary Card (5 cols) */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#151822] to-[#0f172a] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        Estimated Monthly EMI
                    </div>
                    <div className="text-3xl sm:text-4xl font-sans font-bold text-amber-400 mb-4 flex items-center">
                        <IndianRupee size={28} />
                        {calculations.emi.toLocaleString('en-IN')}
                        <span className="text-xs text-gray-400 font-normal ml-1.5">/ month</span>
                    </div>

                    {/* Breakdown Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-[11px] text-gray-300 mb-1.5">
                            <span>Principal: {calculations.principalPercent}%</span>
                            <span>Interest: {calculations.interestPercent}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden flex">
                            <div 
                                style={{ width: `${calculations.principalPercent}%` }} 
                                className="bg-emerald-500 h-full" 
                            />
                            <div 
                                style={{ width: `${calculations.interestPercent}%` }} 
                                className="bg-amber-500 h-full" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-300 border-t border-gray-800 pt-3 mb-4">
                        <div className="flex justify-between">
                            <span>Total Interest Payable:</span>
                            <span className="font-semibold text-white">{formatCurrency(calculations.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Repayment Amount:</span>
                            <span className="font-semibold text-white">{formatCurrency(calculations.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-medium">
                            <span className="flex items-center gap-1">
                                <Sparkles size={12} /> Annual Tax Deduction:
                            </span>
                            <span className="font-bold">~₹{calculations.annualTaxSaving.toLocaleString('en-IN')}/yr</span>
                        </div>
                    </div>

                    <Button
                        onClick={handleApplyLoan}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
                    >
                        Apply for Pre-Approved Home Loan <ArrowRight size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
