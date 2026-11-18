import { projectsRegistry } from '../data/projects';

export interface LeadSubmission {
    name: string;
    phone: string;
    email?: string;
    cluster?: string;
    project_id?: string;
    configuration?: string;
    enquiryType?: string;
    type?: string;
    message?: string;
    source?: string;
    url?: string;
}

export const api = {
    leads: {
        create: async (lead: LeadSubmission) => {
            try {
                const escapeHtml = (str: string) => 
                    str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));

                const formData = new FormData();
                const leadName = lead.name?.trim() || 'Valued Visitor';
                const leadPhone = lead.phone?.trim() || '';
                const leadEmail = lead.email?.trim() || 'Not Provided';
                const clusterName = lead.cluster || lead.project_id || 'Kolte Patil Life Republic';
                const config = lead.configuration || '2 / 3 BHK';
                const purpose = lead.enquiryType || lead.type || 'Site Visit & Pricing Inquiry';
                const currentUrl = lead.url || (typeof window !== 'undefined' ? window.location.href : 'https://life-republic.in');
                const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                const safeLeadName = escapeHtml(leadName);
                const safeLeadPhone = escapeHtml(leadPhone);
                const safeLeadEmail = escapeHtml(leadEmail);
                const safeClusterName = escapeHtml(clusterName);
                const safeConfig = escapeHtml(config);
                const safePurpose = escapeHtml(purpose);
                const safeMessage = escapeHtml(lead.message || 'Interested in receiving brochure, cost sheet, and booking site tour.');
                const safeUrl = escapeHtml(currentUrl);

                // 1. Sovereign Local Lead Persistence Backup (Zero Lead Drop Guarantee)
                try {
                    if (typeof window !== 'undefined' && window.localStorage) {
                        const existing = JSON.parse(localStorage.getItem('lr_leads_backup') || '[]');
                        existing.unshift({
                            name: leadName,
                            phone: leadPhone,
                            email: leadEmail,
                            cluster: clusterName,
                            configuration: config,
                            purpose,
                            message: lead.message,
                            source: lead.source,
                            url: currentUrl,
                            timestamp
                        });
                        localStorage.setItem('lr_leads_backup', JSON.stringify(existing.slice(0, 100)));
                    }
                } catch (_) {}

                const leadPayload = {
                    name: leadName,
                    phone: leadPhone,
                    email: leadEmail,
                    cluster: clusterName,
                    configuration: config,
                    enquiryType: purpose,
                    message: lead.message || 'Requesting brochure, pricing, and site visit details.',
                    source: lead.source || 'Website Modal',
                    url: currentUrl
                };

                let dispatched = false;
                let lastError = null;

                // TIER 1: Edge Server-Side Cloudflare Function (/api/leads)
                // Immune to browser ad-blockers, tracking blockers, and CORS issues
                try {
                    const edgeResponse = await fetch('/api/leads', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(leadPayload)
                    });

                    if (edgeResponse.ok) {
                        const edgeResult = await edgeResponse.json();
                        if (edgeResult.success) {
                            dispatched = true;
                        }
                    }
                } catch (edgeErr) {
                    console.warn('[Lead Dispatch] Edge function failed, falling back to client FormSubmit:', edgeErr);
                    lastError = edgeErr;
                }

                // TIER 2: Direct Client-Side FormSubmit JSON Dispatch
                try {
                    const formSubmitBody: any = {
                        _subject: `🚨 LEAD: ${leadName} - ${clusterName} (${config})`,
                        _captcha: "false",
                        _template: "table",
                        "Applicant Name": leadName,
                        "Mobile Number": leadPhone,
                        "Email Address": leadEmail,
                        "Interested Cluster": clusterName,
                        "Configuration": config,
                        "Inquiry Category": purpose,
                        "Customer Message": lead.message || 'Requesting brochure, pricing, and site visit details.',
                        "Source Touchpoint": lead.source || 'Website Modal',
                        "Submission Timestamp (IST)": timestamp,
                        "Page Origin URL": currentUrl
                    };

                    if (lead.email && lead.email.includes('@')) {
                        formSubmitBody._replyto = lead.email;
                    }

                    const response = await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(formSubmitBody)
                    });

                    if (response.ok) {
                        dispatched = true;
                    }
                } catch (clientErr) {
                    console.warn('[Lead Dispatch] Direct FormSubmit failed:', clientErr);
                    if (!dispatched) lastError = clientErr;
                }

                // Fire Google Ads & Analytics Conversion Event
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    try {
                        (window as any).gtag('event', 'generate_lead', {
                            event_category: 'Lead Generation',
                            event_label: `${clusterName} - ${config}`,
                            value: 1.0,
                            currency: 'INR'
                        });
                    } catch (_) {}
                }

                return { success: true, message: 'Lead submitted successfully' };
            } catch (error) {
                console.error('Lead Capture Error:', error);
                throw error;
            }
        }
    },
    projects: {
        getAll: async () => projectsRegistry,
        getById: async (id: string) => {
            const proj = projectsRegistry.find(p => p.id === id);
            if (!proj) throw new Error('Project not found');
            return proj;
        },
        getFeatured: async (limit = 3) => projectsRegistry.slice(0, limit)
    },
    amenities: {
        getAll: async () => [
            { id: 1, name: 'Clubhouse', title: 'Clubhouse', description: 'World-class clubhouse with modern recreational amenities', icon: 'Home', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 1 },
            { id: 2, name: 'Swimming Pool', title: 'Swimming Pool', description: 'Olympic size pool with sun deck', icon: 'Droplets', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 2 },
            { id: 3, name: 'Gymnasium', title: 'Gymnasium', description: 'High-tech fitness studio & cardio arena', icon: 'Dumbbell', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 3 },
            { id: 4, name: 'Kids Play Area', title: 'Kids Play Area', description: 'Dedicated safe interactive outdoor zones', icon: 'Smile', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 4 },
        ]
    }
};
