import {
  canvasToBlob,
  decodeImageToCanvas,
} from "./decode-image";
import { fileToUint8Array } from "./read-file";

export type ImageOutFormat = "jpeg" | "png" | "webp";

export async function convertImageFile(
  file: File,
  format: ImageOutFormat,
  quality = 0.92,
): Promise<{ blob: Blob; filename: string }> {
  const canvas = await decodeImageToCanvas(file);
  const mime =
    format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
  const blob = await canvasToBlob(canvas, mime, quality);
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
    await decodeImageToCanvas(file);
    return true;
  } catch {
    return false;
  }
}

export { fileToUint8Array };
