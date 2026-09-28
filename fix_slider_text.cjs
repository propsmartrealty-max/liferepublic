const fs = require('fs');

let file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/title: 'Welcome to Life Republic'/g, "title: 'Kolte Patil Life Republic <br/><span className=\"text-[#E5C07B]\">390-Acre Smart Township Ecosystem</span>'");
content = content.replace(/title: 'World-Class Amenities'/g, "title: 'An Integrated City <br/><span className=\"text-[#E5C07B]\">Miles From Chaos</span>'");
content = content.replace(/title: 'The Canvas of Luxury'/g, "title: 'The Canvas of <br/><span className=\"text-[#E5C07B]\">Ultra-Luxury</span>'");

// Because we used raw HTML in string, we need to dangerouslySetInnerHTML or change how it renders.
content = content.replace(/{slides\[current\]\.title}/g, "<span dangerouslySetInnerHTML={{ __html: slides[current].title }} />");

fs.writeFileSync(file, content);
