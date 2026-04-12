import { describe, expect, it, vi } from "vitest";

const ingestTelegramUpdate = vi.fn(async () => undefined);

vi.mock("@/server/telegram/ingest", () => ({
  ingestTelegramUpdate
}));

describe("POST /api/telegram/webhook", () => {
  it("handles telegram payload", async () => {
    process.env.DATABASE_URL = "postgresql://localhost:5432/foto";
    process.env.TELEGRAM_WEBHOOK_SECRET = "";

    const { POST } = await import("@/app/api/telegram/webhook/route");

    const request = new Request("http://localhost:3000/api/telegram/webhook", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        update_id: 1,
        message: {
          message_id: 1,
          date: 1,
          chat: { id: 123, type: "private" },
          photo: [{ file_id: "x", file_unique_id: "y", width: 10, height: 10 }]
        }
      })
    });

    const response = await POST(request as never);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(ingestTelegramUpdate).toHaveBeenCalledTimes(1);
  });
});
