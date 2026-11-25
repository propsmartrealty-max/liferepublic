import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Factually accurate entity-to-configuration mapping (eliminates doorway/nonsense permutations)
const ENTITY_CONFIGS = {
    'kolte-patil-life-republic': [
        '2-bhk-flats', '2.5-bhk-flats', '3-bhk-flats', '3.5-bhk-flats',
        '4-bhk-flats', '5-bhk-flats', 'duplex', 'penthouse', 'villas',
        'row-houses', 'twin-bungalows', 'luxury-residences', 'plots', 'commercial-shops'
    ],
    'life-republic-township': [
        '2-bhk-flats', '2.5-bhk-flats', '3-bhk-flats', '4-bhk-flats',
        'villas', 'row-houses', 'luxury-residences', 'plots', 'commercial-shops'
    ],
    'echoes': ['2-bhk-flats', '2.5-bhk-flats', 'luxury-residences'],
    'duet': ['2-bhk-flats'],
    'atmos': ['2-bhk-flats', '3-bhk-flats', 'luxury-residences'],
    'aros': ['2-bhk-flats', '3-bhk-flats'],
    'universe': ['2-bhk-flats'],
    'canvas': ['3-bhk-flats', '3.5-bhk-flats', '4-bhk-flats', 'luxury-residences', 'penthouse'],
    'qrious': ['2-bhk-flats', '3-bhk-flats'],
    '24k-espada': ['4-bhk-flats', '5-bhk-flats', 'row-houses', 'villas', 'twin-bungalows', 'luxury-residences'],
    'sound-of-soul': ['4-bhk-flats', 'row-houses', 'villas'],
    'oro-avenue': ['2-bhk-flats'],
    'i-towers': ['2-bhk-flats', '3-bhk-flats'],
    'nora': ['plots'],
    'arezo': ['2-bhk-flats'],
    'first-avenue': ['2-bhk-flats', '3-bhk-flats'],
    '3rd-avenue': ['2-bhk-flats', '3-bhk-flats'],
    'villas': ['4-bhk-flats', '5-bhk-flats', 'villas', 'twin-bungalows', 'row-houses']
};

const pSEOMatrix = {
    intents: [
        'price', 'floor-plans', 'brochure', 'rera-number',
        'possession-date', 'reviews', 'contact-number', 'site-visit',
        'sample-flat', 'booking-offers', 'luxury', 'premium',
        'ready-possession', 'under-construction', 'investment',
        'new-launch', 'walk-to-work', 'township', 'resale', 'rent'
    ],
    primaryClusterIntents: [
        'price', 'floor-plans', 'brochure', 'rera-number',
        'possession-date', 'reviews', 'site-visit', 'sample-flat', 'booking-offers'
    ],
    townshipLocations: [
        'hinjewadi', 'hinjewadi-phase-1', 'hinjewadi-phase-2', 'hinjewadi-phase-3',
        'marunji', 'wakad', 'punawale', 'tathawade', 'baner', 'balewadi',
        'mahalunge', 'mahalunge-maan', 'pune-west', 'pcmc', 'it-park'
    ],
    clusterLocations: ['hinjewadi', 'marunji', 'wakad', 'punawale', 'tathawade'],
    competitorComparisons: [
        'life-republic-vs-megapolis-hinjewadi',
        'life-republic-vs-godrej-woodsville-hinjewadi',
        'life-republic-vs-vtp-bellissimo-hinjewadi',
        'life-republic-vs-kohinoor-coral-hinjewadi',
        'life-republic-vs-shapoorji-joyville-hinjewadi',
        'life-republic-vs-kasturi-balmoral-hinjewadi',
        'life-republic-vs-rohan-nidita-hinjewadi',
        'kolte-patil-life-republic-vs-godrej-hinjewadi',
        'life-republic-vs-pride-purple-park-connect',
        'life-republic-vs-lodha-panache-hinjewadi'
    ],
    infrastructureLandmarks: [
        'pune-metro-line-3-connectivity-life-republic',
        'pmrda-ring-road-marunji-life-republic',
        'anisha-global-school-life-republic-campus',
        'crimson-club-sports-academy-life-republic',
        '3.5-acre-urban-park-botanical-gardens',
        'mumbai-pune-expressway-gahunje-exit-connectivity',
        'walk-to-work-homes-hinjewadi-phase-1-it-park',
        'bhumkar-chowk-to-life-republic-commute',
        'dange-chowk-to-life-republic-route',
        'it-professionals-housing-hinjewadi-phase-2-tcs-wipro-infosys',
        'nri-investment-guide-life-republic-pune'
    ]
};

