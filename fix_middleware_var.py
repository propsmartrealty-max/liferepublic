import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# We need to change the early `schemaHtml = ...` to `let customSchemaHtml = ...`
# and then later append it.

# Actually, the easiest way is to declare `let schemaHtml = '';` right after `let desc = ...`
content = content.replace("let desc = 'Kolte Patil Life Republic is a 390-acre premium integrated township in Hinjewadi, Pune. Explore luxury 2, 3 & 4 BHK apartments with 400+ world-class amenities.';", "let desc = 'Kolte Patil Life Republic is a 390-acre premium integrated township in Hinjewadi, Pune. Explore luxury 2, 3 & 4 BHK apartments with 400+ world-class amenities.';\n        let schemaHtml = '';")

# Remove the `let` from `let schemaHtml = ...` further down
content = content.replace("let schemaHtml = `\\n<script", "if (!schemaHtml) { schemaHtml = `\\n<script")
content = content.replace("JSON.stringify(schema, null, 2)}\\n</script>\\n`;", "JSON.stringify(schema, null, 2)}\\n</script>\\n`; }")

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
