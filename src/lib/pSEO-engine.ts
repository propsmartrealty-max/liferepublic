import { projectsRegistry } from '../data/projects';
import type { Project } from '../lib/types';

export const pSEOMatrix = {
    intents: [
        { key: 'luxury', title: 'Luxury' },
        { key: 'premium', title: 'Premium' },
        { key: 'affordable', title: 'Affordable' },
        { key: 'ready-possession', title: 'Ready Possession' },
        { key: 'under-construction', title: 'Under Construction' },
        { key: 'investment', title: 'Investment' },
        { key: 'new-launch', title: 'New Launch' },
        { key: 'best', title: 'Best' },
        { key: 'top', title: 'Top' },
        { key: 'high-roi', title: 'High ROI' },
        { key: 'residential', title: 'Residential' },
        { key: 'township', title: 'Township' },
        { key: 'pre-launch', title: 'Pre Launch' },
        { key: 'walk-to-work', title: 'Walk to Work' }
    ],
    configurations: [
        { key: '1-bhk-flats', title: '1 BHK Flats', bhk: 1, minPrice: '₹42 Lakhs*', maxPrice: '₹48 Lakhs*', lowPriceNum: 4200000, highPriceNum: 4800000 },
        { key: '2-bhk-flats', title: '2 BHK Flats', bhk: 2, minPrice: '₹62 Lakhs*', maxPrice: '₹85 Lakhs*', lowPriceNum: 6200000, highPriceNum: 8500000 },
        { key: '3-bhk-flats', title: '3 BHK Flats', bhk: 3, minPrice: '₹82 Lakhs*', maxPrice: '₹1.35 Cr*', lowPriceNum: 8200000, highPriceNum: 13500000 },
        { key: '4-bhk-flats', title: '4 BHK Flats', bhk: 4, minPrice: '₹1.45 Cr*', maxPrice: '₹2.20 Cr*', lowPriceNum: 14500000, highPriceNum: 22000000 },
        { key: '5-bhk-flats', title: '5 BHK Flats', bhk: 5, minPrice: '₹3.20 Cr*', maxPrice: '₹5.50 Cr*', lowPriceNum: 32000000, highPriceNum: 55000000 },
        { key: 'duplex', title: 'Duplex Apartments', bhk: 3, minPrice: '₹1.25 Cr*', maxPrice: '₹2.10 Cr*', lowPriceNum: 12500000, highPriceNum: 21000000 },
        { key: 'penthouse', title: 'Penthouses', bhk: 4, minPrice: '₹1.75 Cr*', maxPrice: '₹3.50 Cr*', lowPriceNum: 17500000, highPriceNum: 35000000 },
        { key: 'villas', title: 'Luxury Villas', bhk: 4, minPrice: '₹2.85 Cr*', maxPrice: '₹5.50 Cr*', lowPriceNum: 28500000, highPriceNum: 55000000 },
        { key: 'row-houses', title: 'Row Houses', bhk: 4, minPrice: '₹2.85 Cr*', maxPrice: '₹4.20 Cr*', lowPriceNum: 28500000, highPriceNum: 42000000 },
        { key: 'twin-bungalows', title: 'Twin Bungalows', bhk: 4, minPrice: '₹3.10 Cr*', maxPrice: '₹4.80 Cr*', lowPriceNum: 31000000, highPriceNum: 48000000 },
        { key: 'studio-apartments', title: 'Studio Apartments', bhk: 1, minPrice: '₹38 Lakhs*', maxPrice: '₹45 Lakhs*', lowPriceNum: 3800000, highPriceNum: 4500000 },
        { key: 'plots', title: 'Bungalow Plots', bhk: 0, minPrice: '₹1.25 Cr*', maxPrice: '₹3.50 Cr*', lowPriceNum: 12500000, highPriceNum: 35000000 }
    ],
    locations: [
        { key: 'hinjewadi-phase-1', title: 'Hinjewadi Phase 1', commute: '8 mins (4.5 km)', distance: '4.5 km' },
        { key: 'hinjewadi-phase-2', title: 'Hinjewadi Phase 2', commute: '12 mins (6.0 km)', distance: '6.0 km' },
        { key: 'hinjewadi-phase-3', title: 'Hinjewadi Phase 3', commute: '15 mins (7.5 km)', distance: '7.5 km' },
        { key: 'hinjewadi', title: 'Hinjewadi', commute: '10 mins (5.0 km)', distance: '5.0 km' },
        { key: 'wakad', title: 'Wakad', commute: '12 mins (7.0 km)', distance: '7.0 km' },
        { key: 'baner', title: 'Baner', commute: '18 mins (13.0 km)', distance: '13.0 km' },
        { key: 'balewadi', title: 'Balewadi', commute: '18 mins (12.5 km)', distance: '12.5 km' },
        { key: 'mahalunge', title: 'Mahalunge', commute: '15 mins (9.0 km)', distance: '9.0 km' },
        { key: 'punawale', title: 'Punawale', commute: '8 mins (5.2 km)', distance: '5.2 km' },
        { key: 'tathawade', title: 'Tathawade', commute: '10 mins (6.5 km)', distance: '6.5 km' },
        { key: 'bavdhan', title: 'Bavdhan', commute: '20 mins (16.0 km)', distance: '16.0 km' },
        { key: 'sus', title: 'Sus', commute: '15 mins (10.0 km)', distance: '10.0 km' },
        { key: 'pcmc', title: 'PCMC', commute: '15 mins (11.0 km)', distance: '11.0 km' },
        { key: 'pune-west', title: 'Pune West', commute: '12 mins (6.5 km)', distance: '6.5 km' },
        { key: 'it-park', title: 'Hinjewadi IT Park', commute: '5 mins (3.0 km)', distance: '3.0 km' },
        { key: 'marunji', title: 'Marunji Road', commute: 'Walking Distance (0 km)', distance: '0 km' },
        { key: 'kasarsai', title: 'Kasarsai', commute: '7 mins (4.0 km)', distance: '4.0 km' }
    ],
    entities: [
        { key: 'kolte-patil-life-republic', title: 'Kolte Patil Life Republic' },
        { key: 'life-republic-township', title: 'Life Republic Township' },
        { key: 'atmos', title: 'Atmos' },
        { key: 'aros', title: 'Aros' },
        { key: 'universe', title: 'Universe' },
        { key: 'canvas', title: 'Canvas' },
        { key: '24k-espada', title: '24K Espada' },
        { key: 'echoes', title: 'Echoes' }
    ]
};

