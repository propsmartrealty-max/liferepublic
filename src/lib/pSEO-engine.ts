export const pSEOMatrix = {
    intents: [
        { key: 'luxury', title: 'Luxury' },
        { key: 'premium', title: 'Premium' },
        { key: 'affordable', title: 'Affordable' },
        { key: 'ready-possession', title: 'Ready Possession' },
        { key: 'under-construction', title: 'Under Construction' },
        { key: 'investment', title: 'Investment' },
        { key: 'new-launch', title: 'New Launch' },
        { key: 'walk-to-work', title: 'Walk to Work' }
    ],
    configurations: [
        { key: '2-bhk-flats', title: '2 BHK Flats' },
        { key: '3-bhk-flats', title: '3 BHK Flats' },
        { key: '4-bhk-flats', title: '4 BHK Flats' },
        { key: 'duplex', title: 'Duplex' },
        { key: 'penthouse', title: 'Penthouses' },
        { key: 'villas', title: 'Villas' },
        { key: 'row-houses', title: 'Row Houses' },
        { key: 'plots', title: 'Plots' }
    ],
    locations: [
        { key: 'hinjewadi', title: 'Hinjewadi' },
        { key: 'wakad', title: 'Wakad' },
        { key: 'baner', title: 'Baner' },
        { key: 'mahalunge', title: 'Mahalunge' },
        { key: 'pcmc', title: 'PCMC' },
        { key: 'tathawade', title: 'Tathawade' },
        { key: 'pune-west', title: 'Pune West' },
        { key: 'it-park', title: 'IT Park' }
    ],
    entities: [
        { key: 'kolte-patil-life-republic', title: 'Kolte Patil Life Republic' },
        { key: 'atmos', title: 'Atmos' },
        { key: 'aros', title: 'Aros' },
        { key: 'universe', title: 'Universe' },
        { key: 'canvas', title: 'Canvas' },
        { key: '24k-espada', title: '24K Espada' }
    ]
};

export interface SiloData {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    features: string[];
    schemaType: string;
}

export const extractSiloData = (slug: string): SiloData | null => {
    // Example slug: luxury-3-bhk-flats-in-hinjewadi-kolte-patil-life-republic
    
    const intentMatch = pSEOMatrix.intents.find(i => slug.includes(i.key));
    const configMatch = pSEOMatrix.configurations.find(c => slug.includes(c.key));
    const locationMatch = pSEOMatrix.locations.find(l => slug.includes(l.key));
    const entityMatch = pSEOMatrix.entities.find(e => slug.includes(e.key));

    // Fallbacks if not perfectly matched
    const intent = intentMatch?.title || 'Premium';
    const config = configMatch?.title || 'Properties';
    const location = locationMatch?.title || 'Pune West';
    const entity = entityMatch?.title || 'Kolte Patil Life Republic';

    const h1 = `${intent} ${config} in ${location} | ${entity}`;
    
    return {
        h1,
        metaTitle: `${h1} - Exclusive Deals & Price List`,
        metaDescription: `Discover ${intent.toLowerCase()} ${config.toLowerCase()} in ${location}. ${entity} offers the best ROI and lifestyle amenities. Get the latest price sheet and book a site visit today.`,
        content: `
            <p class="mb-4">
                The real estate market in <strong>${location}</strong> is experiencing unprecedented growth, making it the perfect time to invest in <strong>${config}</strong>. With the rise of IT hubs and commercial infrastructure, properties like <strong>${entity}</strong> offer both incredible lifestyle benefits and high appreciation potential.
            </p>
            <h2 class="text-2xl font-serif font-bold mt-8 mb-4">Why choose ${intent} ${config} here?</h2>
            <p class="mb-4">
                Whether you are looking for a primary residence or a high-yield investment, ${entity} provides world-class amenities designed for the modern urban dweller. The connectivity from ${location} to major highways and upcoming metro stations ensures that you are always close to the action while enjoying a serene, green environment.
            </p>
        `,
        features: [
            `Prime Location in ${location}`,
            `Exclusive ${intent} Specifications`,
            `High ROI for ${config}`,
            `Signature ${entity} Quality`
        ],
        schemaType: config.includes('Plots') ? 'RealEstateListing' : 'Product'
    };
};
