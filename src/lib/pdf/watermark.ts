import { PDFDocument, StandardFonts, rgb, degrees } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function watermarkPdf(
  file: File,
  text: string,
  options?: { opacity?: number; fontSize?: number },
): Promise<Uint8Array> {
  const label = text.trim() || "CONFIDENTIAL";
  const opacity = options?.opacity ?? 0.25;
  const fontSize = options?.fontSize ?? 48;
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    page.drawText(label, {
      x: width * 0.15,
      y: height * 0.45,
      size: fontSize,
      font,
      color: rgb(0.45, 0.45, 0.45),
      opacity,
      rotate: degrees(35),
    });
  }

  return pdf.save();
}
