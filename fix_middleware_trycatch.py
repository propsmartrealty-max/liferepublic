import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# We want to replace the outer body of onRequest
match = re.search(r'export const onRequest: PagesFunction = async \(context\) => \{(.*)\};', content, re.DOTALL)
if match:
    inner = match.group(1)
    new_func = f"""export const onRequest: PagesFunction = async (context) => {{
    try {{
{inner}
    }} catch (e: any) {{
        return new Response(`Worker Exception:\\n${{e.message}}\\n\\nStack:\\n${{e.stack}}`, {{ 
            status: 500,
            headers: {{ 'Content-Type': 'text/plain' }}
        }});
    }}
}};"""
    content = content[:match.start()] + new_func + content[match.end():]
    with open('functions/_middleware.ts', 'w') as f:
        f.write(content)
    print("Injected try-catch successfully.")
else:
    print("Could not find onRequest function.")
