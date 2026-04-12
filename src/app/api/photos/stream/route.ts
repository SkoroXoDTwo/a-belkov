import { onPhotoCreated } from "@/server/photos/events";

export const runtime = "nodejs";

function toSsePayload(event: string, data: string): string {
  return `event: ${event}\ndata: ${data}\n\n`;
}

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(toSsePayload("connected", "ok")));

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(": heartbeat\n\n"));
      }, 25000);

      const unsubscribe = onPhotoCreated(() => {
        controller.enqueue(encoder.encode(toSsePayload("photo-created", "1")));
      });

      const close = () => {
        clearInterval(heartbeat);
        unsubscribe();
        try {
          controller.close();
        } catch {
          // no-op
        }
      };

      request.signal.addEventListener("abort", close);
    },
    cancel() {
      // Handled by stream close path.
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
