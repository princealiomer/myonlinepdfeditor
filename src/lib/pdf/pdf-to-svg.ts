import { fileToUint8Array } from "./read-file";
import { pdfToImages } from "./pdf-to-images";

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image for SVG."));
    reader.readAsDataURL(blob);
  });
}

/** Export each PDF page as an SVG wrapping a raster PNG (browser-friendly). */
export async function pdfToSvgFiles(
  file: File,
): Promise<{ filename: string; text: string }[]> {
  const pages = await pdfToImages(await fileToUint8Array(file), "png", 1.5);
  const out: { filename: string; text: string }[] = [];
  for (const page of pages) {
    const dataUrl = await blobToDataUrl(page.blob);
    const bitmap = await createImageBitmap(page.blob);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${bitmap.width}" height="${bitmap.height}" viewBox="0 0 ${bitmap.width} ${bitmap.height}">
  <image width="${bitmap.width}" height="${bitmap.height}" xlink:href="${dataUrl}"/>
</svg>`;
    out.push({
      filename: page.filename.replace(/\.png$/i, ".svg"),
      text: svg,
    });
  }
  return out;
}
