with open('public/robots.txt', 'r') as f:
    content = f.read()

if 'Sitemap: https://life-republic.in/sitemap-silos-index.xml' not in content:
    content += "\nSitemap: https://life-republic.in/sitemap-silos-index.xml\n"

with open('public/robots.txt', 'w') as f:
    f.write(content)
