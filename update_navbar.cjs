const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add a rainbow strip at the very top of the navbar
if (!content.includes('h-[2px] w-full bg-rainbow')) {
    content = content.replace(
        /<nav /,
        '<div className="fixed top-0 left-0 w-full h-[3px] bg-rainbow z-50"></div>\n        <nav '
    );
    fs.writeFileSync(file, content);
}
