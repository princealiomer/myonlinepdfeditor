import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Split first page into a poster grid (rows×cols tiles). */
export async function printPdfAsPoster(
  file: File,
  rows = 2,
  cols = 2,
): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  if (src.getPageCount() < 1) throw new Error("PDF has no pages.");
  const page = src.getPage(0);
  const { width, height } = page.getSize();
  const out = await PDFDocument.create();
  const [embedded] = await out.embedPages([page]);
  const tileW = width / cols;
  const tileH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = out.addPage([width, height]);
      // Draw scaled-up crop of the source region
      const scale = Math.min(width / tileW, height / tileH);
      const drawW = tileW * scale;
      const drawH = tileH * scale;
      const x = (width - drawW) / 2 - c * drawW;
      const y = (height - drawH) / 2 - (rows - 1 - r) * drawH;
      tile.drawPage(embedded, {
        x,
        y,
        width: width * scale,
        height: height * scale,
      });
    }
  }

  return out.save();
}
