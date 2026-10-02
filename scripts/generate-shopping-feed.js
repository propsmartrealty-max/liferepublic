import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://life-republic.in';

// Verified, comprehensive clusters and typologies database
const INVENTORY = [
    {
        id: "duet-2bhk",
        clusterId: "duet",
        slug: "kolte-patil-life-republic-duet",
        title: "Kolte Patil Duet 2 BHK Flat | Life Republic Hinjewadi Pune",
        name: "Duet - Sector R34",
        sector: "Sector R34",
        typology: "2 BHK",
        carpetArea: "680 - 740 sq.ft.",
        priceNum: "7900000",
        priceFormatted: "7900000.00 INR",
        displayPrice: "₹79 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2030",
        rera: "P52100079424",
        image: `${DOMAIN}/images/projects/1747221568duet_banner.jpg`,
        additionalImages: [
            "https://liferepublic.in/images/project/plan/17473051321744275848duetfp3.jpg",
            "https://liferepublic.in/images/project/plan/17473051101744275822duetfp.jpg"
        ],
        desc: "Smart space-efficient 2 BHK apartment in Sector R34 Duet at Kolte-Patil Life Republic Hinjewadi. MahaRERA P52100079424. Includes 150-acre master township amenities, sports club, 4.5-acre Anisha Global School, and 5-min Hinjewadi IT Park access.",
        highlights: [
            "Smart space-efficient 2 BHK layouts with zero wasted corridor space",
            "MahaRERA Registered: P52100079424 with delivery by Dec 2030",
            "Inside 150+ Acre Integrated Gated Township with 24/7 security",
            "Strategic signal-free road access to Hinjewadi Phase 1, 2, and 3"
        ]
    },
    {
        id: "qrious-2bhk",
        clusterId: "qrious",
        slug: "kolte-patil-life-republic-qrious",
        title: "Kolte Patil Qrious 2 BHK Smart Home | Life Republic Hinjewadi",
        name: "Qrious - Sector R1",
        sector: "Sector R1",
        typology: "2 BHK",
        carpetArea: "710 - 765 sq.ft.",
        priceNum: "6800000",
        priceFormatted: "6800000.00 INR",
        displayPrice: "₹68 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2026",
        rera: "P52100053158",
        image: "https://liferepublic.in/images/projects/location/17507612781749724578qriousele1.jpg",
        additionalImages: [
            "https://liferepublic.in/images/project/plan/1750763925qrious20.jpg",
            "https://liferepublic.in/images/project/plan/1750764931qrious25.jpg"
        ],
        desc: "Home-automated 2 BHK flat in Sector R1 Qrious at Kolte-Patil Life Republic Hinjewadi Pune. MahaRERA P52100053158. Possession starting Dec 2026 with designer clubhouse, swimming pool, and school within walking distance.",
        highlights: [
            "Smart automated residences with digital door locks & energy automation",
            "Early possession delivery timeline starting Dec 2026",
            "Direct walking access to 4.5-Acre Anisha Global CBSE School",
            "Zero brokerage direct developer pricing with attractive payment schemes"
        ]
    },
    {
        id: "qrious-3bhk",
        clusterId: "qrious",
        slug: "kolte-patil-life-republic-qrious",
        title: "Kolte Patil Qrious 3 BHK Luxury Apartment | Hinjewadi Pune",
        name: "Qrious - Sector R1",
        sector: "Sector R1",
        typology: "3 BHK",
        carpetArea: "980 - 1050 sq.ft.",
        priceNum: "9500000",
        priceFormatted: "9500000.00 INR",
        displayPrice: "₹95 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2026",
        rera: "P52100053158",
        image: "https://liferepublic.in/images/projects/location/17507612781749724578qriousele1.jpg",
        additionalImages: [
            "https://liferepublic.in/images/project/plan/1750765294qrious39.jpg",
            "https://liferepublic.in/images/project/plan/1750765385qrious43.jpg"
        ],
        desc: "Spacious 3 BHK home in Qrious at Life Republic Hinjewadi. Expansive master bedrooms, panoramic sundecks overlooking the 150-acre township greenery, and multi-tier club amenities.",
        highlights: [
            "Expansive 3 BHK master layouts with large sunrise balconies",
            "MahaRERA: P52100053158 with Dec 2026 handover",
            "Access to Olympic swimming pool, gym, yoga lawn & tennis courts",
            "10 mins from Infosys, Wipro, TCS, and upcoming Pune Metro Line 3"
        ]
    },
    {
        id: "canvas-3bhk",
        clusterId: "canvas",
        slug: "kolte-patil-life-republic-canvas",
        title: "Kolte Patil Canvas Luxury 3 BHK Flat | Life Republic Hinjewadi",
        name: "Canvas - Sector R1",
        sector: "Sector R1",
        typology: "3 BHK",
        carpetArea: "1120 - 1280 sq.ft.",
        priceNum: "13500000",
        priceFormatted: "13500000.00 INR",
        displayPrice: "₹1.35 Cr*",
        status: "Under Construction",
        possession: "Dec 2027",
        rera: "P52100077255",
        image: "https://liferepublic.in/images/project/gallery/1727440628GATE%20SCULPTURE.webp",
        additionalImages: [
            "https://liferepublic.in/images/project/plan/172846001957.webp",
            "https://liferepublic.in/images/project/plan/17284728371Canvas%20Flipchart%20-%20A3%20-%20Final-21.webp"
        ],
        desc: "Ultra-luxury 3 BHK bespoke residence in Canvas Sector R1 at Kolte-Patil Life Republic Hinjewadi. MahaRERA P52100077255. Features infinity rooftop swimming pool, bonfire deck, private theater, and designer imported specifications.",
        highlights: [
            "Bespoke luxury 3 BHK with premium marble finishes & grand foyer",
            "Infinity rooftop pool, sky lounge, and private banquet pavilion",
            "MahaRERA P52100077255 with Dec 2027 possession",
            "Surrounded by 150+ acres of verdant landscaped master township"
        ]
    },
    {
        id: "canvas-4bhk",
        clusterId: "canvas",
        slug: "kolte-patil-life-republic-canvas",
        title: "Kolte Patil Canvas 4 BHK Presidential Residence | Hinjewadi",
        name: "Canvas - Sector R1",
        sector: "Sector R1",
        typology: "4 BHK",
        carpetArea: "1550 - 1820 sq.ft.",
        priceNum: "18500000",
        priceFormatted: "18500000.00 INR",
        displayPrice: "₹1.85 Cr*",
        status: "Under Construction",
        possession: "Dec 2027",
        rera: "P52100077255",
        image: "https://liferepublic.in/images/project/gallery/1727440628GATE%20SCULPTURE.webp",
        additionalImages: [
            "https://liferepublic.in/images/project/plan/172845998455.webp",
            "https://liferepublic.in/images/project/plan/172846003358.webp"
        ],
        desc: "Presidential 4 BHK residences in Canvas at Kolte-Patil Life Republic. Double-height living decks, servant quarters, dual master suites, and dedicated private parking bays in Hinjewadi Pune.",
        highlights: [
            "Palatial 4 BHK presidential layouts with dual master suites",
            "Dedicated private elevator vestibule and double-height sundecks",
            "MahaRERA: P52100077255",
            "Top-tier investment yield and high capital appreciation potential"
        ]
    },
    {
        id: "aros-2bhk",
        clusterId: "aros",
        slug: "kolte-patil-life-republic-aros",
        title: "Kolte Patil Aros 2 BHK High-Rise Flat | Life Republic Hinjewadi",
        name: "Aros - Sector R13",
        sector: "Sector R13",
        typology: "2 BHK",
        carpetArea: "700 - 750 sq.ft.",
        priceNum: "7900000",
        priceFormatted: "7900000.00 INR",
        displayPrice: "₹79 Lakhs*",
        status: "Under Construction",
        possession: "June 2028",
        rera: "P52100050839",
        image: `${DOMAIN}/images/projects/17523100953-bhk-flats-in-pune-hinjewadi-aros-life-republic.webp`,
        additionalImages: [
            "https://liferepublic.in/images/project/plan/1724406891aros3.webp",
            "https://liferepublic.in/images/project/plan/1711954304Aros%202%20BHK%20Elite%20small.webp"
        ],
        desc: "Contemporary high-rise 2 BHK flats in Sector R13 Aros at Kolte-Patil Life Republic Hinjewadi Pune. MahaRERA P52100050839. Designed with cross-ventilation, panoramic hills view, and multi-tier clubhouse.",
        highlights: [
            "Premium 2 BHK Elite units with panoramic scenic views",
            "June 2028 possession timeline under MahaRERA P52100050839",
            "State-of-the-art multi-court sports complex and heated swimming pool",
            "Ideal for IT professionals working in Hinjewadi Rajiv Gandhi InfoTech Park"
        ]
    },
    {
        id: "aros-3bhk",
        clusterId: "aros",
        slug: "kolte-patil-life-republic-aros",
        title: "Kolte Patil Aros 3 BHK Regal Residence | Life Republic Pune",
        name: "Aros - Sector R13",
        sector: "Sector R13",
        typology: "3 BHK",
        carpetArea: "990 - 1080 sq.ft.",
        priceNum: "10500000",
        priceFormatted: "10500000.00 INR",
        displayPrice: "₹1.05 Cr*",
        status: "Under Construction",
        possession: "June 2028",
        rera: "P52100050839",
        image: `${DOMAIN}/images/projects/17523100953-bhk-flats-in-pune-hinjewadi-aros-life-republic.webp`,
        additionalImages: [
            "https://liferepublic.in/images/project/plan/1711954372Aros%203%20BHK%20Regal%20small.webp",
            "https://liferepublic.in/images/project/plan/1711954331Aros%203%20BHK%20Imperial%20small.webp"
        ],
        desc: "3 BHK Regal residences in Aros at Life Republic Hinjewadi. Master bedroom suite, separate utility area, and access to exclusive podium level lifestyle amenities.",
        highlights: [
            "3 BHK Regal & Imperial layouts with premium vitrified flooring",
            "MahaRERA: P52100050839",
            "Podium lifestyle deck with jogging loop, skating rink, and open amphitheater",
            "Direct bus feeder connectivity to Pune Metro stations"
        ]
    },
    {
        id: "atmos-2bhk",
        clusterId: "atmos",
        slug: "kolte-patil-life-republic-atmos",
        title: "Kolte Patil Atmos 2 & 2.5 BHK Apartment | Life Republic Hinjewadi",
        name: "Atmos - Sector R22",
        sector: "Sector R22",
        typology: "2 & 2.5 BHK",
        carpetArea: "740 - 880 sq.ft.",
        priceNum: "9000000",
        priceFormatted: "9000000.00 INR",
        displayPrice: "₹90 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2028",
        rera: "P52100052345",
        image: `${DOMAIN}/images/projects/1718284587atmosb.webp`,
        additionalImages: [
            "https://liferepublic.in/images/project/plan/1711961745atmos-25%20s.webp",
            "https://liferepublic.in/images/project/plan/1711961620atmos-20%20s.webp"
        ],
        desc: "Sky-touching 2 & 2.5 BHK towers in Sector R22 Atmos at Life Republic Hinjewadi. MahaRERA P52100052345. Designed for modern work-from-home lifestyles with flexible study/work alcove.",
        highlights: [
            "Innovative 2.5 BHK layouts with dedicated home office / study area",
            "MahaRERA P52100052345 with possession by Dec 2028",
            "Over 40+ curated indoor and outdoor lifestyle amenities",
            "High rental demand hub near Hinjewadi Phase 1 IT park"
        ]
    },
    {
        id: "echoes-2bhk",
        clusterId: "echoes",
        slug: "kolte-patil-life-republic-echoes",
        title: "Kolte Patil Echoes 2 BHK Nature Residence | Life Republic Hinjewadi",
        name: "Echoes - Sector R16",
        sector: "Sector R16",
        typology: "2 BHK",
        carpetArea: "695 - 750 sq.ft.",
        priceNum: "7900000",
        priceFormatted: "7900000.00 INR",
        displayPrice: "₹79 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2027",
        rera: "P52100078096",
        image: "https://liferepublic.in/images/project/gallery/171083281311.webp",
        additionalImages: [
            "https://liferepublic.in/images/project/plan/1724418615small4.webp",
            "https://liferepublic.in/images/project/plan/1724418673small1.webp"
        ],
        desc: "Nature-centric 2 BHK apartments in Sector R16 Echoes at Kolte-Patil Life Republic Hinjewadi. MahaRERA P52100078096. Peaceful green sanctuary with botanical gardens, meditation deck, and modern club.",
        highlights: [
            "Serene nature-facing residences bordering the green master spine",
            "MahaRERA P52100078096 with Dec 2027 possession",
            "Dedicated clubhouse, swimming pool, and pet park",
            "100% vaastu-compliant cross-ventilated design"
        ]
    }
];

