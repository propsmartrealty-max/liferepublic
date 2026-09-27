const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-background section-bordered/g, 'bg-transparent py-20');
content = content.replace(/bg-background text-primary border-y-2 border-border-strong/g, 'bg-black/40 backdrop-blur-3xl text-white py-24');
content = content.replace(/text-primary/g, 'text-white');
content = content.replace(/border-2 border-border-strong shadow-hard/g, 'glass-card');
content = content.replace(/rounded-none/g, 'rounded-3xl');

fs.writeFileSync(file, content);

let footer = 'src/components/layout/Footer.tsx';
let fContent = fs.readFileSync(footer, 'utf8');
fContent = fContent.replace(/bg-surface border-t-2 border-border-strong text-primary/g, 'bg-black/60 backdrop-blur-3xl border-t border-white/10 text-white');
fContent = fContent.replace(/text-primary/g, 'text-white');
fContent = fContent.replace(/border-border-strong/g, 'border-white/10');
fContent = fContent.replace(/rounded-none/g, 'rounded-2xl');
fs.writeFileSync(footer, fContent);
