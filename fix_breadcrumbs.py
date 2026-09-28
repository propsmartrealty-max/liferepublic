import os
import glob
import re

# 1. Fix Layout.tsx Padding and Breadcrumb Styling
layout_path = 'src/components/layout/Layout.tsx'
with open(layout_path, 'r') as f:
    layout = f.read()

# Change pt-32 sm:pt-40 to pt-24
layout = re.sub(r'pt-32 sm:pt-40', 'pt-24', layout)
layout = re.sub(r'pt-32', 'pt-24', layout) # Just in case

# Wrap global breadcrumb in a proper container if not already
if '<div className="container mx-auto px-4">' in layout and '<Breadcrumbs />' in layout:
    # It's already wrapped. Let's just make sure it's tight.
    layout = layout.replace('<div className="container mx-auto px-4">\n          <Breadcrumbs />\n        </div>', '<div className="container mx-auto px-4 py-2">\n          <Breadcrumbs />\n        </div>')

with open(layout_path, 'w') as f:
    f.write(layout)

# 2. Remove Breadcrumbs from all pages
pages = glob.glob('src/pages/**/*.tsx', recursive=True)
for page in pages:
    with open(page, 'r') as f:
        content = f.read()
    
    # Remove imports
    content = re.sub(r"import\s+\{\s*Breadcrumbs\s*\}\s+from\s+['\"].*?Breadcrumbs['\"];\n", '', content)
    
    # Remove component tags
    content = re.sub(r"<\s*Breadcrumbs\s*/?>\n?", '', content)
    
    # Optional: if pages have hardcoded pt-20 or pt-24 on their root div, let's just leave it or reduce it.
    # Actually, if Layout has pt-24, the page shouldn't have pt-20. It causes double gap!
    # Let's reduce root pt-20 or pt-24 in pages to pt-4 or pt-8.
    content = re.sub(r'className="([^"]*)pt-20([^"]*)"', r'className="\1pt-4\2"', content)
    content = re.sub(r'className="([^"]*)pt-24([^"]*)"', r'className="\1pt-4\2"', content)
    content = re.sub(r'className="([^"]*)pt-32([^"]*)"', r'className="\1pt-4\2"', content)
    
    with open(page, 'w') as f:
        f.write(content)

print("Breadcrumbs deduplicated and gap fixed.")
