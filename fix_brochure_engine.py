with open('src/components/ui/BrochureEngine.tsx', 'r') as f:
    content = f.read()

if "import { api } from '../../services/api';" not in content:
    content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\nimport { api } from '../../services/api';")

content = content.replace("const { api } = await import('../../services/api');", "")

with open('src/components/ui/BrochureEngine.tsx', 'w') as f:
    f.write(content)
