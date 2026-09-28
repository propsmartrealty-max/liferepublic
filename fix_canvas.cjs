const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

const canvasObjectRegex = /\{\s*id: "canvas",[\s\S]*?\}\s*\],?\n?\s*\},/g;

const newCanvasObject = `{
        id: "canvas",
        status: "New Launch",
        possession: "Dec 2028",
        sector: "Sector R5",
        usp: "Pune's Tallest Residential Tower",
        name: "Canvas",
        slug: "kolte-patil-life-republic-canvas",
        category: "Premium 3 & 4 BHK",
        description: "Pune's Tallest Residential Tower reaching ~120M high. Canvas offers ultra-premium 3 & 4 BHK residences with 50+ curated amenities across a 6+ acre estate. Each unit features 2 master bedrooms.",
        price: "₹1.45 Cr Onwards",
        rera: "P52100077008",
        image: "https://liferepublic.in/images/project/gallery/1727440628GATE SCULPTURE.webp",
        masterLayout: "https://liferepublic.in/images/project/plan/172846001957.webp",
        configurations: [
            { type: "3 BHK", size: "1,151 - 1,330 sq.ft.", price: "₹1.45 Cr*" },
            { type: "4 BHK", size: "1,700 - 2,023 sq.ft.", price: "₹2.20 Cr*" }
        ],
        gallery: [
            "https://liferepublic.in/images/project/gallery/1727440628GATE SCULPTURE.webp",
            "https://liferepublic.in/images/project/gallery/1727440638GATE.webp",
            "https://liferepublic.in/images/project/gallery/1727440765TERRACE 01.webp",
            "https://liferepublic.in/images/project/gallery/1727440648Living.webp",
            "https://liferepublic.in/images/project/gallery/1727440618DECK.webp",
            "https://liferepublic.in/images/project/gallery/1727440555BALCONY 1.webp",
            "https://liferepublic.in/images/project/gallery/1727440659LOBBY.webp",
            "https://liferepublic.in/images/project/gallery/1727440680MASTER BEDROOM.webp"
        ],
        amenitiesList: [
            { name: "Top Podium", icon: "https://liferepublic.in/images/project/aminities/1727441184TOP PODIUM.webp" },
            { name: "Pavillion", icon: "https://liferepublic.in/images/project/aminities/1727441099PAVILLION.webp" },
            { name: "Multipurpose Hall", icon: "https://liferepublic.in/images/project/aminities/1727441088MULTIPURPOSE HALL.webp" },
            { name: "Play Court", icon: "https://liferepublic.in/images/project/aminities/1727441143PLAY COURT_NIGHT.webp" },
            { name: "Bonfire", icon: "https://liferepublic.in/images/project/aminities/1727441022BONFIRE.webp" },
            { name: "Infinity Pool", icon: "https://liferepublic.in/images/project/aminities/1727441152POOL 01.webp" }
        ],
        floorPlans: [
            "https://liferepublic.in/images/project/plan/172846001957.webp",
            "https://liferepublic.in/images/project/plan/17284728371Canvas Flipchart - A3 - Final-21.webp",
            "https://liferepublic.in/images/project/plan/172845998455.webp",
            "https://liferepublic.in/images/project/plan/172845999054.webp",
            "https://liferepublic.in/images/project/plan/17284730741Canvas Flipchart - A3 - Final-29 copy.webp",
            "https://liferepublic.in/images/project/plan/172846003358.webp"
        ]
    },`;

content = content.replace(canvasObjectRegex, newCanvasObject);
fs.writeFileSync(file, content);
