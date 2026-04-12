import path from "node:path";
import { getAllowedChatIds } from "@/shared/config/env";
import { savePhoto } from "@/server/photos/service";
import { saveImageFromBuffer } from "@/server/storage/files";
import {
  downloadFileBuffer,
  getFilePath,
  sendTelegramMessage
} from "@/server/telegram/telegramClient";
import type { TelegramPhotoSize, TelegramUpdate } from "@/server/telegram/types";

function getLargestPhoto(photos: TelegramPhotoSize[]): TelegramPhotoSize {
  return photos.reduce((largest, current) => {
    const largestArea = largest.width * largest.height;
    const currentArea = current.width * current.height;
    return currentArea > largestArea ? current : largest;
  });
}

function getSafeExtension(filePath: string): string {
  const ext = path.extname(filePath).replace(".", "").toLowerCase();
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) {
    return ext === "jpeg" ? "jpg" : ext;
  }
  return "jpg";
}

export async function ingestTelegramUpdate(update: TelegramUpdate): Promise<void> {
  const message = update.message ?? update.channel_post;
  if (!message?.photo || message.photo.length === 0) {
    return;
  }

  const allowlist = getAllowedChatIds();
  if (allowlist.size > 0 && !allowlist.has(String(message.chat.id))) {
    throw new Error("Chat is not allowed");
  }

  const largestPhoto = getLargestPhoto(message.photo);
  const filePath = await getFilePath(largestPhoto.file_id);
  const extension = getSafeExtension(filePath);
  const buffer = await downloadFileBuffer(filePath);
  const storedPath = await saveImageFromBuffer(buffer, extension);

  await savePhoto({
    caption: message.caption?.trim() || null,
    imagePath: storedPath,
    takenAt: new Date()
  });

  try {
    await sendTelegramMessage(
      message.chat.id,
      "Фото загружено! ✅",
      message.message_id
    );
  } catch {
    // Do not fail webhook processing if confirmation message failed.
  }
}
