import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ID_TO_SLUG } from '../src/data/slug-registry';
import { projectsRegistry } from '../src/data/projects';

const DOMAIN = 'https://life-republic.in';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Load sectors data & local blogs
const sectorsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/sectors.json'), 'utf-8'));
const localBlogsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/blogs.json'), 'utf-8'));

const staticRoutes = [
    '/',
    '/projects',
    '/amenities',
    '/contact',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/location',
    '/nri-corner',
    '/testimonials',
    '/media-center',
    '/township-intelligence',
    '/connectivity',
    '/lifestyle',
    '/sustainability',
    '/community-forum',
    '/market-reports',
    '/locations-directory',
    '/sitemap',
    '/township-guide',
    // BHK & Property Type Landing Pages
    '/2-bhk-flats-in-hinjewadi',
    '/3-bhk-flats-in-hinjewadi',
    '/4-bhk-flats-in-hinjewadi',
    '/row-houses-in-life-republic',
    '/luxury-villas-near-hinjewadi',
    '/plots-in-hinjewadi',
    // Core Location Landing Pages
    '/location/flats-near-hinjewadi',
    '/location/flats-near-tathawade',
    '/location/flats-near-punawale',
    '/location/flats-near-wakad',
    '/location/flats-near-marunji',
    '/location/flats-near-marunji-road',
    '/location/ready-possession-flats-hinjewadi',
    // Keyword Dominance Landing Pages
    '/location/affordable-flats-in-hinjewadi',
    '/location/luxury-apartments-hinjewadi',
    '/location/new-launch-projects-hinjewadi',
    '/location/under-construction-flats-hinjewadi',
    '/location/flats-near-rajiv-gandhi-infotech-park',
    '/location/flats-near-mann-hinjewadi',
    '/location/flats-near-maan-hinjewadi',
    '/location/property-in-hinjewadi-phase-3',
    '/location/flats-near-wakad-hinjewadi-road',
    '/location/kolte-patil-life-republic-price',
    '/location/kolte-patil-life-republic-reviews',
    '/location/kolte-patil-life-republic-master-plan',
    '/location/flats-in-hinjewadi-under-50-lakhs',
    '/location/flats-in-hinjewadi-under-80-lakhs',
    '/location/flats-in-hinjewadi-under-1-crore',
    '/location/township-in-hinjewadi-pune',
    '/location/rera-approved-flats-hinjewadi',
    '/location/flats-near-pimpri-chinchwad',
    '/location/flats-near-baner-pune',
    '/location/flats-near-balewadi-pune',
    '/location/investment-property-hinjewadi-pune',
    '/location/nri-property-investment-pune',
    '/location/smart-homes-hinjewadi-pune',
    '/location/row-houses-hinjewadi-pune',
    '/location/penthouse-in-hinjewadi',
    '/location/flats-near-mumbai-pune-expressway',
    '/location/flats-near-hinjewadi-metro-station',
    '/location/gated-community-hinjewadi-pune',
    '/location/family-flats-hinjewadi',
    '/location/resale-flats-life-republic',
    '/location/rental-flats-life-republic-hinjewadi',
    '/location/kolte-patil-hinjewadi-pune',
];

// Sector-based routes from sectors.json
const sectorRoutes = [
    ...(sectorsData.sectors || []).map((s: any) => `/location/${s.slug}`),
    ...(sectorsData.avenues || []).map((a: any) => `/location/${a.slug}`),
    ...(sectorsData.localities || []).map((l: any) => `/location/${l.slug}`),
];

// Market Reports routes
const marketReportRoutes = [
    '/market-reports/pune-real-estate-trends-2026',
    '/market-reports/hinjewadi-phase-3-infrastructure-impact',
    '/market-reports/hinjewadi-metro-line-3-real-estate-impact',
    '/market-reports/integrated-townships-vs-standalone-buildings-pune',
    '/market-reports/nri-investment-guide-pune-real-estate-2026'
];

async function generateSitemap() {
    console.log('🗺️  Generating Canonical Master Sitemap...');

    // Resolve Canonical Project Routes
    const projectRoutes: string[] = [];
    (projectsRegistry || []).forEach(lp => {
        const canonicalSlug = ID_TO_SLUG[lp.id] || lp.id;
        const route = `/projects/${canonicalSlug}`;
        if (!projectRoutes.includes(route)) {
            projectRoutes.push(route);
        }
    });

    // Resolve Media / Blog Routes
    const blogRoutes: string[] = [];
    (localBlogsData || []).forEach((lb: any) => {
        const route = `/media-center/${lb.slug}`;
        if (!blogRoutes.includes(route)) {
            blogRoutes.push(route);
        }
    });

    // Deduplicate all routes
    const allRoutes = Array.from(new Set([
        ...staticRoutes,
        ...sectorRoutes,
        ...projectRoutes,
        ...blogRoutes,
        ...marketReportRoutes
    ]));

    const today = new Date().toISOString().split('T')[0];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => {
    let priority = '0.8';
    let changefreq = 'weekly';

    if (route === '/') {
        priority = '1.0';
        changefreq = 'daily';
    } else if (route === '/projects' || route.startsWith('/projects/')) {
        priority = '0.9';
        changefreq = 'daily';
    } else if (route.startsWith('/location/')) {
        priority = '0.9';
        changefreq = 'weekly';
    } else if (route.startsWith('/media-center/') || route.startsWith('/market-reports/')) {
        priority = '0.85';
        changefreq = 'weekly';
    }

    return `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent, 'utf-8');
    console.log(`✅ Canonical Sitemap generated with ${allRoutes.length} URLs (0 duplicate, 100% canonical).`);
}

try {
    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    await generateSitemap();
    console.log('✨ Sitemap updated according to Google Standards.');
} catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
    process.exit(1);
}
