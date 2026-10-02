export const onRequest: PagesFunction = async (context) => {
    const url = new URL(context.request.url);
    const path = url.pathname;

    // 1. Enterprise Edge URL Normalization (Prevent Duplicate Content in Google SERP)
    // Avoid redirecting assets, images, API routes, or the root path
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

    // 4. Enterprise 103 Early Hints Preconnect Directives
    headers.set('Link', '<https://fonts.googleapis.com>; rel=preconnect; crossorigin, <https://fonts.gstatic.com>; rel=preconnect; crossorigin');

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

    // 8. Advanced Edge HTML Rewriting & Minification
    if (contentType.includes('text/html') && response.status === 200) {
        let html = await response.text();

        // Edge HTML Minification
        html = html.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
        html = html.replace(/>\s+</g, '><'); // Remove inter-tag whitespace
        html = html.replace(/\n/g, ''); // Flatten newlines

        let title = "Kolte Patil Life Republic Pune | Price, Projects, 2 & 3 BHK, Reviews";
        let desc = "Explore Kolte Patil Life Republic Pune near Hinjewadi. Compare current projects, 2 & 3 BHK homes, prices, floor plans, amenities, RERA details, location, connectivity and resale options.";
        let schemaHtml = "";

        if (path.startsWith('/projects/')) {
            const projectSlug = path.split('/').pop() || '';
            const formattedName = projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, ' ');
            title = `${formattedName} | Kolte Patil Life Republic`;
            desc = `Explore ${formattedName} at Kolte Patil Life Republic Hinjewadi. View verified floor plans, latest pricing, RERA details, and book your VIP site visit.`;

            const realEstateSchema = {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "ApartmentComplex",
                        "@id": `https://${url.hostname}${path}#complex`,
                        "name": `Life Republic ${formattedName}`,
                        "description": `Premium luxury residences at Life Republic ${formattedName} near Hinjewadi IT Park Pune.`,
                        "url": `https://${url.hostname}${path}`,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Survey No. 74, Marunji-Kasarsai Road, Hinjewadi",
                            "addressLocality": "Pune",
                            "addressRegion": "Maharashtra",
                            "postalCode": "411057",
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 18.5913,
                            "longitude": 73.7389
                        }
                    },
                    {
                        "@type": "RealEstateListing",
                        "name": `Residences at ${formattedName} - Life Republic`,
                        "url": `https://${url.hostname}${path}`,
                        "datePosted": new Date().toISOString(),
                        "seller": {
                            "@type": "RealEstateAgent",
                            "name": "PropSmart Realty (MahaRERA: A52100019166)"
                        }
                    }
                ]
            };
            schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(realEstateSchema)}\n</script>\n`;

        } else if (path === '/') {
            title = "Kolte Patil Life Republic Township | Hinjewadi Pune #1 Real Estate";
            desc = "Ranked #1 Township in Pune. Explore Kolte Patil Life Republic, a 390-acre integrated smart township in Hinjewadi. 1, 2, 3, 4 BHK residences & custom villas.";
            
            const rootGraph = {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebSite",
                        "@id": `https://${url.hostname}/#website`,
                        "url": `https://${url.hostname}/`,
                        "name": "Kolte Patil Life Republic",
                        "description": "390-Acre Integrated Sustainable Township in Hinjewadi Pune.",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": `https://${url.hostname}/projects?q={search_term_string}`,
                            "query-input": "required name=search_term_string"
                        }
                    },
                    {
                        "@type": "RealEstateAgent",
                        "@id": `https://${url.hostname}/#organization`,
                        "name": "Kolte Patil Life Republic",
                        "url": `https://${url.hostname}`,
                        "logo": `https://${url.hostname}/logo.webp`,
                        "image": `https://${url.hostname}/images/home/master-layout-full.jpg`,
                        "telephone": "+91-9370552525",
                        "email": "propsmartrealty@gmail.com",
                        "priceRange": "₹42 Lakhs - ₹5.50 Cr",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Survey No. 74, Marunji-Kasarsai Road, Hinjewadi",
                            "addressLocality": "Pune",
                            "addressRegion": "Maharashtra",
                            "postalCode": "411057",
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 18.5913,
                            "longitude": 73.7389
                        }
                    }
                ]
            };
            schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(rootGraph)}\n</script>\n`;

        } else if (path.startsWith('/search/')) {
            const siloSlug = path.split('/').pop() || '';
            const formattedSlug = siloSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            title = `${formattedSlug} | Life Republic`;
            desc = `Find ${formattedSlug} in Hinjewadi Pune at Kolte Patil Life Republic. 390-acre gated township, RERA verified. Book visit!`;
        }

        const ogImage = "https://life-republic.in/images/home/master-layout-full.jpg";
        const currentUrl = `https://${url.hostname}${path === '/' ? '' : path}`;

        const dynamicMeta = `
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${desc}" />
            <meta property="og:image" content="${ogImage}" />
            <meta property="og:url" content="${currentUrl}" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Kolte Patil Life Republic" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <meta name="twitter:image" content="${ogImage}" />
            <link rel="canonical" href="${currentUrl}" />
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            <meta name="nri-visitor" content="${isNRI ? 'true' : 'false'}" />
            <meta name="visitor-country" content="${country}" />
            <meta name="preferred-currency" content="${preferredCurrency}" />
            ${schemaHtml}
        `;

        // Clean duplicates
        html = html.replace(/<title>.*?<\/title>/gi, '');
        html = html.replace(/<meta name="description"[^>]*>/gi, '');
        html = html.replace('</head>', `${dynamicMeta}</head>`);

        return new Response(html, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
};
