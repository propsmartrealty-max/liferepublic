import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { FOMOEngine } from './components/ui/FOMOEngine';"
content = content.replace("import { CommandPalette } from './components/ui/CommandPalette';", "import { CommandPalette } from './components/ui/CommandPalette';\n" + import_stmt)

# Add component to the render root
component_injection = """
      <CommandPalette />
      <FOMOEngine />
"""
content = content.replace("<CommandPalette />", component_injection.strip())

with open('src/App.tsx', 'w') as f:
    f.write(content)
