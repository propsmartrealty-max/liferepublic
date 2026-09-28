const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /<\/section>\n\s*<\/div>\n\s*\);\n};/g,
    '            </section>\n        </div>\n        </div>\n    );\n};'
);

fs.writeFileSync(file, content);
