import { projectsRegistry } from '../data/projects';
import { CLUSTERS } from '../lib/clusters';
import type { Project } from '../lib/types';

export const pSEOMatrix = {
    intents: [
        { key: 'price', title: 'Price & Cost Sheet', aliases: ['price', 'pricing', 'cost', 'rate', 'rates', 'payment-plan', 'cost-sheet', 'budget', 'emi'] },
        { key: 'floor-plans', title: 'Floor Plans & Layouts', aliases: ['floor-plan', 'floor-plans', 'layout', 'layouts', 'master-plan', 'blueprint', 'carpet-area', 'dimensions'] },
        { key: 'brochure', title: 'Official Brochure PDF', aliases: ['brochure', 'pdf', 'download', 'e-kit', 'brochure-download'] },
        { key: 'rera-number', title: 'MahaRERA Registration & Legal Details', aliases: ['rera', 'maharera', 'rera-number', 'registration', 'legal', 'title', 'sanctioned', 'approved'] },
        { key: 'possession-date', title: 'Possession Date & Construction Status', aliases: ['possession', 'possession-date', 'completion', 'delivery', 'construction-update', 'work-status', 'ready-possession', 'ready-to-move'] },
        { key: 'reviews', title: 'Reviews & Homeowner Ratings', aliases: ['reviews', 'review', 'ratings', 'rating', 'feedback', 'testimonials', 'complaints'] },
        { key: 'contact-number', title: 'Contact Number & Sales Office Desk', aliases: ['contact', 'contact-number', 'phone', 'phone-number', 'sales-office', 'sales-team', 'office-address'] },
        { key: 'site-visit', title: 'VIP Site Visit & Free Cab Booking', aliases: ['site-visit', 'visit', 'vip-visit', 'free-cab', 'appointment', 'inspection'] },
        { key: 'sample-flat', title: 'Sample Flat Video & 360 Walkthrough', aliases: ['sample-flat', 'show-flat', 'model-flat', 'video', 'walkthrough', 'virtual-tour'] },
        { key: 'booking-offers', title: 'Exclusive Booking Offers & Discounts', aliases: ['offers', 'offer', 'discounts', 'discount', 'deals', 'festive-offer', 'pre-launch-offers'] },
        { key: 'luxury', title: 'Luxury Residences', aliases: ['luxury', 'ultra-luxury', 'super-luxury', 'signature', 'premium-luxury'] },
        { key: 'premium', title: 'Premium Lifestyle Apartments', aliases: ['premium', 'executive', 'deluxe'] },
        { key: 'affordable', title: 'Affordable & High-Value Flats', aliases: ['affordable', 'budget', 'cheap', 'low-cost', 'value-for-money'] },
        { key: 'ready-possession', title: 'Ready Possession Flats', aliases: ['ready-possession', 'ready-to-move', 'immediate-possession', 'oc-received'] },
        { key: 'under-construction', title: 'Under Construction Projects', aliases: ['under-construction', 'ongoing', 'in-progress'] },
        { key: 'investment', title: 'High-ROI Investment Properties', aliases: ['investment', 'invest', 'rental-yield', 'high-roi', 'capital-appreciation', 'roi', 'yield'] },
        { key: 'new-launch', title: 'New Launch Phases 2026', aliases: ['new-launch', 'new-project', 'latest-launch', 'just-launched'] },
        { key: 'pre-launch', title: 'Pre-Launch Booking Benefits', aliases: ['pre-launch', 'soft-launch', 'eoi', 'expression-of-interest'] },
        { key: 'best', title: 'Best Rated Properties', aliases: ['best', 'top', 'finest', 'leading', 'number-1', 'top-rated'] },
        { key: 'walk-to-work', title: 'Walk to Work IT Park Homes', aliases: ['walk-to-work', 'it-professionals', 'close-to-office', 'tech-park'] },
        { key: 'township', title: '390-Acre Integrated Township Living', aliases: ['township', 'integrated-township', 'gated-community', 'mega-township'] },
        { key: 'resale', title: 'Resale Properties & Investor Deals', aliases: ['resale', 'second-sale', 'investor-resale'] },
        { key: 'rent', title: 'Flats for Rent & Leasing', aliases: ['rent', 'rental', 'lease', 'tenant', 'to-let'] }
    ],
    configurations: [
        { key: '1-bhk-flats', title: '1 BHK Flats', bhk: 1, minPrice: '₹42 Lakhs*', maxPrice: '₹48 Lakhs*', lowPriceNum: 4200000, highPriceNum: 4800000, aliases: ['1-bhk', '1bhk', '1-bedroom', '1-bhk-flats'] },
        { key: '2-bhk-flats', title: '2 BHK Flats', bhk: 2, minPrice: '₹62 Lakhs*', maxPrice: '₹85 Lakhs*', lowPriceNum: 6200000, highPriceNum: 8500000, aliases: ['2-bhk', '2bhk', '2-bedroom', '2-bhk-flats'] },
        { key: '2.5-bhk-flats', title: '2.5 BHK Flats', bhk: 2.5, minPrice: '₹92 Lakhs*', maxPrice: '₹1.05 Cr*', lowPriceNum: 9200000, highPriceNum: 10500000, aliases: ['2.5-bhk', '2-5-bhk', '2.5bhk', '2-5-bhk-flats'] },
        { key: '3-bhk-flats', title: '3 BHK Flats', bhk: 3, minPrice: '₹98 Lakhs*', maxPrice: '₹1.45 Cr*', lowPriceNum: 9800000, highPriceNum: 14500000, aliases: ['3-bhk', '3bhk', '3-bedroom', '3-bhk-flats'] },
        { key: '3.5-bhk-flats', title: '3.5 BHK Flats', bhk: 3.5, minPrice: '₹1.35 Cr*', maxPrice: '₹1.80 Cr*', lowPriceNum: 13500000, highPriceNum: 18000000, aliases: ['3.5-bhk', '3-5-bhk', '3.5bhk', '3-5-bhk-flats'] },
        { key: '4-bhk-flats', title: '4 BHK Flats', bhk: 4, minPrice: '₹1.65 Cr*', maxPrice: '₹2.40 Cr*', lowPriceNum: 16500000, highPriceNum: 24000000, aliases: ['4-bhk', '4bhk', '4-bedroom', '4-bhk-flats'] },
        { key: '5-bhk-flats', title: '5 BHK Flats', bhk: 5, minPrice: '₹3.20 Cr*', maxPrice: '₹5.50 Cr*', lowPriceNum: 32000000, highPriceNum: 55000000, aliases: ['5-bhk', '5bhk', '5-bedroom', '5-bhk-flats'] },
        { key: 'duplex', title: 'Duplex Apartments', bhk: 3, minPrice: '₹1.45 Cr*', maxPrice: '₹2.25 Cr*', lowPriceNum: 14500000, highPriceNum: 22500000, aliases: ['duplex', 'duplex-apartments', 'duplex-flats'] },
        { key: 'penthouse', title: 'Penthouses', bhk: 4, minPrice: '₹1.85 Cr*', maxPrice: '₹3.80 Cr*', lowPriceNum: 18500000, highPriceNum: 38000000, aliases: ['penthouse', 'penthouses', 'sky-villas'] },
        { key: 'villas', title: 'Luxury Villas', bhk: 4, minPrice: '₹2.85 Cr*', maxPrice: '₹5.50 Cr*', lowPriceNum: 28500000, highPriceNum: 55000000, aliases: ['villas', 'luxury-villas', 'villa', 'bungalow-villas'] },
        { key: 'row-houses', title: 'Row Houses', bhk: 4, minPrice: '₹2.35 Cr*', maxPrice: '₹3.60 Cr*', lowPriceNum: 23500000, highPriceNum: 36000000, aliases: ['row-houses', 'row-house', 'townhouses'] },
        { key: 'twin-bungalows', title: 'Twin Bungalows', bhk: 4, minPrice: '₹2.95 Cr*', maxPrice: '₹4.50 Cr*', lowPriceNum: 29500000, highPriceNum: 45000000, aliases: ['twin-bungalows', 'bungalows', 'independent-bungalows'] },
        { key: 'studio-apartments', title: 'Studio Apartments', bhk: 1, minPrice: '₹38 Lakhs*', maxPrice: '₹45 Lakhs*', lowPriceNum: 3800000, highPriceNum: 4500000, aliases: ['studio-apartments', 'studio', '1-rk', 'rk'] },
        { key: 'plots', title: 'Bungalow Plots', bhk: 0, minPrice: '₹1.25 Cr*', maxPrice: '₹3.50 Cr*', lowPriceNum: 12500000, highPriceNum: 35000000, aliases: ['plots', 'bungalow-plots', 'residential-plots', 'land'] },
        { key: 'commercial-shops', title: 'Commercial Shops & Retail', bhk: 0, minPrice: '₹65 Lakhs*', maxPrice: '₹2.50 Cr*', lowPriceNum: 6500000, highPriceNum: 25000000, aliases: ['commercial-shops', 'shops', 'commercial', 'retail', 'showrooms', 'offices'] }
    ],
    locations: [
        { key: 'hinjewadi-phase-1', title: 'Hinjewadi Phase 1', commute: '5 mins (3.5 km)', distance: '3.5 km', aliases: ['hinjewadi-phase-1', 'phase-1', 'phase1'] },
        { key: 'hinjewadi-phase-2', title: 'Hinjewadi Phase 2', commute: '8 mins (5.0 km)', distance: '5.0 km', aliases: ['hinjewadi-phase-2', 'phase-2', 'phase2'] },
        { key: 'hinjewadi-phase-3', title: 'Hinjewadi Phase 3', commute: '12 mins (7.5 km)', distance: '7.5 km', aliases: ['hinjewadi-phase-3', 'phase-3', 'phase3'] },
        { key: 'hinjewadi-phase-4', title: 'Hinjewadi Phase 4', commute: '8 mins (4.5 km)', distance: '4.5 km', aliases: ['hinjewadi-phase-4', 'phase-4', 'phase4'] },
        { key: 'hinjewadi', title: 'Hinjewadi', commute: '7 mins (4.0 km)', distance: '4.0 km', aliases: ['hinjewadi', 'hinjawadi'] },
        { key: 'marunji', title: 'Marunji Road', commute: '0 mins (Township Gateway)', distance: '0 km', aliases: ['marunji', 'marunji-road'] },
        { key: 'kasarsai', title: 'Kasarsai Dam Corridor', commute: '5 mins (3.0 km)', distance: '3.0 km', aliases: ['kasarsai', 'kasarsai-dam'] },
        { key: 'wakad', title: 'Wakad', commute: '10 mins (6.0 km)', distance: '6.0 km', aliases: ['wakad', 'wakad-road'] },
        { key: 'baner', title: 'Baner', commute: '15 mins (11.0 km)', distance: '11.0 km', aliases: ['baner', 'baner-pashan'] },
        { key: 'balewadi', title: 'Balewadi High Street', commute: '15 mins (10.5 km)', distance: '10.5 km', aliases: ['balewadi', 'balewadi-high-street'] },
        { key: 'mahalunge-maan', title: 'Mahalunge-Maan Hi-Tech City', commute: '5 mins (3.5 km)', distance: '3.5 km', aliases: ['mahalunge-maan', 'hi-tech-city'] },
        { key: 'mahalunge', title: 'Mahalunge', commute: '10 mins (6.5 km)', distance: '6.5 km', aliases: ['mahalunge'] },
        { key: 'punawale', title: 'Punawale', commute: '7 mins (4.5 km)', distance: '4.5 km', aliases: ['punawale'] },
        { key: 'tathawade', title: 'Tathawade', commute: '8 mins (5.5 km)', distance: '5.5 km', aliases: ['tathawade'] },
        { key: 'bavdhan', title: 'Bavdhan', commute: '18 mins (14.0 km)', distance: '14.0 km', aliases: ['bavdhan'] },
        { key: 'sus', title: 'Sus Road', commute: '12 mins (8.5 km)', distance: '8.5 km', aliases: ['sus', 'sus-road'] },
        { key: 'pcmc', title: 'PCMC Industrial Corridor', commute: '12 mins (9.0 km)', distance: '9.0 km', aliases: ['pcmc', 'pimpri', 'chinchwad'] },
        { key: 'pune-west', title: 'Pune West', commute: '10 mins (6.0 km)', distance: '6.0 km', aliases: ['pune-west', 'western-pune', 'pune'] },
        { key: 'it-park', title: 'Rajiv Gandhi Infotech Park', commute: '5 mins (2.8 km)', distance: '2.8 km', aliases: ['it-park', 'infotech-park', 'tech-park', 'tcs-infosys'] },
        { key: 'gahunje', title: 'Gahunje Expressway Corridor', commute: '10 mins (7.0 km)', distance: '7.0 km', aliases: ['gahunje', 'expressway', 'mumbai-pune-expressway'] },
        { key: 'pirangut', title: 'Pirangut Corridor', commute: '15 mins (11.0 km)', distance: '11.0 km', aliases: ['pirangut'] },
        { key: 'ravet', title: 'Ravet', commute: '10 mins (6.8 km)', distance: '6.8 km', aliases: ['ravet'] }
    ],
    entities: [
        { key: 'kolte-patil-life-republic', title: 'Kolte Patil Life Republic', sector: '390-Acre Master Township', rera: 'PM1261012502409', aliases: ['kolte-patil-life-republic', 'kolte-patil', 'life-republic'] },
        { key: 'life-republic-township', title: 'Life Republic Township', sector: 'Integrated Smart Township', rera: 'P52100079424', aliases: ['life-republic-township', 'township'] },
        { key: 'echoes', title: 'Life Republic Echoes', sector: 'Sector R31', rera: 'PM1261012502409', aliases: ['echoes', 'life-republic-echoes', 'r31'] },
        { key: 'duet', title: 'Life Republic Duet', sector: 'Sector R34', rera: 'P52100079424', aliases: ['duet', 'life-republic-duet', 'r34'] },
        { key: 'atmos', title: 'Life Republic Atmos', sector: 'Sector R22', rera: 'P52100049756', aliases: ['atmos', 'life-republic-atmos', 'r22'] },
        { key: 'aros', title: 'Life Republic Aros', sector: 'Sector R1', rera: 'P52100030584', aliases: ['aros', 'life-republic-aros', 'r1-aros'] },
        { key: 'universe', title: 'Life Republic Universe', sector: 'Sector R10', rera: 'P52100027629', aliases: ['universe', 'life-republic-universe', 'r10'] },
        { key: 'canvas', title: 'Life Republic Canvas', sector: 'Sector R9', rera: 'P52100054789', aliases: ['canvas', 'life-republic-canvas', 'r9'] },
        { key: 'qrious', title: 'Life Republic Qrious', sector: 'Sector R2', rera: 'P52100028753', aliases: ['qrious', 'life-republic-qrious', 'r2'] },
        { key: '24k-espada', title: 'Life Republic 24K Espada', sector: 'Sector R24', rera: 'P52100079424', aliases: ['24k-espada', 'espada', 'r24'] },
        { key: 'sound-of-soul', title: 'Life Republic Sound of Soul', sector: 'Sector R25', rera: 'P52100079424', aliases: ['sound-of-soul', 'sos', 'r25'] },
        { key: 'oro-avenue', title: 'Life Republic Oro Avenue', sector: 'Sector R11', rera: 'P52100017116', aliases: ['oro-avenue', 'oro', 'r11'] },
        { key: 'i-towers', title: 'Life Republic I-Towers', sector: 'Sector R3', rera: 'P52100019018', aliases: ['i-towers', 'i-tower', 'itowers', 'r3'] },
        { key: 'nora', title: 'Life Republic Nora Bungalow Plots', sector: 'Sector R17', rera: 'P52100018539', aliases: ['nora', 'nora-plots', 'r17'] },
        { key: 'arezo', title: 'Life Republic Arezo', sector: 'Sector R12', rera: 'P52100020110', aliases: ['arezo', 'r12'] },
        { key: 'first-avenue', title: 'Life Republic First Avenue', sector: 'Sector R1', rera: 'P52100000041', aliases: ['first-avenue', '1st-avenue'] },
        { key: '3rd-avenue', title: 'Life Republic 3rd Avenue', sector: 'Sector R3', rera: 'P52100019018', aliases: ['3rd-avenue', 'third-avenue'] },
        { key: 'villas', title: 'Life Republic Signature Villas', sector: 'Sector R16', rera: 'P52100018539', aliases: ['villas', 'signature-villas'] }
    ]
};

