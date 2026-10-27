import path from 'path';
import fs from 'fs';
import { projectsRegistry as projects } from '../src/data/projects';
import dotenv from 'dotenv';

dotenv.config();

const OUT_DIR = path.resolve(process.cwd(), 'dist');
const SSR_BUNDLE_PATH = path.join(OUT_DIR, 'server/entry-server.js');
const DOMAIN = 'https://life-republic.in';

// Load local blogs data
const localBlogsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/blogs.json'), 'utf-8'));

// Load sectors data
const sectorsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/sectors.json'), 'utf-8'));

const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'universe': 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
    'first-avenue': 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
    'villas': 'kolte-patil-life-republic-villas-hinjewadi',
    'bungalows': 'kolte-patil-life-republic-bungalows-hinjewadi',
    'echoes': 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
    'qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
    'oro-avenue': 'kolte-patil-life-republic-oro-avenue-smart-1-2-bhk-hinjewadi',
    'i-towers': 'kolte-patil-life-republic-i-towers-smart-homes-hinjewadi'
};

const staticRoutes = [
    '/', '/projects', '/amenities', '/contact', '/about', '/privacy', '/terms', '/location',
    '/nri-corner', '/testimonials', '/media-center', '/township-intelligence',
    '/nri-investment-guide', '/connectivity', '/lifestyle', '/sustainability', '/community-hub',
    '/2-bhk-flats-in-hinjewadi', '/3-bhk-flats-in-hinjewadi', '/4-bhk-flats-in-hinjewadi',
    '/1-bhk-flats-in-hinjewadi', '/row-houses-in-life-republic', '/luxury-villas-near-hinjewadi',
    '/plots-in-hinjewadi', '/sitemap', '/township-guide'
];

const sectorRoutes = [
    ...sectorsData.sectors.map((s: any) => `/location/${s.slug}`),
    ...sectorsData.avenues.map((a: any) => `/location/${a.slug}`),
    ...sectorsData.localities.map((l: any) => `/location/${l.slug}`),
];

const specialLocationRoutes = [
    '/location/flats-near-hinjewadi', '/location/flats-near-tathawade',
    '/location/flats-near-punawale', '/location/flats-near-wakad',
    '/location/flats-near-marunji', '/location/flats-near-marunji-road',
    '/location/ready-possession-flats-hinjewadi'
];

async function getDynamicRoutes() {
    const routes: string[] = [];
    
    // Add projects
    projects.forEach(p => routes.push(`/projects/${ID_TO_SLUG[p.id] || p.id}`));
    
    // Add local blogs
    (localBlogsData || []).forEach((lb: any) => {
        routes.push(`/media-center/${lb.slug}`);
    });

    // Add Top High-Intent Programmatic Silo Routes (Competitors, Landmarks & Core Clusters)
    const topPseoRoutes = [
        // Competitor Comparisons
        '/search/life-republic-vs-megapolis-hinjewadi',
        '/search/life-republic-vs-godrej-woodsville-hinjewadi',
        '/search/life-republic-vs-vtp-bellissimo-hinjewadi',
        '/search/life-republic-vs-kohinoor-coral-hinjewadi',
        '/search/life-republic-vs-shapoorji-joyville-hinjewadi',
        '/search/life-republic-vs-kasturi-balmoral-hinjewadi',
        '/search/life-republic-vs-rohan-nidita-hinjewadi',
        // Infrastructure & Landmarks
        '/search/pune-metro-line-3-connectivity-life-republic',
        '/search/pmrda-ring-road-marunji-life-republic',
        '/search/anisha-global-school-life-republic-campus',
        '/search/crimson-club-sports-academy-life-republic',
        '/search/3.5-acre-urban-park-botanical-gardens',
        '/search/mumbai-pune-expressway-gahunje-exit-connectivity',
        '/search/walk-to-work-homes-hinjewadi-phase-1-it-park',
        '/search/it-professionals-housing-hinjewadi-phase-2-tcs-wipro-infosys',
        '/search/nri-investment-guide-life-republic-pune',
        // Top High-Volume Search Permutations
        ...['price', 'floor-plans', 'brochure', 'rera-number', 'possession-date', 'reviews', 'site-visit', 'booking-offers'].flatMap(intent => [
            `/search/${intent}-1-bhk-flats-in-hinjewadi-kolte-patil-life-republic`,
            `/search/${intent}-2-bhk-flats-in-hinjewadi-kolte-patil-life-republic`,
            `/search/${intent}-2.5-bhk-flats-in-hinjewadi-echoes`,
            `/search/${intent}-3-bhk-flats-in-hinjewadi-kolte-patil-life-republic`,
            `/search/${intent}-4-bhk-flats-in-hinjewadi-kolte-patil-life-republic`,
            `/search/${intent}-row-houses-in-hinjewadi-24k-espada`,
            `/search/${intent}-villas-in-hinjewadi-villas`,
            `/search/${intent}-plots-in-hinjewadi-nora`,
            `/search/${intent}-2-bhk-flats-in-marunji-duet`,
            `/search/${intent}-3-bhk-flats-in-marunji-atmos`,
            `/search/${intent}-2-bhk-flats-in-wakad-aros`,
            `/search/${intent}-1-bhk-flats-in-hinjewadi-universe`,
            `/search/${intent}-3-bhk-flats-in-hinjewadi-canvas`,
            `/search/${intent}-2-bhk-flats-in-hinjewadi-qrious`
        ])
    ];

    routes.push(...topPseoRoutes);
    
    return routes;
}

