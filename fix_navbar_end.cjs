const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file currently has an unclosed `<>` fragment at the top. Let's fix it by matching the exact end of the file.
content = content.replace(
    /        <\/nav>\n    \);\n};/,
    '        </nav>\n        </>\n    );\n};'
);

fs.writeFileSync(file, content);
