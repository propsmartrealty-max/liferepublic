const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
                callback(dirPath);
            }
        }
    });
}

let count = 0;
walkDir('./src', (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text-blue-* with rainbow-text-clip
    // Note: I will use a regex to match text-blue-\d+ or text-blue-\d+/\d+
    const regex = /text-blue-\d+(?:\/\d+)?/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, 'rainbow-text-clip font-bold');
        fs.writeFileSync(filePath, content);
        count++;
        console.log(`Updated ${filePath}`);
    }
});

console.log(`Finished updating ${count} files.`);
