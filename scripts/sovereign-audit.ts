import fs from 'fs';
import path from 'path';

console.log('🛡️  Starting Sovereign Anomaly & SEO Audit...');

const DIST_DIR = path.resolve(process.cwd(), 'dist');
let errorCount = 0;
let fileCount = 0;

function walkDir(dir: string, callback: (filepath: string) => void) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkDir(filepath, callback);
        } else if (filepath.endsWith('.html')) {
            callback(filepath);
        }
    }
}

const titleRegex = /<title>(.*?)<\/title>/gi;
const descRegex = /<meta name="description" content="(.*?)"/gi;
const canonicalRegex = /<link rel="canonical" href="(.*?)"/gi;
const schemaRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
const supabaseBrokenRegex = /https:\/\/tjgrjtdudzupmzkmjfiu\.supabase\.co\/storage\/v1\/object\/public\/projects\/[^'"\s`]+/i;
const lazyImageRegex = /<img\b(?![^>]*\bloading=["']lazy["'])[^>]*>/gi;

walkDir(DIST_DIR, (filepath) => {
    fileCount++;
    const content = fs.readFileSync(filepath, 'utf8');
    const relativePath = path.relative(DIST_DIR, filepath);

    if (
        relativePath === 'template.html' ||
        relativePath === 'app-shell.html' ||
        relativePath.startsWith('google') ||
        relativePath.startsWith('server/google')
    ) {
        return;
    }

    const titles = [...content.matchAll(titleRegex)];
    const descs = [...content.matchAll(descRegex)];
    const canonicals = [...content.matchAll(canonicalRegex)];
    const schemas = [...content.matchAll(schemaRegex)];

    if (titles.length === 0 || !titles[0][1].trim()) {
        console.error(`❌ [Anomaly: SEO] Missing or empty <title> in ${relativePath}`);
        errorCount++;
    } else if (titles.length > 1) {
        console.error(`❌ [Anomaly: SEO] Duplicate <title> tags (${titles.length}) in ${relativePath}`);
        errorCount++;
    }

    if (descs.length === 0 || !descs[0][1].trim()) {
        console.error(`❌ [Anomaly: SEO] Missing or empty meta description in ${relativePath}`);
        errorCount++;
    } else if (descs.length > 1) {
        console.error(`❌ [Anomaly: SEO] Duplicate meta description (${descs.length}) in ${relativePath}`);
        errorCount++;
    }

    if (canonicals.length === 0 || !canonicals[0][1].trim()) {
        console.error(`❌ [Anomaly: SEO] Missing canonical URL in ${relativePath}`);
        errorCount++;
    } else if (canonicals.length > 1) {
        console.error(`❌ [Anomaly: SEO] Conflicting/duplicate canonical tags (${canonicals.length}) in ${relativePath}`);
        errorCount++;
    }

    if (schemas.length === 0) {
        console.error(`❌ [Anomaly: SEO] Missing JSON-LD Schema (application/ld+json) in ${relativePath}`);
        errorCount++;
    } else {
        // Verify JSON validity and ensure zero duplicate AggregateRatings per entity @id
        const aggIds = new Set<string>();
        for (const s of schemas) {
            try {
                const parsed = JSON.parse(s[1]);
                const items = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
                for (const item of items) {
                    if (item && item.aggregateRating) {
                        const key = item['@id'] || item.name || item['@type'] || 'default';
                        if (aggIds.has(key)) {
                            console.error(`❌ [Anomaly: RichResults] Duplicate AggregateRating for "${key}" in ${relativePath}`);
                            errorCount++;
                        }
                        aggIds.add(key);
                    }
                }
            } catch (e: any) {
                console.error(`❌ [Anomaly: SEO] Malformed JSON-LD in ${relativePath}: ${e.message}`);
                errorCount++;
            }
        }
    }

    if (content.includes('noindex')) {
        console.error(`❌ [Anomaly: Indexing] Page contains noindex directive in ${relativePath}`);
        errorCount++;
    }

    if (supabaseBrokenRegex.test(content)) {
        console.error(`❌ [Anomaly: Structural] Dead Supabase image link detected in ${relativePath}`);
        errorCount++;
    }

    if (content.includes('<div id="root"></div>') || content.includes('<div id="root" data-reactroot=""></div>')) {
        console.warn(`⚠️  [Anomaly Warning] Empty React root detected in ${relativePath}. Check SSR rendering.`);
    }

    const nonLazyImages = [...content.matchAll(lazyImageRegex)];
    if (nonLazyImages.length > 3) {
        console.warn(`⚠️  [Core Web Vitals Warning] ${nonLazyImages.length} images found without loading="lazy" in ${relativePath}. High risk for LCP/Network inflation.`);
    }
});

console.log(`\n📊 Sovereign Audit Summary:`);
console.log(`   Files Scanned: ${fileCount}`);
console.log(`   Anomalies Detected: ${errorCount}`);

if (errorCount > 0) {
    console.error('\n🚨 CRITICAL: Sovereign Auditor detected architectural anomalies. Build aborted to prevent deployment of broken state.');
    process.exit(1);
} else {
    console.log('\n✅ Sovereign Audit Passed: Zero anomalies detected. System is cleared for deployment.');
    process.exit(0);
}
