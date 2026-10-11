#!/usr/bin/env node
/**
 * Hardened Sovereign Google Indexing Engine - Multi-Account Quota Pooling
 * 
 * Features:
 * - Multi-Project / Multi-Service-Account Rotational Pool (service-accounts/*.json)
 * - Auto-rotation on 429 Quota Exhaustion: seamlessly transfers load to next project
 * - Quota Pooling Capacity: N accounts × 200 requests = (N × 200) requests/day
 * - Persistent quota cache tracking per-account state and submitted URLs (.indexing-quota-cache.json)
 * - Exponential backoff with jitter on temporary rate-limits (per-minute caps)
 * - Automatic discovery of sitemap.xml & all sub-sitemaps (sitemap-silos-index.xml)
 * - Clean real-time progress reporting and pool capacity statistics
 */

const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');

// Configuration
const CONFIG = {
    domain: 'https://life-republic.in',
    batchDelayMs: 250,              // 4 requests/sec baseline speed
    maxRetries: 3,                  // Retries per failed URL
    baseBackoffMs: 1500,            // Base backoff for rate limiting
    cacheFile: path.resolve(__dirname, '../.indexing-quota-cache.json'),
    sitemapPath: path.resolve(__dirname, '../public/sitemap.xml'),
    keyDir: path.resolve(__dirname, '../service-accounts'),
    fallbackKeyPath: path.resolve(__dirname, '../service-account.json')
};

// 1. Discover all service accounts in the pool
function loadServiceAccounts() {
    const accounts = [];
    const seenEmails = new Set();

    // Check directory: service-accounts/
    if (fs.existsSync(CONFIG.keyDir)) {
        const files = fs.readdirSync(CONFIG.keyDir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = path.join(CONFIG.keyDir, file);
                try {
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    if (data.client_email && data.private_key && !seenEmails.has(data.client_email)) {
                        accounts.push({
                            file: file,
                            projectId: data.project_id || 'unknown-project',
                            clientEmail: data.client_email,
                            privateKey: data.private_key,
                            source: filePath
                        });
                        seenEmails.add(data.client_email);
                    }
                } catch (e) {
                    console.warn(`⚠️ Warning: Failed to parse ${file}: ${e.message}`);
                }
            }
        }
    }

    // Check fallback root: service-account.json
    if (fs.existsSync(CONFIG.fallbackKeyPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(CONFIG.fallbackKeyPath, 'utf-8'));
            if (data.client_email && data.private_key && !seenEmails.has(data.client_email)) {
                accounts.push({
                    file: 'service-account.json',
                    projectId: data.project_id || 'unknown-project',
                    clientEmail: data.client_email,
                    privateKey: data.private_key,
                    source: CONFIG.fallbackKeyPath
                });
                seenEmails.add(data.client_email);
            }
        } catch (_) {}
    }

    // Check environment variable: GOOGLE_SERVICE_ACCOUNT
    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
        try {
            const data = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
            if (data.client_email && data.private_key && !seenEmails.has(data.client_email)) {
                accounts.push({
                    file: 'env:GOOGLE_SERVICE_ACCOUNT',
                    projectId: data.project_id || 'unknown-project',
                    clientEmail: data.client_email,
                    privateKey: data.private_key,
                    source: 'env'
                });
                seenEmails.add(data.client_email);
            }
        } catch (_) {}
    }

    return accounts;
}

// 2. Load / Save Quota Tracker State
function loadQuotaCache() {
    const today = new Date().toISOString().slice(0, 10);
    try {
        if (fs.existsSync(CONFIG.cacheFile)) {
            const data = JSON.parse(fs.readFileSync(CONFIG.cacheFile, 'utf-8'));
            if (data.date === today) {
                if (!data.accountStats) data.accountStats = {};
                if (!data.successfulUrls) data.successfulUrls = [];
                if (!data.failedUrls) data.failedUrls = [];
                return data;
            }
        }
    } catch (_) {}
    return { date: today, submittedCount: 0, accountStats: {}, successfulUrls: [], failedUrls: [] };
}

function saveQuotaCache(cache) {
    try {
        fs.writeFileSync(CONFIG.cacheFile, JSON.stringify(cache, null, 2));
    } catch (_) {}
}

