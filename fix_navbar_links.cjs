const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// The old mapping logic:
/*
                {/* Desktop Links - Minimal *}
                <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium">
                    {['Projects', 'Master Plan', 'Location'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : `/${item.toLowerCase().replace(' ', '-')}`}
*/

const oldDesktopLinks = \`                <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium">
                    {['Projects', 'Master Plan', 'Location'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Projects' ? '/projects' : \`/\${item.toLowerCase().replace(' ', '-')}\`}
                            className="hover:opacity-50 transition-opacity cursor-interactive"
                        >
                            {item}
                        </Link>
                    ))}
                </div>\`;

const newDesktopLinks = \`                <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium">
                    {[
                        { name: 'Projects', path: '/projects' },
                        { name: 'Township', path: '/township-guide' },
                        { name: 'Central Garden', path: '/amenities' },
                        { name: 'Location', path: '/location' }
                    ].map((item) => (
                        <Link 
                            key={item.name} 
                            to={item.path}
                            className="hover:opacity-50 transition-opacity cursor-interactive"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>\`;

content = content.replace(oldDesktopLinks, newDesktopLinks);

// Mobile Links
const oldMobileLinks = \`                        {['Projects', 'Master Plan', 'Location', 'Lifestyle'].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={item}
                                className="my-4"
                            >
                                <Link 
                                    to={item === 'Projects' ? '/projects' : \`/\${item.toLowerCase().replace(' ', '-')}\`}\`;

const newMobileLinks = \`                        {[
                            { name: 'Projects', path: '/projects' },
                            { name: 'Township', path: '/township-guide' },
                            { name: 'Central Garden', path: '/amenities' },
                            { name: 'Location', path: '/location' },
                            { name: 'Lifestyle', path: '/lifestyle' }
                        ].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={item.name}
                                className="my-4"
                            >
                                <Link 
                                    to={item.path}\`;

content = content.replace(oldMobileLinks, newMobileLinks);

fs.writeFileSync(file, content);
