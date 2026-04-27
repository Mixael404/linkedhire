#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "Файл .env не найден. Создаю из .env.example..."
  cp .env.example .env
  echo "Заполни .env и запусти скрипт снова."
  exit 1
fi

if [ ! -f linkedhire.tar.gz ]; then
  echo "Файл linkedhire.tar.gz не найден. Сначала запусти build.sh локально."
  exit 1
fi

echo "Loading Docker image..."
docker load < linkedhire.tar.gz

echo "Starting..."
docker compose up -d

echo ""
docker compose ps
echo ""
echo "Логи: docker compose logs -f"
