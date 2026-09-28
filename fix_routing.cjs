const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add useNavigate
content = content.replace(
    /import { useParams, Link } from 'react-router-dom';/,
    "import { useParams, Link, useNavigate } from 'react-router-dom';"
);

// Add navigate hook and fix useEffect logic
const oldUseEffect = `    useEffect(() => {
        window.scrollTo(0, 0);
        // Find cluster in our highly accurate hardcoded array
        const found = CLUSTERS.find(c => c.slug === slug);
        setProject(found);
    }, [slug]);

    if (!project) {
        return <div className="pt-32 text-center text-white min-h-screen bg-black">Loading precision data...</div>;
    }`;

const newUseEffect = `    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const found = CLUSTERS.find(c => c.slug === slug);
        if (!found) {
            navigate('/projects', { replace: true });
        } else {
            setProject(found);
        }
    }, [slug, navigate]);

    if (!project) return null; // Prevent flicker before redirect`;

content = content.replace(oldUseEffect, newUseEffect);
fs.writeFileSync(file, content);
