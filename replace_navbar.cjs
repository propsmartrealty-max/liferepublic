const fs = require('fs');
const file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-black\/80/g, 'bg-surface/90 border-b-2 border-border-strong');
content = content.replace(/bg-secondary\/95/g, 'bg-surface/95 border-2 border-border-strong');
content = content.replace(/bg-secondary/g, 'bg-background');
content = content.replace(/text-white/g, 'text-primary');
content = content.replace(/text-white\/70/g, 'text-text-muted');
content = content.replace(/text-white\/50/g, 'text-text-muted');
content = content.replace(/text-white\/30/g, 'text-text-muted');
content = content.replace(/border-white\/10/g, 'border-border-strong');
content = content.replace(/border-white\/20/g, 'border-border-strong');
content = content.replace(/bg-white\/5/g, 'bg-transparent border-2 border-border-strong');
content = content.replace(/shadow-2xl shadow-black\/40/g, 'shadow-hard');
content = content.replace(/shadow-2xl shadow-accent\/20/g, 'shadow-hard');
content = content.replace(/shadow-2xl/g, 'shadow-hard');
content = content.replace(/rounded-full/g, 'rounded-none');
content = content.replace(/rounded-2xl/g, 'rounded-none');
content = content.replace(/rounded-3xl/g, 'rounded-none');
content = content.replace(/rounded-\[5rem\]/g, 'rounded-none');
content = content.replace(/rounded-\[4rem\]/g, 'rounded-none');
content = content.replace(/rounded-\[2rem\]/g, 'rounded-none');

fs.writeFileSync(file, content);
