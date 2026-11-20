import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";
import { pdfToImages } from "./pdf-to-images";
import { imagesToPdf } from "./images-to-pdf";

/** Flatten each page to an image layer (useful before print or redact). */
export async function rasterizePdf(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = await pdfToImages(bytes, "jpeg", 1.5);
  const files = pages.map(
    (p) => new File([p.blob], p.filename, { type: "image/jpeg" }),
  );
  return imagesToPdf(files);
}
