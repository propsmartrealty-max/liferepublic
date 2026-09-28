with open('src/index.css', 'r') as f:
    content = f.read()

no_scrollbar_css = """
/* Utility for hiding scrollbars on specific horizontal lists/carousels */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
"""

if '.no-scrollbar' not in content:
    content += no_scrollbar_css

with open('src/index.css', 'w') as f:
    f.write(content)
