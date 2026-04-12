"use client";

import { useEffect, useState } from "react";
import type { PhotoDto } from "@/entities/photo/types";
import { photosApi } from "@/shared/api/photosApi";
import { API_ROUTES } from "@/shared/config/constants";
import { EmptyState } from "@/components/photos/EmptyState";
import { PhotoGrid } from "@/components/photos/PhotoGrid";
import { StateText } from "@/components/photos/PhotosFeed.styles";

export function PhotosFeed() {
  const [photos, setPhotos] = useState<PhotoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchPhotos = async (silent = false) => {
      try {
        const response = await photosApi.getPhotos();
        if (!active) {
          return;
        }

        setPhotos(response.data);
        setError(null);
      } catch {
        if (active && !silent) {
          setError("Не удалось загрузить фотографии");
        }
      } finally {
        if (active && !silent) {
          setIsLoading(false);
        }
      }
    };

    void fetchPhotos(false);

    const pollId = window.setInterval(() => {
      void fetchPhotos(true);
    }, 30000);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void fetchPhotos(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const eventSource = new EventSource(API_ROUTES.PHOTOS_STREAM);
    const onPhotoCreated = () => {
      void fetchPhotos(true);
    };
    eventSource.addEventListener("photo-created", onPhotoCreated);
    eventSource.onerror = () => {
      // Silent fallback: periodic polling continues to keep data fresh.
    };

    return () => {
      active = false;
      window.clearInterval(pollId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      eventSource.removeEventListener("photo-created", onPhotoCreated);
      eventSource.close();
    };
  }, []);

  if (isLoading) {
    return <StateText>Загрузка...</StateText>;
  }

  if (error) {
    return <StateText>{error}</StateText>;
  }

  if (photos.length === 0) {
    return <EmptyState />;
  }

  return <PhotoGrid photos={photos} />;
}
