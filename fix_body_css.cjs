const fs = require('fs');

let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/@apply font-sans antialiased overflow-x-hidden bg-background text-text-main;/g, '@apply font-sans antialiased overflow-x-hidden;\n    background-color: #F5F5F7;\n    color: #1D1D1F;');

fs.writeFileSync(file, content);
