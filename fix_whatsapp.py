import os
import re

files_to_fix = [
    'src/components/ui/WhatsAppWidget.tsx',
    'src/pages/Contact.tsx',
    'functions/_middleware.ts'
]

for filepath in files_to_fix:
    with open(filepath, 'r') as f:
        content = f.read()
    
    content = content.replace('9876543210', '7744009295')
    content = content.replace('9579250011', '7744009295')
    
    with open(filepath, 'w') as f:
        f.write(content)
print("Replaced WhatsApp numbers.")
