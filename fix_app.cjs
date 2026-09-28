const fs = require('fs');

let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/return \(\n\s*<CustomCursor \/>/g, 'return (\n    <>\n      <CustomCursor />');
content = content.replace(/<\/Routes>\n\s*<\/Suspense>\n\s*<\/AnimatePresence>\n\s*\n\s*\);/g, '</Routes>\n        </Suspense>\n      </AnimatePresence>\n    </>\n  );');

fs.writeFileSync(file, content);
