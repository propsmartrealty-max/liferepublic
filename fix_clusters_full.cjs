const fs = require('fs');

let file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// ATMOS Updates
content = content.replace(/'₹82 Lakhs\*'/g, "'₹65 Lakhs*'"); // Atmos was 82L, now 65L

// AROS Updates
// Aros is at index 2 or 3. Let's do a replace for Aros specifically.
content = content.replace(
    /title: 'Kolte Patil Life Republic Aros \| Premium 2 & 3 BHK Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: 'Sector R4 \(Aros\)',\n\s*price: '.*?',/g,
    "title: 'Kolte Patil Life Republic Aros | Premium 2 & 3 BHK Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R4 (Aros)',\n        price: '₹75 Lakhs*',"
);
content = content.replace(
    /{ type: '2 BHK Executive', size: '718 sq.ft.', image: '.*?master.webp', virtualTourUrl: '.*?', details: \['Carpet Area: 718 sq.ft.', 'Optimized Living-Dining', 'Large Master Bedroom'\] }/g,
    "{ type: '2 BHK', size: '718 sq.ft.', image: '/images/projects/1724406503master.webp', virtualTourUrl: 'https://my.matterport.com/show/?m=JvwN82W8Xq1', details: ['Carpet Area: 718 sq.ft.', 'Optimized Living-Dining', 'Large Master Bedroom'] }"
);
content = content.replace(
    /{ type: '3 BHK Royal', size: '1176 sq.ft.', image: '.*?master.webp', virtualTourUrl: '.*?', details: \['Carpet Area: 1176 sq.ft.', 'Wrap-around Balcony', 'Premium Bath Fittings'\] }/g,
    "{ type: '3 BHK', size: '920 - 1176 sq.ft.', image: '/images/projects/1724406503master.webp', virtualTourUrl: 'https://my.matterport.com/show/?m=JvwN82W8Xq1', details: ['Carpet Area: 920-1176 sq.ft.', 'Wrap-around Balcony', 'Premium Bath Fittings'] }"
);


// UNIVERSE Updates
content = content.replace(
    /title: 'Kolte Patil Life Republic Universe \| Luxury 1 & 2 BHK Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: 'Sector R10 \(Universe\)',\n\s*price: '.*?',/g,
    "title: 'Kolte Patil Life Republic Universe | Smart 1 & 2 BHK Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R10 (Universe)',\n        price: '₹40 Lakhs*',"
);
content = content.replace(
    /{ type: '2 BHK Smart', size: '629 sq.ft.', image: '.*?small5.webp', details: \['Carpet Area: 629 sq.ft.', 'Dual Balcony Layout', 'Optimized Master Bedroom'\] }/g,
    "{ type: '1 BHK', size: '393 - 444 sq.ft.', image: '/images/projects/1724418593small5.webp', details: ['Carpet Area: 393-444 sq.ft.', 'Smart Layout', 'Premium Bath Fittings'] },\n            { type: '2 BHK', size: '560 - 629 sq.ft.', image: '/images/projects/1724418593small5.webp', details: ['Carpet Area: 560-629 sq.ft.', 'Dual Balcony Layout', 'Optimized Master Bedroom'] }"
);

// DUET Updates
content = content.replace(
    /title: 'Kolte Patil Life Republic Duet \| Premium 2 BHK Hinjewadi',\n\s*category: 'Lifestyle',\n\s*location: 'Sector R9 \(Duet\)',\n\s*price: '.*?',/g,
    "title: 'Kolte Patil Life Republic Duet | Premium 2 BHK Hinjewadi',\n        category: 'Lifestyle',\n        location: 'Sector R9 (Duet)',\n        price: '₹55 Lakhs*',"
);
content = content.replace(
    /{ type: '2 BHK Smart', size: '660 sq.ft.', image: '.*?duet_mplan.png', details: \['Carpet Area: 660 sq.ft.', 'Minimalist Design Flow'\] },\n\s*{ type: '2 BHK Plus', size: '766 sq.ft.', image: '.*?duet_mplan.png', details: \['Carpet Area: 766 sq.ft.', 'Extended Balcony Space'\] }/g,
    "{ type: '2 BHK Smart', size: '550 sq.ft.', image: '/images/projects/1747304746duet_mplan.png', details: ['Carpet Area: 550 sq.ft.', 'Minimalist Design Flow'] },\n            { type: '2 BHK Plus', size: '660 sq.ft.', image: '/images/projects/1747304746duet_mplan.png', details: ['Carpet Area: 660 sq.ft.', 'Extended Balcony Space'] }"
);


fs.writeFileSync(file, content);
