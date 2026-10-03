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

                // FormSubmit Configuration Directives
                formData.append('_subject', `🚨 Lead: ${leadName} - ${clusterName} (${config})`);
                formData.append('_captcha', 'false');
                formData.append('_template', 'table');
                if (lead.email && lead.email.includes('@')) {
                    formData.append('_replyto', lead.email);
                }

                // Sovereign Local Lead Persistence Backup (Zero Lead Drop Guarantee)
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

                // Table Fields Formatted in Title-Case for Clean Email Display
                formData.append('Applicant Name', leadName);
                formData.append('Mobile Number', leadPhone);
                formData.append('Email Address', leadEmail);
                formData.append('Interested Cluster', clusterName);
                formData.append('Preferred Typology', config);
                formData.append('Inquiry Category', purpose);
                formData.append('Customer Message', lead.message || 'Interested in receiving brochure, cost sheet, and booking site tour.');
                formData.append('Source Touchpoint', lead.source || 'Website Modal');
                formData.append('Submission Timestamp (IST)', timestamp);
                formData.append('Page Origin URL', currentUrl);

                // Embedded HTML Summary Table for Rich Email Rendering
                const htmlLeadTable = `
<div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background: linear-gradient(135deg, #090d16 0%, #1e293b 100%); color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #e11d48;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">🏛️ KOLTE-PATIL LIFE REPUBLIC</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">High-Intent Buyer Lead from Official Monograph</p>
    </div>
    <div style="padding: 24px; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 38%;">Client Name:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${safeLeadName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 700;"><a href="tel:${safeLeadPhone}" style="color: #2563eb; text-decoration: none;">📞 ${safeLeadPhone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                <td style="padding: 10px 0; color: #0f172a;">${safeLeadEmail}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Preferred Cluster:</td>
                <td style="padding: 10px 0; color: #e11d48; font-weight: 700;">${safeClusterName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Configuration:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${safeConfig}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Inquiry Type:</td>
                <td style="padding: 10px 0; color: #047857; font-weight: 700; background: #ecfdf5; padding: 4px 8px; border-radius: 4px; display: inline-block;">${safePurpose}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Customer Note:</td>
                <td style="padding: 10px 0; color: #334155;">${safeMessage}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Page Source:</td>
                <td style="padding: 10px 0; color: #334155; font-size: 12px; word-break: break-all;">${safeUrl}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Received Time:</td>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
            </tr>
        </table>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
            <a href="https://wa.me/91${leadPhone.replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20${encodeURIComponent(leadName)},%20thank%20you%20for%20enquiring%20about%20Kolte%20Patil%20Life%20Republic." 
               style="background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block;">
                💬 Open WhatsApp Chat with Client
            </a>
        </div>
    </div>
</div>
`.trim();

                formData.append('Executive Lead Card (HTML)', htmlLeadTable);

                const response = await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to dispatch lead: HTTP ${response.status}`);
                }
                
                const result = await response.json();

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

                return result;
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
            { id: 1, name: 'Clubhouse', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 1 },
            { id: 2, name: 'Swimming Pool', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 2 },
            { id: 3, name: 'Gymnasium', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 3 },
            { id: 4, name: 'Kids Play Area', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 4 },
        ]
    }
};
