const fs = require('fs');

function cleanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/uppercase tracking-\[0\.[0-9]+em\]/g, "tracking-tight font-semibold");
    content = content.replace(/uppercase/g, "tracking-tight"); // if there's standalone uppercase
    fs.writeFileSync(filePath, content);
}

cleanFile('src/components/layout/Navbar.tsx');
cleanFile('src/components/ui/Button.tsx');
