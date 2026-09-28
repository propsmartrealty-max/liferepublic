#!/bin/bash
ZONE="f569e34d7298804bc51a8dcd6c50685d"
EMAIL="vikas.yewle@gmail.com"
KEY="81c93c067fa8ead132b47b91ee37624179803"

update_setting() {
  echo "Updating $1 to $2..."
  curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/$1" \
    -H "X-Auth-Email: $EMAIL" \
    -H "X-Auth-Key: $KEY" \
    -H "Content-Type: application/json" \
    --data "{\"value\":\"$2\"}" > /dev/null
}

update_setting "always_use_https" "on"
update_setting "brotli" "on"
update_setting "early_hints" "on"
update_setting "security_level" "high"
update_setting "tls_1_3" "on"
update_setting "automatic_https_rewrites" "on"
update_setting "browser_cache_ttl" 31536000

echo "Updating minify..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/minify" \
  -H "X-Auth-Email: $EMAIL" \
  -H "X-Auth-Key: $KEY" \
  -H "Content-Type: application/json" \
  --data '{"value":{"css":"on","html":"on","js":"on"}}' > /dev/null

echo "Cloudflare DNS & Performance Hardening Complete."
