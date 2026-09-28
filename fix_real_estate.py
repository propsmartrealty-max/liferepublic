import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# We need to enhance the ApartmentComplex schema for specific projects
# to include a full RealEstateListing / Accommodation schema.

old_project_schema = """        // If it's a specific project, we inject an ApartmentComplex schema to rank for the specific project cluster without stuffing the page text.
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
            schemaHtml = `\\n<script type="application/ld+json">\\n${JSON.stringify(projectSchema, null, 2)}\\n</script>\\n`;
        }"""

new_project_schema = """        // Google Real Estate / Google Properties Ecosystem Injection
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
            
            schemaHtml = `\\n<script type="application/ld+json">\\n${JSON.stringify(realEstateSchema, null, 2)}\\n</script>\\n`;
        }"""

content = content.replace(old_project_schema, new_project_schema)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
