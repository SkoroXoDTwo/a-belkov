"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/shared/styles/globalStyles";
import { theme } from "@/shared/styles/theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
