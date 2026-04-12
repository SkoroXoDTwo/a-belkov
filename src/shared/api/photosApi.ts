import { httpClient } from "@/shared/api/httpClient";
import { API_ROUTES, PAGINATION_LIMIT } from "@/shared/config/constants";
import type { PhotosListResponse } from "@/entities/photo/types";

export const photosApi = {
  getPhotos: (cursor?: string) =>
    httpClient<PhotosListResponse>(API_ROUTES.PHOTOS, {
      method: "GET",
      query: {
        cursor,
        limit: PAGINATION_LIMIT
      }
    })
};
