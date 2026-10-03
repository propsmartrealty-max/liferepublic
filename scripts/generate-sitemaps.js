import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DOMINATOR pSEO Matrix: Full Permutations for Google Rank #1 Dominance
const pSEOMatrix = {
    intents: [
        'price', 'floor-plans', 'brochure', 'rera-number', 
        'possession-date', 'reviews', 'luxury', 'premium', 
        'affordable', 'ready-possession', 'under-construction', 
        'investment', 'new-launch', 'best', 'walk-to-work', 'township'
    ],
    configurations: [
        '1-bhk-flats', '2-bhk-flats', '2.5-bhk-flats', '3-bhk-flats', 
        '4-bhk-flats', 'duplex', 'penthouse', 'villas', 
        'row-houses', 'twin-bungalows', 'plots', 'studio-apartments'
    ],
    locations: [
        'hinjewadi', 'hinjewadi-phase-1', 'hinjewadi-phase-2', 'hinjewadi-phase-3', 
        'marunji', 'kasarsai', 'wakad', 'baner', 'balewadi', 
        'mahalunge', 'punawale', 'tathawade', 'bavdhan', 'sus', 
        'pcmc', 'it-park'
    ],
    entities: [
        'kolte-patil-life-republic', 'life-republic-township', 'echoes', 
        'duet', 'atmos', 'aros', 'universe', 'canvas', 
        'qrious', '24k-espada', 'sound-of-soul', 'oro-avenue', 
        'i-towers', 'nora'
    ]
};

const DOMAIN = 'https://life-republic.in';
const MAX_URLS_PER_SITEMAP = 10000;

async function generateSitemaps() {
    console.log('Generating Master pSEO Permutations Matrix...');
    const urls = [];

    // Generate comprehensive combinations
    for (const intent of pSEOMatrix.intents) {
        for (const config of pSEOMatrix.configurations) {
            for (const location of pSEOMatrix.locations) {
                for (const entity of pSEOMatrix.entities) {
                    const slug = `${intent}-${config}-in-${location}-${entity}`;
                    urls.push(`${DOMAIN}/search/${slug}`);
                }
            }
        }
    }

    console.log(`Generated ${urls.length} unique programmatic search landing URLs.`);

    // Split into chunks of MAX_URLS_PER_SITEMAP
    const chunks = [];
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
        chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
    }

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    // Write chunked sitemaps
    const sitemapFiles = [];
    const nowIso = new Date().toISOString();

    chunks.forEach((chunk, index) => {
        const filename = `sitemap-silos-${index + 1}.xml`;
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        
        chunk.forEach(url => {
            xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${nowIso.split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });
        
        xml += `</urlset>`;
        
        fs.writeFileSync(path.join(publicDir, filename), xml);
        sitemapFiles.push(filename);
        console.log(`Wrote ${filename} with ${chunk.length} URLs.`);
    });

    // Write Sitemap Index
    let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    sitemapFiles.forEach(file => {
        indexXml += `  <sitemap>\n    <loc>${DOMAIN}/${file}</loc>\n    <lastmod>${nowIso}</lastmod>\n  </sitemap>\n`;
    });
    indexXml += `</sitemapindex>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap-silos-index.xml'), indexXml);
    console.log(`Wrote sitemap-silos-index.xml referencing ${sitemapFiles.length} sitemaps.`);
}

generateSitemaps().catch(console.error);
