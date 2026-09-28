const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

// Update Echoes
let regexEchoes = /(id:\s*['"]echoes['"][\s\S]*?status:\s*['"])[^'"]+(['"])/i;
content = content.replace(regexEchoes, `$1New Launch$2`);

// Update Duet
let regexDuet = /(id:\s*['"]duet['"][\s\S]*?status:\s*['"])[^'"]+(['"])/i;
content = content.replace(regexDuet, `$1New Launch$2`);

fs.writeFileSync(file, content);
