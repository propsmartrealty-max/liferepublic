with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# I need to insert a block before the schema logic
# Let's find: `} else if (path === '/amenities') {`
# And add the pSEO block right after it.

pseo_block = """        } else if (path.startsWith('/search/')) {
            const siloSlug = path.split('/').pop() || '';
            const formattedSlug = siloSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
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
            schemaHtml = `\\n<script type="application/ld+json">\\n${JSON.stringify(pseoSchema, null, 2)}\\n</script>\\n`;
"""

content = content.replace("} else if (path === '/amenities') {\n            title = \"World-Class Amenities | Life Republic Pune\";\n        }", "} else if (path === '/amenities') {\n            title = \"World-Class Amenities | Life Republic Pune\";\n" + pseo_block)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
