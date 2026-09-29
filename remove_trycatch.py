import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

content = content.replace("export const onRequest: PagesFunction = async (context) => {\n    try {\n", "export const onRequest: PagesFunction = async (context) => {\n")
content = re.sub(r'    } catch \(e: any\) \{\n        return new Response\(`Worker Exception:\\n\$\{e\.message\}\\n\\nStack:\\n\$\{e\.stack\}`\, \{\n            status: 500\,\n            headers: \{ \'Content-Type\': \'text/plain\' \}\n        \}\);\n    \}\n\}\;', '};', content)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
