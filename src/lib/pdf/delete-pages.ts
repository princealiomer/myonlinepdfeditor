import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function deletePages(
  file: File,
  pagesToDelete: number[],
): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  let source: PDFDocument;
  try {
    source = await PDFDocument.load(bytes);
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }

  const pageCount = source.getPageCount();
  if (pageCount === 0) {
    throw new Error("PDF has no pages.");
  }

  const deleteSet = new Set<number>();
  for (const page of pagesToDelete) {
    if (!Number.isInteger(page) || page < 1 || page > pageCount) {
      throw new Error(`Invalid page to delete: ${page} (document has ${pageCount} pages).`);
    }
    deleteSet.add(page);
  }

  const keepIndices: number[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (!deleteSet.has(i)) {
      keepIndices.push(i - 1);
    }
  }

  if (keepIndices.length === 0) {
    throw new Error("Cannot delete all pages from the PDF.");
  }

  const result = await PDFDocument.create();
  const pages = await result.copyPages(source, keepIndices);
  for (const page of pages) {
    result.addPage(page);
  }

  return result.save();
}