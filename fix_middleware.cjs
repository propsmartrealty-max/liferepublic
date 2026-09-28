const fs = require('fs');
let file = 'functions/_middleware.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /<link rel="canonical" href={\`https:\/\/\${url\.hostname}\${url\.pathname === "\/" \? "" : url\.pathname}\`} \/>/,
    '<link rel="canonical" href="https://${url.hostname}${url.pathname === \'/\' ? \'\' : url.pathname}" />'
);

fs.writeFileSync(file, content);
