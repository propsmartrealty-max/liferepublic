export const onRequest: PagesFunction = async (context) => {
    const url = new URL(context.request.url);
    const path = url.pathname;

    // 0. Apex Domain Normalization (Consolidate www.life-republic.in -> life-republic.in)
    if (url.hostname === 'www.life-republic.in') {
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
                          path.endsWith('.webp');

    if (!isStaticAsset && path !== '/') {
        // Enforce trailing slash removal
        if (path.endsWith('/')) {
            const cleanPath = path.slice(0, -1);
            return Response.redirect(`${url.origin}${cleanPath}${url.search}`, 301);
        }

        // Enforce lowercase URLs for SEO consolidation
        if (path !== path.toLowerCase()) {
            return Response.redirect(`${url.origin}${path.toLowerCase()}${url.search}`, 301);
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
    const cf = context.request.cf || {};
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
    
    // SEO Hardening Directive
    headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (isSearchBot) {
        headers.set('X-Crawler-Classification', 'search-engine-verified');
    }

    const contentType = headers.get('content-type') || '';

    // 8. Streaming Edge HTML Rewriting
    // Preserves authentic SSG / SSR pre-rendered schema, canonical, and title with zero-latency streaming
    if (contentType.includes('text/html') && response.status === 200) {
        const edgeMeta = `
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            <meta name="nri-visitor" content="${isNRI ? 'true' : 'false'}" />
            <meta name="visitor-country" content="${country}" />
            <meta name="preferred-currency" content="${preferredCurrency}" />
        `;

        const rewriter = new HTMLRewriter().on('head', {
            element(el) {
                el.append(edgeMeta, { html: true });
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
