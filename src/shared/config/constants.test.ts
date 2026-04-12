import { API_ROUTES, PAGINATION_LIMIT, SIDEBAR_ITEMS } from "@/shared/config/constants";

describe("constants", () => {
  it("provides main API routes", () => {
    expect(API_ROUTES.PHOTOS).toBe("/api/photos");
    expect(API_ROUTES.TELEGRAM_WEBHOOK).toBe("/api/telegram/webhook");
    expect(API_ROUTES.MEDIA).toBe("/media");
  });

  it("has sidebar photos section by default", () => {
    expect(SIDEBAR_ITEMS[0]?.id).toBe("photos");
    expect(PAGINATION_LIMIT).toBeGreaterThan(0);
  });
});
