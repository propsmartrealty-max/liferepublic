const fs = require('fs');

let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<SmoothScrolling>/g, '');
content = content.replace(/<\/SmoothScrolling>/g, '');
content = content.replace(/import { SmoothScrolling } from '\.\/components\/layout\/SmoothScrolling';\n/g, '');

fs.writeFileSync(file, content);
