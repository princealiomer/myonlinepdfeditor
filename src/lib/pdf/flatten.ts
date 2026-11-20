import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function flattenPdf(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(bytes);
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }

  try {
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    if (fields.length > 0) {
      form.flatten();
    }
  } catch {
    // No form dictionary or unsupported form — still return a re-saved PDF.
  }

  return pdfDoc.save({ updateFieldAppearances: true });
}