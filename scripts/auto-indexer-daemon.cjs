#!/usr/bin/env node
/**
 * Hardened Autonomous Daemon for Google & IndexNow Search Indexing
 * 
 * Features:
 * - Pacific Time (PT) quota synchronization (Midnight PT / 12:30 PM IST rollover)
 * - Multi-engine orchestration: Google Indexing API + IndexNow Protocol
 * - Dynamic pool scaling: auto-detects new service accounts in service-accounts/*.json
 * - Intelligent sleep & quota preservation: eliminates wasteful 429 error spam
 * - Persistent logging in logs/auto-indexer.log
 * - Status inspection CLI: node scripts/auto-indexer-daemon.cjs --status
 * - Single-cycle CLI: node scripts/auto-indexer-daemon.cjs --once
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const LOG_DIR = path.resolve(__dirname, '../logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
const LOG_FILE = path.join(LOG_DIR, 'auto-indexer.log');

function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync(LOG_FILE, line);
    process.stdout.write(line);
}

const CHECK_INTERVAL_MS = 30 * 60 * 1000; // Check every 30 minutes

function runScript(scriptRelativePath, args = []) {
    return new Promise((resolve) => {
        const scriptPath = path.resolve(__dirname, scriptRelativePath);
        const scriptName = path.basename(scriptRelativePath);

        const proc = spawn('node', [scriptPath, ...args], {
            cwd: path.resolve(__dirname, '..'),
            env: process.env,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        proc.stdout.on('data', chunk => { stdout += chunk; });
        proc.stderr.on('data', chunk => { stderr += chunk; });

        proc.on('close', code => {
            if (stdout) fs.appendFileSync(LOG_FILE, `--- [${scriptName}] STDOUT ---\n${stdout}\n`);
            if (stderr) fs.appendFileSync(LOG_FILE, `--- [${scriptName}] STDERR ---\n${stderr}\n`);
            resolve({ code, stdout, stderr });
        });

        proc.on('error', err => {
            log(`❌ Error executing ${scriptName}: ${err.message}`);
            resolve({ code: 1, stdout: '', stderr: err.message });
        });
    });
}

async function runCycle() {
    log('⚡ Starting orchestrated Search Indexing cycle...');

    // 1. Run Ultra-Advanced Programmatic Google SEO Engine
    log('🔵 [Engine 1/1] Launching Ultra-Advanced Programmatic Google SEO Engine...');
    const ultraRes = await runScript('ultra-seo-engine.cjs');
    
    // Parse Ultra Engine summary
    const pubMatch = ultraRes.stdout.match(/Successfully pushed (\d+) high-priority URLs/);
    const gscMatch = ultraRes.stdout.match(/GSC Feeds Active:\s*(\d+\/\d+)/);
    const oppMatch = ultraRes.stdout.match(/Found (\d+) high-opportunity queries/);

    if (oppMatch) {
        log(`🎯 Opportunity Engine: Discovered ${oppMatch[1]} high-opportunity queries queued for Rank #1.`);
    }
    if (pubMatch) {
        log(`✅ Google Indexing Engine: Successfully pushed ${pubMatch[1]} high-priority URLs.`);
    }
    if (gscMatch) {
        log(`✨ GSC Feeds Active: ${gscMatch[1]} sitemaps live in Google Search Console.`);
    }

    log(`🏁 Ultra-Advanced cycle complete. Next scheduled evaluation in 30 minutes.\n`);
}

async function showStatus() {
    console.log('═'.repeat(75));
    console.log('🔍 AUTONOMOUS SEARCH INDEXER DAEMON - CALIBRATION STATUS');
    console.log('═'.repeat(75) + '\n');

    console.log('--- Google Indexing Engine ---');
    const googleStatus = await runScript('google-index.cjs', ['--status']);
    process.stdout.write(googleStatus.stdout);

    console.log('\n--- IndexNow Discovery Engine ---');
    const indexNowStatus = await runScript('indexnow.cjs', ['--status']);
    process.stdout.write(indexNowStatus.stdout);

    console.log('\n--- Google Search Console Sitemaps Engine ---');
    const gscStatus = await runScript('gsc-sync.cjs');
    process.stdout.write(gscStatus.stdout);

    console.log('\n--- Daemon Loop Configuration ---');
    console.log(`⏱️ Evaluation Cadence: Every 30 minutes (${CHECK_INTERVAL_MS / 60000} mins)`);
    console.log(`📁 Log File: ${LOG_FILE}`);
    console.log('═'.repeat(75) + '\n');
}

// CLI Execution Router
if (process.argv.includes('--status')) {
    showStatus().catch(console.error);
} else if (process.argv.includes('--once')) {
    runCycle().catch(console.error);
} else {
    log('🚀 Autonomous Search Indexer Daemon initialized and active.');
    runCycle();
    setInterval(runCycle, CHECK_INTERVAL_MS);
}
