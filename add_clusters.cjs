const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

// Update Aros
let regexAros = /(id:\s*['"]aros['"][\s\S]*?status:\s*['"])[^'"]+(['"])/i;
content = content.replace(regexAros, `$1Ready Possession$2`);

// Update Universe
let regexUniverse = /(id:\s*['"]universe['"][\s\S]*?status:\s*['"])[^'"]+(['"])/i;
content = content.replace(regexUniverse, `$1Completed$2`);

// The user mentioned Oro Avenue, I Tower, Sound of Soul, 24k Espada.
// I will append these to the CLUSTERS array.
// I need to find the closing bracket of the CLUSTERS array.
const newClusters = `
    {
        id: "oro-avenue",
        slug: "kolte-patil-life-republic-oro-avenue",
        name: "Oro Avenue",
        rera: "P52100017116", // Placeholder RERA
        image: "https://liferepublic.in/images/projects/location/172060335117189650503rd Avenue-.jpg",
        description: "Experience completed premium living at Oro Avenue.",
        status: "Completed",
        possession: "Ready",
        sector: "Sector R9",
        usp: "Premium Completed Residences",
        configurations: [
            { type: "1 BHK", size: "420 sq.ft.", price: "₹45 Lakhs*" },
            { type: "2 BHK", size: "650 sq.ft.", price: "₹65 Lakhs*" }
        ],
        masterLayout: "https://liferepublic.in/images/home/slider-1.webp"
    },
    {
        id: "i-tower",
        slug: "kolte-patil-life-republic-i-tower",
        name: "I Tower",
        rera: "P52100009640", // Placeholder RERA
        image: "https://liferepublic.in/images/projects/location/1720604991i tower.jpg",
        description: "Iconic completed tower offering breathtaking views.",
        status: "Completed",
        possession: "Ready",
        sector: "Sector R3",
        usp: "Iconic Completed High-Rise",
        configurations: [
            { type: "2 BHK", size: "750 sq.ft.", price: "₹75 Lakhs*" },
            { type: "3 BHK", size: "950 sq.ft.", price: "₹95 Lakhs*" }
        ],
        masterLayout: "https://liferepublic.in/images/home/slider-2.webp"
    },
    {
        id: "sound-of-soul",
        slug: "kolte-patil-life-republic-sound-of-soul",
        name: "Sound of Soul",
        rera: "P52100049289", // Placeholder RERA
        image: "https://liferepublic.in/images/projects/location/1718965104Sound Of Soul image.jpg",
        description: "Completed luxury row houses designed for serenity.",
        status: "Completed",
        possession: "Ready",
        sector: "Sector R15",
        usp: "Ultra-Premium Row Houses",
        configurations: [
            { type: "4 BHK Row House", size: "1800 sq.ft.", price: "₹2.5 Cr*" }
        ],
        masterLayout: "https://liferepublic.in/images/home/slider-3.webp"
    },
    {
        id: "24k-espada",
        slug: "kolte-patil-life-republic-24k-espada",
        name: "24K Espada",
        rera: "P52100052345", // Placeholder RERA
        image: "https://liferepublic.in/images/projects/location/171896513924K Espada.jpg",
        description: "Exclusive under construction 24K luxury residences.",
        status: "Under Construction",
        possession: "Dec 2027",
        sector: "Sector R24",
        usp: "Signature 24K Luxury Estates",
        configurations: [
            { type: "3 BHK", size: "1200 sq.ft.", price: "₹1.5 Cr*" },
            { type: "4 BHK", size: "1600 sq.ft.", price: "₹2.2 Cr*" }
        ],
        masterLayout: "https://liferepublic.in/images/home/slider-4.webp"
    }
];`;

content = content.replace(/\];\s*$/, newClusters);
fs.writeFileSync(file, content);
