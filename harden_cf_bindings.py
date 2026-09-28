import urllib.request
import json

ZONE_ID = "f569e34d7298804bc51a8dcd6c50685d"
API_KEY = "81c93c067fa8ead132b47b91ee37624179803"
EMAIL = "vikas.yewle@gmail.com"

headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": API_KEY,
    "Content-Type": "application/json"
}

def set_setting(setting_name, value):
    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/settings/{setting_name}"
    data = json.dumps({"value": value}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='PATCH')
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read())
            print(f"Set {setting_name} to {value}: {'Success' if res.get('success') else 'Failed'}")
    except Exception as e:
        print(f"Error setting {setting_name}: {e}")

# Enterprise Hardening Bindings
settings = {
    "security_level": "high",       # Challenge malicious actors automatically
    "browser_check": "on",          # Force browser integrity checks
    "always_online": "on",          # Keep site online even if origin goes down
    "early_hints": "on",            # Accelerate LCP delivery
    "brotli": "on",                 # Enable Brotli compression
    "minify": {"css": "on", "html": "on", "js": "on"}, # Global minification bindings
    "development_mode": "off",      # Ensure dev mode is off
    "ipv6": "on",                   # Enable IPv6 binding
    "websockets": "on",             # Allow WebSockets
    "opportunistic_encryption": "on", # Opportunistic Encryption
    "automatic_https_rewrites": "on"  # Force HTTP -> HTTPS
}

print("Initiating Cloudflare Enterprise Binding Hardening...")
for name, val in settings.items():
    set_setting(name, val)

print("Cloudflare Bindings Hardened.")
