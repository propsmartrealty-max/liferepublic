import type { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. ENTERPRISE SEO: Prevent Duplicate Content (Canonical Domain Enforcer)
  // Automatically redirect any traffic from .pages.dev to the primary production domain
  if (url.hostname.endsWith('pages.dev')) {
    const canonicalUrl = new URL(url.pathname + url.search, 'https://life-republic.in');
    return Response.redirect(canonicalUrl.toString(), 301); // 301 Permanent Redirect
  }

  // 2. Fetch the original response (the static HTML from Pages)
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

  // 3. Define SEO Schema (JSON-LD) for Real Estate
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

  // 4. ENTERPRISE SECURITY: Prepare mutable response with Hardened Headers BEFORE rewriting
  const secureHtmlResponse = new Response(response.body, response);
  
  secureHtmlResponse.headers.set('X-Content-Type-Options', 'nosniff');
  secureHtmlResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  secureHtmlResponse.headers.set('X-XSS-Protection', '1; mode=block');
  secureHtmlResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  secureHtmlResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Enterprise Permissions Policy
  secureHtmlResponse.headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );
  
  // Basic Content Security Policy
  secureHtmlResponse.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:;"
  );

  // 5. Apply HTMLRewriter for Edge SEO Hardening and return it directly
  const rewriter = new HTMLRewriter()
    .on('html', {
      element(element) {
        if (!element.getAttribute('lang')) {
          element.setAttribute('lang', 'en');
        }
      }
    })
    .on('head', {
      element(element) {
        const canonicalUrl = `https://life-republic.in${url.pathname}`;
        element.append(`<link rel="canonical" href="${canonicalUrl}" />`, { html: true });
        element.append(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`, { html: true });
        element.append(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`, { html: true });
      }
    });

  return rewriter.transform(secureHtmlResponse);
};
