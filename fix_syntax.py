with open('functions/_middleware.ts', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if "} catch (e: any) {" in line:
        skip = True
    if skip:
        if line.strip() == "};":
            skip = False
            new_lines.append("};\n")
    else:
        new_lines.append(line)

with open('functions/_middleware.ts', 'w') as f:
    f.writelines(new_lines)
