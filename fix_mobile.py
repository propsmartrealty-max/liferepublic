import re

# 1. Fix HTML Viewport and PWA tags for Google Mobile Standard
with open('index.html', 'r') as f:
    html = f.read()

old_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
new_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />\n  <meta name="theme-color" content="#0a0a0a" />\n  <meta name="apple-mobile-web-app-capable" content="yes" />\n  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'

html = html.replace(old_viewport, new_viewport)
with open('index.html', 'w') as f:
    f.write(html)

# 2. Inject Google Web Vitals Mobile CSS fixes
with open('src/index.css', 'r') as f:
    css = f.read()

google_mobile_css = """
/* ==========================================
   GOOGLE MOBILE STANDARD & WEB VITALS LOCKDOWN
   ========================================== */
html, body {
  overflow-x: hidden;
  width: 100%;
  -webkit-text-size-adjust: 100%; /* Prevent iOS text size adjustment CLS */
  text-size-adjust: 100%;
  overscroll-behavior-y: none; /* Prevent pull-to-refresh reload glitches */
}

/* Enforce Google's strict 48x48px minimum touch target for accessibility */
button, 
a, 
input, 
select, 
textarea {
  min-height: 48px;
  min-width: 48px;
}

/* Exempt small inline links from the 48px rule to prevent weird text spacing */
p a, span a {
  min-height: auto;
  min-width: auto;
}

/* Mobile image optimization constraints */
img {
  max-width: 100%;
  height: auto;
  content-visibility: auto; /* Defer off-screen rendering */
}
"""

if "GOOGLE MOBILE STANDARD" not in css:
    with open('src/index.css', 'w') as f:
        f.write(css + "\n" + google_mobile_css)

