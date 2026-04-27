#!/bin/sh
set -e

SERVER=${SERVER:-"ubuntu@213.155.21.43"}

# Read NEXT_PUBLIC_* from .env.local for the build
export $(grep -v '^#' .env.local | grep 'NEXT_PUBLIC' | xargs)

echo "Building Docker image..."
docker build \
  --build-arg NEXT_PUBLIC_APP_URL="${NEXT_PUBLIC_APP_URL:-https://linkedhire.io}" \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  --build-arg NEXT_PUBLIC_POSTHOG_KEY="$NEXT_PUBLIC_POSTHOG_KEY" \
  --build-arg NEXT_PUBLIC_POSTHOG_HOST="$NEXT_PUBLIC_POSTHOG_HOST" \
  -t linkedhire:latest .

echo "Saving image to linkedhire.tar.gz..."
docker save linkedhire:latest | gzip > linkedhire.tar.gz

echo "Uploading to $SERVER..."
scp linkedhire.tar.gz $SERVER:~/linkedhire/

echo ""
echo "Готово! Теперь на сервере запусти: ./deploy.sh"
