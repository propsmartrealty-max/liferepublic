import type { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. ENTERPRISE SEO: Strict Domain Canonicalization
  if (url.hostname.endsWith('pages.dev') || url.hostname.includes('www.')) {
    const canonicalUrl = new URL(url.pathname + url.search, 'https://life-republic.in');
    return Response.redirect(canonicalUrl.toString(), 301);
  }

  const response = await next();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    const secureResponse = new Response(response.body, response);
    secureResponse.headers.set('X-Content-Type-Options', 'nosniff');
    return secureResponse;
  }

  // 2. ULTRA-ADVANCED EDGE CACHING HEADERS
  const secureHtmlResponse = new Response(response.body, response);
  secureHtmlResponse.headers.set('X-Content-Type-Options', 'nosniff');
  secureHtmlResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  secureHtmlResponse.headers.set('X-XSS-Protection', '1; mode=block');
  secureHtmlResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  secureHtmlResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  secureHtmlResponse.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  secureHtmlResponse.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob: https://www.facebook.com; connect-src 'self' https: wss:;");

  // 3. ROUTE-AWARE DYNAMIC SEO GRAPH (Google & Graph Protocol)
  let pageTitle = "Kolte Patil Life Republic Hinjewadi | Official 400-Acre Township";
  let pageDescription = "Explore Kolte Patil Life Republic in Hinjewadi. Get exclusive access to floor plans, master layouts, exact pricing, and 2026 possession details for Canvas, Atmos, and Universe.";
  
  if (url.pathname.includes('/canvas')) {
    pageTitle = "Kolte Patil Canvas Life Republic | Ultra-Luxury 3 & 4 BHK Hinjewadi";
    pageDescription = "Discover Canvas at Life Republic Hinjewadi. 40-storey ultra-luxury towers featuring infinity pools and panoramic views. Starting at ₹1.49 Cr.";
  } else if (url.pathname.includes('/atmos')) {
    pageTitle = "Kolte Patil Atmos Life Republic | Premium 2 & 3 BHK Hinjewadi";
    pageDescription = "Experience premium living at Atmos, Life Republic Hinjewadi. 2 & 3 BHK apartments with cutting-edge amenities and cross-ventilation. Starting ₹89 Lakhs.";
  }

  // 4. GRAPH PROTOCOL: Structured Data (JSON-LD)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Kolte Patil Life Republic",
      "url": "https://life-republic.in",
      "image": "https://liferepublic.in/images/webp/home/main-banner.webp",
      "description": "Premium 400-acre integrated township in Hinjewadi, Pune by Kolte Patil Developers.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Life Republic, Marunji, Hinjewadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411057",
        "addressCountry": "IN"
      },
      "priceRange": "₹55 Lakhs - ₹3.5 Cr"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Life Republic Hinjewadi",
      "url": "https://life-republic.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://life-republic.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  // 5. EDGE DOM MUTATION ENGINE (HTMLRewriter)
  const rewriter = new HTMLRewriter()
    .on('html', {
      element(element) {
        element.setAttribute('lang', 'en-IN'); // Geo-optimized language tagging
      }
    })
    .on('head', {
      element(element) {
        const canonicalUrl = `https://life-republic.in${url.pathname}`;
        
        // Overwrite or append critical SEO markers
        element.append(`<title>${pageTitle}</title>`, { html: true });
        element.append(`<meta name="description" content="${pageDescription}" />`, { html: true });
        element.append(`<link rel="canonical" href="${canonicalUrl}" />`, { html: true });
        
        // OpenGraph & Twitter for Social SEO
        element.append(`<meta property="og:title" content="${pageTitle}" />`, { html: true });
        element.append(`<meta property="og:description" content="${pageDescription}" />`, { html: true });
        element.append(`<meta property="og:url" content="${canonicalUrl}" />`, { html: true });
        element.append(`<meta property="og:type" content="website" />`, { html: true });
        element.append(`<meta property="og:image" content="https://liferepublic.in/images/webp/home/main-banner.webp" />`, { html: true });
        
        // LCP Optimization: Preload the massive hero image so Google PageSpeed Insights gives a 99+ score
        element.append(`<link rel="preload" as="image" href="https://liferepublic.in/images/webp/home/main-banner.webp" />`, { html: true });
        
        // Inject Google-specific rich snippets
        element.append(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`, { html: true });
        element.append(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`, { html: true });
      }
    })
    .on('title', {
      // Remove the old hardcoded title so our dynamic one takes over perfectly
      element(element) {
        element.remove();
      }
    });

  return rewriter.transform(secureHtmlResponse);
};
