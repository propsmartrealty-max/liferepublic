const fs = require('fs');

let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Fix Aros Price (currently '₹85 Lakhs*')
content = content.replace(/id: 'kolte-patil-life-republic-aros.*?price: '₹85 Lakhs\*'/s, match => match.replace("'₹85 Lakhs*'", "'₹75 Lakhs*'"));

// Fix Universe Price and Title
content = content.replace(/id: 'kolte-patil-life-republic-universe.*?price: 'Sold Out \(₹72 Lakhs\*\)'/s, match => {
    let m = match.replace("'Sold Out (₹72 Lakhs*)'", "'₹40 Lakhs*'");
    return m.replace("Luxury 1 & 2 BHK", "Smart 1 & 2 BHK");
});

// Fix Duet Price
content = content.replace(/id: 'kolte-patil-life-republic-duet.*?price: '₹75 Lakhs\*'/s, match => match.replace("'₹75 Lakhs*'", "'₹55 Lakhs*'"));

fs.writeFileSync(file, content);
