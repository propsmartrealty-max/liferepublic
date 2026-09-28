import re

with open('functions/_middleware.ts', 'r') as f:
    content = f.read()

# Add Geo-Personalization logic before returning the generic HTMLRewriter
geo_logic = """
    // Geo-Personalization Edge SEO Logic
    const country = request.cf?.country || 'IN';
    const city = request.cf?.city || 'Pune';
    const region = request.cf?.region || 'Maharashtra';
    
    let geoHeadline = "";
    
    if (country === 'AE' || country === 'US' || country === 'UK' || country === 'SG') {
        geoHeadline = `<div class="bg-[#E5C07B] text-black text-center py-2 text-xs font-bold uppercase tracking-widest z-[100] relative">High-Yield NRI Investment Opportunity | MahaRERA Approved</div>`;
    } else if (city === 'Mumbai') {
        geoHeadline = `<div class="bg-[#E5C07B] text-black text-center py-2 text-xs font-bold uppercase tracking-widest z-[100] relative">The #1 Choice for Mumbai Investors | 2 Hrs via Expressway</div>`;
    } else if (city === 'Pune') {
        geoHeadline = `<div class="bg-[#E5C07B] text-black text-center py-2 text-xs font-bold uppercase tracking-widest z-[100] relative">Upgrade Your Lifestyle | Premium Homes Near Hinjewadi IT Park</div>`;
    } else {
        geoHeadline = `<div class="bg-[#E5C07B] text-black text-center py-2 text-xs font-bold uppercase tracking-widest z-[100] relative">Kolte Patil Life Republic | Pune's Largest Integrated Township</div>`;
    }

    let baseRewriter = new HTMLRewriter();
    
    // Inject Geo Headline right after <body>
    baseRewriter.on('body', {
        element(element) {
            element.prepend(geoHeadline, { html: true });
        }
    });

"""

# Replace the generic return with the chained rewriter
old_return = "return new HTMLRewriter()"
new_return = geo_logic + "\n    return baseRewriter"

content = content.replace(old_return, new_return)

with open('functions/_middleware.ts', 'w') as f:
    f.write(content)
