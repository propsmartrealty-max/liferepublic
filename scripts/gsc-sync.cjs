#!/usr/bin/env node
/**
 * Hardened Google Search Console Programmatic Synchronization Engine
 * Domain: sc-domain:life-republic.in
 * 
 * Features:
 * - Auto-discovers active XML sitemaps in public/ and submits them to GSC
 * - Purges obsolete/retired silo sitemaps and non-sitemap shopping feeds from GSC
 * - Live inspection and monitoring of crawl state, download errors & URL counts
 */

const { JWT } = require('google-auth-library');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'sc-domain:life-republic.in';
const DOMAIN = 'https://life-republic.in';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

function getActiveSitemaps() {
    const active = [
        `${DOMAIN}/sitemap.xml`,
        `${DOMAIN}/sitemap-silos-index.xml`,
    ];

    if (fs.existsSync(PUBLIC_DIR)) {
        const siloFiles = fs
            .readdirSync(PUBLIC_DIR)
            .filter(f => /^sitemap-silos-\d+\.xml$/.test(f))
            .sort();
        for (const file of siloFiles) {
            active.push(`${DOMAIN}/${file}`);
        }
    }

    active.push(`${DOMAIN}/feed.xml`, `${DOMAIN}/rss.xml`);
    return active;
}

const NON_SITEMAP_FEEDS = [
    `${DOMAIN}/google-property-feed.xml`,
    `${DOMAIN}/google-shopping-feed.xml`,
];

async function getAuthClient() {
    const keyDir = path.resolve(__dirname, '../service-accounts');
    const candidateFiles = [];
    if (fs.existsSync(keyDir)) {
        const files = fs.readdirSync(keyDir).filter(f => f.endsWith('.json')).map(f => path.join(keyDir, f));
        candidateFiles.push(...files);
    }
    candidateFiles.push(path.resolve(__dirname, '../service-account.json'));

    for (const keyPath of candidateFiles) {
        if (!fs.existsSync(keyPath)) continue;
        try {
            const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
            if (!keyData.client_email || !keyData.private_key) continue;
            const jwt = new JWT({
                email: keyData.client_email,
                key: keyData.private_key,
                scopes: ['https://www.googleapis.com/auth/webmasters']
            });
            await jwt.authorize();
            console.log(`🔑 GSC Client authorized with ${keyData.client_email}`);
            return jwt;
        } catch (_) {}
    }
    throw new Error('No valid service account found in service-accounts/ with GSC access');
}

async function syncGSC() {
    console.log('═'.repeat(75));
    console.log('🌐 GOOGLE SEARCH CONSOLE PROGRAMMATIC SYNCHRONIZATION ENGINE');
    console.log(`🎯 Target Property: ${SITE_URL}`);
    console.log('═'.repeat(75) + '\n');

    const client = await getAuthClient();
    const encodedSite = encodeURIComponent(SITE_URL);
    const activeSitemaps = getActiveSitemaps();

    // 0. Query existing registered sitemaps and purge any retired/non-sitemap URLs
    try {
        const listBefore = await client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps`
        });
        const existing = listBefore.data.sitemap || [];
        for (const item of existing) {
            const smPath = item.path;
            if (!activeSitemaps.includes(smPath) || NON_SITEMAP_FEEDS.includes(smPath)) {
                try {
                    await client.request({
                        url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodeURIComponent(smPath)}`,
                        method: 'DELETE'
                    });
                    console.log(`  🗑️ [Purged Obsolete Sitemap]: ${smPath}`);
                } catch (_) {}
            }
        }
    } catch (_) {}

    // 1. Submit all active verified XML sitemaps and RSS feeds
    console.log(`📡 Submitting ${activeSitemaps.length} Active Sitemaps & RSS Feeds to Google Search Console...`);
    let successCount = 0;

    for (const smUrl of activeSitemaps) {
        try {
            await client.request({
                url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodeURIComponent(smUrl)}`,
                method: 'PUT'
            });
            console.log(`  ✅ [204 OK] Submitted: ${smUrl}`);
            successCount++;
        } catch (err) {
            console.error(`  ❌ Failed: ${smUrl} → ${err.response?.data?.error?.message || err.message}`);
        }
    }

    // 2. Fetch live status of all registered sitemaps in GSC
    console.log('\n📊 Querying Real-Time GSC Sitemap Registration Status...');
    try {
        const listRes = await client.request({
            url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps`
        });

        const registered = listRes.data.sitemap || [];
        console.log(`Total Registered Feeds in Google Search Console: ${registered.length}\n`);

        for (const item of registered) {
            const warnings = parseInt(item.warnings || '0', 10);
            const errors = parseInt(item.errors || '0', 10);
            const statusIcon = (warnings === 0 && errors === 0) ? '🟢' : '⚠️';
            const pendingTag = item.isPending ? '⏳ Crawl Pending' : '✅ Processed';

            console.log(`  ${statusIcon} ${item.path}`);
            console.log(`     Type: ${item.type} | Index: ${item.isSitemapsIndex} | Status: ${pendingTag}`);
            console.log(`     Last Submitted: ${item.lastSubmitted} | Downloaded: ${item.lastDownloaded || 'Awaiting crawl'}`);
            if (warnings > 0 || errors > 0) {
                console.log(`     ⚠️ Warnings: ${warnings} | Errors: ${errors}`);
            }
        }
    } catch (listErr) {
        console.error('Failed to query registered sitemaps:', listErr.message);
    }

    console.log('\n' + '═'.repeat(75));
    console.log(`🎉 GSC Sync Completed: ${successCount}/${activeSitemaps.length} sitemaps active in Google Search Console.`);
    console.log('═'.repeat(75) + '\n');
}

module.exports = { syncGSC };

if (require.main === module) {
    syncGSC().catch(console.error);
}
