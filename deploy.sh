#!/bin/sh
set -e

DC="docker compose --env-file .env.local"

if [ ! -f .env.local ]; then
  echo "Файл .env.local не найден. Создаю из .env.example..."
  cp .env.example .env.local
  echo "Заполни .env.local и запусти скрипт снова."
  exit 1
fi

echo "Pulling latest image..."
$DC pull app

echo "Starting..."
$DC up -d

echo ""
$DC ps
echo ""
echo "Логи: docker compose --env-file .env.local logs -f"
