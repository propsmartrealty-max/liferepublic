with open('src/components/layout/Layout.tsx', 'r') as f:
    content = f.read()

# Add the import
if "import { Breadcrumbs } from '../seo/Breadcrumbs';" not in content:
    content = content.replace("import { ExitIntentModal } from '../ui/ExitIntentModal';", "import { ExitIntentModal } from '../ui/ExitIntentModal';\nimport { Breadcrumbs } from '../seo/Breadcrumbs';")

# Add the component inside Layout
if "<Breadcrumbs />" not in content:
    content = content.replace("<Navbar />", "<Navbar />\n      <Breadcrumbs />")

with open('src/components/layout/Layout.tsx', 'w') as f:
    f.write(content)

