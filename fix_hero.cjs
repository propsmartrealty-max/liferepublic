const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the video block and update the image
const newHeroBackground = `
                    {/* Hero Architectural Shot */}
                    <motion.img 
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 15, ease: 'easeOut' }}
                        src="/hero-new.jpg" 
                        alt="Life Republic Pune" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]/90"></div>
`;

content = content.replace(
    /\{\/\* Fallback image if video fails to load, but we scale it slowly for a cinematic Ken Burns effect \*\/\}[\s\S]*?<div className="absolute inset-0 bg-gradient-to-b from-black\/40 via-transparent to-black\/80"><\/div>/,
    newHeroBackground
);

fs.writeFileSync(file, content);
