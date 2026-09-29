with open('src/components/layout/Layout.tsx', 'r') as f:
    content = f.read()

content = content.replace('        </div>\n        \n        <AnimatePresence mode="wait">', '        <AnimatePresence mode="wait">')
content = content.replace('<main className={`flex-grow ${location.pathname === \'/\' ? \'\' : \'pt-24\'}`} aria-label={ariaLabel}>\n        </div>', '<main className={`flex-grow ${location.pathname === \'/\' ? \'\' : \'pt-24\'}`} aria-label={ariaLabel}>')

with open('src/components/layout/Layout.tsx', 'w') as f:
    f.write(content)
