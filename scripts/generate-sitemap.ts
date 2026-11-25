import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ID_TO_SLUG } from '../src/data/slug-registry';
import { projectsRegistry } from '../src/data/projects';
import { generateLongTailKeywords } from '../src/data/seo-clusters';
import { INSIGHTS_DATA } from '../src/data/market-reports';

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
    '/life-republic-sales-office-hinjewadi',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/location',
    '/nri-corner',
    '/nri-investment-guide',
    '/it-professionals-hinjewadi',
    '/testimonials',
    '/media-center',
    '/township-intelligence',
    '/connectivity',
    '/lifestyle',
    '/sustainability',
    '/community-hub',
    '/market-reports',
    '/locations-directory',
    '/insights',
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
    '/location/flats-in-hinjewadi-under-60-lakhs',
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

// Market Reports routes (synced with INSIGHTS_DATA)
const marketReportRoutes = INSIGHTS_DATA.map(item => `/market-reports/${item.slug}`);

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

    // Resolve Insights Routes
    const insightRoutes = generateLongTailKeywords().map(k => `/insights/${k.slug}`);

    // Deduplicate all routes
    const allRoutes = Array.from(new Set([
        ...staticRoutes,
        ...sectorRoutes,
        ...projectRoutes,
        ...blogRoutes,
        ...marketReportRoutes,
        ...insightRoutes
    ]));

    const today = new Date().toISOString().split('T')[0];

    const escapeXml = (str: string) => {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    const getImagesForRoute = (route: string): { loc: string; title: string; caption: string }[] => {
        const imgs: { loc: string; title: string; caption: string }[] = [];

        if (route === '/') {
            imgs.push(
                { loc: `${DOMAIN}/hero-new.webp`, title: 'Kolte Patil Life Republic Hinjewadi Master Skyline', caption: 'Kolte Patil Life Republic 390-Acre Integrated Gated Township Hinjewadi Pune' },
                { loc: `${DOMAIN}/images/home/master-layout-full.jpg`, title: 'Life Republic 390-Acre Master Layout Plan', caption: 'Master layout and 16 residential sectors map of Kolte Patil Life Republic' },
                { loc: `${DOMAIN}/images/gallery/clubhouse.webp`, title: 'Crimson Clubhouse & Sports Complex', caption: 'Olympic-length swimming pool, sports arena, and township lifestyle club' }
            );
        } else if (route === '/life-republic-sales-office-hinjewadi') {
            imgs.push(
                { loc: `${DOMAIN}/hero-new.webp`, title: 'Kolte Patil Life Republic Sales Office Hinjewadi', caption: 'Official sales office and VIP experience centre at Survey No. 74 Marunji Mulshi' },
                { loc: `${DOMAIN}/images/home/overview-img.jpg`, title: 'Life Republic Sales Office Gallery & Sample Flat', caption: 'Sample flats and project walkthroughs at Life Republic Sales Office' }
            );
        } else if (route.startsWith('/projects/')) {
            const slug = route.replace('/projects/', '');
            const proj = projectsRegistry.find(p => (ID_TO_SLUG[p.id] || p.id) === slug || p.id === slug);
            if (proj) {
                if (proj.image) {
                    imgs.push({
                        loc: proj.image.startsWith('http') ? proj.image : `${DOMAIN}${proj.image}`,
                        title: `${proj.title} - Architectural Elevation`,
                        caption: `${proj.title} luxury residences in Sector ${proj.location || 'Hinjewadi'}`
                    });
                }
                if (proj.masterLayout) {
                    imgs.push({
                        loc: proj.masterLayout.startsWith('http') ? proj.masterLayout : `${DOMAIN}${proj.masterLayout}`,
                        title: `${proj.title} Master Layout Plan`,
                        caption: `Master floor and site layout plan for ${proj.title} Life Republic`
                    });
                }
                if (Array.isArray(proj.floorPlans)) {
                    proj.floorPlans.forEach((fp: any) => {
                        if (fp.image) {
                            imgs.push({
                                loc: fp.image.startsWith('http') ? fp.image : `${DOMAIN}${fp.image}`,
                                title: `${proj.title} - ${fp.type} Floor Plan (${fp.size || ''})`,
                                caption: `${fp.type} luxury layout with optimized carpet area at ${proj.title}`
                            });
                        }
                    });
                }
            }
        } else if (route.startsWith('/media-center/')) {
            const slug = route.replace('/media-center/', '');
            const blog = (localBlogsData || []).find((b: any) => b.slug === slug);
            if (blog && blog.image) {
                imgs.push({
                    loc: blog.image.startsWith('http') ? blog.image : `${DOMAIN}${blog.image}`,
                    title: blog.title,
                    caption: blog.excerpt || blog.title
                });
            }
        } else if (route === '/amenities') {
            imgs.push(
                { loc: `${DOMAIN}/images/gallery/clubhouse.webp`, title: 'Crimson Clubhouse Amenities', caption: 'World-class clubhouse and indoor sports facilities at Life Republic' },
                { loc: `${DOMAIN}/images/home/overview-img.jpg`, title: '3.5-Acre Central Urban Park', caption: 'Lush green botanical gardens and jogging tracks in Life Republic' }
            );
        }
        return imgs;
    };

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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

    const images = getImagesForRoute(route);
    const imageTags = images.length > 0 
        ? '\n' + images.map(img => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`).join('\n')
        : '';

    return `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageTags}
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
