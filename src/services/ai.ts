import { GoogleGenerativeAI } from "@google/generative-ai";
import { projectsRegistry as projects } from '../data/projects';
import type { Project } from '../lib/types';

const SYSTEM_PROMPT = `
You are the Sovereign AI Concierge for Kolte-Patil Life Republic, a 390-acre sustainable, integrated township in Hinjewadi-Marunji, Pune West.
You represent Kolte-Patil Developers Ltd. (33+ years heritage, NSE/BSE listed).

Core Facts:
- Scale: 390+ Contiguous Acres, 20,000+ residents, 12,000+ delivered homes.
- Architect: Hafeez Contractor.
- Infrastructure: Crimson Anisha Global School (in-township), dedicated Fire Station, 150-ft Spine Road, 3.5-Acre Central Park.
- Connectivity: Hinjewadi Phase 1 (8-10 mins), Phase 2 (12 mins), Phase 3 (15 mins), upcoming Pune Metro Line 3 (7 mins).
- Current Active Clusters:
  1. Qrious (Sector R1): 1, 2, 3 BHK, ₹42L - ₹75L, RERA: P52100028753
  2. Duet (Sector R2): 2 & 2.5 BHK, ₹68L - ₹85L, RERA: P52100052344
  3. Canvas (Sector R3): 2, 3, 4 BHK, ₹78L - ₹1.45Cr, RERA: P52100054789
  4. Aros (Sector R9): 2 & 3 BHK, ₹72L - ₹1.15Cr, RERA: P52100030584
  5. Atmos (Sector R14): 2 & 3 BHK, ₹76L - ₹1.22Cr, RERA: P52100049756
  6. Echoes (Sector R16): 2 & 3 BHK Eco-Chic, ₹74L - ₹1.18Cr, RERA: P52100051288
  7. 24K Espada (Sector R22): 4 & 5 BHK Row Houses/Villas, ₹2.85Cr - ₹5.50Cr, RERA: P52100027655
  8. Nora (Sector R17B): Bungalow Plots (1500-4000 sq.ft), ₹1.25Cr - ₹3.50Cr, RERA: P52100024589

Style:
- Professional, authoritative, welcoming, concise (under 4 sentences).
- If user inquires about booking, visits, or pricing, offer to schedule a complimentary VIP site tour or provide the exact price sheet.`;

