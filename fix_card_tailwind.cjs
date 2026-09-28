const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace rainbow-border-wrap with tailwind p-[2px] bg-rainbow
content = content.replace(
    /className="relative overflow-hidden rounded-\[24px\] bg-black rainbow-border-wrap h-\[600px\] w-full flex flex-col justify-end transition-shadow duration-700 hover:glow-rainbow group"/,
    'className="relative overflow-hidden rounded-[24px] bg-black p-[2px] bg-rainbow hover:bg-rainbow-hover h-[600px] w-full flex flex-col justify-end transition-shadow duration-700 hover:glow-rainbow group"'
);

// We need an inner div for the background.
// Instead of messing with the DOM, let's just use box-shadow inset for a hacky border? No, box-shadow inset doesn't support gradients.
// Let's just use CSS!

fs.writeFileSync(file, content);
