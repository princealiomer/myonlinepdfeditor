import { PDFDocument } from "@cantoo/pdf-lib";
import {
  canvasToPngBytes,
  decodeImageToCanvases,
} from "./decode-image";
import { fileToUint8Array } from "./read-file";

const MAX_PAGE_WIDTH = 612;

async function embedPngOrJpeg(pdfDoc: PDFDocument, file: File) {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  const bytes = await fileToUint8Array(file);

  if (type === "image/png" || name.endsWith(".png")) {
    return pdfDoc.embedPng(bytes);
  }
  if (
    type === "image/jpeg" ||
    type === "image/jpg" ||
    /\.jpe?g$/i.test(name)
  ) {
    return pdfDoc.embedJpg(bytes);
  }
  return null;
}

export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("imagesToPdf requires at least one image file.");
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const direct = await embedPngOrJpeg(pdfDoc, file);
    if (direct) {
      let width = direct.width;
      let height = direct.height;
      if (width > MAX_PAGE_WIDTH) {
        const scale = MAX_PAGE_WIDTH / width;
        width *= scale;
        height *= scale;
      }
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(direct, { x: 0, y: 0, width, height });
      continue;
    }

    // WebP/GIF/BMP/SVG/HEIC/TIFF — decode (multipage TIFF expands)
    const canvases = await decodeImageToCanvases(file);
    for (const canvas of canvases) {
      const pngBytes = await canvasToPngBytes(canvas);
      const image = await pdfDoc.embedPng(pngBytes);
      let width = image.width;
      let height = image.height;
      if (width > MAX_PAGE_WIDTH) {
        const scale = MAX_PAGE_WIDTH / width;
        width *= scale;
        height *= scale;
      }
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, { x: 0, y: 0, width, height });
    }
  }

  return pdfDoc.save();
}