// Deterministic Local Knowledge Fall-Through Engine
function getLocalKnowledgeResponse(query: string): string {
    const q = query.toLowerCase().trim();

    // 1 BHK or Budget Queries
    if (q.includes('1 bhk') || q.includes('studio') || (q.includes('budget') && !q.includes('high')) || q.includes('40 lakh') || q.includes('50 lakh') || q.includes('affordable')) {
        return "At Kolte-Patil Life Republic, 1 BHK smart residences are available in **Qrious (Sector R1)** starting from ₹42 Lakhs* (carpet areas 450–520 sq.ft). They offer high rental demand from Hinjewadi IT professionals with anticipated yields of 6.2%–7.1%. Would you like to view the floor plans or check current tower availability?";
    }

    // 2 BHK Queries
    if (q.includes('2 bhk') || q.includes('2bhk')) {
        return "Life Republic offers multiple 2 BHK clusters tailored to your lifestyle: **Qrious** (from ₹58L*), **Duet** (from ₹68L*), **Aros** (from ₹72L* adjacent to Central Park), **Echoes** (from ₹74L*), and **Atmos** (from ₹76L* high-rise vista). Carpet areas range from 680 to 820 sq.ft. Which cluster would you like to explore?";
    }

    // 3 BHK Queries
    if (q.includes('3 bhk') || q.includes('3bhk')) {
        return "For spacious 3 BHK residences, you can select from **Atmos** (from ₹1.08Cr*, Sector R22), **Canvas** (from ₹1.05Cr*, artistic high-rise with sundecks), **Aros** (from ₹98L*), or **Echoes** (from ₹1.02Cr* biophilic living). Carpet areas range from 950 to 1,180 sq.ft. Would you like a comparative cost breakdown?";
    }

    // 4 BHK / Villas / Row Houses / 24K Espada
    if (q.includes('4 bhk') || q.includes('5 bhk') || q.includes('villa') || q.includes('row house') || q.includes('espada') || q.includes('penthouse') || q.includes('luxury')) {
        return "Our ultra-luxury portfolio features **24K Espada (Sector R22)**, offering signature 4 & 5 BHK row houses and independent villas (2,800 to 4,500 sq.ft) starting from ₹2.85 Cr to ₹5.50 Cr*. They include private elevators, personal gardens, and bespoke concierge services. May I arrange an exclusive private showing for you?";
    }

    // Plots / Land / Nora
    if (q.includes('plot') || q.includes('land') || q.includes('nora')) {
        return "Sector R17B features **Nora Bungalow Plots**, offering clear-title, infrastructure-ready gated land parcels from 1,500 to 4,000 sq.ft, priced from ₹1.25 Cr to ₹3.50 Cr*. You have complete architectural freedom to construct your custom villa within the 390-acre gated ecosystem.";
    }

    // School / Education
    if (q.includes('school') || q.includes('anisha') || q.includes('education') || q.includes('cbse') || q.includes('icse') || q.includes('child')) {
        return "Life Republic houses the fully operational **Crimson Anisha Global School** inside the township. It offers international-standard education with CBSE/ICSE curriculum across a 4.5-acre campus, allowing children to safely walk or cycle to school without navigating highway traffic.";
    }

    // Hinjewadi / Commute / Metro / Distance
    if (q.includes('commute') || q.includes('distance') || q.includes('hinjewadi') || q.includes('metro') || q.includes('phase 1') || q.includes('phase 2') || q.includes('phase 3') || q.includes('connectivity') || q.includes('location')) {
        return "Life Republic connects directly via the 150-ft wide Spine Road: Hinjewadi Phase 1 (Infosys/Wipro) is 8–10 mins (4.5 km), Phase 2 is 12 mins, Phase 3 is 15 mins, and Mumbai-Pune Expressway is 10 mins. The upcoming Pune Metro Line 3 station is only 4 km away, drastically easing daily transit.";
    }

    // RERA / Approvals / Legal
    if (q.includes('rera') || q.includes('legal') || q.includes('approval') || q.includes('possession') || q.includes('maharera')) {
        return "All residential sectors at Kolte-Patil Life Republic are 100% MahaRERA registered: Qrious (P52100028753), Duet (P52100052344), Canvas (P52100054789), Atmos (P52100049756), Aros (P52100030584), and Echoes (P52100051288).";
    }

    // Price / Cost / Rate per sq ft
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('payment plan')) {
        return "Residential pricing at Life Republic spans from ₹42 Lakhs* for 1 BHKs, ₹58L–₹85L* for 2 BHKs, ₹98L–₹1.35Cr* for 3 BHKs, and ₹2.85Cr+ for signature 24K Espada villas. Flexible construction-linked payment plans and 0% pre-EMI schemes are currently available on select towers. Would you like the official price sheet?";
    }

    // ROI / Investment / Rent
    if (q.includes('roi') || q.includes('investment') || q.includes('yield') || q.includes('rental') || q.includes('appreciation')) {
        return "Hinjewadi houses 450,000+ tech professionals, generating intense tenant demand. Life Republic delivers an average gross rental yield between 5.8% and 7.2%, alongside a 12.4% compound annual capital appreciation (CAGR) over the past 5 years. Typical 2 BHK rentals range between ₹26,000 and ₹34,000/month.";
    }

    // Site Visit / Tour / Contact / Address
    if (q.includes('visit') || q.includes('tour') || q.includes('see') || q.includes('address') || q.includes('phone') || q.includes('contact') || q.includes('call')) {
        return "We would be delighted to host you for a VIP Spatial Synthesis Tour at Kolte-Patil Life Republic (Survey No. 74, Marunji-Kasararsai Road, Hinjewadi). Complimentary chauffeured pickup can be arranged. Would you like to schedule your visit for this week?";
    }

    // Amenities / Park / Sports
    if (q.includes('amenit') || q.includes('clubhouse') || q.includes('park') || q.includes('pool') || q.includes('gym')) {
        return "The 390-acre township features a 3.5-acre Central Park urban lung, 4 multi-storey clubhouses, Olympic-length swimming pools, cricket pitch, tennis courts, dedicated fire station, high-street retail galleria, and 5-tier round-the-clock sovereign security.";
    }

    // General Fallback
    return "Kolte-Patil Life Republic is a 390-acre integrated sustainable township in Hinjewadi, Pune West, master-planned by Hafeez Contractor. It offers 1, 2, 3, 4 BHK residences, row houses, and bungalow plots starting from ₹42 Lakhs*. How may I assist you with floor plans, pricing, or a VIP site visit today?";
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const aiService = {
    async askTownshipAgent(query: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []): Promise<string> {
        // If no valid Gemini API key is configured, instantly run our high-fidelity deterministic engine
        if (!API_KEY || API_KEY === 'your_gemini_api_key' || !API_KEY.startsWith('AIza')) {
            await new Promise(r => setTimeout(r, 600)); // Natural response latency simulation
            return getLocalKnowledgeResponse(query);
        }

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: SYSTEM_PROMPT
            });

            const chat = model.startChat({
                history: history
            });

            const result = await chat.sendMessage(query);
            const response = await result.response;
            const text = response.text();
            return text || getLocalKnowledgeResponse(query);
        } catch (error) {
            console.warn("Gemini API call failed, falling back to local township knowledge engine:", error);
            return getLocalKnowledgeResponse(query);
        }
    }
};
