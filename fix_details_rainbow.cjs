const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /hover:bg-white hover:text-black/g,
    'bg-rainbow-hover hover:border-transparent'
);
content = content.replace(
    /hover:bg-white\/90/g,
    'bg-rainbow-hover hover:border-transparent'
);

fs.writeFileSync(file, content);
