const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /const found = CLUSTERS\.find\(c => c\.slug === slug\);/,
    'const found = CLUSTERS.find(c => c.slug === slug || c.id === slug);'
);

fs.writeFileSync(file, content);
