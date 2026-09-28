const fs = require('fs');
let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('CinematicPreloader')) {
    content = content.replace(
        /import { Navbar } from '\.\/components\/layout\/Navbar';/,
        `import { Navbar } from './components/layout/Navbar';\nimport { CinematicPreloader } from './components/ui/CinematicPreloader';`
    );
    content = content.replace(
        /<Router>/,
        `<Router>\n            <CinematicPreloader />`
    );
    fs.writeFileSync(file, content);
}
