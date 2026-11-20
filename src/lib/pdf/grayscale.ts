import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";
import { pdfToImages } from "./pdf-to-images";
import { imagesToPdf } from "./images-to-pdf";

/**
 * Convert pages to grayscale by rasterizing (best-effort for free browser tools).
 * Text remains as image layers in the output.
 */
export async function grayscalePdf(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  // Validate load first
  await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = await pdfToImages(bytes, "png", 1.35);
  const grayFiles: File[] = [];

  for (const page of pages) {
    const bitmap = await createImageBitmap(page.blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not process page for grayscale.");
    ctx.drawImage(bitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const g = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = g;
    }
    ctx.putImageData(imageData, 0, 0);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), "image/png");
    });
    grayFiles.push(new File([blob], page.filename, { type: "image/png" }));
  }

  return imagesToPdf(grayFiles);
}
