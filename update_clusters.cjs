const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

const additionalData = {
    'echoes': { status: "Under Construction", possession: "Dec 2027", sector: "Sector R10", usp: "Premium Residences with Smart Tech" },
    'duet': { status: "Under Construction", possession: "Dec 2026", sector: "Sector R7", usp: "Space-Efficient Smart Layouts" },
    'qrious': { status: "Nearing Possession", possession: "June 2025", sector: "Sector R8", usp: "Educational & Play-Themed Amenities" },
    'canvas': { status: "New Launch", possession: "Dec 2028", sector: "Sector R12", usp: "Ultra-Luxury Estates & Villas" },
    'aros': { status: "Ready to Move", possession: "Immediate", sector: "Sector R1", usp: "Nature-Integrated Expansive Living" },
    'atmos': { status: "Under Construction", possession: "Dec 2026", sector: "Sector R4", usp: "Elevated High-Rise Lifestyles" },
    'universe': { status: "New Launch", possession: "June 2027", sector: "Town Center", usp: "High-Street Retail & Integrated High-Street" }
};

for (const [id, data] of Object.entries(additionalData)) {
    const regex = new RegExp(`(id:\\s*['"]${id}['"]\\s*,)`);
    content = content.replace(regex, `$1\n        status: "${data.status}",\n        possession: "${data.possession}",\n        sector: "${data.sector}",\n        usp: "${data.usp}",`);
}

fs.writeFileSync(file, content);
