with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
if 'import { ScrollToTop }' not in content:
    content = content.replace("import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';", "import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';\nimport { ScrollToTop } from './components/layout/ScrollToTop';")
    content = content.replace("import { Routes, Route, useLocation } from 'react-router-dom';", "import { Routes, Route, useLocation } from 'react-router-dom';\nimport { ScrollToTop } from './components/layout/ScrollToTop';")

# Add component inside Layout or inside the App body. Better inside App body before Routes.
if '<ScrollToTop />' not in content:
    content = content.replace('<AnimatePresence mode="wait">', '<ScrollToTop />\n      <AnimatePresence mode="wait">')
    
with open('src/App.tsx', 'w') as f:
    f.write(content)
