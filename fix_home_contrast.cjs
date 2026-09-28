const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Revert Hero text back to text-white
content = content.replace(
    /text-transparent bg-clip-text bg-rainbow/g,
    'text-white'
);

fs.writeFileSync(file, content);
