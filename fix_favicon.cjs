const fs = require('fs');
let file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /<link rel="icon" type="image\/svg\+xml" href="\/vite\.svg" \/>/g,
    '<link rel="icon" type="image/webp" href="/logo.webp" />'
);
content = content.replace(
    /<link rel="icon" href="\/favicon\.ico" \/>/g,
    '<link rel="icon" type="image/webp" href="/logo.webp" />'
);

fs.writeFileSync(file, content);
