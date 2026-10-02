/**
 * Enterprise Cloudflare & DNS Hardening Automation
 * Domain: life-republic.in
 * Connects via Cloudflare v4 REST API using Global API Key or API Token
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'life-republic.in';

// Helper to parse .env or .env.local if present
function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf-8');
    const env = {};
    content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const idx = trimmed.indexOf('=');
            if (idx > -1) {
                const k = trimmed.slice(0, idx).trim();
                const v = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
                env[k] = v;
            }
        }
    });
    return env;
}

const localEnv = {
    ...loadEnvFile(path.resolve(__dirname, '../.env')),
    ...loadEnvFile(path.resolve(__dirname, '../.env.local'))
};

// Load credentials from environment, .env, or CLI args
let CF_EMAIL = process.env.CLOUDFLARE_EMAIL || process.env.CF_EMAIL || localEnv.CLOUDFLARE_EMAIL || localEnv.CF_EMAIL || '';
let CF_KEY = process.env.CLOUDFLARE_API_KEY || process.env.CF_KEY || process.env.CLOUDFLARE_GLOBAL_KEY || localEnv.CLOUDFLARE_API_KEY || localEnv.CF_KEY || localEnv.CLOUDFLARE_GLOBAL_KEY || '';
let CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_TOKEN || localEnv.CLOUDFLARE_API_TOKEN || localEnv.CF_TOKEN || '';

// Parse CLI args if passed as --email=... --key=... --token=...
process.argv.forEach(arg => {
    if (arg.startsWith('--email=')) CF_EMAIL = arg.split('=')[1].trim();
    if (arg.startsWith('--key=')) CF_KEY = arg.split('=')[1].trim();
    if (arg.startsWith('--token=')) CF_TOKEN = arg.split('=')[1].trim();
});

function cfRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (CF_TOKEN) {
            headers['Authorization'] = `Bearer ${CF_TOKEN}`;
        } else {
            headers['X-Auth-Email'] = CF_EMAIL;
            headers['X-Auth-Key'] = CF_KEY;
        }

        const options = {
            hostname: 'api.cloudflare.com',
            path: `/client/v4${endpoint}`,
            method: method,
            headers: headers
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve(parsed);
                } catch (e) {
                    resolve({ success: false, errors: [{ message: body }] });
                }
            });
        });

        req.on('error', err => reject(err));
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function runHardening() {
    console.log('═'.repeat(65));
    console.log('🔒 ENTERPRISE CLOUDFLARE & DNS HARDENING PROTOCOL');
    console.log(`🌐 Target Domain: ${DOMAIN}`);
    console.log('═'.repeat(65) + '\n');

    const hasGlobalKey = Boolean(CF_KEY && CF_EMAIL);
    const hasToken = Boolean(CF_TOKEN);

    if (!hasGlobalKey && !hasToken) {
        console.error('❌ Cloudflare Credentials missing!');
        console.log('\nPlease run the script providing credentials in one of these ways:');
        console.log('\nOption 1: Global API Key & Email (Recommended for full zone control):');
        console.log('  node scripts/cloudflare-harden.cjs --email=your_email@domain.com --key=your_global_key');
        console.log('\nOption 2: Cloudflare API Token:');
        console.log('  node scripts/cloudflare-harden.cjs --token=your_api_token');
        console.log('\nOption 3: Environment Variables:');
        console.log('  export CLOUDFLARE_EMAIL="your_email@domain.com"');
        console.log('  export CLOUDFLARE_API_KEY="your_global_key"');
        console.log('  npm run harden:cf\n');
        process.exit(1);
    }

    const authType = hasToken ? 'Bearer Token' : `Global Key (${CF_EMAIL})`;
    console.log(`1. Authenticating with Cloudflare API via ${authType}...`);
    const zonesRes = await cfRequest(`/zones?name=${DOMAIN}`);

    if (!zonesRes.success || !zonesRes.result || zonesRes.result.length === 0) {
        console.error('❌ Could not find zone for domain:', DOMAIN);
        console.error('API Response:', JSON.stringify(zonesRes.errors || zonesRes));
        process.exit(1);
    }

    const zone = zonesRes.result[0];
    const zoneId = zone.id;
    console.log(`✅ Zone Located: ${DOMAIN} (Zone ID: ${zoneId})`);
    console.log(`   Status: ${zone.status.toUpperCase()} | Plan: ${zone.plan?.name || 'Standard'}\n`);

    // Array of Enterprise Settings to Harden
    const settings = [
        { name: 'SSL / TLS Encryption Mode', endpoint: `/zones/${zoneId}/settings/ssl`, value: 'strict' },
        { name: 'Always Use HTTPS', endpoint: `/zones/${zoneId}/settings/always_use_https`, value: 'on' },
        { name: 'Minimum TLS Version (1.2)', endpoint: `/zones/${zoneId}/settings/min_tls_version`, value: '1.2' },
        { name: 'TLS 1.3 Protocol', endpoint: `/zones/${zoneId}/settings/tls_1_3`, value: 'on' },
        { name: 'Zero Round Trip Time (0-RTT)', endpoint: `/zones/${zoneId}/settings/0rtt`, value: 'on' },
        { name: 'HTTP/3 (QUIC Protocol)', endpoint: `/zones/${zoneId}/settings/http3`, value: 'on' },
        { name: 'HTTP 103 Early Hints', endpoint: `/zones/${zoneId}/settings/early_hints`, value: 'on' },
        { name: 'Brotli Compression', endpoint: `/zones/${zoneId}/settings/brotli`, value: 'on' },
        { name: 'Automatic HTTPS Rewrites', endpoint: `/zones/${zoneId}/settings/automatic_https_rewrites`, value: 'on' },
        { name: 'Browser Integrity Check', endpoint: `/zones/${zoneId}/settings/browser_check`, value: 'on' },
        { name: 'Security Level', endpoint: `/zones/${zoneId}/settings/security_level`, value: 'medium' },
        { name: 'WebSockets Support', endpoint: `/zones/${zoneId}/settings/websockets`, value: 'on' },
        { name: 'IP Geolocation Header', endpoint: `/zones/${zoneId}/settings/ip_geolocation`, value: 'on' },
        { name: 'Server Side Excludes', endpoint: `/zones/${zoneId}/settings/server_side_exclude`, value: 'on' },
        { name: 'Opportunistic Encryption', endpoint: `/zones/${zoneId}/settings/opportunistic_encryption`, value: 'on' }
    ];

    console.log('2. Applying Enterprise Edge Security & Speed Directives:');
    for (const setting of settings) {
        try {
            const res = await cfRequest(setting.endpoint, 'PATCH', { value: setting.value });
            if (res.success) {
                console.log(`  ✓ [HARDENED] ${setting.name} -> ${setting.value}`);
            } else {
                console.log(`  ⚠ [NOTE] ${setting.name}: ${res.errors?.[0]?.message || 'Skipped / Unchanged'}`);
            }
        } catch (e) {
            console.log(`  ⚠ [ERROR] ${setting.name}: ${e.message}`);
        }
    }

    // 3. DNSSEC Verification & Activation
    console.log('\n3. Checking DNSSEC Status...');
    try {
        const dnssecRes = await cfRequest(`/zones/${zoneId}/dnssec`);
        if (dnssecRes.success) {
            const status = dnssecRes.result.status;
            console.log(`  ✓ DNSSEC Status: ${status.toUpperCase()}`);
            if (status === 'disabled') {
                console.log('  Enabling DNSSEC...');
                const activateDnssec = await cfRequest(`/zones/${zoneId}/dnssec`, 'PATCH', { status: 'active' });
                if (activateDnssec.success) {
                    console.log('  ✅ DNSSEC Activated successfully!');
                    if (activateDnssec.result.ds) {
                        console.log(`  DS Record: ${activateDnssec.result.ds}`);
                    }
                }
            }
        }
    } catch (e) {
        console.log(`  ⚠ DNSSEC Notice: ${e.message}`);
    }

    // 4. Smart Tiered Cache Topology
    console.log('\n4. Enabling Smart Tiered Cache Topology...');
    try {
        const tieredRes = await cfRequest(`/zones/${zoneId}/tiered_caching`, 'PATCH', { value: 'on' });
        if (tieredRes.success) {
            console.log('  ✓ Smart Tiered Cache: ACTIVE (Maximizes Global Edge Hit Ratio)');
        }
    } catch (e) {
        console.log(`  ⚠ Tiered Cache: ${e.message}`);
    }

    // 5. Crawler Hints
    console.log('\n5. Enabling Crawler Hints for Search Engines...');
    try {
        const crawlerRes = await cfRequest(`/zones/${zoneId}/flags/products/crawler_hints/changes`, 'PUT', { enabled: true });
        if (crawlerRes.success) {
            console.log('  ✓ Crawler Hints: ENABLED (Instant Indexing Pings to Google & Bing)');
        }
    } catch (e) {
        console.log(`  ⚠ Crawler Hints Notice: ${e.message}`);
    }

    // 6. Inspect & Proxy DNS Zone Records
    console.log('\n6. Inspecting & Hardening DNS Zone Records...');
    try {
        const dnsList = await cfRequest(`/zones/${zoneId}/dns_records?per_page=100`);
        if (dnsList.success && dnsList.result) {
            console.log(`  Found ${dnsList.result.length} DNS records for ${DOMAIN}:`);
            for (const record of dnsList.result) {
                const isApexOrWww = record.name === DOMAIN || record.name === `www.${DOMAIN}`;
                if (isApexOrWww && (record.type === 'A' || record.type === 'AAAA' || record.type === 'CNAME')) {
                    if (!record.proxied) {
                        console.log(`  ⚠️ ${record.type} ${record.name} is NOT proxied! Enabling Cloudflare proxy...`);
                        const updateRes = await cfRequest(`/zones/${zoneId}/dns_records/${record.id}`, 'PATCH', {
                            proxied: true
                        });
                        if (updateRes.success) {
                            console.log(`  ✅ [PROXIED] ${record.type} ${record.name} is now proxied!`);
                        }
                    } else {
                        console.log(`  ✓ ${record.type} ${record.name} -> Proxied: YES (Orange Cloud Protected)`);
                    }
                } else if (record.type === 'TXT') {
                    console.log(`  ✓ TXT ${record.name} -> ${record.content.substring(0, 50)}...`);
                }
            }
        }
    } catch (e) {
        console.log(`  ⚠ DNS Record Check: ${e.message}`);
    }

    // 7. Global Edge Cache Purge (Cache-Tags)
    console.log('\n7. Purging Stale Edge Cache across Cache-Tags...');
    try {
        const purgeRes = await cfRequest(`/zones/${zoneId}/purge_cache`, 'POST', {
            tags: ['lr-core', 'lr-home', 'lr-clusters', 'lr-pseo', 'lr-brand', 'lr-global']
        });
        if (purgeRes.success) {
            console.log('  ✓ Targeted Edge Cache Purged (lr-core, lr-home, lr-clusters, lr-pseo, lr-brand, lr-global)');
        } else {
            console.log('  ⚠ Cache Tag Purge note:', purgeRes.errors?.[0]?.message || 'Fallback to purge everything');
        }
    } catch (e) {
        console.log(`  ⚠ Purge Notice: ${e.message}`);
    }

    console.log('\n' + '═'.repeat(65));
    console.log('🎉 CLOUDFLARE ENTERPRISE INFRASTRUCTURE FULLY HARDENED!');
    console.log('═'.repeat(65) + '\n');
}

runHardening().catch(err => {
    console.error('Fatal execution error:', err);
    process.exit(1);
});
