export const seoClusters = {
    configurations: [
        { name: "2 BHK Flats in Hinjewadi", slug: "2-bhk-flats-in-hinjewadi" },
        { name: "3 BHK Flats in Mahalunge", slug: "3-bhk-flats-in-mahalunge" },
        { name: "4 BHK Luxury Apartments in Baner", slug: "4-bhk-luxury-apartments-in-baner" },
        { name: "4 BHK Duplex in Pune West", slug: "4-bhk-duplex-in-pune-west" },
        { name: "Premium Skyduplex in Hinjewadi", slug: "premium-skyduplex-in-hinjewadi" },
        { name: "5 BHK Penthouses in Mahalunge", slug: "5-bhk-penthouses-in-mahalunge" },
        { name: "Simplex Homes in Hinjewadi Phase 1", slug: "simplex-homes-in-hinjewadi-phase-1" },
        { name: "Ready Possession 2 BHK in Pune", slug: "ready-possession-2-bhk-in-pune" },
        { name: "Under Construction 3 BHK in Baner", slug: "under-construction-3-bhk-in-baner" },
    ],
    locations: [
        { name: "Real Estate in Hinjewadi", slug: "real-estate-in-hinjewadi" },
        { name: "Property in Mahalunge", slug: "property-in-mahalunge" },
        { name: "Baner Real Estate Market", slug: "baner-real-estate-market" },
        { name: "Flats near Rajiv Gandhi IT Park", slug: "flats-near-rajiv-gandhi-it-park" },
        { name: "Townships in Pune West", slug: "townships-in-pune-west" },
        { name: "Properties near Mumbai-Pune Expressway", slug: "properties-near-mumbai-pune-expressway" },
        { name: "Wakad Residential Projects", slug: "wakad-residential-projects" },
        { name: "Balewadi High Street Properties", slug: "balewadi-high-street-properties" },
    ],
    themes: [
        { name: "Integrated Townships in Pune", slug: "integrated-townships-in-pune" },
        { name: "Gated Communities in Hinjewadi", slug: "gated-communities-in-hinjewadi" },
        { name: "Luxury Real Estate Investment Pune", slug: "luxury-real-estate-investment-pune" },
        { name: "Best Places to Invest in Pune 2026", slug: "best-places-to-invest-in-pune-2026" },
        { name: "Smart Homes in Mahalunge", slug: "smart-homes-in-mahalunge" },
        { name: "Eco-friendly Projects in Pune", slug: "eco-friendly-projects-in-pune" },
        { name: "Kolte Patil Life Republic Reviews", slug: "kolte-patil-life-republic-reviews" },
    ]
};

export const generateLongTailKeywords = () => {
    return [
        ...seoClusters.configurations,
        ...seoClusters.locations,
        ...seoClusters.themes,
    ];
};
