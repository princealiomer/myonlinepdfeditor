import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";
import { pdfToImages } from "./pdf-to-images";
import { imagesToPdf } from "./images-to-pdf";

export type CompressMode = "light" | "strong";

/**
 * light — re-save with object streams + strip metadata (small gains).
 * strong — rasterize pages to JPEG and rebuild (much smaller, lossy).
 */
export async function compressPdf(
  file: File,
  mode: CompressMode = "strong",
): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);

  if (mode === "strong") {
    // Validate PDF first, then rebuild as compressed JPEG pages.
    await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await pdfToImages(bytes, "jpeg", 1.15, 0.62);
    const files = pages.map(
      (p) => new File([p.blob], p.filename, { type: "image/jpeg" }),
    );
    return imagesToPdf(files);
  }

  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(bytes);
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }

  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer("");
  pdfDoc.setCreator("");

  return pdfDoc.save({
    useObjectStreams: true,
    updateFieldAppearances: false,
  });
}
