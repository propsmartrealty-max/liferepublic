const fs = require('fs');
const file = 'tailwind.config.js';
let content = fs.readFileSync(file, 'utf8');

// Change shadow-hard to use Charcoal (#2D2D2D) and hover to use Brand Green (#36A849)
content = content.replace(/'hard': '4px 4px 0px 0px rgba\\(0,0,0,1\\)'/g, "'hard': '4px 4px 0px 0px #2D2D2D'");
content = content.replace(/'hard-hover': '8px 8px 0px 0px rgba\\(0,0,0,1\\)'/g, "'hard-hover': '8px 8px 0px 0px #36A849'");

// Also let's add Kolte Patil Orange as an alternate shadow color if needed
fs.writeFileSync(file, content);
