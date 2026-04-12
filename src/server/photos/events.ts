import { EventEmitter } from "node:events";

type PhotosEventName = "photo:created";

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

export function onPhotoCreated(listener: () => void): () => void {
  emitter.on("photo:created", listener);
  return () => {
    emitter.off("photo:created", listener);
  };
}

export function emitPhotoCreated(): void {
  emitter.emit("photo:created");
}
