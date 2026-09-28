const fs = require('fs');

function compressExtreme(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Extremely tight padding
    content = content.replace(/py-16/g, 'py-8');
    content = content.replace(/py-12/g, 'py-6');
    content = content.replace(/py-20/g, 'py-10');
    content = content.replace(/py-8/g, 'py-6');
    
    // Tight margins
    content = content.replace(/mb-12/g, 'mb-6');
    content = content.replace(/mb-10/g, 'mb-4');
    content = content.replace(/mb-8/g, 'mb-4');
    content = content.replace(/mb-6/g, 'mb-3');
    content = content.replace(/mt-10/g, 'mt-6');
    
    // Tight gaps
    content = content.replace(/gap-10/g, 'gap-4');
    content = content.replace(/gap-8/g, 'gap-4');
    content = content.replace(/gap-6/g, 'gap-3');
    
    // Height reductions to eliminate massive scroll depth
    content = content.replace(/h-\[75vh\]/g, 'h-[50vh]');
    content = content.replace(/min-h-\[75vh\]/g, 'min-h-[50vh]');
    content = content.replace(/min-h-screen/g, 'min-h-[50vh]');
    content = content.replace(/h-screen/g, 'h-[60vh]');
    
    // Reduce card sizes
    content = content.replace(/aspect-\[4\/3\]/g, 'aspect-[16/9]'); // Makes cards shorter
    content = content.replace(/h-\[400px\]/g, 'h-[250px]');
    
    fs.writeFileSync(file, content);
}

const files = [
    'src/pages/Home.tsx',
    'src/components/sections/HeroSlider.tsx',
    'src/components/ui/ProjectCard.tsx',
    'src/pages/Projects.tsx',
    'src/pages/Lifestyle.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        compressExtreme(f);
    }
});

