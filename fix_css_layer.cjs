const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// I need to add } at the very end of the file to close the @layer utilities block.
content = content + '\n}\n';

fs.writeFileSync(file, content);
