const fs = require('fs');

let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('kolte-patil-life-republic-3rd-avenue')) {
    const thirdAvenueData = `
    {
        id: 'kolte-patil-life-republic-3rd-avenue',
        title: 'Kolte Patil Life Republic 3rd Avenue | 1 & 2 BHK Hinjewadi',
        category: 'Lifestyle',
        location: 'Sector R3 (3rd Avenue)',
        price: 'Sold Out',
        image: '/images/projects/better-living-img.jpg',
        description: 'Explore 3rd Avenue at Kolte Patil Life Republic Township. Established 1 and 2 BHK residences featuring robust community living and immediate access to township amenities.',
        features: ['1 & 2 BHK', 'Ready to Move', 'Established Community'],
        overview: '3rd Avenue is one of the foundational sectors of the Kolte Patil Life Republic Township, providing residents with fully established infrastructural benefits and an active community lifestyle.',
        amenities: ['Clubhouse', 'Swimming Pool', 'Landscaped Gardens', 'Children Play Area', '24/7 Security'],
        masterLayout: '/images/projects/walkthrough.jpg',
        floorPlans: [
            { type: '1 BHK', size: '450 sq.ft.', image: '/images/projects/better-living-img.jpg', details: ['Carpet Area: 450 sq.ft.', 'Compact Design'] },
            { type: '2 BHK', size: '650 sq.ft.', image: '/images/projects/better-living-img.jpg', details: ['Carpet Area: 650 sq.ft.', 'Standard Layout'] }
        ],
        specifications: [
            { title: 'Standard Finishes', items: ['Vitrified Tiles', 'Powder Coated Windows'] },
            { title: 'Infrastructure', items: ['Piped Gas', 'Generator Backup for Common Areas'] }
        ],
        faqs: [
            { question: "Are units available in 3rd Avenue?", answer: "Primary units are sold out, but resale properties might be available." }
        ],
        themeColor: '#3b82f6'
    }
];`;
    content = content.replace(/];[\s\n]*$/, ',' + thirdAvenueData);
    fs.writeFileSync(file, content);
}
