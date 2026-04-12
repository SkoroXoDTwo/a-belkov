import { prisma } from "@/server/db/client";
import type { PhotoEntity } from "@/entities/photo/types";

interface ListPhotosParams {
  cursor?: string;
  limit: number;
}

export interface ListPhotosResult {
  photos: PhotoEntity[];
  nextCursor: string | null;
}

export async function listPhotos({
  cursor,
  limit
}: ListPhotosParams): Promise<ListPhotosResult> {
  const rows = await prisma.photo.findMany({
    orderBy: [{ takenAt: "desc" }, { id: "desc" }],
    ...(cursor
      ? {
          cursor: { id: cursor },
          skip: 1
        }
      : {}),
    take: limit + 1
  });

  const hasMore = rows.length > limit;
  const visibleRows = hasMore ? rows.slice(0, limit) : rows;

  return {
    photos: visibleRows.map((row: any) => ({
      id: row.id,
      caption: row.caption,
      imagePath: row.imagePath,
      takenAt: row.takenAt,
      createdAt: row.createdAt
    })),
    nextCursor: hasMore ? visibleRows[visibleRows.length - 1]?.id ?? null : null
  };
}

export async function createPhoto(input: {
  caption: string | null;
  imagePath: string;
  takenAt: Date;
}): Promise<PhotoEntity> {
  const row = await prisma.photo.create({
    data: {
      caption: input.caption,
      imagePath: input.imagePath,
      takenAt: input.takenAt
    }
  });

  return {
    id: row.id,
    caption: row.caption,
    imagePath: row.imagePath,
    takenAt: row.takenAt,
    createdAt: row.createdAt
  };
}