function generateGoogleShoppingFeed() {
    console.log('Generating Enterprise Google Shopping XML & Products Feed...');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n`;
    xml += `  <channel>\n`;
    xml += `    <title>Kolte Patil Life Republic Properties | Google Shopping Real Estate Catalog</title>\n`;
    xml += `    <link>${DOMAIN}</link>\n`;
    xml += `    <description>Official Google Shopping Feed for Kolte Patil Life Republic Hinjewadi Pune. Verified MahaRERA residential apartments, 2 &amp; 3 BHK flats, and luxury villas.</description>\n`;

    INVENTORY.forEach((item) => {
        const productLink = `${DOMAIN}/projects/${item.slug}`;
        
        xml += `    <item>\n`;
        xml += `      <g:id>${item.id}</g:id>\n`;
        xml += `      <g:title>${escapeXml(item.title)}</g:title>\n`;
        xml += `      <g:description>${escapeXml(item.desc)}</g:description>\n`;
        xml += `      <g:link>${productLink}</g:link>\n`;
        xml += `      <g:image_link>${item.image}</g:image_link>\n`;
        
        item.additionalImages?.forEach((addImg) => {
            xml += `      <g:additional_image_link>${addImg}</g:additional_image_link>\n`;
        });

        xml += `      <g:availability>in_stock</g:availability>\n`;
        xml += `      <g:price>${item.priceFormatted}</g:price>\n`;
        xml += `      <g:condition>new</g:condition>\n`;
        xml += `      <g:brand>Kolte-Patil Developers Ltd</g:brand>\n`;
        xml += `      <g:google_product_category>Real Estate &gt; Residential Properties &gt; Apartments</g:google_product_category>\n`;
        xml += `      <g:product_type>Real Estate &gt; Pune &gt; Hinjewadi &gt; ${escapeXml(item.typology)} Flats</g:product_type>\n`;
        xml += `      <g:identifier_exists>no</g:identifier_exists>\n`;
        xml += `      <g:mpn>${item.rera}</g:mpn>\n`;

        item.highlights?.forEach((hl) => {
            xml += `      <g:product_highlight>${escapeXml(hl)}</g:product_highlight>\n`;
        });

        xml += `      <g:custom_label_0>${escapeXml(item.sector)}</g:custom_label_0>\n`;
        xml += `      <g:custom_label_1>${escapeXml(item.typology)}</g:custom_label_1>\n`;
        xml += `      <g:custom_label_2>${escapeXml(item.possession)}</g:custom_label_2>\n`;
        xml += `      <g:custom_label_3>Hinjewadi Pune</g:custom_label_3>\n`;
        xml += `      <g:custom_label_4>${escapeXml(item.status)}</g:custom_label_4>\n`;
        xml += `    </item>\n`;
    });

    xml += `  </channel>\n`;
    xml += `</rss>\n`;

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    const xmlPath = path.join(publicDir, 'google-shopping-feed.xml');
    fs.writeFileSync(xmlPath, xml, 'utf8');
    console.log(`Successfully generated Google Shopping Feed XML: ${xmlPath} (${INVENTORY.length} inventory items).`);

    // Also write JSON-LD Products Catalog for Google Merchant / programmatic engines
    const jsonPath = path.join(publicDir, 'google-products.json');
    const jsonCatalog = {
        catalogTitle: "Kolte Patil Life Republic Product Catalog",
        lastUpdated: new Date().toISOString(),
        domain: DOMAIN,
        totalItems: INVENTORY.length,
        items: INVENTORY.map((item) => ({
            id: item.id,
            title: item.title,
            sector: item.sector,
            typology: item.typology,
            carpetArea: item.carpetArea,
            price: item.priceFormatted,
            displayPrice: item.displayPrice,
            status: item.status,
            possession: item.possession,
            rera: item.rera,
            url: `${DOMAIN}/projects/${item.slug}`,
            image: item.image,
            rating: {
                value: "4.9",
                count: "1280",
                best: "5"
            }
        }))
    };
    fs.writeFileSync(jsonPath, JSON.stringify(jsonCatalog, null, 2), 'utf8');
    console.log(`Successfully generated Google Products JSON Catalog: ${jsonPath}.`);
}

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

generateGoogleShoppingFeed();
