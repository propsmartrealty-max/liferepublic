const fs = require('fs');

let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Remove uppercase and massive tracking from headings
content = content.replace(/h1, h2, h3, h4, h5, h6 \{\n\s*@apply uppercase tracking-\[0\.2em\] font-medium text-gray-900;\n\s*\}/g, `h1, h2, h3, h4, h5, h6 {
    @apply tracking-tight font-semibold text-gray-900;
  }`);

// Fix glass-panel to be more premium
content = content.replace(/\.glass-panel \{\n\s*@apply bg-white\/80 backdrop-blur-md border border-gray-200\/50 shadow-lg;\n\s*\}/g, `.glass-panel {
    @apply bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)];
  }`);

// Fix glass-card to be more premium
content = content.replace(/\.glass-card \{\n\s*@apply bg-white\/60 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500;\n\s*\}/g, `.glass-card {
    @apply bg-white/80 backdrop-blur-lg border border-black/[0.04] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500;
  }`);

fs.writeFileSync(file, content);
