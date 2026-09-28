const fs = require('fs');
let file = 'src/lib/clusters.ts';
let content = fs.readFileSync(file, 'utf8');

const mappings = {
    'Echoes': 'https://liferepublic.in/images/webp/popup/echoes-desktop-kpdl.jpeg',
    'Canvas': 'https://liferepublic.in/images/webp/popup/canvas_desktop.jpg',
    'Universe': 'https://liferepublic.in/images/projects/location/1718965070Universe-.jpg',
    'Arezo': 'https://liferepublic.in/images/projects/location/1718965903Arezo.jpg',
    'Duet': 'https://liferepublic.in/images/projects/location/1747221568duet%20list%20image.jpg',
    'Aros': 'https://liferepublic.in/images/projects/location/1718965087Aros%20image.jpg',
    'Atmos': 'https://liferepublic.in/images/projects/location/1718965121atmos%20image.jpg',
    'Qrious': 'https://liferepublic.in/images/home/slider-1.webp'
};

for (const [cluster, url] of Object.entries(mappings)) {
    // Regex allows single or double quotes around id and image values
    const regex = new RegExp(`(id:\\s*['"]${cluster.toLowerCase()}['"][\\s\\S]*?image:\\s*['"])[^'"]+(['"])`, 'gi');
    content = content.replace(regex, `$1${url}$2`);
}

fs.writeFileSync(file, content);
