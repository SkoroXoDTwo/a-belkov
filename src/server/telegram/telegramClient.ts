import { env } from "@/shared/config/env";
import { MAX_UPLOAD_SIZE_BYTES } from "@/shared/config/constants";

interface TelegramGetFileResponse {
  ok: boolean;
  result?: {
    file_path?: string;
  };
  description?: string;
}

interface TelegramSendMessageResponse {
  ok: boolean;
  description?: string;
}

function getTokenOrThrow(): string {
  if (!env.TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  return env.TELEGRAM_BOT_TOKEN;
}

export async function getFilePath(fileId: string): Promise<string> {
  const token = getTokenOrThrow();
  const response = await fetch(
    `https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`
  );

  const payload = (await response.json()) as TelegramGetFileResponse;

  if (!response.ok || !payload.ok || !payload.result?.file_path) {
    throw new Error(payload.description ?? "Failed to get file path from Telegram");
  }

  return payload.result.file_path;
}

export async function downloadFileBuffer(filePath: string): Promise<Buffer> {
  const token = getTokenOrThrow();
  const response = await fetch(`https://api.telegram.org/file/bot${token}/${filePath}`);

  if (!response.ok) {
    throw new Error("Failed to download file from Telegram");
  }

  const contentLength = Number(response.headers.get("content-length") || "0");
  if (contentLength > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("File size limit exceeded");
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("File size limit exceeded");
  }

  return Buffer.from(arrayBuffer);
}

export async function sendTelegramMessage(
  chatId: number,
  text: string,
  replyToMessageId?: number
): Promise<void> {
  const token = getTokenOrThrow();
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_to_message_id: replyToMessageId
    })
  });

  const payload = (await response.json()) as TelegramSendMessageResponse;
  if (!response.ok || !payload.ok) {
    throw new Error(payload.description ?? "Failed to send Telegram message");
  }
}
