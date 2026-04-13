#!/bin/sh
set -eu

echo "[entrypoint] Applying Prisma migrations"
npx prisma migrate deploy

echo "[entrypoint] Starting Next.js"
exec npm run start
