import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function reversePdfPages(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const count = src.getPageCount();
  const order = Array.from({ length: count }, (_, i) => count - 1 - i);
  const pages = await out.copyPages(src, order);
  pages.forEach((p) => out.addPage(p));
  return out.save();
}
