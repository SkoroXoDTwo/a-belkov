import { theme } from "@/shared/styles/theme";

describe("theme tokens", () => {
  it("has required color and typography tokens", () => {
    expect(theme.colors.pageBg).toBeTruthy();
    expect(theme.colors.textPrimary).toBeTruthy();
    expect(theme.typography.fontFamily).toContain("Manrope");
    expect(theme.spacing.lg).toBeTruthy();
  });
});
