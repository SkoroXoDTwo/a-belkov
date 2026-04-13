# Руководство По Серверу (`a-belkov`)

## Назначение
Этот документ описывает, как развернуть и сопровождать проект на новом Ubuntu-сервере с Docker Compose и Caddy (HTTPS).

## Текущая Продакшн-Схема
- Путь проекта на сервере: `/opt/a-belkov`
- Домен: `a-belkov.ru`
- Реверс-прокси/TLS: Caddy (`80/443`, автосертификаты Let's Encrypt)
- Рантайм приложения: Next.js в Docker
- База данных: PostgreSQL в Docker
- Хранилище загрузок: Docker volume, смонтированный в `/app/uploads`

## Первичная Подготовка Сервера
```bash
apt update
apt install -y docker.io
systemctl enable --now docker
docker --version
docker compose version
```

## Размещение Проекта
```bash
mkdir -p /opt
cd /opt
git clone <PRIVATE_REPO_URL> a-belkov
cd /opt/a-belkov
```

## Обязательный Файл Env
Создай `/opt/a-belkov/.env.docker` (без кавычек вокруг значений, если они не нужны):

```env
POSTGRES_DB=a_belkov
POSTGRES_USER=admin
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD
DATABASE_URL=postgresql://admin:CHANGE_ME_STRONG_PASSWORD@db:5432/a_belkov?schema=public

DOMAIN=a-belkov.ru
ACME_EMAIL=admin@example.com
APP_BASE_URL=https://a-belkov.ru

TELEGRAM_BOT_TOKEN=
TELEGRAM_ALLOWED_CHAT_IDS=
TELEGRAM_WEBHOOK_SECRET=
```

Примечания:
- `POSTGRES_PASSWORD` и пароль в `DATABASE_URL` должны совпадать.
- Для простоты лучше не использовать `-` в имени БД (рекомендуется `a_belkov`).
- Не оставляй `DATABASE_URL=DATABASE_URL=...` (частая опечатка).

## DNS И Сеть
- `A`-запись домена должна указывать на публичный IPv4 сервера.
- Должны быть открыты входящие порты: `80/tcp`, `443/tcp`.

Проверка (опционально):
```bash
curl -4 ifconfig.me
nslookup a-belkov.ru
```

## Команды Деплоя
Из `/opt/a-belkov`:

```bash
docker compose up -d --build
docker compose ps
docker compose logs --tail=120 app
docker compose logs --tail=120 caddy
```

## Сброс БД (разрушительно)
Используй только если сломаны учетные данные/инициализация и данные можно потерять:

```bash
docker compose down -v
docker compose up -d --build
```

## Типовые Проблемы И Решения

### 502 Bad Gateway
Обычно контейнер `app` не запущен или постоянно падает.
```bash
docker compose ps
docker compose logs --tail=200 app
docker compose logs --tail=200 caddy
```

### Prisma auth error `P1000`
Учетные данные в `DATABASE_URL` не совпадают с пользователем/паролем Postgres при инициализации.
Исправь `.env.docker` и при необходимости пересоздай volume БД (`down -v`).

### Prisma client error `@prisma/client did not initialize yet`
Проверь, что `docker/entrypoint.sh` запускает `npx prisma generate` до миграций/старта.

### No migrations found
Если схема нужна, а миграций нет:
```bash
docker compose exec app npx prisma db push
```

### `api.telegram.org` timeout from server
Входящая обработка Telegram может не работать даже при корректном webhook.
Проверь:
```bash
curl -I --max-time 10 https://api.telegram.org
```
Если доступ блокируется, используй VPS в другом регионе или сетевой обход.

## Telegram Webhook
Устанавливай webhook после того, как сайт доступен по HTTPS:

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://a-belkov.ru/api/telegram/webhook\",\"secret_token\":\"<SECRET>\"}"
```

Проверка:
```bash
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
```

## CI/CD
Workflow: `.github/workflows/ci-deploy.yml`

При push в `master`:
1. `npm ci`
2. `npm run test`
3. `npm run build`
4. SSH-деплой на сервер:
   - `cd /opt/a-belkov`
   - `git pull --ff-only`
   - `docker compose up -d --build`

Обязательные GitHub secrets:
- `SSH_HOST`
- `SSH_PORT`
- `SSH_USER`
- `SSH_PRIVATE_KEY`

Важно:
- Если секреты настроены как *environment secrets*, в job нужно явно указать этот environment.
- Если секреты настроены как *repository secrets*, текущий workflow работает без изменений.
