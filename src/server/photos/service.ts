import { mapPhotoEntityToDto } from "@/entities/photo/mappers";
import type { PhotosListResponse } from "@/entities/photo/types";
import { emitPhotoCreated } from "@/server/photos/events";
import { createPhoto, listPhotos } from "@/server/photos/repository";

interface GetPhotosInput {
  cursor?: string;
  limit: number;
}

export async function getPhotos(input: GetPhotosInput): Promise<PhotosListResponse> {
  const result = await listPhotos({ cursor: input.cursor, limit: input.limit });

  return {
    data: result.photos.map(mapPhotoEntityToDto),
    nextCursor: result.nextCursor
  };
}

export async function savePhoto(input: {
  caption: string | null;
  imagePath: string;
  takenAt: Date;
}) {
  const created = await createPhoto(input);
  emitPhotoCreated();
  return created;
}
