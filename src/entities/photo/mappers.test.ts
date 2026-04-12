import { mapPhotoEntityToDto } from "@/entities/photo/mappers";

describe("mapPhotoEntityToDto", () => {
  it("maps entity to dto with media url", () => {
    const dto = mapPhotoEntityToDto({
      id: "1",
      caption: "Sunset",
      imagePath: "photo.jpg",
      takenAt: new Date("2026-04-12T12:00:00.000Z"),
      createdAt: new Date("2026-04-12T12:00:00.000Z")
    });

    expect(dto).toEqual({
      id: "1",
      caption: "Sunset",
      imageUrl: "/media/photo.jpg",
      takenAt: "2026-04-12T12:00:00.000Z"
    });
  });
});
