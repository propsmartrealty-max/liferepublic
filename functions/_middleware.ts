export const onRequest: PagesFunction = async (context) => {
    const url = new URL(context.request.url);
    const response = await context.next();

    // 1. Enterprise Security Headers
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Set Edge Geolocation Headers for the Client to consume if needed
    const country = context.request.cf?.country || 'Unknown';
    const city = context.request.cf?.city || 'Unknown';
    headers.set('X-Edge-Country', typeof country === 'string' ? country : 'Unknown');
    headers.set('X-Edge-City', typeof city === 'string' ? city : 'Unknown');

    const contentType = headers.get('content-type') || '';

    // 2. Advanced Edge HTML Rewriting & Minification
    if (contentType.includes('text/html')) {
        let html = await response.text();
        
        // Edge HTML Minification: Strip out excessive whitespace and comments
        html = html.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments
        html = html.replace(/>\s+</g, '><'); // Remove whitespace between tags
        html = html.replace(/\n/g, ''); // Remove newlines
        
        // Inject SEO and dynamic meta tags via Edge
        const path = url.pathname;
        let title = "Kolte Patil Life Republic Pune | Price, Projects, 2 & 3 BHK, Reviews";
        let desc = "Explore Kolte Patil Life Republic Pune near Hinjewadi. Compare current projects, 2 & 3 BHK homes, prices, floor plans, amenities, RERA details, location, connectivity and resale options.";

        if (path.includes('/projects/')) {
            const projectSlug = path.split('/').pop();
            title = `${projectSlug ? projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, ' ') : 'Premium Project'} | Kolte Patil Life Republic`;
            desc = `Secure your future in our premium ${projectSlug} cluster. View exclusive layouts, exact pricing, and secure your site visit today.`;
        } else if (path === '/township-guide') {
            title = "390 Acre Township Guide | Life Republic Pune";
        } else if (path === '/amenities') {
            title = "World-Class Amenities | Life Republic Pune";
        }

        const dynamicMeta = `
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${desc}" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
        `;

        // Strip existing basic titles/metas to prevent duplicates
        html = html.replace(/<title>.*?<\/title>/gi, '');
        html = html.replace(/<meta name="description".*?>/gi, '');
        
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
