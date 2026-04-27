#!/bin/sh
set -e

# ── Проверка .env ─────────────────────────────────────────────────────────────
if [ ! -f .env.local ]; then
  echo "Файл .env не найден. Создаю из .env.example..."
  cp .env.example .env
  echo "Заполни .env и запусти скрипт снова."
  exit 1
fi

# ── Обновление кода ───────────────────────────────────────────────────────────
echo "Pulling latest code..."
git pull

# ── Сборка и запуск ───────────────────────────────────────────────────────────
echo "Building and starting containers..."
docker compose up -d --build

# ── Проверка статуса ──────────────────────────────────────────────────────────
echo ""
docker compose ps
echo ""
echo "Готово. Логи: docker compose logs -f"
