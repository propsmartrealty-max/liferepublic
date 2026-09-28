const fs = require('fs');

let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Fix Echoes price
content = content.replace(/id: 'kolte-patil-life-republic-echoes.*?price: '₹85 Lakhs\*'/s, match => match.replace("'₹85 Lakhs*'", "'₹92 Lakhs*'"));

// Fix Duet price and sizes
content = content.replace(/id: 'kolte-patil-life-republic-duet.*?price: '₹55 Lakhs\*'/s, match => match.replace("'₹55 Lakhs*'", "'₹68 Lakhs*'"));
content = content.replace(/{ type: '2 BHK Smart', size: '550 sq.ft.', image: '.*?duet_mplan.png', details: \['Carpet Area: 550 sq.ft.', 'Minimalist Design Flow'\] }/g, "{ type: '2 BHK Smart', size: '660 sq.ft.', image: '/images/projects/1747304746duet_mplan.png', details: ['Carpet Area: 660 sq.ft.', 'Minimalist Design Flow'] }");
content = content.replace(/{ type: '2 BHK Plus', size: '660 sq.ft.', image: '.*?duet_mplan.png', details: \['Carpet Area: 660 sq.ft.', 'Extended Balcony Space'\] }/g, "{ type: '2 BHK Plus', size: '835 sq.ft.', image: '/images/projects/1747304746duet_mplan.png', details: ['Carpet Area: 835 sq.ft.', 'Extended Balcony Space'] }");

fs.writeFileSync(file, content);
