export const onRequest: PagesFunction = async (context) => {
    const url = new URL(context.request.url);
    const path = url.pathname;

    // 0. Strict HTTPS & Apex Domain Normalization (Consolidate http:// and www.life-republic.in -> https://life-republic.in)
    const proto = context.request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
    const isWww = url.hostname === 'www.life-republic.in';
    const isHttp = proto === 'http';

    if (isWww || isHttp) {
        return Response.redirect(`https://life-republic.in${url.pathname}${url.search}`, 301);
    }

    // 1. Enterprise Edge URL Normalization (Prevent Duplicate Content in Google SERP)
    const isStaticAsset = path.startsWith('/assets/') ||
                          path.startsWith('/images/') ||
                          path.startsWith('/fonts/') ||
                          path.endsWith('.xml') ||
                          path.endsWith('.json') ||
                          path.endsWith('.txt') ||
                          path.endsWith('.ico') ||
                          path.endsWith('.svg') ||
                          path.endsWith('.png') ||
                          path.endsWith('.jpg') ||
                          path.endsWith('.jpeg') ||
                          path.endsWith('.avif') ||
                          path.endsWith('.webp') ||
                          path.endsWith('.woff2') ||
                          path.endsWith('.webmanifest') ||
                          path.endsWith('.js') ||
                          path.endsWith('.css') ||
                          path.endsWith('.pdf');

    // Immediately return clean 404 noindex for automated vulnerability probes (prevents Soft 404s in GSC)
    if (/\.(php|asp|aspx|jsp|env|git|sql|bak)$/i.test(path) || /^\/(wp-|cgi-bin|xmlrpc|phpmyadmin)/i.test(path)) {
        return new Response('Not Found', {
            status: 404,
            headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'public, max-age=3600' }
        });
    }

    if (!isStaticAsset && path !== '/') {
        // Enforce trailing slash removal
        if (path.endsWith('/')) {
            const cleanPath = path.slice(0, -1);
            return Response.redirect(`https://life-republic.in${cleanPath}${url.search}`, 301);
        }

        // Enforce lowercase URLs for SEO consolidation
        if (path !== path.toLowerCase()) {
            return Response.redirect(`https://life-republic.in${path.toLowerCase()}${url.search}`, 301);
        }
    }

    // 2. Fetch Origin Response
    const response = await context.next();
    const headers = new Headers(response.headers);

    // 3. Enterprise Security & Transport Directives
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    headers.set('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https: data:; connect-src 'self' https: wss:; frame-src 'self' https:;");
    headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');



    // 5. Dynamic Cache-Tag Allocation (Enterprise Targeted Edge Purging)
    let routeTag = 'lr-core';
    if (path === '/') {
        routeTag = 'lr-home, lr-core';
    } else if (path.startsWith('/projects/')) {
        const cluster = path.split('/').pop() || 'cluster';
        routeTag = `lr-clusters, lr-cluster-${cluster}, lr-projects`;
    } else if (path.startsWith('/search/')) {
        routeTag = 'lr-pseo, lr-search';
    } else if (path.startsWith('/insights/') || path.startsWith('/market-reports/')) {
        routeTag = 'lr-insights, lr-editorial';
    } else if (path === '/amenities' || path === '/connectivity' || path === '/location') {
        routeTag = 'lr-township, lr-core';
    }
    headers.set('Cache-Tag', `${routeTag}, lr-global`);
    headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');

    // 6. Edge Geolocation & NRI Country Intelligence
    const cf = (context.request.cf || {}) as { country?: unknown; city?: unknown };
    const country = (typeof cf.country === 'string' ? cf.country : 'IN') || 'IN';
    const city = (typeof cf.city === 'string' ? cf.city : 'Pune') || 'Pune';
    const isNRI = country !== 'IN';

    // Map International Currency Preference for NRIs
    const currencyMap: Record<string, string> = {
        'US': 'USD',
        'AE': 'AED',
        'GB': 'GBP',
        'SG': 'SGD',
        'CA': 'CAD',
        'AU': 'AUD',
        'SA': 'SAR',
        'QA': 'QAR',
        'KW': 'KWD',
        'OM': 'OMR'
    };
    const preferredCurrency = isNRI ? (currencyMap[country] || 'USD') : 'INR';

    headers.set('X-Edge-Country', country);
    headers.set('X-Edge-City', city);
    headers.set('X-NRI-Visitor', isNRI ? 'true' : 'false');
    headers.set('X-Preferred-Currency', preferredCurrency);

    // 7. Bot & Search Crawler Identification
    const userAgent = context.request.headers.get('user-agent') || '';
    const isSearchBot = /googlebot|bingbot|yandex|duckduckbot|slurp|baiduspider|gptbot|chatgpt|claudebot|perplexitybot|applebot/i.test(userAgent);

    const normalizedCanonicalPath = path.startsWith('/s/')
        ? `/search/${path.slice(3)}`
        : path;
    const canonicalUrl = `https://life-republic.in${normalizedCanonicalPath === '/' ? '/' : normalizedCanonicalPath}`;

    // SEO Hardening Directive & Edge Canonical Signaling
    headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (!isStaticAsset) {
        headers.set('Link', `<${canonicalUrl}>; rel="canonical", <https://life-republic.in/sitemap.xml>; rel="sitemap"`);
    }

    if (isSearchBot) {
        headers.set('X-Crawler-Classification', 'search-engine-verified');
        headers.set('Surrogate-Control', 'max-age=604800');
        headers.set('X-Edge-Indexing-Tier', 'Enterprise-Active');
    }

    // 7b. Edge Instant IndexNow Signal for Programmatic Pages & Search Crawlers
    if (!isStaticAsset && (isSearchBot || path.startsWith('/search/') || path.startsWith('/projects/'))) {
        const targetUrl = `https://life-republic.in${path}`;
        context.waitUntil(
            fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                    host: 'life-republic.in',
                    key: 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
                    keyLocation: 'https://life-republic.in/e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9.txt',
                    urlList: [targetUrl]
                })
            }).catch(() => {})
        );
    }

    const contentType = headers.get('content-type') || '';

    // 8. Streaming Edge HTML Rewriting
    // Preserves authentic SSG / SSR pre-rendered schema, canonical, and title.
    // For dynamic SPA shell fallbacks (app-shell.html), synthesizes accurate per-URL title, description, and canonical.
    if (contentType.includes('text/html') && response.status === 200) {
        const rawSlug = path.split('/').filter(Boolean).pop() || '';
        const readableSlug = rawSlug
            .replace(/-/g, ' ')
            .replace(/\bbhk\b/gi, 'BHK')
            .replace(/\bpune\b/gi, 'Pune')
            .replace(/\bhinjewadi\b/gi, 'Hinjewadi')
            .replace(/\bmarunji\b/gi, 'Marunji')
            .replace(/\bwakad\b/gi, 'Wakad')
            .replace(/\b24k\b/gi, '24K')
            .replace(/\brera\b/gi, 'RERA')
            .replace(/\b\w/g, (c) => c.toUpperCase());

        const dynamicTitle = readableSlug
            ? `${readableSlug} | Kolte Patil Life Republic`.slice(0, 62)
            : 'Kolte Patil Life Republic Hinjewadi | Flats, Villas & Prices';
        const dynamicDesc = readableSlug
            ? `Explore ${readableSlug} at Kolte Patil Life Republic 390-acre township in Hinjewadi, Pune. View verified pricing, floor plans, amenities & MahaRERA details.`
            : 'Explore Kolte Patil Life Republic, 390-acre township in Hinjewadi Pune. Check 2, 3 & 4 BHK flats, villas from ₹78L*, floor plans, brochure & MahaRERA details.';

        const edgeMeta = `
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            <meta name="nri-visitor" content="${isNRI ? 'true' : 'false'}" />
            <meta name="visitor-country" content="${country}" />
            <meta name="preferred-currency" content="${preferredCurrency}" />
        `;

        let isAppShell = false;

        const rewriter = new HTMLRewriter()
            .on('meta[name="app-shell"]', {
                element(el) {
                    isAppShell = true;
                    el.remove();
                }
            })
            .on('title', {
                element(el) {
                    if (isAppShell && readableSlug) {
                        el.setInnerContent(dynamicTitle);
                    }
                }
            })
            .on('meta[name="description"]', {
                element(el) {
                    if (isAppShell && readableSlug) {
                        el.setAttribute('content', dynamicDesc);
                    }
                }
            })
            .on('head', {
                element(el) {
                    el.onEndTag((endTag) => {
                        if (isAppShell) {
                            endTag.before(
                                `<link rel="canonical" href="${canonicalUrl}" />\n<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n`,
                                { html: true }
                            );
                        }
                        endTag.before(edgeMeta, { html: true });
                    });
                }
            });

        return rewriter.transform(new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
        }));
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
};
