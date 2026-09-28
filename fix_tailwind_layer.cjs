const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Wrap the rainbow classes in @layer utilities so Tailwind can generate hover/group-hover variants!
content = content.replace('.bg-rainbow {', '@layer utilities {\n.bg-rainbow {');
content = content.replace('.rainbow-divider {', '.rainbow-divider {');
// I need to find the end of the rainbow utilities block and close the layer.
// Actually it's easier to just append a new block to the end of the file.

fs.writeFileSync(file, content);
