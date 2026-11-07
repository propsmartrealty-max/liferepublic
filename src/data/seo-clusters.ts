export const seoClusters = {
    configurations: [
        { name: "Kolte Patil Life Republic 2 BHK Flats", slug: "2-bhk-flats-in-hinjewadi" },
        { name: "Kolte Patil Life Republic 3 BHK Luxury Residences", slug: "3-bhk-flats-in-hinjewadi" },
        { name: "Kolte Patil Life Republic 4 BHK Luxury Apartments", slug: "4-bhk-flats-in-hinjewadi" },
        { name: "Kolte Patil Life Republic 24K Espada Row Houses", slug: "row-houses-in-life-republic" },
        { name: "Kolte Patil Life Republic Signature Villas", slug: "luxury-villas-near-hinjewadi" },
        { name: "Kolte Patil Life Republic Nora Bungalow Plots", slug: "plots-in-hinjewadi" },
        { name: "Ready Possession Flats in Life Republic", slug: "ready-possession-2-bhk-in-pune" },
        { name: "Under Construction 3 BHK in Atmos & Aros", slug: "under-construction-3-bhk-in-baner" },
        { name: "New Launch Echoes 2 & 2.5 BHK Hinjewadi", slug: "kolte-patil-life-republic-echoes" }
    ],
    locations: [
        { name: "Kolte Patil Life Republic Hinjewadi Phase 1", slug: "flats-near-hinjewadi-phase-1" },
        { name: "Kolte Patil Life Republic Marunji Road Gateway", slug: "flats-near-marunji" },
        { name: "Kolte Patil Life Republic Rajiv Gandhi IT Park", slug: "flats-near-rajiv-gandhi-it-park" },
        { name: "Kolte Patil Life Republic Near Hinjewadi Metro Line 3", slug: "properties-near-mumbai-pune-expressway" },
        { name: "Kolte Patil Life Republic Near Wakad Corridor", slug: "flats-near-wakad" },
        { name: "Kolte Patil Life Republic Near Tathawade Hub", slug: "flats-near-tathawade" },
        { name: "Kolte Patil Life Republic Near Punawale", slug: "flats-near-punawale" }
    ],
    themes: [
        { name: "Kolte Patil Life Republic 390-Acre Master Township", slug: "integrated-townships-in-pune" },
        { name: "Kolte Patil Life Republic Price List 2026", slug: "kolte-patil-life-republic-price" },
        { name: "Kolte Patil Life Republic Floor Plans & Layouts", slug: "floor-plans-life-republic" },
        { name: "Kolte Patil Life Republic Sales Office & VIP Visit", slug: "contact" },
        { name: "Kolte Patil Life Republic MahaRERA Title Approvals", slug: "rera-number-life-republic" },
        { name: "Kolte Patil Life Republic Resident Reviews (4.9★)", slug: "kolte-patil-life-republic-reviews" },
        { name: "Crimson Anisha Global School Life Republic", slug: "township-guide" }
    ]
};

export const generateLongTailKeywords = () => {
    return [
        ...seoClusters.configurations,
        ...seoClusters.locations,
        ...seoClusters.themes,
    ];
};