const DOMAIN = 'https://life-republic.in';
const MAX_URLS_PER_SITEMAP = 10000;

async function generateSitemaps() {
    console.log('Generating High-Authority Accurate pSEO Matrix...');
    const urlSet = new Set();

    // 1. Township-Level Core Intent × Accurate Config × West Pune Corridor
    for (const entity of ['kolte-patil-life-republic', 'life-republic-township']) {
        const configs = ENTITY_CONFIGS[entity];
        for (const intent of pSEOMatrix.intents) {
            for (const config of configs) {
                for (const location of pSEOMatrix.townshipLocations) {
                    urlSet.add(`${DOMAIN}/search/${intent}-${config}-in-${location}-${entity}`);
                }
            }
        }
    }

    // 2. Cluster-Level Deep Dives (strictly matched to each cluster's real configurations)
    for (const [entity, configs] of Object.entries(ENTITY_CONFIGS)) {
        if (entity === 'kolte-patil-life-republic' || entity === 'life-republic-township') continue;
        for (const intent of pSEOMatrix.primaryClusterIntents) {
            for (const config of configs) {
                for (const loc of pSEOMatrix.clusterLocations) {
                    urlSet.add(`${DOMAIN}/search/${intent}-${config}-in-${loc}-${entity}`);
                }
            }
        }
    }

    // 3. Competitor Comparison Pages
    for (const compSlug of pSEOMatrix.competitorComparisons) {
        urlSet.add(`${DOMAIN}/search/${compSlug}`);
    }

    // 4. Infrastructure & Campus Landmark Pages
    for (const infraSlug of pSEOMatrix.infrastructureLandmarks) {
        urlSet.add(`${DOMAIN}/search/${infraSlug}`);
    }

    const urls = Array.from(urlSet);
    console.log(`Generated ${urls.length} factually accurate, high-intent pSEO landing URLs.`);

    const chunks = [];
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
        chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
    }

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    const existingFiles = fs.readdirSync(publicDir);
    for (const file of existingFiles) {
        if (file.startsWith('sitemap-silos-') && file.endsWith('.xml') && file !== 'sitemap-silos-index.xml') {
            try { fs.unlinkSync(path.join(publicDir, file)); } catch (_) {}
        }
    }

    const sitemapFiles = [];
    const nowIso = new Date().toISOString();
    const todayDate = nowIso.split('T')[0];

    chunks.forEach((chunk, index) => {
        const filename = `sitemap-silos-${index + 1}.xml`;
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        chunk.forEach(url => {
            xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${todayDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });

        xml += `</urlset>`;

        fs.writeFileSync(path.join(publicDir, filename), xml);
        sitemapFiles.push(filename);
        console.log(`Wrote ${filename} with ${chunk.length} URLs.`);
    });

    let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    sitemapFiles.forEach(file => {
        indexXml += `  <sitemap>\n    <loc>${DOMAIN}/${file}</loc>\n    <lastmod>${nowIso}</lastmod>\n  </sitemap>\n`;
    });
    indexXml += `</sitemapindex>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap-silos-index.xml'), indexXml);
    console.log(`Wrote sitemap-silos-index.xml referencing ${sitemapFiles.length} sitemaps.`);
}

generateSitemaps().catch(console.error);
