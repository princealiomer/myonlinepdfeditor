import { mergePdfs } from "./merge";
import { imagesToPdf } from "./images-to-pdf";
import { fileToUint8Array } from "./read-file";
import { unzipEntries } from "./unzip";

/** Unpack a ZIP of images/PDFs and build one PDF (images first, then PDFs merged). */
export async function zipToPdf(file: File): Promise<Uint8Array> {
  if (!/\.zip$/i.test(file.name)) {
    throw new Error("Upload a .zip containing images and/or PDFs.");
  }
  const bytes = await fileToUint8Array(file);
  const entries = await unzipEntries(bytes);
  const imageFiles: File[] = [];
  const pdfFiles: File[] = [];

  for (const entry of entries) {
    if (entry.name.endsWith("/") || entry.name.startsWith("__MACOSX")) continue;
    const base = entry.name.split("/").pop() || entry.name;
    const lower = base.toLowerCase();
    const blob = new Blob([entry.data.slice()]);
    if (/\.(png|jpe?g|webp|gif|bmp|svg|heic|tiff?)$/i.test(lower)) {
      const mime = lower.endsWith(".png")
        ? "image/png"
        : /\.jpe?g$/.test(lower)
          ? "image/jpeg"
          : "application/octet-stream";
      imageFiles.push(new File([blob], base, { type: mime }));
    } else if (lower.endsWith(".pdf")) {
      pdfFiles.push(new File([blob], base, { type: "application/pdf" }));
    }
  }

  if (!imageFiles.length && !pdfFiles.length) {
    throw new Error("ZIP had no images or PDFs to convert.");
  }

  const parts: Uint8Array[] = [];
  if (imageFiles.length) parts.push(await imagesToPdf(imageFiles));
  if (pdfFiles.length) {
    const merged = await mergePdfs(pdfFiles);
    parts.push(merged);
  }
  if (parts.length === 1) return parts[0];

  const asFiles = parts.map(
    (p, i) => new File([p.slice()], `part-${i}.pdf`, { type: "application/pdf" }),
  );
  return mergePdfs(asFiles);
}
