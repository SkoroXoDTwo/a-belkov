"use client";

import { DATE_FORMAT_OPTIONS } from "@/shared/config/constants";
import type { PhotoCardProps } from "@/components/photos/PhotoCard.types";
import {
  Body,
  Caption,
  Card,
  DateText,
  ImageBox,
  StyledImage
} from "@/components/photos/PhotoCard.styles";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", DATE_FORMAT_OPTIONS).format(new Date(value));
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Card>
      <ImageBox>
        <StyledImage src={photo.imageUrl} alt={photo.caption ?? "Фотография"} loading="lazy" />
      </ImageBox>
      <Body>
        <Caption>{photo.caption?.trim() || "Без подписи"}</Caption>
        <DateText dateTime={photo.takenAt}>{formatDate(photo.takenAt)}</DateText>
      </Body>
    </Card>
  );
}
