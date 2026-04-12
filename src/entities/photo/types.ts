export interface PhotoEntity {
  id: string;
  caption: string | null;
  imagePath: string;
  takenAt: Date;
  createdAt: Date;
}

export interface PhotoDto {
  id: string;
  caption: string | null;
  imageUrl: string;
  takenAt: string;
}

export interface PhotosListResponse {
  data: PhotoDto[];
  nextCursor: string | null;
}
