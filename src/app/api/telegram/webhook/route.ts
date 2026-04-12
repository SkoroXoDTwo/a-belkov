import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/config/env";
import { ingestTelegramUpdate } from "@/server/telegram/ingest";
import { sendTelegramMessage } from "@/server/telegram/telegramClient";
import type { TelegramUpdate } from "@/server/telegram/types";

function isAuthorized(request: NextRequest): boolean {
  if (!env.TELEGRAM_WEBHOOK_SECRET) {
    return true;
  }

  const headerSecret = request.headers.get("x-telegram-bot-api-secret-token");
  return headerSecret === env.TELEGRAM_WEBHOOK_SECRET;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as TelegramUpdate;

  try {
    await ingestTelegramUpdate(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";

    const updateMessage = payload.message ?? payload.channel_post;
    if (updateMessage?.chat?.id) {
      try {
        await sendTelegramMessage(
          updateMessage.chat.id,
          "Не удалось загрузить фото 😔",
          updateMessage.message_id
        );
      } catch {
        // Ignore secondary notification failures.
      }
    }

    return NextResponse.json({ message }, { status: 400 });
  }
}
