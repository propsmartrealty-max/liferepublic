const fs = require('fs');

const layoutFile = 'src/components/layout/Layout.tsx';
let layoutContent = fs.readFileSync(layoutFile, 'utf8');
layoutContent = layoutContent.replace(/import \{ ResidentPulse \} from '\.\.\/ui\/ResidentPulse';\n/g, '');
layoutContent = layoutContent.replace(/<ResidentPulse \/>\n/g, '');
fs.writeFileSync(layoutFile, layoutContent);

const homeFile = 'src/pages/Home.tsx';
let homeContent = fs.readFileSync(homeFile, 'utf8');
homeContent = homeContent.replace(/import \{ ResidentPulse \} from '\.\.\/components\/ui\/ResidentPulse';\n/g, '');
homeContent = homeContent.replace(/<ResidentPulse \/>\n/g, '');
fs.writeFileSync(homeFile, homeContent);

