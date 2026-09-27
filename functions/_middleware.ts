import type { PagesFunction } from "@cloudflare/workers-types";
export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Fetch the original response (the static HTML from Pages)
  const response = await next();

  // If it's not an HTML response, just return it with security headers
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    const secureResponse = new Response(response.body, response);
    secureResponse.headers.set('X-Content-Type-Options', 'nosniff');
    secureResponse.headers.set('X-Frame-Options', 'DENY');
    secureResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return secureResponse;
  }

  // 2. Define SEO Schema (JSON-LD) for Real Estate
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Kolte Patil Life Republic",
    "image": "https://life-republic.in/images/gallery/eros/master-layout.webp",
    "description": "Premium 390-acre integrated township in Hinjewadi, Pune.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Life Republic, Marunji, Hinjewadi",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "url": "https://life-republic.in"
  };

  // 3. Apply HTMLRewriter for Edge SEO Hardening
  const rewriter = new HTMLRewriter()
    // Ensure HTML tag has lang attribute for accessibility/SEO
    .on('html', {
      element(element) {
        if (!element.getAttribute('lang')) {
          element.setAttribute('lang', 'en');
        }
      }
    })
    // Inject dynamic canonical URL and JSON-LD schema into the <head>
    .on('head', {
      element(element) {
        // Dynamically set canonical to the exact requested URL (stripping query params)
        const canonicalUrl = `${url.protocol}//${url.hostname}${url.pathname}`;
        element.append(`<link rel="canonical" href="${canonicalUrl}" />`, { html: true });
        
        // Inject global organization schema
        element.append(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`, { html: true });

        // Hardened Edge Meta Tags
        element.append(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`, { html: true });
      }
    });

  const rewrittenResponse = rewriter.transform(response);

  // 4. Append Hardened Security Headers to the rewritten HTML
  const finalResponse = new Response(rewrittenResponse.body, rewrittenResponse);
  
  finalResponse.headers.set('X-Content-Type-Options', 'nosniff');
  finalResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  finalResponse.headers.set('X-XSS-Protection', '1; mode=block');
  finalResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  finalResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Basic Content Security Policy (adjust sources as needed for external scripts/styles)
  finalResponse.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:;"
  );

  return finalResponse;
};
