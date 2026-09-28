import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# Add X-Robots-Tag to the headers block
old_headers = """    // 1. Enterprise Security Headers
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');"""

new_headers = """    // 1. Enterprise Security Headers & SEO Hardening
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // SEO Hardening: Force Google to Index & Allow Large Image Previews for Discover
    headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');"""

content = content.replace(old_headers, new_headers)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
