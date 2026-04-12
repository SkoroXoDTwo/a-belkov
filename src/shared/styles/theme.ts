import { tokens } from "@/shared/styles/tokens";

export const theme = {
  ...tokens
} as const;

export type AppTheme = typeof theme;