async function prerender() {
    console.log('🏗️  Starting SSR-based Prerendering...');

    if (!fs.existsSync(SSR_BUNDLE_PATH)) {
        console.error(`❌ SSR Bundle not found at ${SSR_BUNDLE_PATH}. Did you run "vite build --ssr"?`);
        process.exit(1);
    }

    const templatePath = path.join(OUT_DIR, 'template.html');
    const indexPath = path.join(OUT_DIR, 'index.html');
    
    let template = '';
    // If clean template.html exists, use it; otherwise read index.html and cache it
    if (fs.existsSync(indexPath) && fs.readFileSync(indexPath, 'utf-8').includes('<!--app-head-->')) {
        template = fs.readFileSync(indexPath, 'utf-8');
        fs.writeFileSync(templatePath, template);
    } else if (fs.existsSync(templatePath)) {
        template = fs.readFileSync(templatePath, 'utf-8');
    } else {
        template = fs.readFileSync(indexPath, 'utf-8');
    }
    const { render } = await import(`file://${SSR_BUNDLE_PATH}`);

    const dynamicRoutes = await getDynamicRoutes();
    const routes = [...new Set([...staticRoutes, ...sectorRoutes, ...specialLocationRoutes, ...dynamicRoutes])];

    console.log(`🚀 Rendering ${routes.length} routes...`);

    for (const route of routes) {
        try {
            console.log(`Rendering: ${route}`);
            const { html: appHtml, head: headHtml } = await render(route);

            let cleanAppHtml = appHtml || '';
            
            // Extract Helmet / Head tags rendered in the body (React 19 streaming output)
            const titles = cleanAppHtml.match(/<title[^>]*>.*?<\/title>/gi) || [];
            const metas = cleanAppHtml.match(/<meta[^>]*>/gi) || [];
            const links = cleanAppHtml.match(/<link[^>]*(data-rh="true"|rel=["']canonical["']|rel=["']alternate["']|rel=["']preload["'])[^>]*>/gi) || [];
            const schemas = cleanAppHtml.match(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];

            // Combine extracted head tags
            const extractedHeadTags = [
                ...metas.filter(m => !m.includes('name="description"')),
                ...links,
                ...schemas
            ].join('\n');

            // Strip extracted head tags that belong outside the root
            cleanAppHtml = cleanAppHtml.replace(/<title[^>]*>.*?<\/title>/gi, '');
            cleanAppHtml = cleanAppHtml.replace(/<meta[^>]*>/gi, '');
            cleanAppHtml = cleanAppHtml.replace(/<link[^>]*(data-rh="true"|rel=["']canonical["']|rel=["']alternate["']|rel=["']preload["'])[^>]*>/gi, '');
            cleanAppHtml = cleanAppHtml.replace(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

            const finalHead = (headHtml || '') + '\n' + extractedHeadTags;

            let renderedHtml = template
                .replace('<!--app-head-->', finalHead)
                .replace('<!--app-html-->', cleanAppHtml);

            // Replace template default title with page specific title
            if (titles.length > 0) {
                renderedHtml = renderedHtml.replace(/<title>.*?<\/title>/i, titles[titles.length - 1]);
            }

            // Replace template default description with page specific description
            const pageDesc = metas.find(m => m.includes('name="description"'));
            if (pageDesc) {
                renderedHtml = renderedHtml.replace(/<meta name="description" content=".*?"\/?>/i, pageDesc);
            }

            const filePath = route === '/'
                ? path.join(OUT_DIR, 'index.html')
                : path.join(OUT_DIR, route, 'index.html');

            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            
            fs.writeFileSync(filePath, renderedHtml);
            
        } catch (e) {
            console.error(`⚠️ Failed to render ${route}:`, e);
        }
    }

    console.log('✅ SSG Prerendering Finished.');
    process.exit(0);
}

prerender().catch(err => {
    console.error('❌ Critical error during SSG:', err);
    process.exit(1);
});
