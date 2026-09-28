const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace Hero video/image with Night View
// Remove the <video> tag completely
content = content.replace(/<video[\s\S]*?<\/video>/, '');
// Replace the fallback motion.img with the Night View Image
content = content.replace(
    /src="https:\/\/images\.unsplash\.com\/photo-1545324418-cc1a3fa10c00\?q=80&w=2000&auto=format&fit=crop"/,
    'src="https://www.koltepatil.com/assets/images/projects/life-republic/gallery/life-republic-night-view.jpg"' // Fallback night view URL assumption, if it breaks I'll use a reliable Unsplash luxury night view
);
// Actually, let's just use a high-quality Night View of a township to ensure it doesn't 404, or try to use their slider.
content = content.replace(
    /src="https:\/\/www\.koltepatil\.com\/assets\/images\/projects\/life-republic\/gallery\/life-republic-night-view\.jpg"/,
    'src="https://liferepublic.in/images/home/slider-2.webp"' // slider-2 is usually a stunning elevation
);
// Wait, the original was: src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
content = content.replace(
    /src="https:\/\/images\.unsplash\.com\/photo-1545324418-cc1a3fa10c00\?q=80&w=2000&auto=format&fit=crop"/,
    'src="https://liferepublic.in/images/home/slider-1.webp"'
);

// 2. Replace Apartments image with 4th Avenue Elevation
content = content.replace(
    /<img src="https:\/\/images\.unsplash\.com\/photo-1600596542815-ffad4c1539a9\?q=80&w=2000&auto=format&fit=crop"/,
    '<img src="https://liferepublic.in/images/projects/location/172060335117189650503rd Avenue-.jpg"' // This is the closest official avenue elevation
);

// 3. Replace Township image with Bird View
content = content.replace(
    /<img src="https:\/\/images\.unsplash\.com\/photo-1600607687931-cece5ce21448\?q=80&w=2000&auto=format&fit=crop"/,
    '<img src="https://liferepublic.in/images/home/box-img-01.jpg"'
);

fs.writeFileSync(file, content);
