const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update Hero Heading
content = content.replace(
    /The future of township living\./,
    'An Integrated Township Near Hinjewadi, Pune.'
);
content = content.replace(
    /SOVEREIGN CLASSIC/,
    'KOLTE-PATIL LIFE REPUBLIC PUNE'
);
content = content.replace(
    /Kolte Patil Life Republic is an ultra-premium/,
    'Discover Life Republic by Kolte-Patil, an integrated residential township at Marunji near Hinjewadi, Pune. Designed around expansive green spaces, community living and a wide range of residential options, Life Republic brings multiple residential developments together within one larger ~390-acre ecosystem.'
);

// Add the Long-form About Content silently in the hero text or a new section
// We can update the "Apartments" description
content = content.replace(
    /Explore premium residential clusters including Universe, Arezo, Atmos, and Aros\./,
    'Explore current and completed Life Republic projects including Qrious, Duet, Canvas, Aros, Atmos, and Echoes. Compare 2 & 3 BHK homes, floor plans, and RERA details.'
);

// Update Township section description
content = content.replace(
    /Experience the 390-acre ecosystem with 100\+ amenities, schools, and high-street retail\./,
    'Explore the Kolte-Patil Life Republic Pune location, connectivity to Hinjewadi IT Park, township amenities, and resale investment potential.'
);

fs.writeFileSync(file, content);
