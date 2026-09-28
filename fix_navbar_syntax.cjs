const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Wrap the return statement with a React Fragment
content = content.replace(
    /return \(\n        <div className="fixed top-0 left-0 w-full h-\[3px\] bg-rainbow z-50"><\/div>\n        <nav/,
    'return (\n        <>\n        <div className="fixed top-0 left-0 w-full h-[3px] bg-rainbow z-50"></div>\n        <nav'
);
content = content.replace(
    /            <\/nav>\n        \);/,
    '            </nav>\n        </>\n        );'
);

fs.writeFileSync(file, content);