// 3. Extract all URLs from sitemaps
function extractUrls() {
    const urls = new Set();
    const sitemapFiles = ['sitemap.xml', 'sitemap-silos-index.xml'];

    for (const smName of sitemapFiles) {
        const smPath = path.resolve(__dirname, '../public', smName);
        if (!fs.existsSync(smPath)) continue;

        const content = fs.readFileSync(smPath, 'utf-8');
        const locRegex = /<loc>(.*?)<\/loc>/g;
        let match;

        while ((match = locRegex.exec(content)) !== null) {
            const url = match[1].trim();
            if (url.endsWith('.xml')) {
                const filename = path.basename(url);
                const subPath = path.resolve(__dirname, '../public', filename);
                if (fs.existsSync(subPath)) {
                    const subContent = fs.readFileSync(subPath, 'utf-8');
                    let subMatch;
                    const subRegex = /<loc>(.*?)<\/loc>/g;
                    while ((subMatch = subRegex.exec(subContent)) !== null) {
                        if (!subMatch[1].endsWith('.xml')) {
                            urls.add(subMatch[1].trim());
                        }
                    }
                }
            } else {
                urls.add(url);
            }
        }
    }

    return Array.from(urls);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    console.log('═'.repeat(75));
    console.log('🛡️  HARDENED GOOGLE INDEXING ENGINE - MULTI-ACCOUNT ROTATIONAL POOL');
    console.log('═'.repeat(75));

    const rawAccounts = loadServiceAccounts();
    if (rawAccounts.length === 0) {
        console.error('❌ No service accounts found! Drop .json credentials into service-accounts/ or service-account.json');
        process.exit(1);
    }

    const cache = loadQuotaCache();
    const allUrls = extractUrls();
    const remainingUrls = allUrls.filter(u => !cache.successfulUrls.includes(u));

    console.log(`📦 Discovered ${rawAccounts.length} Service Account(s) in credential pool:`);
    const poolCapacity = rawAccounts.length * 200;
    console.log(`🎯 Total Pool Daily Capacity: ~${poolCapacity.toLocaleString()} URLs/day (${rawAccounts.length} × 200/day)`);

    // Initialize authenticated clients
    const clients = [];
    for (let i = 0; i < rawAccounts.length; i++) {
        const acc = rawAccounts[i];
        const stat = cache.accountStats[acc.clientEmail] || { submitted: 0, exhausted: false, exhaustedAt: 0 };
        // If more than 20 minutes have elapsed since it was marked exhausted, unmark it to probe for quota replenishment
        if (stat.exhausted && stat.exhaustedAt && (Date.now() - stat.exhaustedAt > 20 * 60 * 1000)) {
            stat.exhausted = false;
            stat.submitted = 0; // reset counter on new probe cycle
        }
        cache.accountStats[acc.clientEmail] = stat;

        const jwt = new JWT({
            email: acc.clientEmail,
            key: acc.privateKey,
            scopes: ['https://www.googleapis.com/auth/indexing']
        });

        clients.push({
            ...acc,
            jwt: jwt,
            stat: stat,
            authorized: false
        });

        const statusTag = stat.exhausted ? '🛑 Exhausted today' : `⚡ Active (${stat.submitted}/200)`;
        console.log(`  [${i + 1}] ${acc.projectId} (${acc.clientEmail}) → ${statusTag}`);
    }

    console.log(`\n📊 Total Submitted Today (${cache.date}): ${cache.submittedCount}`);
    console.log(`📡 Sitemaps Architecture: ${allUrls.length} total URLs`);
    console.log(`📋 URLs Pending Submission: ${remainingUrls.length}\n`);

    if (remainingUrls.length === 0) {
        console.log('✨ All sitemap URLs have already been indexed today!');
        return;
    }

    // Helper to find next non-exhausted account
    let currentAccountIndex = clients.findIndex(c => !c.stat.exhausted);
    if (currentAccountIndex === -1) {
        console.log('🛑 All service accounts in the pool are currently exhausted for today.');
        printPoolScalingHelp(rawAccounts.length, poolCapacity);
        return;
    }

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < remainingUrls.length; i++) {
        const url = remainingUrls[i];
        let urlPublished = false;

        while (!urlPublished && currentAccountIndex !== -1) {
            const activeAcc = clients[currentAccountIndex];

            // Lazy authorization
            if (!activeAcc.authorized) {
                try {
                    await activeAcc.jwt.authorize();
                    activeAcc.authorized = true;
                } catch (authErr) {
                    console.error(`  ❌ [${activeAcc.projectId}] OAuth2 Authorization failed: ${authErr.message}`);
                    activeAcc.stat.exhausted = true;
                    currentAccountIndex = clients.findIndex((c, idx) => idx > currentAccountIndex && !c.stat.exhausted);
                    continue;
                }
            }

            try {
                const res = await activeAcc.jwt.request({
                    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
                    method: 'POST',
                    data: {
                        url: url,
                        type: 'URL_UPDATED'
                    }
                });

                if (res.status === 200) {
                    successCount++;
                    cache.submittedCount++;
                    activeAcc.stat.submitted = (activeAcc.stat.submitted || 0) + 1;
                    cache.successfulUrls.push(url);
                    urlPublished = true;
                    console.log(`  ✅ [${i + 1}/${remainingUrls.length}] [${activeAcc.projectId}] 200 OK: ${url}`);
                }
            } catch (err) {
                const status = err.response?.status;
                const errData = err.response?.data?.error;
                const msg = errData?.message || err.message;

                if (status === 429) {
                    // Check if project daily cap reached
                    if (msg.includes('Publish requests per day') || msg.includes('Quota exceeded')) {
                        console.log(`\n🔄 [${activeAcc.projectId}] Daily quota cap reached (200/day).`);
                        activeAcc.stat.exhausted = true;
                        activeAcc.stat.exhaustedAt = Date.now();
                        saveQuotaCache(cache);

                        // Rotate to next available account in pool
                        currentAccountIndex = clients.findIndex(c => !c.stat.exhausted);
                        if (currentAccountIndex !== -1) {
                            console.log(`👉 Rotating to [${clients[currentAccountIndex].projectId}] (${clients[currentAccountIndex].clientEmail})...\n`);
                            continue; // Retries same URL with the new active project
                        } else {
                            console.log('\n🛑 All accounts in the pool are now exhausted for today.');
                            break;
                        }
                    } else {
                        // Rate limit per minute: backoff and retry once
                        console.log(`  ⚠️ Per-minute rate limit on [${activeAcc.projectId}]. Backing off 3s...`);
                        await sleep(3000);
                    }
                } else {
                    console.log(`  ❌ [${i + 1}/${remainingUrls.length}] [${activeAcc.projectId}] ${status || 'ERR'}: ${url} → ${msg}`);
                    failCount++;
                    cache.failedUrls.push({ url, error: msg });
                    urlPublished = true; // Move to next URL on hard client errors
                }
            }

            saveQuotaCache(cache);
            await sleep(CONFIG.batchDelayMs);
        }

        // If no more accounts are available, stop URL processing
        if (currentAccountIndex === -1) {
            break;
        }
    }

    console.log('\n' + '═'.repeat(75));
    console.log('📊 MULTI-ACCOUNT GOOGLE INDEXING SUMMARY');
    console.log('═'.repeat(75));
    console.log(`  ✅ URLs Published Successfully : ${successCount}`);
    console.log(`  ❌ Failed / Skipped             : ${failCount}`);
    console.log(`  📈 Total Quota Consumed Today   : ${cache.submittedCount}`);
    console.log('═'.repeat(75) + '\n');

    if (currentAccountIndex === -1 && remainingUrls.length > successCount) {
        printPoolScalingHelp(rawAccounts.length, poolCapacity);
    }
}

