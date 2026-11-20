import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

const MAX_PAGE_WIDTH = 612;

async function fileToPngBytes(file: File): Promise<Uint8Array> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () =>
        reject(
          new Error(
            `Could not decode ${file.name}. Try PNG/JPEG, or convert HEIC/TIFF in another app first.`,
          ),
        );
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    if (!canvas.width || !canvas.height) {
      throw new Error(`Image ${file.name} has invalid dimensions.`);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas for image conversion.");
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encode failed."))),
        "image/png",
      );
    });
    return new Uint8Array(await blob.arrayBuffer());
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function embedImage(pdfDoc: PDFDocument, file: File) {
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

  // WebP/GIF/BMP/SVG/HEIC/TIFF — decode in browser, re-embed as PNG
  const pngBytes = await fileToPngBytes(file);
  return pdfDoc.embedPng(pngBytes);
}

async function imageDimensions(file: File): Promise<{ width: number; height: number }> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error(`Could not decode image: ${file.name}`));
      el.src = url;
    });
    return { width: img.naturalWidth, height: img.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("imagesToPdf requires at least one image file.");
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const image = await embedImage(pdfDoc, file);
    let { width, height } = await imageDimensions(file);
    if (width > MAX_PAGE_WIDTH) {
      const scale = MAX_PAGE_WIDTH / width;
      width *= scale;
      height *= scale;
    }
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });
  }

  return pdfDoc.save();
}
