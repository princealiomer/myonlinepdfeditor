import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/**
 * Re-saves the PDF with object streams and clears common metadata.
 * This does not recompress embedded images or subset fonts; file size may
 * barely change or even grow on already-optimized PDFs.
 */
export async function compressPdf(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(bytes);
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }

  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer("");
  pdfDoc.setCreator("");

  return pdfDoc.save({
    useObjectStreams: true,
    updateFieldAppearances: false,
  });
}