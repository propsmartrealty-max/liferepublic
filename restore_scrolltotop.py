with open('src/App.tsx', 'r') as f:
    content = f.read()

if "import { ScrollToTop } from './components/layout/ScrollToTop';" not in content:
    content = content.replace("import { Layout } from './components/layout/Layout';", "import { Layout } from './components/layout/Layout';\nimport { ScrollToTop } from './components/layout/ScrollToTop';")

with open('src/App.tsx', 'w') as f:
    f.write(content)
