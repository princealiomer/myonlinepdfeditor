import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Crop equal margins (points) from every page. */
export async function cropPdf(
  file: File,
  marginPts = 36,
): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    const m = Math.max(0, Math.min(marginPts, width / 4, height / 4));
    page.setCropBox(m, m, width - m * 2, height - m * 2);
  }
  return pdf.save();
}
