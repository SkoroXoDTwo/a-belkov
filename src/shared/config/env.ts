function optional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const env = {
  DATABASE_URL: optional("DATABASE_URL"),
  TELEGRAM_BOT_TOKEN: optional("TELEGRAM_BOT_TOKEN"),
  TELEGRAM_ALLOWED_CHAT_IDS: optional("TELEGRAM_ALLOWED_CHAT_IDS"),
  TELEGRAM_WEBHOOK_SECRET: optional("TELEGRAM_WEBHOOK_SECRET"),
  APP_BASE_URL: optional("APP_BASE_URL", "http://localhost:3000")
};

export function assertDatabaseUrl(): string {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  return env.DATABASE_URL;
}

export function getAllowedChatIds(): Set<string> {
  if (!env.TELEGRAM_ALLOWED_CHAT_IDS.trim()) {
    return new Set();
  }

  return new Set(
    env.TELEGRAM_ALLOWED_CHAT_IDS.split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
}
