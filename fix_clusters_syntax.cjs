const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\}\n\n    \{\n        id: "oro-avenue"/, '},\n    {\n        id: "oro-avenue"');

fs.writeFileSync(file, content);
