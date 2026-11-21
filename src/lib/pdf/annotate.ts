import { PDFDocument, StandardFonts, rgb, type RGB } from "@cantoo/pdf-lib";
import { copyPdfBytes } from "./bytes";
import { fileToUint8Array } from "./read-file";

export type Annotation =
  | {
      type: "text";
      pageIndex: number;
      x: number;
      y: number;
      text: string;
      size?: number;
      color?: string;
    }
  | {
      type: "rect";
      pageIndex: number;
      x: number;
      y: number;
      width: number;
      height: number;
      color?: string;
      opacity?: number;
    }
  | {
      type: "image";
      pageIndex: number;
      x: number;
      y: number;
      width: number;
      height: number;
      dataUrl: string;
    }
  | {
      type: "line";
      pageIndex: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color?: string;
    };

/** Convert top-left canvas coordinates to PDF bottom-left coordinates. */
export function canvasToPdfPoint(
  pageHeight: number,
  x: number,
  y: number,
): { x: number; y: number } {
  return { x, y: pageHeight - y };
}

function parseColor(color: string | undefined, fallback: RGB): RGB {
  if (!color) return fallback;
  const hex = color.trim();
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) {
    throw new Error(`Invalid color "${color}". Use hex format #RRGGBB.`);
  }
  const n = Number.parseInt(match[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return rgb(r, g, b);
}

function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; mime: string } {
  const match = /^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,(.+)$/i.exec(dataUrl);
  if (!match) {
    throw new Error("Invalid image dataUrl.");
  }
  const mime = match[1] ?? "application/octet-stream";
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return { bytes, mime };
}

async function loadPdfBytes(file: File | Uint8Array): Promise<Uint8Array> {
  if (file instanceof Uint8Array) return copyPdfBytes(file);
  return copyPdfBytes(await fileToUint8Array(file));
}

export async function applyAnnotations(
  file: File | Uint8Array,
  annotations: Annotation[],
): Promise<Uint8Array> {
  const bytes = await loadPdfBytes(file);
  let pdfDoc: PDFDocument;
  try {
    // ignoreEncryption: signed/locked docs should still accept baked markup when possible
    pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "unknown error";
    throw new Error(`Could not load PDF for annotations (${detail}).`);
  }

  const pageCount = pdfDoc.getPageCount();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const ann of annotations) {
    if (!Number.isInteger(ann.pageIndex) || ann.pageIndex < 0 || ann.pageIndex >= pageCount) {
      throw new Error(`Invalid pageIndex: ${ann.pageIndex}`);
    }
    const page = pdfDoc.getPage(ann.pageIndex);

    switch (ann.type) {
      case "text": {
        const size = ann.size ?? 12;
        page.drawText(ann.text, {
          x: ann.x,
          y: ann.y,
          size,
          font,
          color: parseColor(ann.color, rgb(0, 0, 0)),
        });
        break;
      }
      case "rect": {
        page.drawRectangle({
          x: ann.x,
          y: ann.y,
          width: ann.width,
          height: ann.height,
          color: parseColor(ann.color, rgb(1, 0.9, 0.2)),
          opacity: ann.opacity ?? 0.35,
        });
        break;
      }
      case "line": {
        page.drawLine({
          start: { x: ann.x1, y: ann.y1 },
          end: { x: ann.x2, y: ann.y2 },
          color: parseColor(ann.color, rgb(1, 0, 0)),
          thickness: 1.5,
        });
        break;
      }
      case "image": {
        const { bytes: imageBytes, mime } = dataUrlToBytes(ann.dataUrl);
        const image = mime.includes("png")
          ? await pdfDoc.embedPng(imageBytes)
          : mime.includes("jpeg") || mime.includes("jpg")
            ? await pdfDoc.embedJpg(imageBytes)
            : (() => {
                throw new Error(`Unsupported image mime type in annotation: ${mime}`);
              })();
        page.drawImage(image, {
          x: ann.x,
          y: ann.y,
          width: ann.width,
          height: ann.height,
        });
        break;
      }
      default: {
        const _exhaustive: never = ann;
        throw new Error(`Unknown annotation type: ${(_exhaustive as Annotation).type}`);
      }
    }
  }

  return pdfDoc.save();
}