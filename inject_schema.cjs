const fs = require('fs');
let file = 'functions/_middleware.ts';
let content = fs.readFileSync(file, 'utf8');

// Inject JSON-LD Schema Logic into the middleware
const schemaLogic = `
        // Google Policy Compliant JSON-LD Schema (Zero-Spam Structured Data)
        const schema = {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Kolte-Patil Life Republic Pune - Independent Review Platform",
            "image": "https://liferepublic.com/logo.webp",
            "description": "Independent property information, floor plans, pricing, and project reviews for Kolte Patil Life Republic township in Marunji near Hinjewadi, Pune.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi",
                "addressLocality": "Pune",
                "postalCode": "411057",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
            },
            "url": "https://" + url.hostname,
            "telephone": "+910000000000",
            "priceRange": "₹"
        };

        let schemaHtml = \`\\n<script type="application/ld+json">\\n\${JSON.stringify(schema, null, 2)}\\n</script>\\n\`;
        
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
            schemaHtml = \`\\n<script type="application/ld+json">\\n\${JSON.stringify(projectSchema, null, 2)}\\n</script>\\n\`;
        }
`;

// Insert the schema logic before the dynamicMeta block
content = content.replace(
    /const dynamicMeta = `/,
    `${schemaLogic}\n        const dynamicMeta = \``
);

// Add the schemaHtml into the dynamicMeta string
content = content.replace(
    /<meta name="cf-edge-location" content="\${city}, \${country}" \/>/,
    '<meta name="cf-edge-location" content="${city}, ${country}" />\n            ${schemaHtml}'
);

// Enforce Canonical Tags (Crucial for Google Standards to prevent duplicate content penalties)
content = content.replace(
    /<meta name="twitter:description" content="\${desc}" \/>/,
    '<meta name="twitter:description" content="${desc}" />\n            <link rel="canonical" href="https://" + url.hostname + path />'
);

// Fix syntax for canonical link
content = content.replace(
    /<link rel="canonical" href="https:\/\/" \+ url\.hostname \+ path \/>/,
    '<link rel="canonical" href={`https://${url.hostname}${url.pathname === "/" ? "" : url.pathname}`} />'
);

fs.writeFileSync(file, content);
