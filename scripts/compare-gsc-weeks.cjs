const { JWT } = require('google-auth-library');
const path = require('path');
const fs = require('fs');

const KEY_FILE = path.resolve(__dirname, '../service-accounts/account-1.json');
const SITE_URL = 'sc-domain:life-republic.in';

async function getAuthClient() {
    const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf-8'));
    const jwt = new JWT({
        email: keyData.client_email,
        key: keyData.private_key,
        scopes: ['https://www.googleapis.com/auth/webmasters']
    });
    await jwt.authorize();
    return jwt;
}

async function run() {
    const client = await getAuthClient();
    const encodedSite = encodeURIComponent(SITE_URL);

    // Period 1: High week (Oct 20 - Oct 26)
    // Period 2: Recent week (Oct 29 - Nov 4)
    const [resHigh, resLow, resHighPages, resLowPages] = await Promise.all([
        client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: { startDate: '2026-10-20', endDate: '2026-10-26', dimensions: ['query'], rowLimit: 100 }
        }),
        client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: { startDate: '2026-10-29', endDate: '2026-11-04', dimensions: ['query'], rowLimit: 100 }
        }),
        client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: { startDate: '2026-10-20', endDate: '2026-10-26', dimensions: ['page'], rowLimit: 50 }
        }),
        client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
            method: 'POST',
            data: { startDate: '2026-10-29', endDate: '2026-11-04', dimensions: ['page'], rowLimit: 50 }
        })
    ]);

    console.log('=== TOTAL COMPARISON ===');
    const sumHigh = (resHigh.data.rows || []).reduce((acc, r) => acc + r.impressions, 0);
    const sumLow = (resLow.data.rows || []).reduce((acc, r) => acc + r.impressions, 0);
    console.log(`Peak Week (Oct 20 - Oct 26): ${sumHigh} impressions`);
    console.log(`Recent Week (Oct 29 - Nov 04): ${sumLow} impressions (Diff: ${sumLow - sumHigh})`);

    // Map queries
    const qMap = new Map();
    for (const r of (resHigh.data.rows || [])) {
        qMap.set(r.keys[0], { query: r.keys[0], highImp: r.impressions, lowImp: 0, highPos: r.position, lowPos: 0 });
    }
    for (const r of (resLow.data.rows || [])) {
        if (!qMap.has(r.keys[0])) {
            qMap.set(r.keys[0], { query: r.keys[0], highImp: 0, lowImp: r.impressions, highPos: 0, lowPos: r.position });
        } else {
            const item = qMap.get(r.keys[0]);
            item.lowImp = r.impressions;
            item.lowPos = r.position;
        }
    }

    const qList = Array.from(qMap.values()).map(x => ({ ...x, diff: x.lowImp - x.highImp }));
    qList.sort((a, b) => a.diff - b.diff);

    console.log('\n=== BIGGEST QUERY DROPS ===');
    console.log('Query                                       │ Oct 20-26 │ Oct 29-Nov 4 │ Diff │ Pos Before → After');
    console.log('─'.repeat(85));
    for (const item of qList.slice(0, 15)) {
        const q = item.query.padEnd(43).slice(0, 43);
        console.log(`${q} │ ${item.highImp.toString().padStart(9)} │ ${item.lowImp.toString().padStart(12)} │ ${item.diff.toString().padStart(4)} │ ${item.highPos.toFixed(1)} → ${item.lowPos.toFixed(1)}`);
    }

    // Map pages
    const pMap = new Map();
    for (const r of (resHighPages.data.rows || [])) {
        pMap.set(r.keys[0], { page: r.keys[0], highImp: r.impressions, lowImp: 0 });
    }
    for (const r of (resLowPages.data.rows || [])) {
        if (!pMap.has(r.keys[0])) {
            pMap.set(r.keys[0], { page: r.keys[0], highImp: 0, lowImp: r.impressions });
        } else {
            pMap.get(r.keys[0]).lowImp = r.impressions;
        }
    }
    const pList = Array.from(pMap.values()).map(x => ({ ...x, diff: x.lowImp - x.highImp }));
    pList.sort((a, b) => a.diff - b.diff);

    console.log('\n=== BIGGEST PAGE DROPS ===');
    console.log('Page                                        │ Oct 20-26 │ Oct 29-Nov 4 │ Diff');
    console.log('─'.repeat(75));
    for (const item of pList.slice(0, 15)) {
        const p = item.page.replace('https://life-republic.in', '').padEnd(43).slice(0, 43);
        console.log(`${p} │ ${item.highImp.toString().padStart(9)} │ ${item.lowImp.toString().padStart(12)} │ ${item.diff.toString().padStart(4)}`);
    }
}

run();
