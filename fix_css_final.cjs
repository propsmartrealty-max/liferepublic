const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Fix the unclosed/extra braces
content = content.replace(/}\n\n\n  h1, h2, h3, h4, h5, h6 \{\n    @apply font-serif tracking-tight text-white;\n  \}\n\}/, 
`
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif tracking-tight text-white;
  }
}`);

fs.writeFileSync(file, content);
