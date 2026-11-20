import { PDFDocument, degrees, reduceRotation, toDegrees } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function rotatePdf(
  file: File,
  rotation: 90 | 180 | 270,
  pageIndices?: number[],
): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(bytes);
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }

  const pageCount = pdfDoc.getPageCount();
  if (pageCount === 0) {
    throw new Error("PDF has no pages.");
  }

  const targets =
    pageIndices ??
    Array.from({ length: pageCount }, (_, i) => i);

  for (const index of targets) {
    if (!Number.isInteger(index) || index < 0 || index >= pageCount) {
      throw new Error(`Invalid page index: ${index} (document has ${pageCount} pages).`);
    }
    const page = pdfDoc.getPage(index);
    const current = toDegrees(page.getRotation());
    const next = reduceRotation(current + rotation);
    page.setRotation(degrees(next));
  }

  return pdfDoc.save();
}