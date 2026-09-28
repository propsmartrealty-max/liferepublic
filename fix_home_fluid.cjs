const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// The ultimate Apple fluid dark mode refactor
content = content.replace(/bg-gray-50/g, 'bg-transparent');
content = content.replace(/bg-gray-100/g, 'bg-transparent');
content = content.replace(/bg-white/g, 'bg-transparent');
content = content.replace(/bg-surface/g, 'bg-white/5 backdrop-blur-3xl');

content = content.replace(/text-secondary/g, 'text-white');
content = content.replace(/text-gray-500/g, 'text-white/60');
content = content.replace(/text-gray-600/g, 'text-white/80');
content = content.replace(/text-gray-900/g, 'text-white');
content = content.replace(/text-text-muted/g, 'text-white/50');
content = content.replace(/text-text-main/g, 'text-white');

content = content.replace(/shadow-hard/g, 'shadow-[0_8px_32px_rgba(0,0,0,0.5)]');

content = content.replace(/bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent/g, 'text-golden-gradient');

// Add the massive overlapping fluid card container
content = content.replace(
  /<HeroSlider \/>/,
  `<HeroSlider />\n      {/* Ultra Fluid Content Body */}\n      <div className="relative z-20 -mt-[100px] bg-[#0A0A0A]/80 backdrop-blur-[50px] rounded-t-[3rem] border-t border-white/[0.05] shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">`
);

// We need to close the massive div. Let's find the end of Home.tsx
content = content.replace(
  /<\/div>\n\s*<\/NeuralErrorBoundary>/,
  `    </div>\n    </div>\n    </NeuralErrorBoundary>`
);

fs.writeFileSync(file, content);
