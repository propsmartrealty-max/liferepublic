const fs = require('fs');
let file = 'src/pages/Lifestyle.tsx';
let content = fs.readFileSync(file, 'utf8');

// The stats block text is way too big for a 4-column layout
content = content.replace(/text-5xl md:text-7xl lg:text-\[5rem\]/g, 'text-4xl md:text-5xl lg:text-6xl');
content = content.replace(/grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24/g, 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16');

fs.writeFileSync(file, content);

// Let's also check if other pages have similar issues
const files = fs.readdirSync('src/pages').filter(f => f.endsWith('.tsx')).map(f => 'src/pages/' + f);
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let original = c;
  c = c.replace(/text-5xl md:text-7xl lg:text-\[5rem\]/g, 'text-4xl md:text-5xl lg:text-6xl');
  if (c !== original) fs.writeFileSync(f, c);
}
