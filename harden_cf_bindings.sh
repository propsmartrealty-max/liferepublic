ZONE_ID="f569e34d7298804bc51a8dcd6c50685d"
API_KEY="81c93c067fa8ead132b47b91ee37624179803"
EMAIL="vikas.yewle@gmail.com"

# Array of settings and values
settings=(
    "security_level:high"
    "browser_check:on"
    "always_online:on"
    "early_hints:on"
    "brotli:on"
    "development_mode:off"
    "ipv6:on"
    "websockets:on"
    "opportunistic_encryption:on"
    "automatic_https_rewrites:on"
)

echo "Initiating Cloudflare Enterprise Binding Hardening..."

for entry in "${settings[@]}"; do
    key="${entry%%:*}"
    value="${entry##*:}"
    
    echo "Setting $key to $value..."
    curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/$key" \
         -H "X-Auth-Email: $EMAIL" \
         -H "X-Auth-Key: $API_KEY" \
         -H "Content-Type: application/json" \
         --data "{\"value\":\"$value\"}" > /dev/null
done

# Minify needs a JSON object
echo "Setting minify to on..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/minify" \
     -H "X-Auth-Email: $EMAIL" \
     -H "X-Auth-Key: $API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"value":{"css":"on","html":"on","js":"on"}}' > /dev/null

echo "Cloudflare Bindings Hardened successfully."
