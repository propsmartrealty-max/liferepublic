#!/usr/bin/env node
/**
 * Autonomous Background Daemon for Google Indexing Engine
 * 
 * Runs continuously in the background.
 * Periodically triggers Google Indexing Engine every 30 minutes.
 * Automatically catches quota resets (Midnight PT / 12:30 IST) and pushes batches.
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

function runCycle() {
    log('⚡ Starting automated Google Indexing cycle...');
    const scriptPath = path.resolve(__dirname, 'google-index.cjs');

    const proc = spawn('node', [scriptPath], {
        cwd: path.resolve(__dirname, '..'),
        env: process.env,
        stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', chunk => { stdout += chunk; });
    proc.stderr.on('data', chunk => { stderr += chunk; });

    proc.on('close', code => {
        log(`Cycle completed with exit code ${code}`);
        if (stdout) {
            fs.appendFileSync(LOG_FILE, `--- STDOUT ---\n${stdout}\n`);
            // Log key lines
            const summaryMatch = stdout.match(/URLs Published Successfully : (\d+)/);
            if (summaryMatch) {
                log(`Published in this cycle: ${summaryMatch[1]} URLs`);
            }
        }
        if (stderr) {
            fs.appendFileSync(LOG_FILE, `--- STDERR ---\n${stderr}\n`);
        }
        log(`Next cycle scheduled in 30 minutes.\n`);
    });

    proc.on('error', err => {
        log(`❌ Error launching cycle: ${err.message}`);
    });
}

// Initial cycle
log('🚀 Sovereign Auto-Indexer Daemon initialized.');
runCycle();

// Recurring interval
setInterval(runCycle, CHECK_INTERVAL_MS);
