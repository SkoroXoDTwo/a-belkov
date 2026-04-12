import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { primaryFont } from "@/shared/styles/fonts";
import { Providers } from "@/app/providers";
import { StyledComponentsRegistry } from "@/shared/styles/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "foto",
  description: "Минималистичная персональная фотогалерея"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" className={primaryFont.variable}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
