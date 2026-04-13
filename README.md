# foto

Минималистичная персональная веб-галерея с загрузкой фотографий через Telegram-бота.

## Что уже реализовано
- Публичная лента фотографий в формате плиток.
- Левый sidebar (MVP: раздел "Фотографии").
- Карточка фото: изображение + подпись + дата.
- Загрузка фото через Telegram webhook.
- Локальное хранение изображений в `./uploads`.
- PostgreSQL + Prisma для метаданных.
- Архитектура с `styled-components`, токенами темы, API-клиентом и декомпозицией компонентов.

## Технологии
- Next.js (App Router)
- React
- TypeScript
- styled-components
- PostgreSQL
- Prisma
- Vitest

## Требования
- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Быстрый старт

1. Установить зависимости:
```bash
npm install
```

2. Скопировать env:
```bash
cp .env.example .env
```

3. Отредактировать `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/foto?schema=public"
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_ALLOWED_CHAT_IDS="123456789"
TELEGRAM_WEBHOOK_SECRET="your-random-secret"
APP_BASE_URL="http://localhost:3000"
```

4. Сгенерировать Prisma client:
```bash
npx prisma generate
```

5. Применить миграцию:
```bash
npx prisma migrate dev --name init
```

6. Запустить dev сервер:
```bash
npm run dev
```

Сайт будет доступен на `http://localhost:3000`.

## Продакшн запуск

```bash
npm run build
npm run start
```

## Запуск через Docker + домен + HTTPS (рекомендуется для сервера)

1. Установить Docker и Compose plugin на Ubuntu:

```bash
apt update
apt install -y docker.io docker-compose-plugin
systemctl enable --now docker
```

2. Подготовить env для контейнеров:

```bash
cp .env.docker.example .env.docker
```

Отредактировать `.env.docker`:
- `POSTGRES_PASSWORD` (обязательно сменить);
- `DATABASE_URL` (должен совпадать с `POSTGRES_*` и хостом `db`);
- `DOMAIN` (твой домен, например `gallery.example.com`);
- `ACME_EMAIL` (email для Let's Encrypt);
- `APP_BASE_URL` (должен быть `https://<DOMAIN>`);
- Telegram-переменные при необходимости.

3. Проверить DNS и порты:
- A-запись домена должна указывать на IP сервера.
- Входящие порты `80` и `443` должны быть открыты.

4. Запустить контейнеры:

```bash
docker compose up -d --build
```

5. Проверить статус:

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f caddy
```

Приложение будет доступно на `https://<DOMAIN>`.

Что важно:
- Prisma миграции применяются автоматически при старте контейнера `app`.
- HTTPS-сертификат выпускается и обновляется автоматически через Caddy (Let's Encrypt).
- Изображения сохраняются в Docker volume `foto_uploads` и не теряются при перезапуске.
- Данные PostgreSQL сохраняются в Docker volume `foto_db_data`.

## Настройка Telegram webhook

1. Создать бота через BotFather и получить токен.
2. Указать `TELEGRAM_BOT_TOKEN` в `.env.docker`.
3. (Рекомендуется) указать `TELEGRAM_WEBHOOK_SECRET`.
4. Добавить свой Telegram `chat_id` в `TELEGRAM_ALLOWED_CHAT_IDS`.
5. Убедиться, что сайт открывается по `https://<DOMAIN>`.
6. Выполнить запрос установки webhook:

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"<PUBLIC_URL>/api/telegram/webhook\",\"secret_token\":\"<TELEGRAM_WEBHOOK_SECRET>\"}"
```

7. Проверить статус webhook:

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```

## Как загружать фото
- Отправь боту фото.
- Добавь подпись в caption сообщения (это текст карточки).
- Фотография появится в веб-галерее после обработки webhook.

## Структура проекта

```text
src/
  app/
    api/
    media/
    layout.tsx
    page.tsx
  components/
    common/
    layout/
    photos/
  entities/
    photo/
  server/
    db/
    photos/
    storage/
    telegram/
  shared/
    api/
    config/
    styles/
```

## Команды

```bash
npm run dev        # локальная разработка
npm run build      # production build
npm run start      # запуск production
npm run test       # запуск тестов
npm run test:watch # тесты в watch-режиме
```

## API

### `GET /api/photos`
Возвращает список фото:
```json
{
  "data": [
    {
      "id": "uuid",
      "caption": "My caption",
      "imageUrl": "/media/file.jpg",
      "takenAt": "2026-04-12T10:00:00.000Z"
    }
  ],
  "nextCursor": null
}
```

### `POST /api/telegram/webhook`
Принимает Telegram update, скачивает фото и сохраняет его.

### `GET /media/:filename`
Отдает сохраненное изображение из `./uploads`.

## Troubleshooting

### `DATABASE_URL is not configured`
- Убедись, что в `.env` указан `DATABASE_URL`.
- Перезапусти сервер после изменений env.

### Фото не появляются после отправки в Telegram
- Проверь `getWebhookInfo`, есть ли ошибки доставки.
- Убедись, что `TELEGRAM_ALLOWED_CHAT_IDS` содержит твой `chat_id`.
- Проверь, что отправляешь именно фото, а не документ.

### Ошибка `Unauthorized` на webhook
- Убедись, что `secret_token` в `setWebhook` совпадает с `TELEGRAM_WEBHOOK_SECRET`.

### 404 на `/media/...`
- Файл не был сохранен или удален.
- Проверь наличие файла в директории `./uploads`.
