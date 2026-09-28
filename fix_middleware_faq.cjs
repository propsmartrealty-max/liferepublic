const fs = require('fs');
let file = 'functions/_middleware.ts';
let content = fs.readFileSync(file, 'utf8');

const faqSchemaInjection = `
        // Dynamic Individual Project FAQ Schema Injection
        let faqSchema = '';
        if (url.pathname.includes('/projects/canvas')) {
            faqSchema = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                    "@type": "Question",
                    "name": "What is the price of a 4 BHK in Canvas Life Republic?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The price for a premium 4 BHK in Canvas by Kolte-Patil starts at approximately ₹2.20 Cr onwards, subject to variations based on floor rise and exact size."
                    }
                }, {
                    "@type": "Question",
                    "name": "How tall are the towers in the Canvas project?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Canvas features Pune's tallest residential towers within Life Republic, reaching heights of approximately 120 meters (31+ floors)."
                    }
                }]
            });
        } else if (url.pathname.includes('/projects/qrious')) {
            faqSchema = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                    "@type": "Question",
                    "name": "Is Qrious suitable for IT professionals in Hinjewadi?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Qrious is located just 10-15 minutes from Hinjewadi IT Park Phase 1, making it a highly strategic and convenient location for IT professionals."
                    }
                }]
            });
        } else if (url.pathname.includes('/projects/duet')) {
            faqSchema = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                    "@type": "Question",
                    "name": "What sizes are available in Kolte Patil Duet?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Duet offers highly optimized 2 and 3 BHK configurations designed for modern living."
                    }
                }]
            });
        } else if (url.pathname.includes('/projects/echoes')) {
            faqSchema = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                    "@type": "Question",
                    "name": "What are the possession timelines for Echoes?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Echoes is currently a New Launch with possession slated for approximately December 2027."
                    }
                }]
            });
        }

        if (faqSchema) {
            content = content.replace(
                /<\\/head>/,
                \`<script type="application/ld+json">\${faqSchema}</script></head>\`
            );
        }
`;

// Insert it right before the final HTML return in the Response
content = content.replace(
    /return new Response\(content, \{\s*headers: response\.headers\s*\}\);/,
    faqSchemaInjection + '\n        return new Response(content, { headers: response.headers });'
);

fs.writeFileSync(file, content);
