import { getPdfjs } from "./render";

export type PdfImagePage = {
  page: number;
  blob: Blob;
  filename: string;
};

export async function pdfToImages(
  data: ArrayBuffer | Uint8Array,
  format: "jpeg" | "png" = "jpeg",
  scale = 1.5,
): Promise<PdfImagePage[]> {
  const pdfjs = await getPdfjs();
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pages: PdfImagePage[] = [];
  const mime = format === "png" ? "image/png" : "image/jpeg";
  const ext = format === "png" ? "png" : "jpg";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas for PDF page render.");
    await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Image encode failed."))),
        mime,
        0.92,
      );
    });
    pages.push({
      page: i,
      blob,
      filename: `page-${String(i).padStart(3, "0")}.${ext}`,
    });
  }

  return pages;
}
