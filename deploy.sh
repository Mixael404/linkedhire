#!/bin/sh
set -e

DC="docker compose --env-file .env.local"

if [ ! -f .env.local ]; then
  echo "Файл .env.local не найден. Создаю из .env.example..."
  cp .env.example .env.local
  echo "Заполни .env.local и запусти скрипт снова."
  exit 1
fi

if [ ! -f linkedhire.tar.gz ]; then
  echo "Файл linkedhire.tar.gz не найден. Сначала запусти build.sh локально."
  exit 1
fi

echo "Loading Docker image..."
docker load < linkedhire.tar.gz

echo "Starting..."
$DC up -d

echo ""
$DC ps
echo ""
echo "Логи: docker compose --env-file .env.local logs -f"
