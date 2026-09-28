const fs = require('fs');

let btnFile = 'src/components/ui/Button.tsx';
let btnContent = fs.readFileSync(btnFile, 'utf8');

// Ensure base button classes have uppercase
if (!btnContent.includes('uppercase tracking-widest')) {
    btnContent = btnContent.replace(
      /const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300";/g,
      'const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300";'
    );
    fs.writeFileSync(btnFile, btnContent);
}

let heroFile = 'src/components/sections/HeroSlider.tsx';
let heroContent = fs.readFileSync(heroFile, 'utf8');
heroContent = heroContent.replace(/text-\[17px\] tracking-tight/g, 'text-[14px] uppercase tracking-[0.2em]');
fs.writeFileSync(heroFile, heroContent);

