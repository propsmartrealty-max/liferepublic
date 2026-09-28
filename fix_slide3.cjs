const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace "2 & 3 BHK" with "Apartments"
content = content.replace(
    /<h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">2 & 3 BHK<\/h2>/g, 
    '<h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">Apartments</h2>\n                            <p className="absolute bottom-10 text-white/70 text-sm font-light max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Explore premium residential clusters including Universe, Arezo, Atmos, and Aros.</p>'
);

// Replace "Villas" with "Township"
content = content.replace(
    /<h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">Villas<\/h2>/g,
    '<h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">Township</h2>\n                            <p className="absolute bottom-10 text-white/70 text-sm font-light max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Experience the 390-acre ecosystem with 100+ amenities, schools, and high-street retail.</p>'
);

// Update link for Township from /projects to /township-guide
// It's the second <Link to="/projects"...> block. Let's replace the entire block safely.
content = content.replace(
    /<div className="flex-1 relative group cursor-interactive overflow-hidden">\s*<img src="https:\/\/images\.unsplash\.com\/photo-1600607687931-cece5ce21448\?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-1000 group-hover:scale-105" \/>\s*<div className="absolute inset-0 flex items-center justify-center pointer-events-none">\s*<h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">Township<\/h2>\s*<p className="absolute bottom-10 text-white\/70 text-sm font-light max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Experience the 390-acre ecosystem with 100\+ amenities, schools, and high-street retail\.<\/p>\s*<\/div>\s*<Link to="\/projects" className="absolute inset-0 z-10"><\/Link>\s*<\/div>/g,
    `<div className="flex-1 relative group cursor-interactive overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600607687931-cece5ce21448?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-overlay">Township</h2>
                            <p className="absolute bottom-10 text-white/70 text-sm font-light max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Experience the 390-acre ecosystem with 100+ amenities, schools, and high-street retail.</p>
                        </div>
                        <Link to="/township-guide" className="absolute inset-0 z-10"></Link>
                    </div>`
);

fs.writeFileSync(file, content);
