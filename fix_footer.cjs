const fs = require('fs');
const file = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

// Harden Footer container
content = content.replace(/bg-black\/95/g, 'bg-surface border-t-2 border-border-strong text-primary');
content = content.replace(/border-white\/10/g, 'border-border-strong');
content = content.replace(/border-white\/5/g, 'border-border-strong');
content = content.replace(/bg-white\/5/g, 'bg-transparent border-2 border-border-strong');

// Typography
content = content.replace(/text-gray-400/g, 'text-primary');
content = content.replace(/text-white/g, 'text-primary font-bold');
content = content.replace(/text-gray-300/g, 'text-primary');
content = content.replace(/text-gray-500\/60/g, 'text-text-muted');
content = content.replace(/text-gray-500\/40/g, 'text-text-muted');
content = content.replace(/text-gray-500/g, 'text-text-muted hover:text-primary');
content = content.replace(/text-gray-600/g, 'text-text-muted');

// Remove soft things
content = content.replace(/rounded-lg/g, 'rounded-none');
content = content.replace(/<div className="absolute bottom-0 left-0 w-full h-1\.5 bg-gradient-to-r.*"><\/div>/, '');

fs.writeFileSync(file, content);
