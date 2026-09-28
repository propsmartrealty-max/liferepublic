import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add imports for our new Market Reports
new_imports = """
import Insights from './pages/Insights';
import Article from './pages/Article';
"""
content = content.replace("import { LocationLanding } from './pages/LocationLanding';", "import { LocationLanding } from './pages/LocationLanding';" + new_imports)

# Add routes
new_routes = """
          {/* Real Estate Market Reports / Long Form Content */}
          <Route path="/market-reports" element={
            <Layout ariaLabel="Pune Real Estate Market Reports">
              <Insights />
            </Layout>
          } />
          <Route path="/market-reports/:slug" element={
            <Layout ariaLabel="Real Estate Market Analysis">
              <Article />
            </Layout>
          } />
"""
content = content.replace("{/* Locations Directory */}", new_routes + "\n          {/* Locations Directory */}")

with open('src/App.tsx', 'w') as f:
    f.write(content)
