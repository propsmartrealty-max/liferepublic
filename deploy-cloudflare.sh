#!/bin/bash
echo "🚀 Initiating Cloudflare Full-Stack Deployment"

# Step 1: Login to Cloudflare (Interactive)
echo "------------------------------------------------"
echo "1. Authenticating with Cloudflare..."
echo "Please follow the browser prompt to log in."
npx wrangler login
echo "------------------------------------------------"

# Step 2: Provision Backend Resources
cd worker
echo "2. Provisioning D1 Database and R2 Storage..."
# Attempt to create DB. If it exists, this might error but it's fine.
npx wrangler d1 create lr-d1-db
echo "⚠️  IMPORTANT: Copy the 'database_id' from the output above and update worker/wrangler.toml before proceeding!"

# Create R2 bucket
npx wrangler r2 bucket create lr-storage

# Apply Schema to remote D1 Database
echo "3. Applying SQLite Schema to Production D1..."
npx wrangler d1 execute lr-d1-db --remote --file=schema.sql

# Insert initial admin account
echo "4. Seeding Admin Account..."
npx wrangler d1 execute lr-d1-db --remote --command="INSERT INTO admins (email, password_hash) VALUES ('admin@life-republic.in', 'admin123');"

# Step 3: Deploy Worker API
echo "5. Deploying Cloudflare Worker API..."
npx wrangler deploy
cd ..
echo "------------------------------------------------"

# Step 4: Build & Deploy Frontend to Cloudflare Pages
echo "6. Building React SPA for Cloudflare Pages..."
npm run build:client

echo "7. Deploying Frontend to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name life-republic

echo "✅ Full-Stack Cloudflare Deployment Complete!"
