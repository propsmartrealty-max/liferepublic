const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/@layer components \{/, `
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif tracking-tight text-white;
  }
}
@layer components {`);

fs.writeFileSync(file, content);
