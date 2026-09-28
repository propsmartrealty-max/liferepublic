const fs = require('fs');

function compressPadding(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Reduce massive paddings
    content = content.replace(/py-40/g, 'py-16');
    content = content.replace(/py-32/g, 'py-16');
    content = content.replace(/py-24/g, 'py-12');
    
    // Reduce margins
    content = content.replace(/mb-24/g, 'mb-10');
    content = content.replace(/mb-20/g, 'mb-10');
    content = content.replace(/mb-16/g, 'mb-8');
    content = content.replace(/mt-20/g, 'mt-10');
    
    // Reduce gaps
    content = content.replace(/gap-24/g, 'gap-10');
    content = content.replace(/gap-16/g, 'gap-8');
    
    // Make Hero smaller than a full screen if they think it's too blank
    // Actually, keeping Hero h-screen is standard, but let's compress the content inside.
    content = content.replace(/min-h-screen/g, 'min-h-[80vh]');

    fs.writeFileSync(file, content);
}

compressPadding('src/pages/Home.tsx');
compressPadding('src/components/sections/HeroSlider.tsx');
compressPadding('src/components/ui/ProjectCard.tsx');

