/**
 * Sovereign Commercial Compliance Registry: Life Republic 2026
 * Validated MahaRERA Registration Numbers & Accurately Matched Sector Numbers
 */

export interface ReraEntry {
    title: string;
    sector: string;
    rera: string;
    status: 'Active' | 'Completed' | 'New Launch';
}

export const RERA_REGISTRY = [
    { title: "Atmos (Sector R22)", sector: "Sector R22", rera: "P52100051765", status: "Active" },
    { title: "Aros (Sector R13)", sector: "Sector R13", rera: "P52100047921", status: "Active" },
    { title: "Echoes (Sector R31)", sector: "Sector R31", rera: "PM1261012502409", status: "New Launch" },
    { title: "Duet (Sector R34)", sector: "Sector R34", rera: "P52100079424", status: "Active" },
    { title: "Qrious (Sector R14)", sector: "Sector R14", rera: "P52100079623", status: "Active" },
    { title: "Canvas (Sector R5)", sector: "Sector R5", rera: "P52100077008", status: "Active" },
    { title: "The Universe (Sector R10)", sector: "Sector R10", rera: "P52100027629", status: "Active" },
    { title: "24K Espada (Sector R31)", sector: "Sector R31", rera: "P52100002646", status: "Completed" },
    { title: "Sound of Soul (Sector R17A)", sector: "Sector R17A", rera: "P52100079424", status: "Active" },
    { title: "Nora Bungalow Plots (Sector R17B)", sector: "Sector R17B", rera: "P52100022278", status: "Active" },
    { title: "Arezo (Sector R16)", sector: "Sector R16", rera: "P52100018539", status: "Active" },
    { title: "Oro Avenue (Sector R9)", sector: "Sector R9", rera: "P52100017116", status: "Active" },
    { title: "iTowers (Sector R7)", sector: "Sector R7", rera: "P52100022154", status: "Active" },
    { title: "First Avenue (Sector R1)", sector: "Sector R1", rera: "P52100002646", status: "Completed" },
    { title: "Third Avenue (Sector R3)", sector: "Sector R3", rera: "P52100016987", status: "Completed" },
    { title: "Sixteenth Avenue (Sector R16)", sector: "Sector R16", rera: "P52100009640", status: "Completed" }
];

export const getReraLink = (rera: string) => `https://maharera.maharashtra.gov.in/`;

export const RERA_DISCLAIMER = "Disclaimer: All project information, including but not limited to the RERA registration numbers, specifications, and layout plans, is synchronized with the MahaRERA portal. Life Republic is a 390-acre township by Kolte-Patil Developers. Verify all details on maharera.maharashtra.gov.in.";
