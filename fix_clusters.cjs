const fs = require('fs');
let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Atmos Fixes
content = content.replace(/price: '₹82 Lakhs\*',/g, "price: '₹65 Lakhs*',");
content = content.replace(/{ type: '2 BHK Optima', size: '682 sq.ft.'/g, "{ type: '2 BHK', size: '657 sq.ft.'");
content = content.replace(/{ type: '2.5 BHK', size: '943 sq.ft.'/g, "{ type: '2.5 BHK', size: '821 sq.ft.'");
content = content.replace(/Carpet Area: 682 sq.ft./g, "Carpet Area: 657 sq.ft.");
content = content.replace(/Carpet Area: 943 sq.ft./g, "Carpet Area: 821 sq.ft.");

// Aros Fixes
// Aros is currently ₹95 Lakhs* in mock, let's make it ₹75 Lakhs*
content = content.replace(/price: '₹95 Lakhs\*', \/\* Aros/g, "price: '₹75 Lakhs*',");
// It might just say price: '₹95 Lakhs*' under Aros block. Let's find it contextually.
