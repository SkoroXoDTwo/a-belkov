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

## Настройка Telegram webhook

1. Создать бота через BotFather и получить токен.
2. Указать `TELEGRAM_BOT_TOKEN` в `.env`.
3. (Рекомендуется) указать `TELEGRAM_WEBHOOK_SECRET`.
4. Добавить свой Telegram `chat_id` в `TELEGRAM_ALLOWED_CHAT_IDS`.
5. Поднять приложение на URL, доступный из интернета.
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
