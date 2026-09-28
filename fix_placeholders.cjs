const fs = require('fs');

let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace 24K Espada placeholders
content = content.replace(/title: 'Kolte Patil Life Republic 24K Espada.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "24k-espada-thumb.jpg").replace("/projects/", "/home/"));
content = content.replace(/{ type: '4 BHK Row House'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "24k-espada-thumb.jpg").replace("/projects/", "/home/"));
content = content.replace(/{ type: '5 BHK Estate'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "24k-espada-thumb.jpg").replace("/projects/", "/home/"));

// Replace Arezo
content = content.replace(/title: 'Kolte Patil Life Republic Arezo.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "arezo-thumb.jpg").replace("/projects/", "/home/"));

// Replace Sound of Soul
content = content.replace(/title: 'Kolte Patil Life Republic Sound of Soul.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "sound-of-soul-thumb.jpg").replace("/projects/", "/home/"));
content = content.replace(/{ type: '4 BHK Row House', size: '1650 sq.ft.'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "sound-of-soul-thumb.jpg").replace("/projects/", "/home/"));

// Replace Qrious
content = content.replace(/title: 'Kolte Patil Life Republic Qrious.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "1727356856project_banner___1795-930.jpg"));
content = content.replace(/{ type: '2 BHK', size: '796 - 900 sq.ft.'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "1727356856project_banner___1795-930.jpg"));
content = content.replace(/{ type: '3 BHK', size: '1100 - 1231 sq.ft.'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "1727356856project_banner___1795-930.jpg"));

// Replace 3rd Avenue
content = content.replace(/title: 'Kolte Patil Life Republic 3rd Avenue.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "box-img-01.jpg").replace("/projects/", "/home/"));
content = content.replace(/{ type: '1 BHK', size: '450 sq.ft.'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "box-img-01.jpg").replace("/projects/", "/home/"));
content = content.replace(/{ type: '2 BHK', size: '650 sq.ft.'.*?image: '\/images\/projects\/better-living-img.jpg'/s, match => match.replace("better-living-img.jpg", "box-img-01.jpg").replace("/projects/", "/home/"));

// Replace First Avenue, ORO, i-Towers, Villas with other box-img placeholders
content = content.replace(/better-living-img.jpg/g, "overview-img.jpg").replace("/projects/overview-img.jpg", "/home/overview-img.jpg");

fs.writeFileSync(file, content);
