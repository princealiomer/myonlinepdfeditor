import { PageSizes, PDFDocument } from "@cantoo/pdf-lib";

export async function createBlankPdf(pageCount = 1): Promise<Uint8Array> {
  if (!Number.isInteger(pageCount) || pageCount < 1) {
    throw new Error("pageCount must be a positive integer.");
  }

  const pdfDoc = await PDFDocument.create();
  const [width, height] = PageSizes.Letter;

  for (let i = 0; i < pageCount; i++) {
    pdfDoc.addPage([width, height]);
  }

  return pdfDoc.save();
}