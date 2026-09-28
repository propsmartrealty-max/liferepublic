const fs = require('fs');

let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Remove animate-blob from @apply
content = content.replace(/opacity-40 animate-blob;/g, 'opacity-40;\n    animation: blob 15s infinite alternate;');

fs.writeFileSync(file, content);
