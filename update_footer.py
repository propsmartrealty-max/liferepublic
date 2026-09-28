import re

with open('src/components/layout/Footer.tsx', 'r') as f:
    content = f.read()

# Add link to Market Reports
new_link = """<li><Link to="/market-reports" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-[#E5C07B]" /> Market Reports 2026</Link></li>"""
content = content.replace('<li><Link to="/insights" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-[#E5C07B]" /> Location Insights</Link></li>', 
                          '<li><Link to="/insights" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-[#E5C07B]" /> Location Insights</Link></li>\n                                ' + new_link)

with open('src/components/layout/Footer.tsx', 'w') as f:
    f.write(content)
