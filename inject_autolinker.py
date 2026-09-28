import re

with open('src/pages/ProjectDetails.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { AutoLinker } from '../components/seo/AutoLinker';"
content = content.replace("import { ROICalculator } from '../components/ui/ROICalculator';", "import { ROICalculator } from '../components/ui/ROICalculator';\n" + import_stmt)

# Replace the paragraph rendering the description with AutoLinker
old_desc = '<p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">'
new_desc = """
                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                            <AutoLinker text={project.description} />
"""

# The original block looks like this:
# <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
#   {project.description}
# </p>

content = re.sub(r'<p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">\s*\{project\.description\}\s*</p>', 
                 '<p className="text-lg md:text-xl text-white/70 font-light leading-relaxed"><AutoLinker text={project.description} /></p>', 
                 content)


with open('src/pages/ProjectDetails.tsx', 'w') as f:
    f.write(content)
