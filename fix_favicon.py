import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace('<link rel="icon" type="image/svg+xml" href="/vite.svg" />', '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />')
content = content.replace('<link rel="icon" type="image/x-icon" href="/favicon.ico" />', '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />')

if '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />' not in content:
    content = content.replace('<head>', '<head>\n    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />')

with open('index.html', 'w') as f:
    f.write(content)

