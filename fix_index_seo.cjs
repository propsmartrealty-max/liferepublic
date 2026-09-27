const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Kolte Patil Life Republic",
    "url": "https://life-republic.in",
    "image": "https://liferepublic.in/images/webp/home/main-banner.webp",
    "description": "Premium 400-acre integrated township in Hinjewadi, Pune by Kolte Patil Developers. Ranked #1 Township in Pune.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Life Republic, Marunji, Hinjewadi",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "priceRange": "₹55 Lakhs - ₹3.5 Cr"
};

const schemaScript = `\n  <!-- Base Local SEO Schema -->\n  <script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2)}\n  </script>\n`;

if (!content.includes('application/ld+json')) {
    content = content.replace('</head>', `${schemaScript}</head>`);
    fs.writeFileSync('index.html', content);
}
