import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("mergePdfs requires at least one PDF file.");
  }

  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = await fileToUint8Array(file);
    let source: PDFDocument;
    try {
      source = await PDFDocument.load(bytes);
    } catch {
      throw new Error(`Could not load PDF: ${file.name}`);
    }

    const pageCount = source.getPageCount();
    if (pageCount === 0) continue;

    const indices = Array.from({ length: pageCount }, (_, i) => i);
    const pages = await merged.copyPages(source, indices);
    for (const page of pages) {
      merged.addPage(page);
    }
  }

  if (merged.getPageCount() === 0) {
    throw new Error("No pages were merged. Check that the input files contain pages.");
  }

  return merged.save();
}