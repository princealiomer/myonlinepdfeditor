import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export type SplitPart = { bytes: Uint8Array; name: string };

function parseRangePart(part: string, pageCount: number): number[] {
  const trimmed = part.trim();
  if (!trimmed) {
    throw new Error("Empty page range segment.");
  }

  if (trimmed.includes("-")) {
    const [startStr, endStr] = trimmed.split("-", 2);
    const start = Number.parseInt(startStr.trim(), 10);
    const end = Number.parseInt(endStr.trim(), 10);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 1 || end < start) {
      throw new Error(`Invalid page range: "${part}"`);
    }
    if (end > pageCount) {
      throw new Error(`Range "${part}" exceeds document page count (${pageCount}).`);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const page = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(page) || page < 1 || page > pageCount) {
    throw new Error(`Invalid page number: "${part}" (document has ${pageCount} pages).`);
  }
  return [page];
}

function parseRanges(ranges: string, pageCount: number): number[][] {
  const segments = ranges
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (segments.length === 0) {
    throw new Error("Page ranges string is empty.");
  }

  return segments.map((segment) => parseRangePart(segment, pageCount));
}

function baseName(filename: string): string {
  return filename.replace(/\.pdf$/i, "") || "document";
}

export async function splitPdf(
  file: File,
  ranges?: string,
): Promise<SplitPart[]> {
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

  const stem = baseName(file.name);

  if (!ranges) {
    const parts: SplitPart[] = [];
    for (let i = 0; i < pageCount; i++) {
      const doc = await PDFDocument.create();
      const [page] = await doc.copyPages(source, [i]);
      doc.addPage(page);
      parts.push({
        bytes: await doc.save(),
        name: `${stem}-page-${i + 1}.pdf`,
      });
    }
    return parts;
  }

  const groups = parseRanges(ranges, pageCount);
  const parts: SplitPart[] = [];

  for (let g = 0; g < groups.length; g++) {
    const group = groups[g];
    const doc = await PDFDocument.create();
    const indices = group.map((p) => p - 1);
    const pages = await doc.copyPages(source, indices);
    for (const page of pages) {
      doc.addPage(page);
    }
    const label =
      group.length === 1 ? `${group[0]}` : `${group[0]}-${group[group.length - 1]}`;
    parts.push({
      bytes: await doc.save(),
      name: `${stem}-pages-${label}.pdf`,
    });
  }

  return parts;
}