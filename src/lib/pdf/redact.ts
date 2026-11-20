import { PDFDocument, rgb } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Cover selected pages (1-indexed) with opaque black redaction bars. */
export async function redactPdfPages(
  file: File,
  pages: number[],
): Promise<Uint8Array> {
  if (!pages.length) throw new Error("Select at least one page to redact.");
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const count = pdf.getPageCount();
  const targets = [...new Set(pages.map((p) => Math.floor(p)))].filter(
    (p) => p >= 1 && p <= count,
  );
  if (!targets.length) throw new Error("No valid page numbers for this PDF.");

  for (const pageNum of targets) {
    const page = pdf.getPage(pageNum - 1);
    const { width, height } = page.getSize();
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0, 0, 0),
      opacity: 1,
    });
  }

  return pdf.save();
}
