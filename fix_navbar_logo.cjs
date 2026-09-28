const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /<span className="font-sans font-medium text-xl tracking-tight uppercase">Life Republic\.<\/span>/g,
    '<img src="/logo.webp" alt="Life Republic" className="h-10 object-contain mix-blend-lighten" />'
);

fs.writeFileSync(file, content);
