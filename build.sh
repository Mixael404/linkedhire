#!/bin/sh
set -e

IMAGE="mikhailslutskii/linkedhire:latest"

# Read NEXT_PUBLIC_* from .env.local for the build
export $(grep -v '^#' .env.local | grep 'NEXT_PUBLIC' | xargs)

echo "Building Docker image..."
docker build \
  --build-arg NEXT_PUBLIC_APP_URL="https://linkedhire.io" \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  --build-arg NEXT_PUBLIC_POSTHOG_KEY="$NEXT_PUBLIC_POSTHOG_KEY" \
  --build-arg NEXT_PUBLIC_POSTHOG_HOST="$NEXT_PUBLIC_POSTHOG_HOST" \
  --build-arg NEXT_PUBLIC_UMAMI_URL="$NEXT_PUBLIC_UMAMI_URL" \
  --build-arg NEXT_PUBLIC_UMAMI_WEBSITE_ID="$NEXT_PUBLIC_UMAMI_WEBSITE_ID" \
  -t "$IMAGE" .

echo "Pushing to Docker Hub..."
docker push "$IMAGE"

echo ""
echo "Готово! Теперь на сервере запусти: ./deploy.sh"