export interface SiloFAQ {
    question: string;
    answer: string;
}

export interface RelatedSearch {
    title: string;
    slug: string;
}

export interface SiloData {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    features: string[];
    schemaType: 'Product' | 'RealEstateListing';
    intent: string;
    intentKey: string;
    config: string;
    configKey: string;
    location: string;
    locationKey: string;
    entity: string;
    entityKey: string;
    sector: string;
    rera: string;
    priceRangeText: string;
    lowPriceNum: number;
    highPriceNum: number;
    commuteTime: string;
    distance: string;
    matchingProjects: Project[];
    faqs: SiloFAQ[];
    relatedSearches: RelatedSearch[];
}

export const extractSiloData = (rawSlug: string): SiloData => {
    // Normalize input: decode, replace spaces/underscores with hyphens, lowercase
    let cleaned = decodeURIComponent(rawSlug || '')
        .toLowerCase()
        .replace(/[\s_+]+/g, '-')
        .replace(/[^a-z0-9-.]/g, '')
        .replace(/-+/g, '-');

    if (!cleaned || cleaned === 'search' || cleaned === 'all') {
        cleaned = 'kolte-patil-life-republic-township-hinjewadi';
    }

    // 1. Match Intent
    let intentMatch = pSEOMatrix.intents.find(i => 
        cleaned.includes(i.key) || i.aliases.some(a => cleaned.includes(a))
    );

    // 2. Match Configuration
    let configMatch = pSEOMatrix.configurations.find(c => 
        cleaned.includes(c.key) || c.aliases.some(a => cleaned.includes(a))
    );

    // 3. Match Location
    let locationMatch = pSEOMatrix.locations.find(l => 
        cleaned.includes(l.key) || l.aliases.some(a => cleaned.includes(a))
    );

    // 4. Match Entity / Cluster
    let entityMatch = pSEOMatrix.entities.find(e => 
        cleaned.includes(e.key) || e.aliases.some(a => cleaned.includes(a))
    );

    // Fallbacks
    const intentObj = intentMatch || { key: 'premium', title: 'Premium Lifestyle Apartments', aliases: [] };
    const configObj = configMatch || { key: '2-bhk-flats', title: '2 & 3 BHK Flats', bhk: 2, minPrice: '₹62 Lakhs*', maxPrice: '₹1.35 Cr*', lowPriceNum: 6200000, highPriceNum: 13500000, aliases: [] };
    const locationObj = locationMatch || { key: 'hinjewadi', title: 'Hinjewadi Pune', commute: '7 mins (4.0 km)', distance: '4.0 km', aliases: [] };
    const entityObj = entityMatch || { key: 'kolte-patil-life-republic', title: 'Kolte Patil Life Republic', sector: '390-Acre Master Township', rera: 'PM1261012502409', aliases: [] };

    const intent = intentObj.title;
    const config = configObj.title;
    const location = locationObj.title;
    const entity = entityObj.title;
    const sector = entityObj.sector;
    const rera = entityObj.rera;
    const commuteTime = locationObj.commute;
    const distance = locationObj.distance;

    const minPrice = configObj.minPrice;
    const maxPrice = configObj.maxPrice;
    const lowPriceNum = configObj.lowPriceNum;
    const highPriceNum = configObj.highPriceNum;
    const priceRangeText = `${minPrice} - ${maxPrice}`;

    // Dynamic H1 & Meta Titles tailored to user search psychology
    let h1 = `${intent} ${config} in ${location}`;
    let metaTitle = `${config} in ${location} | ${entity}`;

    if (intentObj.key === 'price') {
        h1 = `${config} Price List & Payment Plans - ${entity} ${location}`;
        metaTitle = `${config} Price & Cost Sheet | Life Republic Hinjewadi`;
    } else if (intentObj.key === 'floor-plans') {
        h1 = `${config} Floor Plans & Master Layout - ${entity} ${location}`;
        metaTitle = `${config} Floor Plans & Carpet Area | Life Republic`;
    } else if (intentObj.key === 'brochure') {
        h1 = `Download Official ${config} Brochure PDF - ${entity} ${location}`;
        metaTitle = `${config} Brochure PDF Download | Life Republic Hinjewadi`;
    } else if (intentObj.key === 'rera-number') {
        h1 = `${entity} MahaRERA Number & Legal Title Approvals - ${location}`;
        metaTitle = `${entity} MahaRERA Registration & Title | Hinjewadi`;
    } else if (intentObj.key === 'reviews') {
        h1 = `${entity} Homeowner Reviews & Resident Ratings - ${location}`;
        metaTitle = `${entity} Reviews & Ratings (4.9★) | Hinjewadi Pune`;
    } else if (intentObj.key === 'possession-date') {
        h1 = `${config} Possession Dates & Construction Updates - ${entity} ${location}`;
        metaTitle = `${config} Possession Date & Status | Life Republic`;
    } else if (intentObj.key === 'site-visit') {
        h1 = `Book Guided VIP Site Visit for ${config} - ${entity} ${location}`;
        metaTitle = `Book Free Cab Site Visit | Life Republic Hinjewadi`;
    } else if (intentObj.key === 'contact-number') {
        h1 = `Official Sales Office & Direct Contact Desk - ${entity} ${location}`;
        metaTitle = `Official Contact Desk & Sales Office | Life Republic`;
    }

    if (metaTitle.length > 60) {
        metaTitle = `${config} in ${location} | Life Republic`;
    }
    if (metaTitle.length > 60) {
        metaTitle = `${config} ${location} - Kolte Patil`;
    }

    const metaDescription = `Explore ${intent.toLowerCase()} ${config.toLowerCase()} in ${location} at ${entity} (${sector}). Pricing from ${minPrice} to ${maxPrice}. MahaRERA: ${rera}. Instant price sheet & free site visit cab!`.slice(0, 158);

    // Matching Projects from both registries
    const matchingProjects: Project[] = [];
    
    // Check specific cluster first
    const clusterMatch = CLUSTERS.find(c => c.id.toLowerCase() === entityObj.key || c.slug.toLowerCase().includes(entityObj.key));
    if (clusterMatch) {
        const pReg = projectsRegistry.find(p => p.id === clusterMatch.slug || p.id === clusterMatch.id || p.id.includes(clusterMatch.id));
        if (pReg) matchingProjects.push(pReg);
    }

    // Filter remaining projects based on configuration
    projectsRegistry.forEach(p => {
        if (matchingProjects.some(m => m.id === p.id)) return;
        if (configObj.key.includes('plot') || configObj.key.includes('villa')) {
            if (p.category === 'Plots' || p.category === 'Luxury' || p.title.toLowerCase().includes('plot') || p.title.toLowerCase().includes('villa')) {
                matchingProjects.push(p);
            }
        } else if (configObj.bhk) {
            const bhkPattern = `${configObj.bhk} BHK`;
            if (p.features.some(f => f.includes(bhkPattern)) || p.description.includes(bhkPattern) || p.title.includes(bhkPattern)) {
                matchingProjects.push(p);
            }
        } else {
            matchingProjects.push(p);
        }
    });

    const finalProjects = matchingProjects.slice(0, 4);

    // Contextual FAQs
    const faqs: SiloFAQ[] = [
        {
            question: `What is the current starting price for ${config.toLowerCase()} in ${location} at ${entity}?`,
            answer: `Current pricing for ${config.toLowerCase()} at ${entity} (${sector}) starts from ${minPrice} up to ${maxPrice}. Rates vary by tower floor level, balcony orientation, and precise carpet area. Zero brokerage and direct builder payment plans are currently available.`
        },
        {
            question: `What is the official MahaRERA registration number for ${entity}?`,
            answer: `${entity} is 100% legally approved under MahaRERA registration: ${rera}. All project approvals, sanctioned layout plans, and legal title reports can be verified directly on the official MahaRERA portal (maharera.maharashtra.gov.in).`
        },
        {
            question: `What is the actual commute time from ${location} to Hinjewadi Rajiv Gandhi IT Park?`,
            answer: `Commute time from ${location} to Hinjewadi IT Park (Phases 1, 2, and 3) is approximately ${commuteTime} via the 150-ft arterial Spine Road. The operational Pune Metro Line 3 further enhances high-speed connectivity.`
        },
        {
            question: `What educational and lifestyle amenities are inside the township?`,
            answer: `Residents at ${entity} enjoy direct access to the 390-acre township infrastructure, including Crimson Anisha Global School (ICSE/CBSE), the 3.5-acre Central Park, Olympic swimming pools, multipurpose sports arenas, multi-tier security, and in-township retail avenues.`
        },
        {
            question: `How can I schedule a VIP site visit with free pickup and drop facility?`,
            answer: `You can schedule a complimentary VIP site visit with free AC cab pickup and drop across Pune by contacting our authorized sales desk at +91 93705 52525. Guided physical model walkthroughs and sample flat tours are available 7 days a week.`
        }
    ];

    // Related Internal Permutations (PageRank Link Graph)
    const relatedSearches: RelatedSearch[] = [
        {
            title: `1 BHK Flats in ${location}`,
            slug: `affordable-1-bhk-flats-in-${locationObj.key}-kolte-patil-life-republic`
        },
        {
            title: `2 BHK Flats in ${location}`,
            slug: `premium-2-bhk-flats-in-${locationObj.key}-kolte-patil-life-republic`
        },
        {
            title: `3 BHK Luxury Flats in ${location}`,
            slug: `luxury-3-bhk-flats-in-${locationObj.key}-kolte-patil-life-republic`
        },
        {
            title: `4 BHK & Row Houses in ${location}`,
            slug: `luxury-4-bhk-flats-in-${locationObj.key}-kolte-patil-life-republic`
        },
        {
            title: `Ready Possession Flats in ${location}`,
            slug: `ready-possession-2-bhk-flats-in-${locationObj.key}-kolte-patil-life-republic`
        },
        {
            title: `New Launch 2026 at Life Republic Echoes`,
            slug: `new-launch-2.5-bhk-flats-in-hinjewadi-echoes`
        },
        {
            title: `Space-Efficient 2 BHK at Life Republic Duet`,
            slug: `premium-2-bhk-flats-in-hinjewadi-duet`
        },
        {
            title: `High-Rise 3 BHK at Life Republic Atmos`,
            slug: `luxury-3-bhk-flats-in-hinjewadi-atmos`
        },
        {
            title: `Bungalow Plots at Life Republic Nora`,
            slug: `investment-plots-in-hinjewadi-kolte-patil-life-republic`
        },
        {
            title: `Ultra-Luxury Row Houses at 24K Espada`,
            slug: `luxury-row-houses-in-hinjewadi-24k-espada`
        }
    ];

    const content = `
        <div class="space-y-8">
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p class="text-base sm:text-lg leading-relaxed text-[#5F6368] m-0">
                    Searching for <strong>${intent.toLowerCase()} ${config.toLowerCase()}</strong> in <strong>${location}</strong>? 
                    <strong>${entity}</strong> (${sector}) delivers an unmatched residential enclave inside Western Pune's foremost 390-acre gated smart township. 
                    Engineered by <strong>Kolte-Patil Developers Ltd.</strong> with over 3 decades of architectural trust, this development offers optimal spatial layout, zero space wastage, and direct access to IT employment hubs.
                </p>
            </div>

            <h2 class="text-2xl font-bold text-[#202124] tracking-tight">Strategic Advantages of ${config} in ${location}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
                <div class="p-4 bg-white rounded-xl border border-gray-200">
                    <h4 class="font-bold text-sm text-[#202124] mb-1">⚡ Unmatched IT Connectivity</h4>
                    <p class="text-xs text-[#5F6368] m-0">Just ${commuteTime} to Infosys, Wipro, TCS, Cognizant, and Quadron IT Park via 150-ft Spine Road.</p>
                </div>
                <div class="p-4 bg-white rounded-xl border border-gray-200">
                    <h4 class="font-bold text-sm text-[#202124] mb-1">🏫 Complete Social Infrastructure</h4>
                    <p class="text-xs text-[#5F6368] m-0">Walking distance to Crimson Anisha Global School, high-street retail, healthcare clinics, and emergency fire station.</p>
                </div>
                <div class="p-4 bg-white rounded-xl border border-gray-200">
                    <h4 class="font-bold text-sm text-[#202124] mb-1">📈 High Capital Growth & Rental Yield</h4>
                    <p class="text-xs text-[#5F6368] m-0">Consistent 12.4% annual capital appreciation in Hinjewadi corridor with commanding 5.5% - 7.2% rental yields from 300,000+ tech workforce.</p>
                </div>
                <div class="p-4 bg-white rounded-xl border border-gray-200">
                    <h4 class="font-bold text-sm text-[#202124] mb-1">🛡️ 100% Legal MahaRERA Transparency</h4>
                    <p class="text-xs text-[#5F6368] m-0">Clear title deeds, sanctioned building plans, environmental clearances, and MahaRERA ID: ${rera}.</p>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-[#202124] tracking-tight mt-8">Official Configuration & Pricing Breakdown (2026)</h2>
            <div class="overflow-x-auto my-4 not-prose">
                <table class="w-full text-left border-collapse border border-gray-200 text-sm rounded-xl overflow-hidden shadow-sm">
                    <thead>
                        <tr class="bg-gray-100 text-[#202124]">
                            <th class="p-3.5 border border-gray-200 font-bold">Typology</th>
                            <th class="p-3.5 border border-gray-200 font-bold">Price Range</th>
                            <th class="p-3.5 border border-gray-200 font-bold">Carpet Area</th>
                            <th class="p-3.5 border border-gray-200 font-bold">MahaRERA Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white hover:bg-gray-50/50">
                            <td class="p-3.5 border border-gray-200 font-bold text-[#202124]">${config}</td>
                            <td class="p-3.5 border border-gray-200 text-emerald-700 font-bold">${priceRangeText}</td>
                            <td class="p-3.5 border border-gray-200 text-[#5F6368]">Spacious & Ergonomic</td>
                            <td class="p-3.5 border border-gray-200 text-emerald-600 font-medium">${rera}</td>
                        </tr>
                        <tr class="bg-gray-50/30">
                            <td class="p-3.5 border border-gray-200 font-medium">1 BHK Smart Residences</td>
                            <td class="p-3.5 border border-gray-200 font-semibold">₹42 - 48 Lakhs*</td>
                            <td class="p-3.5 border border-gray-200 text-[#5F6368]">450 - 480 sq.ft.</td>
                            <td class="p-3.5 border border-gray-200 text-emerald-600">Registered</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="p-3.5 border border-gray-200 font-medium">2 BHK Premium Flats</td>
                            <td class="p-3.5 border border-gray-200 font-semibold">₹62 - 85 Lakhs*</td>
                            <td class="p-3.5 border border-gray-200 text-[#5F6368]">680 - 820 sq.ft.</td>
                            <td class="p-3.5 border border-gray-200 text-emerald-600">Registered</td>
                        </tr>
                        <tr class="bg-gray-50/30">
                            <td class="p-3.5 border border-gray-200 font-medium">3 BHK Luxury Residences</td>
                            <td class="p-3.5 border border-gray-200 font-semibold">₹98 Lakhs - 1.45 Cr*</td>
                            <td class="p-3.5 border border-gray-200 text-[#5F6368]">980 - 1,250 sq.ft.</td>
                            <td class="p-3.5 border border-gray-200 text-emerald-600">Registered</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-[#5F6368] italic">
                *Government stamp duty, GST, and registration charges applicable as per statutory norms. Special builder subsidies and customized payment milestones available for early bookings.
            </p>
        </div>
    `;

    return {
        h1,
        metaTitle,
        metaDescription,
        content,
        features: [
            `Prime ${location} IT Proximity (${commuteTime})`,
            `Starting from ${minPrice}`,
            `Official MahaRERA: ${rera}`,
            `150-ft Arterial Spine Road Direct Access`,
            `390-Acre Master Township Infrastructure`,
            `Rental Yield 5.5% - 7.2% for IT Professionals`
        ],
        schemaType: configObj.key.includes('plot') ? 'RealEstateListing' : 'Product',
        intent,
        intentKey: intentObj.key,
        config,
        configKey: configObj.key,
        location,
        locationKey: locationObj.key,
        entity,
        entityKey: entityObj.key,
        sector,
        rera,
        priceRangeText,
        lowPriceNum,
        highPriceNum,
        commuteTime,
        distance,
        matchingProjects: finalProjects,
        faqs,
        relatedSearches
    };
};
