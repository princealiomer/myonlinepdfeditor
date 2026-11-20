import { PDFDocument, StandardFonts, rgb } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export type PageNumberOptions = {
  startAt?: number;
  prefix?: string;
};

export async function addPageNumbers(
  file: File,
  options?: PageNumberOptions,
): Promise<Uint8Array> {
  const startAt = options?.startAt ?? 1;
  const prefix = options?.prefix ?? "";

  if (!Number.isInteger(startAt) || startAt < 0) {
    throw new Error("startAt must be a non-negative integer.");
  }

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

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const size = 10;
  const color = rgb(0.25, 0.25, 0.25);

  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.getPage(i);
    const { width } = page.getSize();
    const label = `${prefix}${startAt + i}`;
    const textWidth = font.widthOfTextAtSize(label, size);
    page.drawText(label, {
      x: (width - textWidth) / 2,
      y: 24,
      size,
      font,
      color,
    });
  }

  return pdfDoc.save();
}