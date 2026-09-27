const fs = require('fs');
const file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the floating header container with a full-width flat structural header
content = content.replace(/<header className=\{`fixed top-0 left-0 w-full z-\[100\] transition-all duration-700 px-6 py-8 \$\{scrolled \? 'sm:py-4' : 'sm:py-8'\}\`\}>/, 
                          `<header className={'fixed top-0 left-0 w-full z-[100] bg-surface border-b-2 border-border-strong transition-all duration-300 ' + (scrolled ? 'py-2 shadow-hard' : 'py-4')}>`);

content = content.replace(/<nav className="container mx-auto" aria-label="Main Navigation">/, 
                          `<nav className="w-full" aria-label="Main Navigation">`);

// Remove the inner styling that formed the pill
content = content.replace(/<div className=\{`relative flex items-center justify-between px-4 md:px-10 py-3 md:py-5 bg-background\/80 backdrop-blur-3xl rounded-none border border-border-strong shadow-hard transition-all \$\{scrolled \? 'shadow-accent\/20 border-accent\/20' : ''\}\`\}>/, 
                          `<div className="relative flex items-center justify-between px-6 lg:px-12 w-full">`);

fs.writeFileSync(file, content);
