import { useState, useEffect } from 'react';

export interface NRIData {
    isNRI: boolean;
    country: string;
    currency: string;
    symbol: string;
    rate: number; // INR per 1 unit of foreign currency
}

const CURRENCY_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
    'USD': { symbol: '$', rate: 85.0, label: 'USD ($)' },
    'AED': { symbol: 'AED ', rate: 23.1, label: 'AED (د.إ)' },
    'GBP': { symbol: '£', rate: 108.5, label: 'GBP (£)' },
    'EUR': { symbol: '€', rate: 92.5, label: 'EUR (€)' },
    'SGD': { symbol: 'S$', rate: 64.2, label: 'SGD (S$)' },
    'CAD': { symbol: 'C$', rate: 62.0, label: 'CAD (C$)' },
    'AUD': { symbol: 'A$', rate: 55.5, label: 'AUD (A$)' }
};

export function getNRIData(): NRIData {
    if (typeof document === 'undefined') {
        return { isNRI: false, country: 'IN', currency: 'INR', symbol: '₹', rate: 1.0 };
    }

    const nriMeta = document.querySelector('meta[name="nri-visitor"]')?.getAttribute('content');
    const countryMeta = document.querySelector('meta[name="visitor-country"]')?.getAttribute('content') || 'IN';
    const currencyMeta = document.querySelector('meta[name="preferred-currency"]')?.getAttribute('content') || 'INR';

    const isNRI = nriMeta === 'true' || countryMeta !== 'IN';
    const currency = isNRI ? (currencyMeta !== 'INR' ? currencyMeta : 'USD') : 'INR';
    const info = CURRENCY_RATES[currency] || CURRENCY_RATES['USD'];

    return {
        isNRI,
        country: countryMeta,
        currency,
        symbol: isNRI ? info.symbol : '₹',
        rate: isNRI ? info.rate : 1.0
    };
}

export function convertINRToForeign(inrText: string, currency = 'USD'): string {
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES['USD'];
    
    // Parse lakhs / crores
    let numINR = 0;
    const cleanText = inrText.replace(/,/g, '').toLowerCase();

    if (cleanText.includes('cr')) {
        const val = parseFloat(cleanText.replace(/[^0-9.]/g, ''));
        if (!isNaN(val)) numINR = val * 10000000;
    } else if (cleanText.includes('lakh')) {
        const val = parseFloat(cleanText.replace(/[^0-9.]/g, ''));
        if (!isNaN(val)) numINR = val * 100000;
    }

    if (numINR === 0) return '';

    const converted = Math.round(numINR / config.rate);
    return `~${config.symbol}${converted.toLocaleString('en-US')}`;
}

export function useNRI() {
    const [nriData, setNriData] = useState<NRIData>({
        isNRI: false,
        country: 'IN',
        currency: 'INR',
        symbol: '₹',
        rate: 1.0
    });

    useEffect(() => {
        setNriData(getNRIData());
    }, []);

    return {
        ...nriData,
        convertPrice: (inrText: string) => convertINRToForeign(inrText, nriData.currency),
        setCurrency: (curr: string) => {
            if (CURRENCY_RATES[curr]) {
                setNriData(prev => ({
                    ...prev,
                    currency: curr,
                    symbol: CURRENCY_RATES[curr].symbol,
                    rate: CURRENCY_RATES[curr].rate
                }));
            }
        }
    };
}
