const fs = require('fs');
let file = 'src/components/ui/Button.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure Buttons are huge, readable, and highly animated
content = content.replace(
  /primary: "bg-accent\/80 text-white backdrop-blur-xl border border-white\/20 shadow-glass hover:bg-accent hover:shadow-glass-hover hover:-translate-y-1"/,
  'primary: "bg-accent text-white border-2 border-transparent shadow-glass hover:bg-white hover:text-accent hover:shadow-glass-hover hover:-translate-y-1"'
);

content = content.replace(
  /outline: "bg-transparent text-white border border-white\/30 backdrop-blur-sm hover:bg-white\/10"/,
  'outline: "bg-white/10 text-white border-2 border-white backdrop-blur-md shadow-glass hover:bg-white hover:text-black hover:-translate-y-1"'
);

content = content.replace(
  /glass: "bg-white\/5 text-white backdrop-blur-2xl border border-white\/10 shadow-glass hover:bg-white\/10"/,
  'glass: "bg-white/20 text-white backdrop-blur-2xl border-2 border-white/50 shadow-glass hover:bg-white/40 hover:-translate-y-1 font-bold"'
);

fs.writeFileSync(file, content);
