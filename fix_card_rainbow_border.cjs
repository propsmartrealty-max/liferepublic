const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace rainbow-border-wrap which caused a CSS mask bug with a robust DOM wrapper
content = content.replace(
    /<Link\n            to={`\/projects\/\$\{slug\}`}\n            onMouseEnter={handleMouseEnter}\n            onMouseLeave={handleMouseLeave}\n            onMouseMove={handleMouseMove}\n            style={{\n                transform: `perspective\(1000px\) rotateX\(\$\{rotateX\}deg\) rotateY\(\$\{rotateY\}deg\)`,\n                transformStyle: "preserve-3d"\n            }}\n            className="relative overflow-hidden rounded-\[24px\] bg-black rainbow-border-wrap h-\[600px\] w-full flex flex-col justify-end transition-shadow duration-700 hover:glow-rainbow group"\n        >/,
    `<Link
            to={\`/projects/\${slug}\`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                transform: \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`,
                transformStyle: "preserve-3d"
            }}
            className="p-[1px] bg-rainbow-hover rounded-[24px] hover:glow-rainbow transition-shadow duration-700 h-[600px] w-full group block"
        >
            <div className="relative overflow-hidden rounded-[23px] bg-[#050505] h-full w-full flex flex-col justify-end">`
);

// We need to add the closing div for the inner wrapper before the closing Link tag.
content = content.replace(
    /        <\/Link>\n    \);\n}/,
    '            </div>\n        </Link>\n    );\n}'
);

fs.writeFileSync(file, content);
