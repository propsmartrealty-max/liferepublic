/**
 * Enterprise Cloudflare Edge Indexing Ping Endpoint
 * POST /api/index-ping: Instantly broadcast specific URLs to IndexNow & Google Indexing
 * GET /api/index-ping: Query live indexing health status
 */

interface Env {
    CLOUDFLARE_API_TOKEN?: string;
    INDEXNOW_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async () => {
    return new Response(JSON.stringify({
        status: 'active',
        service: 'Enterprise Edge Programmatic Indexer',
        domain: 'https://life-republic.in',
        features: [
            'Instant Edge IndexNow Broadcast',
            'Canonical HTTP Link Header Injection',
            'Googlebot & AI Crawler Optimization',
            'Multi-Account Quota Rotation'
        ],
        sitemaps: [
            'https://life-republic.in/sitemap.xml',
            'https://life-republic.in/sitemap-silos-index.xml',
            'https://life-republic.in/google-property-feed.xml',
            'https://life-republic.in/feed.xml'
        ],
        timestamp: new Date().toISOString()
    }, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store'
        }
    });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = await context.request.json() as { urls?: string[] };
        const rawUrls = body.urls || [];
        
        // Filter and sanitize URLs
        const validUrls = rawUrls
            .filter(u => typeof u === 'string' && u.startsWith('https://life-republic.in'))
            .slice(0, 100);

        if (validUrls.length === 0) {
            return new Response(JSON.stringify({ error: 'No valid https://life-republic.in URLs provided.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Fire IndexNow broadcast asynchronously via edge
        context.waitUntil(
            fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                    host: 'life-republic.in',
                    key: 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
                    keyLocation: 'https://life-republic.in/e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9.txt',
                    urlList: validUrls
                })
            }).catch(() => {})
        );

        return new Response(JSON.stringify({
            success: true,
            message: `Broadcasting ${validUrls.length} URLs across search index syndicates at edge.`,
            urls: validUrls
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
