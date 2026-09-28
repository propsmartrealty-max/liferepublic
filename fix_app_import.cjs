const fs = require('fs');
let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { GlobalErrorBoundary }')) {
    content = "import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary';\n" + content;
    fs.writeFileSync(file, content);
    console.log("Import added to App.tsx");
} else {
    console.log("Import already exists");
}
