import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DOMINATOR pSEO Matrix: 100% Synchronized with src/lib/pSEO-engine.ts
const pSEOMatrix = {
    intents: [
        'price', 'floor-plans', 'brochure', 'rera-number', 
        'possession-date', 'reviews', 'contact-number', 'site-visit',
        'sample-flat', 'booking-offers', 'luxury', 'premium', 
        'affordable', 'ready-possession', 'under-construction', 
        'investment', 'new-launch', 'pre-launch', 'best', 
        'walk-to-work', 'township', 'resale', 'rent'
    ],
    configurations: [
        '1-bhk-flats', '2-bhk-flats', '2.5-bhk-flats', '3-bhk-flats', 
        '3.5-bhk-flats', '4-bhk-flats', '5-bhk-flats', 'duplex', 
        'penthouse', 'villas', 'row-houses', 'twin-bungalows', 
        'studio-apartments', 'plots', 'commercial-shops'
    ],
    locations: [
        'hinjewadi-phase-1', 'hinjewadi-phase-2', 'hinjewadi-phase-3', 'hinjewadi-phase-4',
        'hinjewadi', 'marunji', 'kasarsai', 'wakad', 'baner', 'balewadi', 
        'mahalunge-maan', 'mahalunge', 'punawale', 'tathawade', 'bavdhan', 'sus', 
        'pcmc', 'pune-west', 'it-park', 'gahunje', 'pirangut', 'ravet'
    ],
    entities: [
        'kolte-patil-life-republic', 'life-republic-township', 'echoes', 
        'duet', 'atmos', 'aros', 'universe', 'canvas', 
        'qrious', '24k-espada', 'sound-of-soul', 'oro-avenue', 
        'i-towers', 'nora', 'arezo', 'first-avenue', '3rd-avenue', 'villas'
    ],
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
    console.log('Generating Synchronized Master pSEO Permutations Matrix...');
    const urlSet = new Set();

    // 1. Core High-Intent Permutations: Intent × Config × Location × Entity
    // Structured to target exact search strings used by qualified homebuyers
    for (const intent of pSEOMatrix.intents) {
        for (const config of pSEOMatrix.configurations) {
            for (const location of pSEOMatrix.locations) {
                // Focus on key entities per location/config to maintain maximum topical authority
                const primaryEntities = ['kolte-patil-life-republic', 'life-republic-township', 'echoes', 'duet', 'atmos', 'aros', 'universe', '24k-espada'];
                for (const entity of primaryEntities) {
                    const slug = `${intent}-${config}-in-${location}-${entity}`;
                    urlSet.add(`${DOMAIN}/search/${slug}`);
                }
            }
        }
    }

    // 2. Specific Cluster Deep Dives: Intent × Config × Cluster
    const primaryIntents = ['price', 'floor-plans', 'brochure', 'rera-number', 'possession-date', 'reviews', 'site-visit', 'sample-flat', 'booking-offers'];
    const keyLocations = ['hinjewadi', 'marunji', 'wakad', 'punawale', 'tathawade'];
    for (const entity of pSEOMatrix.entities) {
        for (const config of pSEOMatrix.configurations) {
            for (const intent of primaryIntents) {
                for (const loc of keyLocations) {
                    const slug = `${intent}-${config}-in-${loc}-${entity}`;
                    urlSet.add(`${DOMAIN}/search/${slug}`);
                }
            }
        }
    }

    // 3. Add Competitor Comparison Permutations
    for (const compSlug of pSEOMatrix.competitorComparisons) {
        urlSet.add(`${DOMAIN}/search/${compSlug}`);
    }

    // 4. Add Infrastructure & Campus Landmark Permutations
    for (const infraSlug of pSEOMatrix.infrastructureLandmarks) {
        urlSet.add(`${DOMAIN}/search/${infraSlug}`);
    }

    const urls = Array.from(urlSet);
    console.log(`Generated ${urls.length} fully synchronized programmatic landing URLs.`);

    // Split into chunks of MAX_URLS_PER_SITEMAP
    const chunks = [];
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
        chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
    }

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Clean up old sitemap files
    const existingFiles = fs.readdirSync(publicDir);
    for (const file of existingFiles) {
        if (file.startsWith('sitemap-silos-') && file.endsWith('.xml') && file !== 'sitemap-silos-index.xml') {
            try { fs.unlinkSync(path.join(publicDir, file)); } catch (_) {}
        }
    }

    // Write chunked sitemaps
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
