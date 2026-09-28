const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Import lucide icons
if (!content.includes('MapPin')) {
    content = content.replace(/import \{ Link \} from 'react-router-dom';/, `import { Link } from 'react-router-dom';\nimport { MapPin, Clock, Sparkles, AlertCircle } from 'lucide-react';`);
}

// 2. Add the Status Badge to the top-left, move Config below it.
content = content.replace(
    /<div className="flex justify-between items-start">[\s\S]*?<div className="px-4 py-1.5 bg-black\/40 backdrop-blur-md border border-white\/10 rounded-full text-\[10px\] font-bold text-white uppercase tracking-widest shadow-xl">\s*\{config\}\s*<\/div>/,
    `<div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 items-start">
            {project.status && (
                <div className={\`px-3 py-1 backdrop-blur-md border rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-1 \${
                    project.status === 'Ready to Move' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                    project.status === 'New Launch' ? 'bg-rainbow border-transparent text-white' : 
                    'bg-white/10 text-white/90 border-white/20'
                }\`}>
                    <AlertCircle size={10} />
                    {project.status}
                </div>
            )}
            <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-xl">
                {config}
            </div>
        </div>`
);

// 3. Add Sector Tag, USP, and Possession Date above the Project Name
content = content.replace(
    /<h3 className="text-4xl font-sans font-bold text-white tracking-tight">/,
    `{project.sector && (
        <div className="flex items-center gap-1.5 text-white/60 mb-2">
            <MapPin size={12} className="text-white/40" />
            <span className="text-[10px] uppercase tracking-widest font-bold">{project.sector}</span>
        </div>
    )}
    <h3 className="text-4xl font-sans font-bold text-white tracking-tight">`
);

content = content.replace(
    /<p className="text-sm text-white\/60 line-clamp-2 leading-relaxed">/,
    `{project.usp && (
        <div className="flex items-start gap-1.5 mb-2 mt-1">
            <Sparkles size={12} className="rainbow-text-clip font-bold mt-0.5 shrink-0" />
            <span className="text-xs font-bold text-white/90 leading-tight">{project.usp}</span>
        </div>
    )}
    <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">`
);

content = content.replace(
    /<p className="text-xs text-white\/50 uppercase tracking-widest mb-1 font-bold">Pricing Structure<\/p>/,
    `{project.possession && (
        <div className="flex items-center gap-1.5 mb-4 text-white/70">
            <Clock size={12} className="text-white/50" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Possession: {project.possession}</span>
        </div>
    )}
    <p className="text-xs text-white/50 uppercase tracking-widest mb-1 font-bold">Pricing Structure</p>`
);

fs.writeFileSync(file, content);
