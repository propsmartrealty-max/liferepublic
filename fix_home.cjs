const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard containers with bordered editorial containers
content = content.replace(/bg-gradient-to-b from-surface to-white/g, 'bg-background section-bordered');
content = content.replace(/bg-surface/g, 'bg-background');
content = content.replace(/shadow-2xl/g, 'shadow-hard');
content = content.replace(/rounded-3xl/g, 'rounded-none');
content = content.replace(/rounded-2xl/g, 'rounded-none');
content = content.replace(/rounded-xl/g, 'rounded-none');

// Update location section to high-contrast editorial instead of dark gradient
content = content.replace(/bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white/g, 'bg-background text-primary border-y-2 border-border-strong');
content = content.replace(/text-gray-300/g, 'text-text-muted');
content = content.replace(/text-gray-400/g, 'text-text-muted');
content = content.replace(/bg-gradient-to-r from-white via-gray-200 to-gray-400/g, 'text-primary');
content = content.replace(/bg-gradient-to-r from-blue-500 via-green-500 to-orange-500/g, 'bg-primary');
content = content.replace(/border-blue-500\/30/g, 'border-2 border-border-strong shadow-hard');
content = content.replace(/border-orange-500\/30/g, 'border-2 border-border-strong shadow-hard');
content = content.replace(/border-green-500\/30/g, 'border-2 border-border-strong shadow-hard');
content = content.replace(/border-rose-500\/30/g, 'border-2 border-border-strong shadow-hard');
content = content.replace(/bg-gradient-to-br from-[a-z]+-500\/20 to-[a-z]+-500\/5/g, 'bg-surface');

fs.writeFileSync(file, content);
