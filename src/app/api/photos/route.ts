import { NextRequest, NextResponse } from "next/server";
import { PAGINATION_LIMIT } from "@/shared/config/constants";
import { getPhotos } from "@/server/photos/service";

export async function GET(request: NextRequest) {
  const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;
  const limitRaw = Number(request.nextUrl.searchParams.get("limit") || PAGINATION_LIMIT);
  const limit = Number.isFinite(limitRaw)
    ? Math.max(1, Math.min(limitRaw, PAGINATION_LIMIT))
    : PAGINATION_LIMIT;

  const payload = await getPhotos({ cursor, limit });
  return NextResponse.json(payload);
}
