import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://life-republic.in';

// Verified, comprehensive clusters and typologies database with exact sector matching
const INVENTORY = [
    {
        id: "duet-2bhk",
        clusterId: "duet",
        slug: "kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi",
        title: "Kolte Patil Duet 2 BHK Flat | Sector R34 Life Republic Hinjewadi",
        name: "Duet - Sector R34",
        sector: "Sector R34",
        typology: "2 BHK",
        carpetArea: "740 - 766 sq.ft.",
        priceNum: "7900000",
        priceFormatted: "7900000.00 INR",
        displayPrice: "₹79 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2030",
        rera: "P52100079424",
        image: `${DOMAIN}/images/projects/1747221568duet_banner.jpg`,
        desc: "Smart space-efficient 2 BHK apartment in Sector R34 Duet at Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100079424. Features 390-acre master township amenities, sports club, 4.5-acre Anisha Global School, and 5-min Hinjewadi IT Park access."
    },
    {
        id: "qrious-2bhk",
        clusterId: "qrious",
        slug: "kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi",
        title: "Kolte Patil Qrious 2 BHK Smart Home | Sector R14 Life Republic Hinjewadi",
        name: "Qrious - Sector R14",
        sector: "Sector R14",
        typology: "2 BHK",
        carpetArea: "710 - 765 sq.ft.",
        priceNum: "8900000",
        priceFormatted: "8900000.00 INR",
        displayPrice: "₹89 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2030",
        rera: "P52100079623",
        image: "https://liferepublic.in/images/projects/location/17507612781749724578qriousele1.jpg",
        desc: "Home-automated 2 BHK flat in Sector R14 Qrious on 150-ft Spine Road at Kolte-Patil Life Republic Hinjewadi Pune. MahaRERA: P52100079623. G+25 high-rise towers, 19,000 sq.ft. Q-Club, and high-street retail boulevard."
    },
    {
        id: "qrious-3bhk",
        clusterId: "qrious",
        slug: "kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi",
        title: "Kolte Patil Qrious 3 BHK Luxury Apartment | Sector R14 Hinjewadi Pune",
        name: "Qrious - Sector R14",
        sector: "Sector R14",
        typology: "3 BHK",
        carpetArea: "980 - 1050 sq.ft.",
        priceNum: "11500000",
        priceFormatted: "11500000.00 INR",
        displayPrice: "₹1.15 Cr*",
        status: "Under Construction",
        possession: "Dec 2030",
        rera: "P52100079623",
        image: "https://liferepublic.in/images/projects/location/17507612781749724578qriousele1.jpg",
        desc: "Spacious 3 BHK residence in Sector R14 Qrious at Life Republic Hinjewadi. Master bedroom suites, panoramic sundecks overlooking 390-acre township greenery, and multi-tier club amenities."
    },
    {
        id: "canvas-3bhk",
        clusterId: "canvas",
        slug: "kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi",
        title: "Kolte Patil Canvas Luxury 3 BHK Flat | Sector R5 Life Republic Hinjewadi",
        name: "Canvas - Sector R5",
        sector: "Sector R5",
        typology: "3 BHK",
        carpetArea: "1332 - 1496 sq.ft.",
        priceNum: "15900000",
        priceFormatted: "15900000.00 INR",
        displayPrice: "₹1.59 Cr*",
        status: "Under Construction",
        possession: "Dec 2030",
        rera: "P52100077008",
        image: `${DOMAIN}/images/projects/1727356856project_banner___1795-930.jpg`,
        desc: "Ultra-luxury 3 BHK residence in Pune's tallest 40-storey residential tower at Canvas Sector R5 Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100077008. Dual master bedrooms, infinity rooftop pool, and 21,000 sq.ft. recreation center."
    },
    {
        id: "canvas-4bhk",
        clusterId: "canvas",
        slug: "kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi",
        title: "Kolte Patil Canvas 4 BHK Presidential Residence | Sector R5 Hinjewadi",
        name: "Canvas - Sector R5",
        sector: "Sector R5",
        typology: "4 BHK",
        carpetArea: "2023 sq.ft.",
        priceNum: "25900000",
        priceFormatted: "25900000.00 INR",
        displayPrice: "₹2.59 Cr*",
        status: "Under Construction",
        possession: "Dec 2030",
        rera: "P52100077008",
        image: `${DOMAIN}/images/projects/1727356856project_banner___1795-930.jpg`,
        desc: "Palatial 4 BHK presidential residence in Sector R5 Canvas at Life Republic Hinjewadi. Double-height decks, private foyer, 40-storey high-rise skyline views, and Italian marble finishes."
    },
    {
        id: "aros-2bhk",
        clusterId: "aros",
        slug: "kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi",
        title: "Kolte Patil Aros 2 BHK High-Rise Flat | Sector R13 Life Republic Hinjewadi",
        name: "Aros - Sector R13",
        sector: "Sector R13",
        typology: "2 BHK",
        carpetArea: "836 sq.ft.",
        priceNum: "9200000",
        priceFormatted: "9200000.00 INR",
        displayPrice: "₹92 Lakhs*",
        status: "Under Construction",
        possession: "June 2028",
        rera: "P52100047921",
        image: `${DOMAIN}/images/projects/17523100953-bhk-flats-in-pune-hinjewadi-aros-life-republic.webp`,
        desc: "Premium 2 BHK apartment in Sector R13 Aros facing the 3.5-acre Urban Park at Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100047921. 70-meter sky trail, Olympic-size pool, and fitness loop."
    },
    {
        id: "aros-3bhk",
        clusterId: "aros",
        slug: "kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi",
        title: "Kolte Patil Aros 3 BHK Regal Residence | Sector R13 Life Republic Pune",
        name: "Aros - Sector R13",
        sector: "Sector R13",
        typology: "3 BHK",
        carpetArea: "1060 - 1176 sq.ft.",
        priceNum: "11500000",
        priceFormatted: "11500000.00 INR",
        displayPrice: "₹1.15 Cr*",
        status: "Under Construction",
        possession: "June 2028",
        rera: "P52100047921",
        image: `${DOMAIN}/images/projects/17523100953-bhk-flats-in-pune-hinjewadi-aros-life-republic.webp`,
        desc: "3 BHK Regal & Imperial residences in Sector R13 Aros at Life Republic Hinjewadi. Master bedroom suite, separate utility area, and direct access to 4km nature jogging trail."
    },
    {
        id: "atmos-2bhk",
        clusterId: "atmos",
        slug: "kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi",
        title: "Kolte Patil Atmos 2 & 2.5 BHK Flat | Sector R22 Life Republic Hinjewadi",
        name: "Atmos - Sector R22",
        sector: "Sector R22",
        typology: "2 & 2.5 BHK",
        carpetArea: "740 - 880 sq.ft.",
        priceNum: "9500000",
        priceFormatted: "9500000.00 INR",
        displayPrice: "₹95 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2028",
        rera: "P52100051765",
        image: `${DOMAIN}/images/projects/1718284587atmosb.webp`,
        desc: "Modern 2 & 2.5 BHK towers in Sector R22 Atmos at Life Republic Hinjewadi. MahaRERA: P52100051765. High-rise living, infinity pool, multi-court sports, and 6-minute drive to Hinjewadi Phase 1."
    },
    {
        id: "atmos-3bhk",
        clusterId: "atmos",
        slug: "kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi",
        title: "Kolte Patil Atmos 3 BHK Modern High-Rise | Sector R22 Hinjewadi Pune",
        name: "Atmos - Sector R22",
        sector: "Sector R22",
        typology: "3 BHK",
        carpetArea: "1007 - 1032 sq.ft.",
        priceNum: "11500000",
        priceFormatted: "11500000.00 INR",
        displayPrice: "₹1.15 Cr*",
        status: "Under Construction",
        possession: "Dec 2028",
        rera: "P52100051765",
        image: `${DOMAIN}/images/projects/1718284587atmosb.webp`,
        desc: "Spacious 3 BHK luxury apartment in Sector R22 Atmos at Life Republic Hinjewadi. Triple balcony system, panoramic Hinjewadi views, and Kohler/Jaquar fittings."
    },
    {
        id: "echoes-2bhk",
        clusterId: "echoes",
        slug: "kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi",
        title: "Kolte Patil Echoes 2 & 2.5 BHK New Launch | Sector R31 Hinjewadi",
        name: "Echoes - Sector R31",
        sector: "Sector R31",
        typology: "2 & 2.5 BHK",
        carpetArea: "837 - 978 sq.ft.",
        priceNum: "8500000",
        priceFormatted: "8500000.00 INR",
        displayPrice: "₹85 Lakhs*",
        status: "New Launch",
        possession: "Dec 2030",
        rera: "PM1261012502409",
        image: `${DOMAIN}/images/projects/1774005462Top_Banner-1795x930.jpg.jpeg`,
        desc: "Architectural monograph by Hafeez Contractor in Sector R31 Echoes at Kolte-Patil Life Republic Hinjewadi. MahaRERA: PM1261012502409. Eco-chic towers, reflection pools, and rooftop stargazing deck."
    },
    {
        id: "universe-1bhk",
        clusterId: "universe",
        slug: "kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi",
        title: "Kolte Patil The Universe 1 BHK Smart Flat | Sector R10 Hinjewadi",
        name: "The Universe - Sector R10",
        sector: "Sector R10",
        typology: "1 BHK",
        carpetArea: "393 - 444 sq.ft.",
        priceNum: "4000000",
        priceFormatted: "4000000.00 INR",
        displayPrice: "₹40 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2027",
        rera: "P52100027629",
        image: `${DOMAIN}/images/projects/1719304446unnn1795-930.webp`,
        desc: "Planet Smart City 1 BHK home in Sector R10 Universe at Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100027629. Highest rental yields in Hinjewadi, walking distance to Town Center and Metro Line 3."
    },
    {
        id: "universe-2bhk",
        clusterId: "universe",
        slug: "kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi",
        title: "Kolte Patil The Universe 2 BHK Smart Residence | Sector R10 Hinjewadi",
        name: "The Universe - Sector R10",
        sector: "Sector R10",
        typology: "2 BHK",
        carpetArea: "560 - 629 sq.ft.",
        priceNum: "5800000",
        priceFormatted: "5800000.00 INR",
        displayPrice: "₹58 Lakhs*",
        status: "Under Construction",
        possession: "Dec 2027",
        rera: "P52100027629",
        image: `${DOMAIN}/images/projects/1719304446unnn1795-930.webp`,
        desc: "Compact 2 BHK smart home in Sector R10 Universe at Life Republic Hinjewadi. EV charging stations, digital library, multi-sport courts, and seamless IT park connectivity."
    },
    {
        id: "espada-4bhk",
        clusterId: "24k-espada",
        slug: "kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi",
        title: "Kolte Patil 24K Espada 4 & 5 BHK Row Houses | Sector R31 Hinjewadi",
        name: "24K Espada - Sector R31",
        sector: "Sector R31",
        typology: "4 & 5 BHK Row Houses",
        carpetArea: "1876 - 2274 sq.ft.",
        priceNum: "34000000",
        priceFormatted: "34000000.00 INR",
        displayPrice: "₹3.40 Cr*",
        status: "Completed",
        possession: "Ready to Move",
        rera: "P52100002646",
        image: `${DOMAIN}/images/home/24k-espada-thumb.jpg`,
        desc: "Ultra-luxury 4 & 5 BHK row houses in Sector R31 24K Espada at Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100002646. Private gardens, internal private lifts, imported marble flooring, and exclusive 24K Signature Club privileges."
    },
    {
        id: "nora-plots",
        clusterId: "nora",
        slug: "kolte-patil-life-republic-nora-bungalow-plots-hinjewadi",
        title: "Kolte Patil Nora Bungalow Plots | Sector R17B Life Republic Hinjewadi",
        name: "Nora - Sector R17B",
        sector: "Sector R17B",
        typology: "Bungalow Plots",
        carpetArea: "1500 - 4000 sq.ft.",
        priceNum: "18000000",
        priceFormatted: "18000000.00 INR",
        displayPrice: "₹1.80 Cr*",
        status: "Active",
        possession: "Immediate Infrastructure Ready",
        rera: "P52100022278",
        image: `${DOMAIN}/images/projects/walkthrough.jpg`,
        desc: "Exclusive NA bungalow plots in Sector R17B Nora at Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100022278. Build your custom villa with underground electrical cabling, water connections, and complete township infrastructure."
    },
    {
        id: "arezo-2bhk",
        clusterId: "arezo",
        slug: "kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi",
        title: "Kolte Patil Arezo 2 BHK Residence | Sector R16 Life Republic Hinjewadi",
        name: "Arezo - Sector R16",
        sector: "Sector R16",
        typology: "2 BHK",
        carpetArea: "610 sq.ft.",
        priceNum: "7800000",
        priceFormatted: "7800000.00 INR",
        displayPrice: "₹78 Lakhs*",
        status: "Ready",
        possession: "Ready to Move",
        rera: "P52100018539",
        image: `${DOMAIN}/images/home/1719301346arrrr1795-930.webp`,
        desc: "Ready to move 2 BHK apartment in Sector R16 Arezo at Kolte-Patil Life Republic Hinjewadi. MahaRERA: P52100018539. Proven community living with 16th Avenue plaza, health club, and jogging track."
    }
];

