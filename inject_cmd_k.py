import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { CommandPalette } from './components/ui/CommandPalette';"
content = content.replace("import { FloatingContact } from './components/ui/FloatingContact';", "import { FloatingContact } from './components/ui/FloatingContact';\n" + import_stmt)

# Add component to the render root
component_injection = """
      <CommandPalette />
      <CustomCursor />
"""
content = content.replace("<CustomCursor />", component_injection.strip())

with open('src/App.tsx', 'w') as f:
    f.write(content)
