const fs = require('fs');

let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Remove uppercase from h1-h6
content = content.replace(/@apply font-serif tracking-tight text-secondary uppercase;/g, "@apply font-serif tracking-tight text-secondary;");

// Remove text-transform: uppercase from heading-hero and heading-section
content = content.replace(/text-transform: uppercase;\n/g, "");

fs.writeFileSync(file, content);