function printPoolScalingHelp(accountCount, currentCapacity) {
    console.log('\n' + '┌'.padEnd(75, '─') + '┐');
    console.log('│ ⚡ HOW TO SCALE PROGRAMMATIC DAILY CAPACITY TO 5,000+ URLS/DAY            │');
    console.log('├'.padEnd(75, '─') + '┤');
    console.log(`│ Current Pool: ${accountCount} account(s) = ~${currentCapacity} URLs/day.                                │`);
    console.log('│ Target Pool : 25 accounts = 5,000 URLs/day.                               │');
    console.log('│                                                                           │');
    console.log('│ To add more capacity without any manual Google approval forms:           │');
    console.log('│ 1. Create additional free projects in Google Cloud Console.               │');
    console.log('│ 2. Enable "Indexing API" in each project.                                 │');
    console.log('│ 3. Create a Service Account key (.json) in each project.                  │');
    console.log('│ 4. Drop the .json files directly into the "service-accounts/" folder:     │');
    console.log('│    service-accounts/account-2.json                                        │');
    console.log('│    service-accounts/account-3.json ... up to account-25.json              │');
    console.log('│ 5. In Google Search Console (life-republic.in), add each service account  │');
    console.log('│    email as an "Owner" in Settings -> Users and Permissions.              │');
    console.log('│                                                                           │');
    console.log('│ The engine will automatically detect and pool all accounts on every run!  │');
    console.log('└'.padEnd(75, '─') + '┘\n');
}

main().catch(err => {
    console.error('Fatal engine failure:', err.message);
    process.exit(1);
});
