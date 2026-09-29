with open('index.html', 'r') as f:
    content = f.read()

import re
content = re.sub(r'<!-- Base Local SEO Schema -->.*?</script>', '', content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)