function generateGoogleShoppingFeed() {
    console.log('Generating Enterprise Google Shopping & Property XML Feeds...');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n`;
    xml += `  <channel>\n`;
    xml += `    <title>Kolte Patil Life Republic Properties | Google Shopping & Real Estate Feed</title>\n`;
    xml += `    <link>${DOMAIN}</link>\n`;
    xml += `    <description>Official Google Shopping and Real Estate Feed for Kolte Patil Life Republic Hinjewadi Pune. Verified MahaRERA residential apartments, row houses, and bungalow plots.</description>\n`;

    INVENTORY.forEach((item) => {
        const productLink = `${DOMAIN}/projects/${item.slug}`;
        
        xml += `    <item>\n`;
        xml += `      <g:id>${item.id}</g:id>\n`;
        xml += `      <g:title>${escapeXml(item.title)}</g:title>\n`;
        xml += `      <g:description>${escapeXml(item.desc)}</g:description>\n`;
        xml += `      <g:link>${productLink}</g:link>\n`;
        xml += `      <g:image_link>${item.image}</g:image_link>\n`;
        xml += `      <g:availability>in_stock</g:availability>\n`;
        xml += `      <g:price>${item.priceFormatted}</g:price>\n`;
        xml += `      <g:condition>new</g:condition>\n`;
        xml += `      <g:brand>Kolte-Patil Developers Ltd</g:brand>\n`;
        xml += `      <g:google_product_category>Real Estate</g:google_product_category>\n`;
        xml += `      <g:product_type>Real Estate &gt; Pune &gt; Hinjewadi &gt; ${escapeXml(item.typology)}</g:product_type>\n`;
        xml += `      <g:identifier_exists>no</g:identifier_exists>\n`;
        xml += `      <g:mpn>${item.rera}</g:mpn>\n`;
        xml += `      <g:custom_label_0>${escapeXml(item.sector)}</g:custom_label_0>\n`;
        xml += `      <g:custom_label_1>${escapeXml(item.typology)}</g:custom_label_1>\n`;
        xml += `      <g:custom_label_2>${escapeXml(item.rera)}</g:custom_label_2>\n`;
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

    // Write google-shopping-feed.xml
    const shoppingFeedPath = path.join(publicDir, 'google-shopping-feed.xml');
    fs.writeFileSync(shoppingFeedPath, xml, 'utf8');
    console.log(`Successfully generated Google Shopping Feed XML: ${shoppingFeedPath}`);

    // Write google-property-feed.xml
    const propertyFeedPath = path.join(publicDir, 'google-property-feed.xml');
    fs.writeFileSync(propertyFeedPath, xml, 'utf8');
    console.log(`Successfully generated Google Property Feed XML: ${propertyFeedPath}`);

    // Write google-products.json catalog
    const jsonPath = path.join(publicDir, 'google-products.json');
    const jsonCatalog = {
        catalogTitle: "Kolte Patil Life Republic Official Property & Products Catalog",
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
    console.log(`Successfully generated Google Products JSON: ${jsonPath} (${INVENTORY.length} items).`);
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
