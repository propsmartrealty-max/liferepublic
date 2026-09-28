with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# Add HSTS and CSP
security_headers = """    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Enterprise Hardening: HSTS and CSP
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    headers.set('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https: data:;");
    headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');"""

content = content.replace("    headers.set('X-XSS-Protection', '1; mode=block');\n    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');", security_headers)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
