with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

root_schema = """
        } else if (path === '/') {
            title = "Kolte Patil Life Republic Township | Hinjewadi Pune #1 Real Estate";
            desc = "Ranked #1 Township in Pune. Explore Kolte Patil Life Republic, a 390-acre integrated smart city in Hinjewadi. Discover luxury 2, 3 BHK flats and villas.";
            const rootGraph = {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebSite",
                        "@id": "https://life-republic.in/#website",
                        "url": "https://life-republic.in/",
                        "name": "Kolte Patil Life Republic",
                        "description": "Premium 390-acre integrated township in Hinjewadi, Pune",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://life-republic.in/projects?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    },
                    {
                        "@type": "RealEstateAgent",
                        "@id": "https://life-republic.in/#organization",
                        "name": "Kolte Patil Life Republic",
                        "url": "https://life-republic.in",
                        "logo": "https://life-republic.in/logo.png",
                        "image": "https://life-republic.in/images/home/master-layout-full.jpg",
                        "telephone": "+91-7744009295",
                        "email": "propsmartrealty@gmail.com",
                        "priceRange": "\u20b985 Lakhs - \u20b93.5 Cr",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Life Republic, Marunji, Hinjewadi",
                            "addressLocality": "Pune",
                            "addressRegion": "Maharashtra",
                            "postalCode": "411057",
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 18.6186,
                            "longitude": 73.7144
                        },
                        "sameAs": [
                            "https://www.facebook.com/KoltePatil/",
                            "https://www.instagram.com/koltepatil/"
                        ]
                    },
                    {
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is the starting price of flats in Kolte Patil Life Republic?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The starting price is roughly \u20b989 Lakhs for a premium 2 BHK in the Qrious and Atmos clusters."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is Kolte Patil Life Republic MahaRERA registered?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, all active clusters are MahaRERA registered. For example, Canvas is P52100077008."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How far is Life Republic from Hinjewadi IT Park?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "It is located just 4.5 km from Hinjewadi Phase 1, making it a 10-15 minute drive for IT professionals."
                                }
                            }
                        ]
                    }
                ]
            };
            schemaHtml = `\\n<script type="application/ld+json">\\n${JSON.stringify(rootGraph, null, 2)}\\n</script>\\n`;
"""

if "if (path === '/township-guide')" in content:
    content = content.replace("} else if (path === '/township-guide')", root_schema + "        } else if (path === '/township-guide')")
    with open('functions/_middleware.ts', 'w') as f:
        f.write(content)
        print("Root schema injected.")
else:
    print("Could not find insertion point.")
