const { JWT } = require('google-auth-library');
const path = require('path');
const fs = require('fs');

const KEY_FILE = path.resolve(__dirname, '../service-accounts/account-1.json');
const SITE_URL = 'sc-domain:life-republic.in';

async function getAuthClient() {
    if (!fs.existsSync(KEY_FILE)) {
        throw new Error(`Service account key not found at ${KEY_FILE}`);
    }
    const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf-8'));
    const jwt = new JWT({
        email: keyData.client_email,
        key: keyData.private_key,
        scopes: [
            'https://www.googleapis.com/auth/webmasters',
            'https://www.googleapis.com/auth/webmasters.readonly'
        ]
    });
    await jwt.authorize();
    return jwt;
}

function formatDate(d) {
    return d.toISOString().split('T')[0];
}

async function run() {
    console.log('🚀 Connecting to Google Search Console API for:', SITE_URL);
    const client = await getAuthClient();
    const encodedSite = encodeURIComponent(SITE_URL);

    // Calculate dates
    // GSC data usually has a 2-3 day lag
    const now = new Date();
    const endDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const startDate30 = new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000);

    const startStr = formatDate(startDate30);
    const endStr = formatDate(endDate);

    console.log(`📅 Querying daily performance: ${startStr} to ${endStr}\n`);

    try {
        // 1. Daily Trend
        const dailyRes = await client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: {
                startDate: startStr,
                endDate: endStr,
                dimensions: ['date'],
                rowLimit: 100
            }
        });

        const dailyRows = dailyRes.data.rows || [];
        console.log('📈 DAILY PERFORMANCE (Impressions, Clicks, CTR, Position):');
        console.log('─'.repeat(70));
        console.log('Date        │ Impressions │ Clicks │ CTR (%) │ Avg Position');
        console.log('─'.repeat(70));
        
        let totalImp = 0;
        let totalClicks = 0;
        for (const row of dailyRows) {
            const date = row.keys[0];
            const imp = row.impressions;
            const clicks = row.clicks;
            const ctr = (row.ctr * 100).toFixed(2);
            const pos = row.position.toFixed(1);
            totalImp += imp;
            totalClicks += clicks;
            console.log(`${date}  │ ${imp.toString().padStart(11)} │ ${clicks.toString().padStart(6)} │ ${ctr.padStart(7)}% │ ${pos.padStart(12)}`);
        }
        console.log('─'.repeat(70));
        console.log(`Total (${dailyRows.length} days): ${totalImp} impressions, ${totalClicks} clicks\n`);

        // 2. Top Queries (Last 7 Days vs Prior 7 Days)
        console.log('🔍 Top Queries in the last available window (Sorted by Impressions):');
        const queryRes = await client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: {
                startDate: startStr,
                endDate: endStr,
                dimensions: ['query'],
                rowLimit: 25
            }
        });

        const queryRows = queryRes.data.rows || [];
        console.log('─'.repeat(85));
        console.log('Query                                       │ Imp     │ Clicks │ CTR     │ Position');
        console.log('─'.repeat(85));
        for (const row of queryRows) {
            const q = (row.keys[0] || '').padEnd(43).slice(0, 43);
            const imp = row.impressions.toString().padStart(7);
            const clicks = row.clicks.toString().padStart(6);
            const ctr = ((row.ctr * 100).toFixed(1) + '%').padStart(7);
            const pos = row.position.toFixed(1).padStart(8);
            console.log(`${q} │ ${imp} │ ${clicks} │ ${ctr} │ ${pos}`);
        }
        console.log('─'.repeat(85) + '\n');

        // 3. Top Pages
        console.log('📄 Top Pages in the last available window (Sorted by Impressions):');
        const pageRes = await client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: {
                startDate: startStr,
                endDate: endStr,
                dimensions: ['page'],
                rowLimit: 15
            }
        });

        const pageRows = pageRes.data.rows || [];
        console.log('─'.repeat(85));
        console.log('Page                                        │ Imp     │ Clicks │ CTR     │ Position');
        console.log('─'.repeat(85));
        for (const row of pageRows) {
            const p = (row.keys[0] || '').replace('https://life-republic.in', '').padEnd(43).slice(0, 43);
            const imp = row.impressions.toString().padStart(7);
            const clicks = row.clicks.toString().padStart(6);
            const ctr = ((row.ctr * 100).toFixed(1) + '%').padStart(7);
            const pos = row.position.toFixed(1).padStart(8);
            console.log(`${p} │ ${imp} │ ${clicks} │ ${ctr} │ ${pos}`);
        }
        console.log('─'.repeat(85) + '\n');

    } catch (err) {
        console.error('❌ GSC Query Error:', err.response?.data || err.message);
    }
}

run();
