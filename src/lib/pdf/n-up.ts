import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Place N source pages per output sheet (2 or 4). */
export async function nUpPdf(file: File, perSheet: 2 | 4 = 2): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const total = src.getPageCount();
  const cols = perSheet === 4 ? 2 : 2;
  const rows = perSheet === 4 ? 2 : 1;

  for (let i = 0; i < total; i += perSheet) {
    const first = src.getPage(i);
    const { width: sw, height: sh } = first.getSize();
    const sheetW = sw * cols;
    const sheetH = sh * rows;
    const page = out.addPage([sheetW, sheetH]);

    for (let slot = 0; slot < perSheet; slot++) {
      const idx = i + slot;
      if (idx >= total) break;
      const [embedded] = await out.embedPages([src.getPage(idx)]);
      const col = slot % cols;
      const row = rows === 1 ? 0 : Math.floor(slot / cols);
      const x = col * sw;
      const y = sheetH - (row + 1) * sh;
      page.drawPage(embedded, { x, y, width: sw, height: sh });
    }
  }

  return out.save();
}
