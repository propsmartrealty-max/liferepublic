#!/usr/bin/env node
/**
 * Automated IndexNow Submitter for Bing, Microsoft Copilot, Yandex & Seznam
 * Domain: life-republic.in
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'life-republic.in';
const KEY = 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');

// Extract URLs from sitemaps
function getUrls() {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error('Sitemap not found at', SITEMAP_PATH);
        return [];
    }

    const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const urls = new Set();
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

    return Array.from(urls);
}

function submitBatch(batch) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: batch
        });

        const req = https.request({
            hostname: 'api.indexnow.org',
            path: '/indexnow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(payload)
            }
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

        req.write(payload);
        req.end();
    });
}

async function runIndexNow() {
    console.log('═'.repeat(65));
    console.log('⚡ INDEXNOW INSTANT DISCOVERY PROTOCOL (BING & MICROSOFT COPILOT)');
    console.log(`🌐 Target: https://${HOST}`);
    console.log('═'.repeat(65) + '\n');

    const urls = getUrls();
    console.log(`📡 Found ${urls.length} URLs across sitemap ecosystem.`);

    if (urls.length === 0) {
        console.log('No URLs to submit.');
        return;
    }

    // Submit in chunks of 10,000 (IndexNow API limit)
    const BATCH_SIZE = 10000;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const chunk = urls.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        console.log(`Submitting batch ${batchNum} (${chunk.length} URLs) to api.indexnow.org...`);

        const res = await submitBatch(chunk);
        if (res.status === 200 || res.status === 202) {
            console.log(`✅ Batch ${batchNum} successfully submitted (Status: ${res.status})!`);
        } else {
            console.log(`⚠️ Batch ${batchNum} response: Status ${res.status} (${res.body || res.error || 'OK'})`);
        }
    }

    console.log('\n═'.repeat(65));
    console.log('🎉 IndexNow Submission Completed! Bing & Copilot informed.');
    console.log('═'.repeat(65) + '\n');
}

runIndexNow().catch(console.error);
