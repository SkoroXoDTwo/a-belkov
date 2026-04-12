"use client";

import type { PhotoGridProps } from "@/components/photos/PhotoGrid.types";
import { PhotoCard } from "@/components/photos/PhotoCard";
import { Grid } from "@/components/photos/PhotoGrid.styles";

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </Grid>
  );
}
