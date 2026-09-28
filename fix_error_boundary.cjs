const fs = require('fs');
let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// The return statement starts with `<>`
content = content.replace(
    /return \(\n    <>\n      <CustomCursor \/>/,
    'return (\n    <>\n      <GlobalErrorBoundary>\n      <CustomCursor />'
);

// Close it at the end
content = content.replace(
    /<\/AnimatePresence>\n    <\/>/,
    '</AnimatePresence>\n      </GlobalErrorBoundary>\n    </>'
);

fs.writeFileSync(file, content);
