with open('src/index.css', 'r') as f:
    content = f.read()

# Remove the display: none for scrollbars
content = content.replace("::-webkit-scrollbar {\n  display: none;\n}", """
/* Sleek custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #000000;
}
::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
""")

# Remove overscroll-behavior-y: none
content = content.replace("overscroll-behavior-y: none; /* Prevent pull-to-refresh reload glitches */", "")

with open('src/index.css', 'w') as f:
    f.write(content)
