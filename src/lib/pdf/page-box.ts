import { PDFDocument, type PDFPage } from "@cantoo/pdf-lib";
import { copyPdfBytes } from "./bytes";
import { fileToUint8Array } from "./read-file";

export type PageBox = {
  width: number;
  height: number;
  /** Page /Rotate in degrees (0, 90, 180, 270). */
  rotation: number;
};

async function loadDoc(file: File | Uint8Array): Promise<PDFDocument> {
  const bytes =
    file instanceof Uint8Array
      ? copyPdfBytes(file)
      : copyPdfBytes(await fileToUint8Array(file));
  return PDFDocument.load(bytes, { ignoreEncryption: true });
}

/** pdf-lib MediaBox size + rotation for a 1-based page number. */
export async function getPdfPageBox(
  file: File | Uint8Array,
  pageNumber: number,
): Promise<PageBox> {
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    throw new Error("pageNumber must be a positive integer (1-based).");
  }
  const pdf = await loadDoc(file);
  const count = pdf.getPageCount();
  if (pageNumber > count) {
    throw new Error(`Page ${pageNumber} is out of range (document has ${count} pages).`);
  }
  return pageBoxFrom(pdf.getPage(pageNumber - 1));
}

export function pageBoxFrom(page: PDFPage): PageBox {
  const { width, height } = page.getSize();
  const rotation = ((page.getRotation().angle % 360) + 360) % 360;
  return { width, height, rotation };
}

/**
 * Map a click in the upright preview (top-left origin) into pdf-lib
 * draw coordinates (bottom-left origin, unrotated MediaBox).
 */
export function previewToPdfPoint(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  box: PageBox,
): { x: number; y: number } {
  if (rect.width <= 0 || rect.height <= 0 || box.width <= 0 || box.height <= 0) {
    return { x: 0, y: 0 };
  }
  const nx = clamp01((clientX - rect.left) / rect.width);
  const ny = clamp01((clientY - rect.top) / rect.height);
  return viewFractionToPdf(nx, ny, box);
}

/** Convert normalized preview fractions (origin top-left) → PDF points. */
export function viewFractionToPdf(
  nx: number,
  nyFromTop: number,
  box: PageBox,
): { x: number; y: number } {
  const { width: w, height: h, rotation } = box;
  switch (rotation) {
    case 90:
      return { x: nyFromTop * w, y: nx * h };
    case 180:
      return { x: (1 - nx) * w, y: nyFromTop * h };
    case 270:
      return { x: (1 - nyFromTop) * w, y: (1 - nx) * h };
    default:
      return { x: nx * w, y: (1 - nyFromTop) * h };
  }
}

/**
 * PDF bottom-left rect → CSS left/top/width/height as 0–1 fractions
 * for an upright (pdf.js-rotated) preview overlay.
 */
export function pdfRectToPreviewFractions(
  x: number,
  y: number,
  width: number,
  height: number,
  box: PageBox,
): { left: number; top: number; width: number; height: number } {
  const { width: pw, height: ph, rotation } = box;
  if (pw <= 0 || ph <= 0) {
    return { left: 0, top: 0, width: 0, height: 0 };
  }

  switch (rotation) {
    case 90:
      return {
        left: y / ph,
        top: x / pw,
        width: height / ph,
        height: width / pw,
      };
    case 180:
      return {
        left: 1 - (x + width) / pw,
        top: y / ph,
        width: width / pw,
        height: height / ph,
      };
    case 270:
      return {
        left: 1 - (y + height) / ph,
        top: 1 - (x + width) / pw,
        width: height / ph,
        height: width / pw,
      };
    default:
      return {
        left: x / pw,
        top: 1 - (y + height) / ph,
        width: width / pw,
        height: height / ph,
      };
  }
}

/** Scale annotation geometry from an authoring box into the live pdf-lib page box. */
export function scaleAnnotationToPage<
  T extends {
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    width?: number;
    height?: number;
  },
>(
  ann: T,
  from: { width: number; height: number },
  to: { width: number; height: number },
): T {
  if (
    from.width <= 0 ||
    from.height <= 0 ||
    (almostEqual(from.width, to.width) && almostEqual(from.height, to.height))
  ) {
    return ann;
  }
  const sx = to.width / from.width;
  const sy = to.height / from.height;
  const next = { ...ann };
  if (typeof next.x === "number") next.x *= sx;
  if (typeof next.y === "number") next.y *= sy;
  if (typeof next.x1 === "number") next.x1 *= sx;
  if (typeof next.y1 === "number") next.y1 *= sy;
  if (typeof next.x2 === "number") next.x2 *= sx;
  if (typeof next.y2 === "number") next.y2 *= sy;
  if (typeof next.width === "number") next.width *= sx;
  if (typeof next.height === "number") next.height *= sy;
  return next;
}

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function almostEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.5;
}