export interface SiloFAQ {
    question: string;
    answer: string;
}

export interface SiloData {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    features: string[];
    schemaType: 'Product' | 'RealEstateListing';
    intent: string;
    config: string;
    location: string;
    entity: string;
    priceRangeText: string;
    lowPriceNum: number;
    highPriceNum: number;
    commuteTime: string;
    distance: string;
    matchingProjects: Project[];
    faqs: SiloFAQ[];
}

export const extractSiloData = (slug: string): SiloData | null => {
    const intentMatch = pSEOMatrix.intents.find(i => slug.includes(i.key));
    const configMatch = pSEOMatrix.configurations.find(c => slug.includes(c.key));
    const locationMatch = pSEOMatrix.locations.find(l => slug.includes(l.key));
    const entityMatch = pSEOMatrix.entities.find(e => slug.includes(e.key));

    const intent = intentMatch?.title || 'Premium';
    const config = configMatch?.title || '2 & 3 BHK Flats';
    const location = locationMatch?.title || 'Hinjewadi Pune';
    const entity = entityMatch?.title || 'Kolte Patil Life Republic';
    const commuteTime = locationMatch?.commute || '10 mins to Hinjewadi Phase 1';
    const distance = locationMatch?.distance || '5.0 km';

    const minPrice = configMatch?.minPrice || '₹62 Lakhs*';
    const maxPrice = configMatch?.maxPrice || '₹1.35 Cr*';
    const lowPriceNum = configMatch?.lowPriceNum || 6200000;
    const highPriceNum = configMatch?.highPriceNum || 13500000;
    const priceRangeText = `${minPrice} - ${maxPrice}`;

    // Dynamic Filter for Matching Projects
    const matchingProjects = projectsRegistry.filter(p => {
        if (config.toLowerCase().includes('plot') || config.toLowerCase().includes('villa')) {
            return p.category === 'Plots' || p.category === 'Luxury' || p.title.toLowerCase().includes('plot');
        }
        if (configMatch?.bhk) {
            const bhkStr = `${configMatch.bhk} BHK`;
            return p.features.some(f => f.includes(bhkStr)) || p.description.includes(bhkStr) || p.title.includes(bhkStr);
        }
        return true;
    }).slice(0, 4);

    // Strict Google SERP title: Keep under 60 characters for crisp display without ellipsis
    let metaTitle = `${config} in ${location} | Life Republic`;
    if (metaTitle.length > 60) {
        metaTitle = `${config} in ${location} | Kolte Patil`;
    }
    if (metaTitle.length > 60) {
        metaTitle = `${config} ${location} - Life Republic`;
    }

    const h1 = `${intent} ${config} in ${location}`;
    const metaDescription = `Explore ${intent.toLowerCase()} ${config.toLowerCase()} in ${location} at ${entity}. Prices starting ${minPrice}. 390-acre gated township, RERA verified. Book visit!`;

    const faqs: SiloFAQ[] = [
        {
            question: `What is the price of ${config.toLowerCase()} in ${location} at ${entity}?`,
            answer: `Prices for ${config.toLowerCase()} at ${entity} in ${location} start from ${minPrice} to ${maxPrice}, depending on tower orientation, floor height, and carpet area. Flexible construction-linked payment plans are available.`
        },
        {
            question: `What is the commute time from ${location} to Hinjewadi IT Park?`,
            answer: `The commute from ${location} to Hinjewadi IT Park (Phase 1, 2, and 3) is approximately ${commuteTime} via the 150-ft arterial Spine Road. The upcoming Pune Metro Line 3 further reduces commute times.`
        },
        {
            question: `Is ${entity} MahaRERA approved?`,
            answer: `Yes, all residential clusters at ${entity} are fully registered under MahaRERA (including Qrious: P52100028753, Atmos: P52100049756, Canvas: P52100054789, Aros: P52100030584, and Echoes: P52100051288) with clear legal titles and environmental approvals.`
        },
        {
            question: `What amenities are included with ${intent.toLowerCase()} ${config.toLowerCase()}?`,
            answer: `Residents enjoy full access to the 390-acre township ecosystem, including Crimson Anisha Global School, 3.5-acre Central Park, Olympic swimming pools, multiple clubhouses, high-street retail, and 5-tier round-the-clock security.`
        }
    ];

    const content = `
        <div class="space-y-6">
            <p class="text-base md:text-lg leading-relaxed text-[#5F6368]">
                Looking for <strong>${intent.toLowerCase()} ${config.toLowerCase()}</strong> in <strong>${location}</strong>? 
                <strong>${entity}</strong> presents an exceptional residential address spanning across 390 contiguous acres. 
                Positioned strategically along the thriving Western Pune IT corridor, this landmark development merges natural tranquility with urban convenience.
            </p>

            <h2 class="text-2xl font-bold text-[#202124] tracking-tight">Key Advantages of ${config} in ${location}</h2>
            <ul class="list-disc pl-6 space-y-2 text-[#5F6368]">
                <li><strong>Rapid Commute:</strong> Only ${commuteTime} to major tech headquarters including Infosys, Wipro, TCS, and Cognizant.</li>
                <li><strong>Self-Sustaining Infrastructure:</strong> In-township Anisha Global School, dedicated fire station, wide 150-ft Spine Road, and daily convenience shopping.</li>
                <li><strong>Superior Appreciation:</strong> Hinjewadi properties have exhibited an average annual capital appreciation of 12.4% with gross rental yields between 5.8% and 7.2%.</li>
                <li><strong>Eco-Centric Architecture:</strong> Master-planned by Hafeez Contractor with 70% open green expanses, solar lighting, and dual-pipeline water conservation.</li>
            </ul>

            <h2 class="text-2xl font-bold text-[#202124] tracking-tight mt-8">Configuration & Pricing Matrix</h2>
            <div class="overflow-x-auto my-4">
                <table class="w-full text-left border-collapse border border-gray-200 text-sm">
                    <thead>
                        <tr class="bg-gray-100 text-[#202124]">
                            <th class="p-3 border border-gray-200 font-bold">Typology</th>
                            <th class="p-3 border border-gray-200 font-bold">Price Range</th>
                            <th class="p-3 border border-gray-200 font-bold">Possession Status</th>
                            <th class="p-3 border border-gray-200 font-bold">RERA Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-gray-200 font-medium">${config}</td>
                            <td class="p-3 border border-gray-200 text-[#E5C07B] font-bold">${priceRangeText}</td>
                            <td class="p-3 border border-gray-200 text-[#5F6368]">Ready Possession & New Launches</td>
                            <td class="p-3 border border-gray-200 text-green-600 font-medium">MahaRERA Registered</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="text-sm text-[#5F6368]">
                *Government taxes, stamp duty, and registration charges extra. Pricing is subject to cluster availability and promotional launch benefits.
            </p>
        </div>
    `;

    return {
        h1,
        metaTitle,
        metaDescription,
        content,
        features: [
            `Prime ${location} Connectivity`,
            `Starting from ${minPrice}`,
            `Commute: ${commuteTime}`,
            `100% MahaRERA Registered`,
            `390-Acre Master Township`,
            `High Rental Yield (6%+ Avg)`
        ],
        schemaType: config.toLowerCase().includes('plot') ? 'RealEstateListing' : 'Product',
        intent,
        config,
        location,
        entity,
        priceRangeText,
        lowPriceNum,
        highPriceNum,
        commuteTime,
        distance,
        matchingProjects,
        faqs
    };
};
