#!/bin/bash
for i in {1..30}; do
  STATUS=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/fbb39d51325df0f234958e2ec8e9c989/pages/projects/liferepublic/deployments" -H "X-Auth-Email: vikas.yewle@gmail.com" -H "X-Auth-Key: 81c93c067fa8ead132b47b91ee37624179803" | grep -A 20 '"environment": "production"')
  if [[ $STATUS == *"\"status\": \"success\""* ]]; then
    echo "DEPLOYMENT SUCCESSFUL"
    exit 0
  fi
  echo "Deploying..."
  sleep 4
done
