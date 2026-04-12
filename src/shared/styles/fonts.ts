import { Manrope } from "next/font/google";

export const primaryFont = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap"
});
