import { Heading } from "@/components/common/Heading";
import { PageShell } from "@/components/layout/PageShell";
import { PhotosFeed } from "@/components/photos/PhotosFeed";

export default function HomePage() {
  return (
    <PageShell>
      <Heading>Фотографии</Heading>
      <PhotosFeed />
    </PageShell>
  );
}
