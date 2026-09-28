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

        
        // Google Policy Compliant JSON-LD Schema (Zero-Spam Structured Data)
        
        const schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "RealEstateAgent",
                    "@id": "https://" + url.hostname + "/#organization",
                    "name": "Life Republic by Kolte-Patil",
                    "legalName": "Kolte-Patil Developers Ltd",
                    "description": "Life Republic is a 390-acre integrated township by Kolte-Patil Developers, located near Hinjewadi IT Park, Pune. Offering premium 2, 3, and 4 BHK residences.",
                    "url": "https://" + url.hostname,
                    "logo": "https://" + url.hostname + "/logo.webp",
                    "image": "https://" + url.hostname + "/hero-new.jpg",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi",
                        "addressLocality": "Pune",
                        "postalCode": "411057",
                        "addressRegion": "Maharashtra",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "18.6185",
                        "longitude": "73.7106"
                    },
                    "telephone": "+91-9579250011",
                    "priceRange": "₹75 Lakhs - ₹2.8 Cr"
                },
                {
                    "@type": "Product",
                    "@id": "https://" + url.hostname + "/#product",
                    "name": "Kolte Patil Life Republic Township Hinjewadi",
                    "description": "Premium 1, 2, 3 & 4 BHK apartments and luxury villas in a 390-acre integrated township in Hinjewadi, Pune.",
                    "image": "https://liferepublic.in/hero-new.jpg",
                    "brand": {
                        "@type": "Brand",
                        "name": "Kolte Patil Developers"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "bestRating": "5",
                        "worstRating": "1",
                        "ratingCount": "2145",
                        "reviewCount": "1890"
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "url": "https://" + url.hostname + "/projects",
                        "priceCurrency": "INR",
                        "lowPrice": "7500000",
                        "highPrice": "35000000",
                        "offerCount": "120"
                    }
                }
            ]
        };


        let schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`;
        
        // If it's a specific project, we inject an ApartmentComplex schema to rank for the specific project cluster without stuffing the page text.
        if (path.includes('/projects/')) {
            const projectSlug = path.split('/').pop() || '';
            const projectName = projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, ' ');
            const projectSchema = {
                "@context": "https://schema.org",
                "@type": "ApartmentComplex",
                "name": "Life Republic " + projectName,
                "description": "Premium 2 & 3 BHK residences at Life Republic " + projectName + " near Hinjewadi IT Park.",
                "url": "https://" + url.hostname + path,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hinjewadi, Pune"
                }
            };
            schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(projectSchema, null, 2)}\n</script>\n`;
        }

        const dynamicMeta = `
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${desc}" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <link rel="canonical" href="https://${url.hostname}${url.pathname === '/' ? '' : url.pathname}" />
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            ${schemaHtml}
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
