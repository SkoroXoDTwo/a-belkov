import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/server/photos/service", () => ({
  getPhotos: vi.fn(async () => ({
    data: [
      {
        id: "1",
        caption: "Test",
        imageUrl: "/media/1.jpg",
        takenAt: "2026-04-12T10:00:00.000Z"
      }
    ],
    nextCursor: null
  }))
}));

describe("GET /api/photos", () => {
  it("returns photos payload", async () => {
    const { GET } = await import("@/app/api/photos/route");
    const request = new NextRequest("http://localhost:3000/api/photos");
    const response = await GET(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.data).toHaveLength(1);
    expect(payload.nextCursor).toBeNull();
  });
});
