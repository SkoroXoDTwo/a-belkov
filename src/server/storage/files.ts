import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const uploadsDir = path.join(process.cwd(), "uploads");

async function ensureUploadsDir(): Promise<void> {
  await fs.mkdir(uploadsDir, { recursive: true });
}

export async function saveImageFromBuffer(
  buffer: Buffer,
  extension: string
): Promise<string> {
  await ensureUploadsDir();

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const fullPath = path.join(uploadsDir, fileName);
  await fs.writeFile(fullPath, buffer);
  return fileName;
}

export async function readImage(fileName: string): Promise<Buffer> {
  const filePath = path.join(uploadsDir, fileName);
  return fs.readFile(filePath);
}
