"use client";

import {
  EmptyDescription,
  EmptyStateRoot,
  EmptyTitle
} from "@/components/photos/EmptyState.styles";

export function EmptyState() {
  return (
    <EmptyStateRoot>
      <EmptyTitle>Пока нет фотографий</EmptyTitle>
      <EmptyDescription>
        Отправь фото в Telegram-бота с подписью, и карточка появится здесь.
      </EmptyDescription>
    </EmptyStateRoot>
  );
}
