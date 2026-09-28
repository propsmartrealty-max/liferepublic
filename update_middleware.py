import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

article_schema_logic = """
    // Market Reports Article Schema Injection
    if (url.pathname.startsWith('/market-reports/') && url.pathname.length > 16) {
      const slug = url.pathname.replace('/market-reports/', '');
      const title = slug.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
      
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": `${title} - Pune Real Estate Market Report`,
        "image": [
          `https://${url.hostname}/images/home/slider-1.webp`
        ],
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "author": [{
          "@type": "Organization",
          "name": "PropSmart Research",
          "url": `https://${url.hostname}`
        }],
        "publisher": {
          "@type": "Organization",
          "name": "Kolte Patil Life Republic",
          "logo": {
            "@type": "ImageObject",
            "url": `https://${url.hostname}/favicon.ico`
          }
        }
      };

      const articleScript = `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;
      const titleTag = `<title>${title} | Pune Real Estate Market Reports 2026</title>`;
      
      return new HTMLRewriter()
        .on('head', {
          element(element) {
            element.append(articleScript, { html: true });
            element.append(titleTag, { html: true });
          }
        })
        .on('title', {
          element(element) {
            element.remove();
          }
        })
        .transform(response);
    }
"""

content = content.replace("// Generate generic dynamic meta tags", article_schema_logic + "\n    // Generate generic dynamic meta tags")

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
