with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# Enhance the dynamicMeta block
old_meta = """
        const dynamicMeta = `
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${desc}" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <link rel="canonical" href="https://${url.hostname}${url.pathname === '/' ? '' : url.pathname}" />
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            ${schemaHtml}
        `;
"""

new_meta = """
        const ogImage = "https://life-republic.in/images/home/master-layout-full.jpg";
        const currentUrl = `https://${url.hostname}${url.pathname === '/' ? '' : url.pathname}`;
        
        const dynamicMeta = `
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${desc}" />
            <meta property="og:image" content="${ogImage}" />
            <meta property="og:url" content="${currentUrl}" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Kolte Patil Life Republic" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <meta name="twitter:image" content="${ogImage}" />
            <meta name="twitter:site" content="@KoltePatil" />
            <link rel="canonical" href="${currentUrl}" />
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            ${schemaHtml}
        `;
"""

content = content.replace(old_meta.strip(), new_meta.strip())

# If the replace failed, we should know
if new_meta.strip() not in content:
    print("Replace failed, writing to a temp file for review.")
    with open('functions/_middleware_debug.ts', 'w') as f:
        f.write(content)
else:
    print("Replace succeeded.")
    with open('functions/_middleware.ts', 'w') as f:
        f.write(content)
