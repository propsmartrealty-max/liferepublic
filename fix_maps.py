import os

MAP_URL = "https://maps.google.com/maps?q=Kolte-Patil%20Life%20Republic%2C%20Marunji%2C%20Pune&t=m&z=15&output=embed&iwloc=near"

def replace_iframe(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r') as f:
        content = f.read()
    
    import re
    # Replace the src attribute of the iframe
    content = re.sub(
        r'src="https://www\.google\.com/maps/embed\?pb=[^"]+"',
        f'src="{MAP_URL}"',
        content
    )
    
    with open(file_path, 'w') as f:
        f.write(content)

replace_iframe('src/components/ui/SovereignMap.tsx')
replace_iframe('src/pages/Contact.tsx')
replace_iframe('src/pages/LocationLanding.tsx')
replace_iframe('src/pages/LocationHighlights.tsx')
