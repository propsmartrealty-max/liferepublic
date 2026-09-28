const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace Unsplash / placeholder images with OG liferepublic.in images
content = content.replace(/https:\/\/images\.unsplash\.com[^'"]+/g, (match) => {
    return 'https://liferepublic.in/images/home/slider-1.webp';
});

const mappings = {
    'Echoes': 'https://liferepublic.in/images/webp/popup/echoes-desktop-kpdl.jpeg',
    'Canvas': 'https://liferepublic.in/images/webp/popup/canvas_desktop.jpg',
    'Universe': 'https://liferepublic.in/images/projects/location/1718965070Universe-.jpg',
    'Arezo': 'https://liferepublic.in/images/projects/location/1718965903Arezo.jpg',
    'Duet': 'https://liferepublic.in/images/home/slider-2.webp',
    'Aros': 'https://liferepublic.in/images/home/slider-3.webp',
    'Atmos': 'https://liferepublic.in/images/home/slider-4.webp',
    'Qrious': 'https://liferepublic.in/images/home/slider-5.webp'
};

for (const [cluster, url] of Object.entries(mappings)) {
    const regex = new RegExp(`(id: '${cluster.toLowerCase()}'[\\s\\S]*?image: ')[^']+(')`, 'i');
    content = content.replace(regex, `$1${url}$2`);
}

fs.writeFileSync(file, content);
