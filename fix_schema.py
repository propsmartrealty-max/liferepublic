import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

new_schema = """
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
"""

# Replace old entity schema (which was named schema)
pattern = r"const schema = \{.*?\n        \};\n"
content = re.sub(pattern, new_schema.strip() + "\n", content, flags=re.DOTALL)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
