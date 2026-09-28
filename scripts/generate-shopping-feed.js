import fs from 'fs';
import path from 'path';

const CLUSTERS = [
    { name: "Qrious at Life Republic", price: "8900000", image: "https://liferepublic.in/images/projects/qrious/qrious-1.jpg", desc: "Premium 2 & 3 BHK Apartments in Hinjewadi Phase 1", link: "https://life-republic.in/projects/qrious" },
    { name: "Canvas at Life Republic", price: "14500000", image: "https://liferepublic.in/images/projects/canvas/canvas-1.jpg", desc: "Ultra-Luxury 3 & 4 BHK Residences in Hinjewadi Pune", link: "https://life-republic.in/projects/canvas" },
    { name: "Espada at Life Republic", price: "28500000", image: "https://liferepublic.in/images/projects/espada/espada-1.jpg", desc: "Exquisite 4 & 5 BHK Row Villas in Life Republic", link: "https://life-republic.in/projects/espada" },
    { name: "Atmos at Life Republic", price: "7500000", image: "https://liferepublic.in/images/projects/atmos/atmos-1.jpg", desc: "Smart 2 & 2.5 BHK Homes in Hinjewadi", link: "https://life-republic.in/projects/atmos" },
    { name: "Aros at Life Republic", price: "9500000", image: "https://liferepublic.in/images/projects/aros/aros-1.jpg", desc: "Premium 2 & 3 BHK Apartments", link: "https://life-republic.in/projects/aros" }
];

const generateXML = () => {
    let xml = `<?xml version="1.0"?>\n<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n<channel>\n`;
    xml += `<title>PropSmart Kolte Patil Life Republic Properties</title>\n`;
    xml += `<link>https://life-republic.in</link>\n`;
    xml += `<description>Premium residential apartments and villas in Kolte Patil Life Republic Hinjewadi.</description>\n`;

    CLUSTERS.forEach(cluster => {
        xml += `  <item>\n`;
        xml += `    <g:id>${cluster.name.replace(/\s+/g, '-').toLowerCase()}</g:id>\n`;
        xml += `    <g:title>${cluster.name} - Hinjewadi Pune</g:title>\n`;
        xml += `    <g:description>${cluster.desc}</g:description>\n`;
        xml += `    <g:link>${cluster.link}</g:link>\n`;
        xml += `    <g:image_link>${cluster.image}</g:image_link>\n`;
        xml += `    <g:condition>new</g:condition>\n`;
        xml += `    <g:availability>in stock</g:availability>\n`;
        xml += `    <g:price>${cluster.price} INR</g:price>\n`;
        xml += `    <g:brand>Kolte Patil Developers</g:brand>\n`;
        xml += `    <g:product_type>Real Estate &gt; Residential</g:product_type>\n`;
        xml += `    <g:custom_label_0>Hinjewadi Phase 1</g:custom_label_0>\n`;
        xml += `  </item>\n`;
    });

    xml += `</channel>\n</rss>`;
    return xml;
};

const xml = generateXML();
fs.writeFileSync(path.join(process.cwd(), 'public', 'google-shopping-feed.xml'), xml);
console.log('Generated Google Shopping Feed for Real Estate Products.');
