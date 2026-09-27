const fs = require('fs');
const file = 'src/components/layout/Layout.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace("import { FloatingContact } from '../ui/FloatingContact';", "import { FloatingContact } from '../ui/FloatingContact';\nimport { WhatsAppWidget } from '../ui/WhatsAppWidget';");
fs.writeFileSync(file, content);
