const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

const scraped = JSON.parse(fs.readFileSync('scraped_data.json', 'utf8'));
const echoesScraped = JSON.parse(fs.readFileSync('echoes_data.json', 'utf8'));

function updateCluster(clusterId, data) {
    const regex = new RegExp(\`(\\{\\s*id: "\${clusterId}",[\\s\\S]*?)(configurations: \\[[\\s\\S]*?\\])\\n?\\s*\\},\\n?\`, 'g');
    
    let replacement = \`$1$2,\n        gallery: \${JSON.stringify(data.gallery, null, 12)},\n        amenitiesList: \${JSON.stringify(data.amenities, null, 12)},\n        floorPlans: \${JSON.stringify(data.floorPlans, null, 12)}\n    },\n\`;
    
    // Clean up the JSON stringification spacing a bit for formatting
    replacement = replacement.replace(/"/g, '"').replace(/\\]\n/g, '        ]\n');
    
    content = content.replace(regex, replacement);
}

updateCluster('duet', scraped.duet);
updateCluster('qrious', scraped.qrious);
updateCluster('echoes', echoesScraped.echoes);

fs.writeFileSync(file, content);
