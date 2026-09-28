const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

const mappings = {
    'Echoes': 'https://liferepublic.in/images/webp/popup/echoes-desktop-kpdl.jpeg',
    'Canvas': 'https://liferepublic.in/images/webp/popup/canvas_desktop.jpg',
    'Universe': 'https://liferepublic.in/images/projects/location/1718965070Universe-.jpg',
    'Arezo': 'https://liferepublic.in/images/projects/location/1718965903Arezo.jpg',
    'Duet': 'https://liferepublic.in/images/projects/location/1747221568duet list image.jpg',
    'Aros': 'https://liferepublic.in/images/projects/location/1718965087Aros image.jpg',
    'Atmos': 'https://liferepublic.in/images/projects/location/1718965121atmos image.jpg',
    'Qrious': 'https://liferepublic.in/images/home/slider-1.webp'
};

for (const [cluster, url] of Object.entries(mappings)) {
    // We need to replace whatever is in the image field for that cluster with the new url
    // using regex because the existing ones might be slider-*.webp
    const regex = new RegExp(`(id:\\s*'${cluster.toLowerCase()}'[\\s\\S]*?image:\\s*')[^']+(')`, 'gi');
    content = content.replace(regex, `$1${url.replace(/ /g, '%20')}$2`);
}

fs.writeFileSync(file, content);
