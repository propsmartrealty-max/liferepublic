interface Env {
    [key: string]: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body: any = await context.request.json();
        const { name, phone, email, cluster, configuration, enquiryType, message, source, url } = body;

        if (!name || !phone) {
            return new Response(JSON.stringify({ success: false, error: "Name and phone number are required." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const cleanPhone = String(phone).replace(/[^0-9]/g, '');

        // FormSubmit payload (Clean JSON format for guaranteed delivery)
        const formSubmitPayload = {
            _subject: `🚨 NEW LEAD: ${name} - ${cluster || 'Life Republic'} (${configuration || 'General'})`,
            _captcha: "false",
            _template: "table",
            "Applicant Name": name,
            "Mobile Number": cleanPhone,
            "Email Address": email || "Not Provided",
            "Interested Cluster": cluster || "Life Republic Township",
            "Configuration": configuration || "Not Specified",
            "Inquiry Type": enquiryType || "Pricing & Brochure",
            "Message": message || "Requesting cost sheet and site visit walkthrough.",
            "Source": source || "life-republic.in",
            "Page URL": url || "https://life-republic.in",
            "Submission Timestamp (IST)": timestamp
        };

        if (email && email.includes('@')) {
            (formSubmitPayload as any)._replyto = email;
        }

        let formSubmitSuccess = false;
        let formSubmitResponseText = "";

        try {
            const formSubmitRes = await fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Origin": "https://life-republic.in",
                    "Referer": "https://life-republic.in/"
                },
                body: JSON.stringify(formSubmitPayload)
            });

            formSubmitResponseText = await formSubmitRes.text();
            formSubmitSuccess = formSubmitRes.ok;
        } catch (err: any) {
            console.error("Server-side FormSubmit dispatch error:", err);
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Lead processed successfully",
            dispatched: formSubmitSuccess,
            timestamp
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } catch (error: any) {
        console.error("Error in /api/leads:", error);
        return new Response(JSON.stringify({ success: false, error: error.message || "Internal lead processing error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Accept"
        }
    });
};
