ZONE_ID="f569e34d7298804bc51a8dcd6c50685d"
EMAIL="vikas.yewle@gmail.com"
KEY="81c93c067fa8ead132b47b91ee37624179803"

API="https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings"

# 1. Enable Always Use HTTPS
curl -s -X PATCH "$API/always_use_https" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":"on"}'

# 2. Enable Automatic HTTPS Rewrites
curl -s -X PATCH "$API/automatic_https_rewrites" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":"on"}'

# 3. Enable Brotli
curl -s -X PATCH "$API/brotli" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":"on"}'

# 4. Enable Early Hints
curl -s -X PATCH "$API/early_hints" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":"on"}'

# 5. Minify HTML/CSS/JS at the Edge
curl -s -X PATCH "$API/minify" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":{"html":"on","css":"on","js":"on"}}'

# 6. Set Browser Cache TTL to 1 year (respecting our headers)
curl -s -X PATCH "$API/browser_cache_ttl" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":31536000}'

# 7. Enable TLS 1.3
curl -s -X PATCH "$API/tls_1_3" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":"on"}'

# 8. WebP Image Resizing Optimization (if available on plan)
curl -s -X PATCH "$API/polish" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"value":"lossless"}'

# Purge Cache
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $KEY" -H "Content-Type: application/json" -d '{"purge_everything":true}'

echo "Cloudflare Edge Hardening Complete."
