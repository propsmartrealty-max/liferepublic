const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://life-republic.in';
const blogsPath = path.resolve(__dirname, '../src/data/blogs.json');
const sectorsPath = path.resolve(__dirname, '../src/data/sectors.json');
const outputPath = path.resolve(__dirname, '../public/feed.xml');
const rssOutputPath = path.resolve(__dirname, '../public/rss.xml');

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function generateRss() {
    const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
    const sectorsData = JSON.parse(fs.readFileSync(sectorsPath, 'utf-8'));
    const sectors = sectorsData.sectors || [];

    const items = [];

    // Add blogs
    blogs.forEach(blog => {
        items.push({
            title: blog.title,
            link: `${DOMAIN}/insights/${blog.slug}`,
            description: blog.excerpt,
            pubDate: new Date(blog.date || '2024-06-01').toUTCString(),
            guid: `${DOMAIN}/insights/${blog.slug}`,
            category: blog.category || 'Real Estate'
        });
    });

    // Add key sector launches
    sectors.forEach(sector => {
        items.push({
            title: `${sector.name} - Luxury Residences at Life Republic Hinjewadi`,
            link: `${DOMAIN}/projects/${sector.id}`,
            description: `${sector.usp || sector.branding || ''} | Segment: ${sector.segment || 'Premium'}. Status: ${sector.rera_possession || 'Ready to Move'}.`,
            pubDate: new Date().toUTCString(),
            guid: `${DOMAIN}/projects/${sector.id}`,
            category: 'Project Launch'
        });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Kolte Patil Life Republic Hinjewadi Pune | Updates &amp; Market Insights</title>
    <link>${DOMAIN}/</link>
    <description>Official updates, new residential sector launches, floor plans, RERA approvals, and market intelligence for Kolte Patil Life Republic Hinjewadi Pune.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${DOMAIN}/images/brand/logo.webp</url>
      <title>Kolte Patil Life Republic</title>
      <link>${DOMAIN}/</link>
    </image>
${items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${item.pubDate}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

    fs.writeFileSync(outputPath, xml, 'utf-8');
    fs.writeFileSync(rssOutputPath, xml, 'utf-8');
    console.log(`✅ Generated RSS/Atom Feed with ${items.length} items at public/feed.xml and public/rss.xml`);
}

generateRss();
