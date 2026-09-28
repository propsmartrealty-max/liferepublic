const fs = require('fs');
let file = 'functions/_middleware.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace Default Titles
content = content.replace(
    /let title = "Kolte Patil Life Republic \| 390 Acre Township in Hinjewadi";/,
    'let title = "Kolte Patil Life Republic Pune | Price, Projects, 2 & 3 BHK, Reviews";'
);
content = content.replace(
    /let desc = "Experience ultra-premium living at Pune's largest integrated township. Explore configurations, floor plans, and exclusive pricing.";/,
    'let desc = "Explore Kolte Patil Life Republic Pune near Hinjewadi. Compare current projects, 2 & 3 BHK homes, prices, floor plans, amenities, RERA details, location, connectivity and resale options.";'
);

fs.writeFileSync(file, content);
