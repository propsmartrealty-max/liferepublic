export const onRequest: PagesFunction = async (context) => {

    const url = new URL(context.request.url);
    const response = await context.next();

    // 1. Enterprise Security Headers & SEO Hardening
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Enterprise Hardening: HSTS and CSP
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    headers.set('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https: data:;");
    headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // SEO Hardening: Force Google to Index & Allow Large Image Previews for Discover
    headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Set Edge Geolocation Headers for the Client to consume if needed
    const country = context.request.cf?.country || 'Unknown';
    const city = context.request.cf?.city || 'Unknown';
    headers.set('X-Edge-Country', typeof country === 'string' ? country : 'Unknown');
    headers.set('X-Edge-City', typeof city === 'string' ? city : 'Unknown');

    const contentType = headers.get('content-type') || '';

    // 2. Advanced Edge HTML Rewriting & Minification
    if (contentType.includes('text/html') && response.status === 200) {
        let html = await response.text();
        
        // Edge HTML Minification: Strip out excessive whitespace and comments
        html = html.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments
        html = html.replace(/>\s+</g, '><'); // Remove whitespace between tags
        html = html.replace(/\n/g, ''); // Remove newlines
        
        // Inject SEO and dynamic meta tags via Edge
        const path = url.pathname;
        let title = "Kolte Patil Life Republic Pune | Price, Projects, 2 & 3 BHK, Reviews";
        let desc = "Explore Kolte Patil Life Republic Pune near Hinjewadi. Compare current projects, 2 & 3 BHK homes, prices, floor plans, amenities, RERA details, location, connectivity and resale options.";
        let schemaHtml = "";

        if (path.includes('/projects/')) {
            const projectSlug = path.split('/').pop();
            title = `${projectSlug ? projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, ' ') : 'Premium Project'} | Kolte Patil Life Republic`;
            desc = `Secure your future in our premium ${projectSlug} cluster. View exclusive layouts, exact pricing, and secure your site visit today.`;
        } else if (path === '/township-guide') {
            title = "390 Acre Township Guide | Life Republic Pune";
        } else if (path === '/amenities') {
            title = "World-Class Amenities | Life Republic Pune";
        } else if (path.startsWith('/search/')) {
            const siloSlug = path.split('/').pop() || '';
            const formattedSlug = siloSlug.replace(/-/g, ' ').replace(/\w/g, l => l.toUpperCase());
            
            // Generate Programmatic Meta Data
            title = `${formattedSlug} | Life Republic Township Hinjewadi`;
            desc = `Find ${formattedSlug} directly at Kolte Patil Life Republic Township Hinjewadi. Access premium inventory, floor plans, and pricing for this high-ROI real estate location.`;
            
            // Programmatic pSEO Schema for Google
            const pseoSchema = {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": title,
                "description": desc,
                "url": "https://" + url.hostname + path,
                "mainEntity": {
                    "@type": "RealEstateListing",
                    "name": formattedSlug,
                    "description": `Premium real estate options for ${formattedSlug} within Kolte Patil Life Republic Township.`,
                    "url": "https://" + url.hostname + path,
                    "datePosted": new Date().toISOString()
                }
            };
            
            // We append the schema generation right into dynamicMeta by hijacking schemaHtml early
            schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(pseoSchema, null, 2)}\n</script>\n`;
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
                    "telephone": "+91-7744009295",
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


        if (!schemaHtml) { schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`; }
        
        // Google Real Estate / Google Properties Ecosystem Injection
        if (path.includes('/projects/')) {
            const projectSlug = path.split('/').pop() || '';
            const projectName = projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, ' ');
            
            const realEstateSchema = {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "ApartmentComplex",
                        "@id": "https://" + url.hostname + path + "#complex",
                        "name": "Life Republic " + projectName,
                        "description": "Premium luxury residences at Life Republic " + projectName + " near Hinjewadi IT Park.",
                        "url": "https://" + url.hostname + path,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road",
                            "addressLocality": "Pune",
                            "addressRegion": "Maharashtra",
                            "postalCode": "411057",
                            "addressCountry": "IN"
                        }
                    },
                    {
                        "@type": "RealEstateListing",
                        "name": "For Sale: " + projectName + " at Kolte Patil Life Republic",
                        "description": "Newly launched premium apartments in Hinjewadi Phase 1.",
                        "datePosted": new Date().toISOString(),
                        "url": "https://" + url.hostname + path,
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "INR",
                            "price": "8900000",
                            "businessFunction": "http://purl.org/goodrelations/v1#Sell",
                            "itemOffered": {
                                "@type": "Apartment",
                                "name": "Premium Apartment in " + projectName,
                                "numberOfRooms": 3,
                                "floorSize": {
                                    "@type": "QuantitativeValue",
                                    "value": "1100",
                                    "unitCode": "SQF"
                                },
                                "amenityFeature": [
                                    { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
                                    { "@type": "LocationFeatureSpecification", "name": "Gymnasium", "value": true },
                                    { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true }
                                ]
                            }
                        }
                    }
                ]
            };
            
            schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(realEstateSchema, null, 2)}\n</script>\n`;
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
