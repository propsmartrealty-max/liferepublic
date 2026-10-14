#!/usr/bin/env node
/**
 * Automated IndexNow Submitter for Bing, Microsoft Copilot, Yandex & Seznam
 * Domain: life-republic.in
 * 
 * Features:
 * - Persistent caching (.indexnow-cache.json) to prevent redundant submissions
 * - Dual endpoint submission (api.indexnow.org & www.bing.com)
 * - Automatic chunking into 10,000-URL batches (IndexNow protocol maximum)
 * - Status inspection and force re-submission flags
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'life-republic.in';
const KEY = 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const CACHE_FILE = path.resolve(__dirname, '../.indexnow-cache.json');

function loadCache() {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
            if (!data.submittedUrls) data.submittedUrls = [];
            return data;
        }
    } catch (_) {}
    return { submittedUrls: [], totalSubmitted: 0, lastRun: null };
}

function saveCache(cache) {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    } catch (_) {}
}

// Extract URLs from sitemaps
function getUrls() {
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

function submitBatch(endpoint, batch) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: batch
        });

        const req = https.request({
            hostname: endpoint,
            path: '/indexnow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(payload)
            },
            timeout: 15000
        }, (res) => {
            let resBody = '';
            res.on('data', c => resBody += c);
            res.on('end', () => {
                resolve({ status: res.statusCode, body: resBody });
            });
        });

        req.on('error', (err) => {
            resolve({ status: 500, error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ status: 504, error: 'Request Timeout' });
        });

        req.write(payload);
        req.end();
    });
}

async function runIndexNow() {
    console.log('═'.repeat(65));
    console.log('⚡ INDEXNOW INSTANT DISCOVERY PROTOCOL (BING, COPILOT, YANDEX)');
    console.log(`🌐 Target: https://${HOST}`);
    console.log('═'.repeat(65) + '\n');

    const cache = loadCache();
    const allUrls = getUrls();
    const isForce = process.argv.includes('--force');
    const isStatus = process.argv.includes('--status');

    const submittedSet = new Set(cache.submittedUrls);
    const pendingUrls = isForce ? allUrls : allUrls.filter(u => !submittedSet.has(u));

    console.log(`📡 Sitemaps Architecture: ${allUrls.length} total URLs`);
    console.log(`📦 Previously Submitted  : ${submittedSet.size} URLs`);
    console.log(`📋 Pending Submission    : ${pendingUrls.length} URLs`);
    if (cache.lastRun) {
        console.log(`🕒 Last Submission Run   : ${cache.lastRun}`);
    }

    if (isStatus) {
        console.log('\n🔍 IndexNow Status Check Complete.');
        return;
    }

    if (pendingUrls.length === 0) {
        console.log('\n✨ All URLs have already been submitted to IndexNow! Use --force to re-broadcast.');
        return;
    }

    // Submit in chunks of 10,000 (IndexNow API limit)
    const BATCH_SIZE = 10000;
    let totalSuccess = 0;

    for (let i = 0; i < pendingUrls.length; i += BATCH_SIZE) {
        const chunk = pendingUrls.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(pendingUrls.length / BATCH_SIZE);
        console.log(`\nSubmitting batch ${batchNum}/${totalBatches} (${chunk.length} URLs)...`);

        // Try api.indexnow.org first, then bing.com as fallback
        let res = await submitBatch('api.indexnow.org', chunk);
        if (res.status !== 200 && res.status !== 202) {
            console.log(`  ⚠️ api.indexnow.org returned status ${res.status}. Falling back to www.bing.com...`);
            res = await submitBatch('www.bing.com', chunk);
        }

        if (res.status === 200 || res.status === 202) {
            console.log(`  ✅ Batch ${batchNum} successfully submitted (Status: ${res.status})!`);
            totalSuccess += chunk.length;
            chunk.forEach(u => submittedSet.add(u));
            cache.submittedUrls = Array.from(submittedSet);
            cache.totalSubmitted = cache.submittedUrls.length;
            cache.lastRun = new Date().toISOString();
            saveCache(cache);
        } else {
            console.log(`  ⚠️ Batch ${batchNum} response: Status ${res.status} (${res.body || res.error || 'Unknown Error'})`);
        }
    }

    console.log('\n' + '═'.repeat(65));
    console.log(`🎉 IndexNow Cycle Complete: ${totalSuccess} URLs newly broadcasted.`);
    console.log('═'.repeat(65) + '\n');
}

module.exports = { runIndexNow };

if (require.main === module) {
    runIndexNow().catch(console.error);
}
