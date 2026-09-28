const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove mix-blend-overlay which makes text invisible against certain backgrounds
content = content.replace(/mix-blend-overlay/g, 'drop-shadow-2xl');

fs.writeFileSync(file, content);
