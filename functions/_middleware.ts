export const onRequest = async (context) => {
    const url = new URL(context.request.url);
    const response = await context.next();
    
    // Only intercept HTML responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
        return response;
    }

    // Force strict security headers at the Edge
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("X-Frame-Options", "DENY");
    newHeaders.set("X-XSS-Protection", "1; mode=block");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // 1-Year Strict Transport Security (HSTS)
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    const edgeResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });

    // Cloudflare HTMLRewriter for Zero-Latency SEO Injection
    return new HTMLRewriter()
        .on('head', {
            element(element) {
                // Dynamically inject the precise canonical URL to prevent any Google Duplicate Content penalties
                const cleanPath = url.pathname.endsWith('/') && url.pathname.length > 1 ? url.pathname.slice(0, -1) : url.pathname;
                element.append(`<link rel="canonical" href="https://life-republic.in${cleanPath}" />`, { html: true });
                
                // Inject Edge Performance Marker
                element.append(`<meta name="cf-edge-cache" content="HIT" />`, { html: true });
            }
        })
        .transform(edgeResponse);
};
