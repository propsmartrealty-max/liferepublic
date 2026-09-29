with open('src/components/layout/Layout.tsx', 'r') as f:
    content = f.read()

# Remove pt-24 completely from Layout
content = content.replace("<main className={`flex-grow ${location.pathname === '/' ? '' : 'pt-24'}`} aria-label={ariaLabel}>", '<main className="flex-grow" aria-label={ariaLabel}>')

with open('src/components/layout/Layout.tsx', 'w') as f:
    f.write(content)

