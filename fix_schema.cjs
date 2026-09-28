const fs = require('fs');
let file = 'functions/_middleware.ts';
let content = fs.readFileSync(file, 'utf8');

const enhancedSchema = `
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
                    "priceRange": "₹75 Lakhs - ₹2.8 Cr",
                    "sameAs": [
                        "https://www.facebook.com/KoltePatilDevelopers",
                        "https://www.instagram.com/koltepatil",
                        "https://www.youtube.com/user/koltepatil"
                    ]
                },
                {
                    "@type": "Place",
                    "@id": "https://" + url.hostname + "/#place",
                    "name": "Life Republic Township",
                    "description": "390 Acres of Global Lifestyle featuring residential clusters Canvas, Qrious, Duet, and Echoes.",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Hinjewadi",
                        "addressRegion": "Pune"
                    },
                    "containedInPlace": {
                        "@type": "City",
                        "name": "Pune"
                    }
                },
                {
                    "@type": "WebSite",
                    "@id": "https://" + url.hostname + "/#website",
                    "url": "https://" + url.hostname,
                    "name": "Kolte Patil Life Republic Hinjewadi",
                    "publisher": {
                        "@id": "https://" + url.hostname + "/#organization"
                    }
                }
            ]
        };
`;

content = content.replace(
    /const schema = \{\s*"@context": "https:\/\/schema\.org",[\s\S]*?"priceRange": "₹"\s*\};/,
    enhancedSchema
);

fs.writeFileSync(file, content);
