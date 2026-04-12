# AGENTS Context

## Project Goal
`foto` is a personal web gallery for publishing photos as clean tile cards.  
Current MVP scope includes:
- public read-only gallery page;
- photo upload through Telegram bot messages;
- card metadata: photo image, caption, date.

## Architecture Rules
- Stack: Next.js (App Router) + PostgreSQL + Prisma.
- UI components live in `src/components` only.
- Styling uses `styled-components` with colocated styles (`*.styles.ts` next to component).
- Shared style infrastructure is centralized in `src/shared/styles`:
  - tokens (`tokens.ts`),
  - theme (`theme.ts`),
  - fonts (`fonts.ts`),
  - global styles (`globalStyles.ts`).
- Shared constants and runtime config are centralized in `src/shared/config`.
- HTTP access from UI goes through `src/shared/api/httpClient.ts` and typed clients (`photosApi`).
- Domain contracts live in `src/entities`.
- Server logic lives in `src/server` (DB repository, storage, Telegram ingest).

## Structure Conventions
- `src/app`: routes and API handlers.
- `src/components/layout`: page shell and sidebar.
- `src/components/photos`: photo-specific UI (grid/card/state).
- `src/components/common`: reusable visual primitives.
- Keep components decomposed and small, with explicit `types.ts` when useful.

## Security and Data Rules
- Gallery is public read-only.
- Telegram ingest is protected by:
  - optional webhook secret (`TELEGRAM_WEBHOOK_SECRET`),
  - allowlist of chat IDs (`TELEGRAM_ALLOWED_CHAT_IDS`).
- Uploaded images are stored locally in `/uploads` for MVP.

## Current MVP Status
- Implemented endpoints:
  - `GET /api/photos`
  - `POST /api/telegram/webhook`
  - `GET /media/:filename`
- Minimalist responsive UI is implemented.
- Vitest baseline tests are included for constants, mapping, theme tokens, and route behavior.

## Next Steps
- Add pagination/infinite scroll in UI.
- Add admin-only section for metadata editing.
- Migrate image storage from local disk to S3-compatible storage.
- Add search/filtering and optional extra sections in sidebar.
