import { API_ROUTES } from "@/shared/config/constants";
import type { PhotoDto, PhotoEntity } from "@/entities/photo/types";

export function mapPhotoEntityToDto(photo: PhotoEntity): PhotoDto {
  return {
    id: photo.id,
    caption: photo.caption,
    imageUrl: `${API_ROUTES.MEDIA}/${photo.imagePath}`,
    takenAt: photo.takenAt.toISOString()
  };
}
