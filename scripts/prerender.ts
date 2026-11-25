import path from 'path';
import fs from 'fs';
import { projectsRegistry as projects } from '../src/data/projects';
import { ID_TO_SLUG } from '../src/data/slug-registry';
import { pseoRegistry } from '../src/data/pseo-registry';
import { generateLongTailKeywords } from '../src/data/seo-clusters';
import { INSIGHTS_DATA } from '../src/data/market-reports';
import dotenv from 'dotenv';

dotenv.config();

const OUT_DIR = path.resolve(process.cwd(), 'dist');
const SSR_BUNDLE_PATH = path.join(OUT_DIR, 'server/entry-server.js');

const localBlogsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/blogs.json'), 'utf-8'));
const sectorsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/sectors.json'), 'utf-8'));

const staticRoutes = [
    '/', '/projects', '/amenities', '/contact', '/life-republic-sales-office-hinjewadi',
    '/about', '/privacy-policy', '/terms-of-service', '/disclaimer', '/location',
    '/nri-corner', '/testimonials', '/media-center', '/township-intelligence',
    '/nri-investment-guide', '/it-professionals-hinjewadi', '/connectivity',
    '/lifestyle', '/sustainability', '/community-hub', '/market-reports',
    '/locations-directory', '/insights', '/search',
    '/2-bhk-flats-in-hinjewadi', '/3-bhk-flats-in-hinjewadi', '/4-bhk-flats-in-hinjewadi',
    '/row-houses-in-life-republic', '/luxury-villas-near-hinjewadi',
    '/plots-in-hinjewadi', '/sitemap', '/township-guide'
];

const sectorRoutes = [
    ...(sectorsData.sectors || []).map((s: any) => `/location/${s.slug}`),
    ...(sectorsData.avenues || []).map((a: any) => `/location/${a.slug}`),
    ...(sectorsData.localities || []).map((l: any) => `/location/${l.slug}`),
];

const specialLocationRoutes = [
    '/location/flats-near-hinjewadi', '/location/flats-near-tathawade',
    '/location/flats-near-punawale', '/location/flats-near-wakad',
    '/location/flats-near-marunji', '/location/flats-near-marunji-road',
    '/location/ready-possession-flats-hinjewadi',
    ...Object.keys(pseoRegistry).map(slug => `/location/${slug}`)
];

const marketReportRoutes = INSIGHTS_DATA.map(item => `/market-reports/${item.slug}`);

async function getDynamicRoutes() {
    const routes: string[] = [];

    // Canonical Project Routes
    projects.forEach(p => routes.push(`/projects/${ID_TO_SLUG[p.id] || p.id}`));

    // Local Media / Blog Routes
    (localBlogsData || []).forEach((lb: any) => {
        routes.push(`/media-center/${lb.slug}`);
    });

    // Insights Routes (e.g. /insights/flats-near-punawale)
    generateLongTailKeywords().forEach(k => {
        routes.push(`/insights/${k.slug}`);
    });

    // High-Intent Programmatic Silo Routes (Competitors, Landmarks & Core Clusters)
    const topPseoRoutes = [
        '/search/life-republic-vs-megapolis-hinjewadi',
        '/search/life-republic-vs-godrej-woodsville-hinjewadi',
        '/search/life-republic-vs-vtp-bellissimo-hinjewadi',
        '/search/life-republic-vs-kohinoor-coral-hinjewadi',
        '/search/life-republic-vs-shapoorji-joyville-hinjewadi',
        '/search/life-republic-vs-kasturi-balmoral-hinjewadi',
        '/search/life-republic-vs-rohan-nidita-hinjewadi',
        '/search/pune-metro-line-3-connectivity-life-republic',
        '/search/pmrda-ring-road-marunji-life-republic',
        '/search/anisha-global-school-life-republic-campus',
        '/search/crimson-club-sports-academy-life-republic',
        '/search/3.5-acre-urban-park-botanical-gardens',
        '/search/mumbai-pune-expressway-gahunje-exit-connectivity',
        '/search/walk-to-work-homes-hinjewadi-phase-1-it-park',
        '/search/it-professionals-housing-hinjewadi-phase-2-tcs-wipro-infosys',
        '/search/nri-investment-guide-life-republic-pune',
        ...['price', 'floor-plans', 'brochure', 'rera-number', 'possession-date', 'reviews', 'site-visit', 'booking-offers'].flatMap(intent => [
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
            `/search/${intent}-2-bhk-flats-in-hinjewadi-universe`,
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
    if (fs.existsSync(indexPath) && fs.readFileSync(indexPath, 'utf-8').includes('<!--app-head-->')) {
        template = fs.readFileSync(indexPath, 'utf-8');
        fs.writeFileSync(templatePath, template);
    } else if (fs.existsSync(templatePath)) {
        template = fs.readFileSync(templatePath, 'utf-8');
    } else {
        template = fs.readFileSync(indexPath, 'utf-8');
    }

    // Write clean un-prerendered SPA shell for dynamic /search/* fallbacks (no homepage canonical, no homepage JSON-LD)
    const appShellHtml = template
        .replace('<!--app-head-->', '<meta name="app-shell" content="true" />')
        .replace('<!--app-html-->', '');
    fs.writeFileSync(path.join(OUT_DIR, 'app-shell.html'), appShellHtml);
    console.log('🛡️  Generated clean SPA fallback: dist/app-shell.html');

    const { render } = await import(`file://${SSR_BUNDLE_PATH}`);

    const dynamicRoutes = await getDynamicRoutes();
    const routes = [
        ...new Set([
            ...staticRoutes,
            ...sectorRoutes,
            ...specialLocationRoutes,
            ...marketReportRoutes,
            ...dynamicRoutes
        ])
    ];

    console.log(`🚀 Rendering ${routes.length} routes...`);

    for (const route of routes) {
        try {
            console.log(`Rendering: ${route}`);
            const { html: appHtml, head: headHtml, title, description } = await render(route);

            let renderedHtml = template
                .replace('<!--app-head-->', headHtml || '')
                .replace('<!--app-html-->', appHtml || '');

            if (title) {
                renderedHtml = renderedHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
            }

            if (description) {
                renderedHtml = renderedHtml.replace(
                    /<meta name="description" content=".*?"\/?>/i,
                    `<meta name="description" content="${description}"/>`
                );
            }

            if (route === '/') {
                fs.writeFileSync(path.join(OUT_DIR, 'index.html'), renderedHtml);
            } else {
                const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
                const flatPath = path.join(OUT_DIR, `${cleanRoute}.html`);
                const flatDir = path.dirname(flatPath);
                if (!fs.existsSync(flatDir)) fs.mkdirSync(flatDir, { recursive: true });
                fs.writeFileSync(flatPath, renderedHtml);
            }
        } catch (e) {
            console.error(`⚠️ Failed to render ${route}:`, e);
        }
    }

    if (fs.existsSync(templatePath)) {
        try { fs.unlinkSync(templatePath); } catch {}
    }

    console.log('✅ SSG Prerendering Finished.');
    process.exit(0);
}

prerender().catch(err => {
    console.error('❌ Critical error during SSG:', err);
    process.exit(1);
});
