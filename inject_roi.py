import re

with open('src/pages/ProjectDetails.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { ROICalculator } from '../components/ui/ROICalculator';"
content = content.replace("import { Gallery } from '../components/ui/Gallery';", "import { Gallery } from '../components/ui/Gallery';\n" + import_stmt)

# Add component to the render
component_injection = """
                {/* ROI & EMI Calculator */}
                <div className="mt-20">
                    <ROICalculator />
                </div>
"""
content = content.replace("</div>\n            </div>\n\n            {/* Floating Action Bar (Mobile Only) */}", component_injection + "\n            </div>\n            </div>\n\n            {/* Floating Action Bar (Mobile Only) */}")

with open('src/pages/ProjectDetails.tsx', 'w') as f:
    f.write(content)
