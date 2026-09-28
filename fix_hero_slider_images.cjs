const fs = require('fs');
let file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/https:\/\/liferepublic\.in\/images\/webp\/home\/main-banner\.webp/g, '/images/home/slider-1.webp');
content = content.replace(/https:\/\/liferepublic\.in\/images\/home\/slider-1\.webp/g, '/images/home/slider-2.webp');
content = content.replace(/https:\/\/liferepublic\.in\/images\/home\/slider-2\.webp/g, '/images/home/slider-3.webp');

fs.writeFileSync(file, content);
