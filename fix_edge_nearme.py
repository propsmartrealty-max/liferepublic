with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

content = content.replace('"description": "Premium 390-acre integrated township in Hinjewadi, Pune"', '"description": "Top-rated properties near me in Hinjewadi. Premium 390-acre integrated township in Pune."')

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
