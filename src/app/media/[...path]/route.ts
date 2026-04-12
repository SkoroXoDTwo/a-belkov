import { NextRequest, NextResponse } from "next/server";
import { readImage } from "@/server/storage/files";

function contentTypeByExtension(fileName: string): string {
  if (fileName.endsWith(".png")) {
    return "image/png";
  }
  if (fileName.endsWith(".webp")) {
    return "image/webp";
  }
  return "image/jpeg";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolved = await params;

  if (resolved.path.length !== 1) {
    return NextResponse.json({ message: "Invalid file path" }, { status: 400 });
  }

  const fileName = resolved.path[0];

  if (!fileName || fileName.includes("..") || fileName.includes("/")) {
    return NextResponse.json({ message: "Invalid file path" }, { status: 400 });
  }

  try {
    const data = await readImage(fileName);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentTypeByExtension(fileName.toLowerCase()),
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
