import { fileToUint8Array } from "./read-file";

export type ImageOutFormat = "jpeg" | "png" | "webp";

async function decodeToCanvas(file: File): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () =>
        reject(
          new Error(
            `Could not decode ${file.name}. Convert HEIC in Photos first if the browser lacks HEIC support.`,
          ),
        );
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    if (!canvas.width || !canvas.height) {
      throw new Error(`Invalid dimensions for ${file.name}.`);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");
    ctx.drawImage(img, 0, 0);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function convertImageFile(
  file: File,
  format: ImageOutFormat,
  quality = 0.92,
): Promise<{ blob: Blob; filename: string }> {
  const canvas = await decodeToCanvas(file);
  const mime =
    format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Image encode failed."))),
      mime,
      quality,
    );
  });
  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  const ext = format === "jpeg" ? "jpg" : format;
  return { blob, filename: `${base}.${ext}` };
}

export async function compressImageFile(
  file: File,
  quality = 0.7,
): Promise<{ blob: Blob; filename: string; before: number; after: number }> {
  const before = file.size;
  const { blob, filename } = await convertImageFile(file, "jpeg", quality);
  return {
    blob,
    filename: filename.replace(/\.jpg$/i, "-compressed.jpg"),
    before,
    after: blob.size,
  };
}

/** Convert SVG string/bytes via Image element (same path as file). */
export async function svgBytesToImage(
  bytes: Uint8Array,
  format: ImageOutFormat,
  name = "graphic",
): Promise<{ blob: Blob; filename: string }> {
  const file = new File([bytes.slice()], `${name}.svg`, { type: "image/svg+xml" });
  return convertImageFile(file, format);
}

export async function fileLooksLikeImage(file: File): Promise<boolean> {
  try {
    await decodeToCanvas(file);
    return true;
  } catch {
    return false;
  }
}

export { fileToUint8Array };
