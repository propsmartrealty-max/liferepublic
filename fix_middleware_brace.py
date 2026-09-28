with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

content = content.replace("schemaHtml = `\\n<script type=\"application/ld+json\">\\n${JSON.stringify(pseoSchema, null, 2)}\\n</script>\\n`;\n\n\n        \n        // Google Policy Compliant", "schemaHtml = `\\n<script type=\"application/ld+json\">\\n${JSON.stringify(pseoSchema, null, 2)}\\n</script>\\n`;\n        }\n\n        \n        // Google Policy Compliant")

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
