import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

entity_schema = """
    // ==========================================
    // GLOBAL ENTITY HARDENING (KNOWLEDGE GRAPH)
    // ==========================================
    const entitySchema = {
        "@context": "https://schema.org",
        "@type": ["RealEstateAgent", "Organization"],
        "name": "PropSmart Realty - Kolte Patil Life Republic Experts",
        "url": "https://life-republic.in",
        "logo": "https://life-republic.in/favicon.ico",
        "image": "https://liferepublic.in/images/gallery/eros/master-layout.webp",
        "description": "The absolute authority and premium channel partner for Kolte Patil Life Republic township in Hinjewadi, Pune. Specializing in luxury villas, 2 BHK, 3 BHK, and 4 BHK premium residences.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kolte Patil Life Republic, Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411057",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "18.6011",
            "longitude": "73.7188"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Pune"
            },
            {
                "@type": "City",
                "name": "Hinjewadi"
            },
            {
                "@type": "City",
                "name": "Wakad"
            }
        ],
        "priceRange": "₹75 Lakhs - ₹3.5 Crores",
        "telephone": "+91-9876543210",
        "email": "propsmartrealty@gmail.com",
        "knowsAbout": [
            "Pune Real Estate Market",
            "Hinjewadi IT Park Properties",
            "NRI Property Investment India",
            "Kolte Patil Developers",
            "MahaRERA Regulations"
        ]
    };

    const scriptTag = `<script type="application/ld+json">${JSON.stringify(entitySchema)}</script>`;

    let hardenedRewriter = new HTMLRewriter();
    
    // Inject Geo Headline and Entity Schema
    hardenedRewriter.on('body', {
        element(element) {
            element.prepend(geoHeadline, { html: true });
        }
    });

    hardenedRewriter.on('head', {
        element(element) {
            element.append(scriptTag, { html: true });
        }
    });

    return hardenedRewriter;
"""

# Replace the existing logic at the bottom
pattern = r"let baseRewriter = new HTMLRewriter\(\);.*?return baseRewriter"
content = re.sub(pattern, entity_schema.strip(), content, flags=re.DOTALL)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
