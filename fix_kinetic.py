import re

with open('src/components/ui/KineticText.tsx', 'r') as f:
    content = f.read()

old_prop = "export const KineticText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {"
new_prop = "export const KineticText = ({ text, className, delay = 0, as: Component = 'div' }: { text: string; className?: string; delay?: number; as?: any }) => {\n    const MotionComponent = motion(Component);"

content = content.replace(old_prop, new_prop)

old_render = "<motion.div"
new_render = "<MotionComponent"
content = content.replace(old_render, new_render)

old_render_close = "</motion.div>"
new_render_close = "</MotionComponent>"
content = content.replace(old_render_close, new_render_close)

with open('src/components/ui/KineticText.tsx', 'w') as f:
    f.write(content)
