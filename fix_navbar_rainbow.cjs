const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /hover:bg-white hover:text-black/g,
    'bg-rainbow-hover transition-all duration-500 border-white/50 hover:border-transparent'
);

fs.writeFileSync(file, content);
