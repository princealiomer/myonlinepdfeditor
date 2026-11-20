import { PDFDocument, PageSizes } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export type PageSizePreset = "letter" | "a4" | "legal";

const PRESETS: Record<PageSizePreset, [number, number]> = {
  letter: PageSizes.Letter,
  a4: PageSizes.A4,
  legal: PageSizes.Legal,
};

/** Fit each page onto a target paper size (centered, scaled to fit). */
export async function changePdfPageSize(
  file: File,
  preset: PageSizePreset,
): Promise<Uint8Array> {
  const target = PRESETS[preset];
  if (!target) throw new Error("Unknown page size.");
  const bytes = await fileToUint8Array(file);
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const [tw, th] = target;

  for (let i = 0; i < src.getPageCount(); i++) {
    const [embedded] = await out.embedPages([src.getPage(i)]);
    const page = out.addPage([tw, th]);
    const scale = Math.min(tw / embedded.width, th / embedded.height);
    const w = embedded.width * scale;
    const h = embedded.height * scale;
    const x = (tw - w) / 2;
    const y = (th - h) / 2;
    page.drawPage(embedded, { x, y, width: w, height: h });
  }

  return out.save();
}
