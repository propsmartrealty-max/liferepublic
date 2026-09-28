import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# We need to inject the Product and AggregateRating schema.
new_schema = """
    // ==========================================
    // GLOBAL ENTITY HARDENING (KNOWLEDGE GRAPH)
    // ==========================================
    const entitySchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["RealEstateAgent", "Organization"],
                "@id": "https://life-republic.in/#organization",
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
                "telephone": "+91-9876543210",
                "email": "propsmartrealty@gmail.com"
            },
            {
                "@type": "Product",
                "@id": "https://life-republic.in/#product",
                "name": "Kolte Patil Life Republic Township Hinjewadi",
                "description": "Premium 1, 2, 3 & 4 BHK apartments and luxury villas in a 390-acre integrated township in Hinjewadi, Pune.",
                "image": "https://liferepublic.in/images/home/overview-img.jpg",
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
                    "url": "https://life-republic.in/projects",
                    "priceCurrency": "INR",
                    "lowPrice": "7500000",
                    "highPrice": "35000000",
                    "offerCount": "120"
                }
            }
        ]
    };
"""

# Replace old entity schema
pattern = r"const entitySchema = \{.*?\n    \};\n"
content = re.sub(pattern, new_schema.strip() + "\n", content, flags=re.DOTALL)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
