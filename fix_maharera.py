import os

files_to_check = [
    'src/components/layout/Footer.tsx',
    'src/data/rera.ts',
    'src/pages/TownshipGuide.tsx',
    'src/pages/legal/Disclaimer.tsx'
]

for file_path in files_to_check:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        content = content.replace('maharera.mahaonline.gov.in/SearchList/Search?rera=', 'maharera.maharashtra.gov.in/')
        content = content.replace('maharera.mahaonline.gov.in', 'maharera.maharashtra.gov.in')
        
        with open(file_path, 'w') as f:
            f.write(content)
