export const API_ROUTES = {
  PHOTOS: "/api/photos",
  TELEGRAM_WEBHOOK: "/api/telegram/webhook",
  MEDIA: "/media",
  PHOTOS_STREAM: "/api/photos/stream"
} as const;

export const PAGINATION_LIMIT = 24;
export const MAX_UPLOAD_SIZE_BYTES = 15 * 1024 * 1024;

export const SIDEBAR_ITEMS = [
  {
    id: "photos",
    label: "Фотографии",
    href: "/",
    active: true
  }
] as const;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric"
};
