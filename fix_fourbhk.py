with open('src/pages/landing/FourBHK.tsx', 'r') as f:
    content = f.read()

if "import { projectsRegistry } from '../../data/projects';" not in content:
    content = content.replace("import { api } from '../../services/api';", "import { api } from '../../services/api';\nimport { projectsRegistry } from '../../data/projects';")

content = content.replace("const { projectsRegistry: staticProjects } = await import('../../data/projects');", "const staticProjects = projectsRegistry;")

with open('src/pages/landing/FourBHK.tsx', 'w') as f:
    f.write(content)
