const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file was messed up, let's fix it by searching for the exact error line
// It has </motion.div>\n            </div>\n        </Link>
// But the <div> was never opened!
// Let's replace </motion.div>\n            </div>\n        </Link> with </motion.div>\n        </Link>
content = content.replace(/<\/motion\.div>\n            <\/div>\n        <\/Link>/, '</motion.div>\n        </Link>');

fs.writeFileSync(file, content);
