import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

function assertValidOrder(order: number[], pageCount: number): void {
  if (order.length !== pageCount) {
    throw new Error(
      `Order must include exactly ${pageCount} pages (got ${order.length}).`,
    );
  }
  const seen = new Set<number>();
  for (const page of order) {
    if (!Number.isInteger(page) || page < 1 || page > pageCount) {
      throw new Error(`Invalid page number in order: ${page}`);
    }
    if (seen.has(page)) {
      throw new Error(`Duplicate page number in order: ${page}`);
    }
    seen.add(page);
  }
}

export async function reorderPages(
  file: File,
  order: number[],
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

  assertValidOrder(order, pageCount);

  const result = await PDFDocument.create();
  const indices = order.map((p) => p - 1);
  const pages = await result.copyPages(source, indices);
  for (const page of pages) {
    result.addPage(page);
  }

  return result.save();
}

export async function duplicatePages(
  file: File,
  pages: number[],
): Promise<Uint8Array> {
  if (pages.length === 0) {
    throw new Error("duplicatePages requires at least one page number.");
  }

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

  const result = await PDFDocument.create();
  const allIndices = Array.from({ length: pageCount }, (_, i) => i);
  const allPages = await result.copyPages(source, allIndices);
  for (const page of allPages) {
    result.addPage(page);
  }

  for (const pageNum of pages) {
    if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > pageCount) {
      throw new Error(`Invalid page to duplicate: ${pageNum}`);
    }
    const [dup] = await result.copyPages(source, [pageNum - 1]);
    result.addPage(dup);
  }

  return result.save();
}