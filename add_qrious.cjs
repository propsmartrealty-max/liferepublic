const fs = require('fs');

let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Fix Nora Sector
content = content.replace(/location: 'Sector R11 \(Nora\)'/g, "location: 'Sector R17 (Nora)'");
content = content.replace(/'Sector R11'/g, "'Sector R17'");

// Fix Arezo Sector
content = content.replace(/location: '.*?\(Arezo\)'/g, "location: 'Sector R16 (Arezo)'");
if(!content.includes("Sector R16 (Arezo)")) {
   // If the location didn't have "(Arezo)" explicitly, just try finding Arezo title and replacing its location
   content = content.replace(/title: 'Kolte Patil Life Republic Arezo \| Efficient 2 BHK Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: '.*?',/g, "title: 'Kolte Patil Life Republic Arezo | Efficient 2 BHK Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R16 (Arezo)',");
}

// Fix First Avenue Sector
content = content.replace(/title: 'Kolte Patil Life Republic First Avenue \| Premium 2 & 3 BHK Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: '.*?',/g, "title: 'Kolte Patil Life Republic First Avenue | Premium 2 & 3 BHK Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R1 (First Avenue)',");

// Fix ORO Avenue Sector
content = content.replace(/title: 'Kolte Patil Life Republic ORO Avenue \| Smart 1 & 2 BHK Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: '.*?',/g, "title: 'Kolte Patil Life Republic ORO Avenue | Smart 1 & 2 BHK Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R9 (ORO Avenue)',");

// Fix i-Towers Sector
content = content.replace(/title: 'Kolte Patil Life Republic i-Towers \| Smart Tech Homes Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: '.*?',/g, "title: 'Kolte Patil Life Republic i-Towers | Smart Tech Homes Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R7 (i-Towers)',");

// Add Qrious if not exists
if (!content.includes('kolte-patil-life-republic-qrious')) {
    const qriousData = `
    {
        id: 'kolte-patil-life-republic-qrious',
        title: 'Kolte Patil Life Republic Qrious | Premium 2 & 3 BHK Hinjewadi',
        category: 'Lifestyle',
        location: 'Sector R (Qrious)',
        price: '₹78 Lakhs*',
        image: '/images/projects/better-living-img.jpg',
        description: 'Discover Qrious at Kolte Patil Life Republic Township. A premium 7.58-acre residential enclave offering high-rise luxury towers and an exclusive 19,000 sq.ft. Q Club.',
        features: ['2 & 3 BHK', 'Under Construction', '19,000 sq.ft. Club'],
        overview: 'Kolte Patil Life Republic Qrious offers an unparalleled living experience with G+25/26 high-rise towers. Enjoy panoramic views, 50+ lifestyle amenities, and intelligent floor layouts.',
        amenities: ['Q Club (19,000 sq.ft.)', 'Infinity Edge Swimming Pool', 'Yoga Deck', 'Sports Courts', 'Kids Play Area', 'Gymnasium'],
        masterLayout: '/images/projects/walkthrough.jpg',
        floorPlans: [
            { type: '2 BHK', size: '796 - 900 sq.ft.', image: '/images/projects/better-living-img.jpg', details: ['Carpet Area: 796-900 sq.ft.', 'Modern Layout', 'Spacious Balcony'] },
            { type: '3 BHK', size: '1100 - 1231 sq.ft.', image: '/images/projects/better-living-img.jpg', details: ['Carpet Area: 1100-1231 sq.ft.', 'Grand Living Space', 'Premium Finishes'] }
        ],
        specifications: [
            { title: 'Structure', items: ['G+26 Storey High-Rise', 'Earthquake Resistant', '5 High Speed Lifts per tower'] },
            { title: 'Finishes', items: ['Premium Vitrified Tiles', 'Anti-skid flooring in baths', 'Branded Sanitaryware'] }
        ],
        faqs: [
            { question: "What is the starting price of Qrious?", answer: "Prices at Qrious start from approximately ₹78 Lakhs* for a 2 BHK." },
            { question: "When is the possession?", answer: "The targeted possession for Qrious is December 2029." }
        ],
        themeColor: '#4f46e5'
    }
];`;
    // Replace the final bracket with Qrious
    content = content.replace(/];[\s\n]*$/, ',' + qriousData);
}

fs.writeFileSync(file, content);
