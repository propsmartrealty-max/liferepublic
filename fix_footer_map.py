import re

with open('src/components/layout/Footer.tsx', 'r') as f:
    content = f.read()

old_addr = '<p className="text-text-muted">The township is strategically located at Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi, Pune 411057, just ~4.5 km from the Hinjewadi IT Park Phase 1, offering excellent connectivity to Mumbai-Bengaluru Highway.</p>'
new_addr = '<p className="text-text-muted">The township is strategically located at <a href="https://www.google.com/maps/dir//Life+Republic+Sales+Office+Or+Main+Office,+Survey+No.+74+Hinjawadi+-+Marunji,+Hinjawadi+-+Kasarsai+Rd,+Taluka,+Mulshi,+Maharashtra+411033/@18.6459725,73.7360171,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2ba5053b55b4b:0x14d3205e23f3f5f7!2m2!1d73.7093735!2d18.6182576?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-accent transition-colors">Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi, Pune 411057</a>, just ~4.5 km from the Hinjewadi IT Park Phase 1, offering excellent connectivity to Mumbai-Bengaluru Highway.</p>'

content = content.replace(old_addr, new_addr)

with open('src/components/layout/Footer.tsx', 'w') as f:
    f.write(content)
