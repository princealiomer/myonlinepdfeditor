import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Stamp the first page of overlay onto every page of the base PDF. */
export async function overlayPdf(base: File, overlay: File): Promise<Uint8Array> {
  const baseBytes = await fileToUint8Array(base);
  const overlayBytes = await fileToUint8Array(overlay);
  const pdf = await PDFDocument.load(baseBytes, { ignoreEncryption: true });
  const stampSrc = await PDFDocument.load(overlayBytes, { ignoreEncryption: true });
  if (stampSrc.getPageCount() < 1) throw new Error("Overlay PDF has no pages.");
  const [stamp] = await pdf.embedPages([stampSrc.getPage(0)]);

  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    page.drawPage(stamp, { x: 0, y: 0, width, height, opacity: 0.85 });
  }

  return pdf.save();
}
