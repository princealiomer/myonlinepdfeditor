import { copyPdfBytes } from "./bytes";

type PdfJsModule = typeof import("pdfjs-dist");

let pdfjsModule: PdfJsModule | null = null;

export async function getPdfjs(): Promise<PdfJsModule> {
  if (pdfjsModule) return pdfjsModule;

  const pdfjs = await import("pdfjs-dist");
  // Same-origin worker (copied to /public on postinstall) — avoids CDN "Failed to fetch".
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs?v=${pdfjs.version}`;
  pdfjsModule = pdfjs;
  return pdfjs;
}

export async function getPageCount(data: ArrayBuffer | Uint8Array): Promise<number> {
  const pdfjs = await getPdfjs();
  const loadingTask = pdfjs.getDocument({ data: copyPdfBytes(data) });
  const pdf = await loadingTask.promise;
  const count = pdf.numPages;
  await loadingTask.destroy();
  return count;
}

export async function renderPdfPage(
  data: ArrayBuffer | Uint8Array,
  pageNumber: number,
  scale: number,
): Promise<{
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pageCount: number;
}> {
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    throw new Error("pageNumber must be a positive integer (1-based).");
  }
  if (!Number.isFinite(scale) || scale <= 0) {
    throw new Error("scale must be a positive number.");
  }

  const pdfjs = await getPdfjs();
  // Always copy: pdf.js may transfer/detach the ArrayBuffer to the worker.
  const loadingTask = pdfjs.getDocument({ data: copyPdfBytes(data) });
  const pdf = await loadingTask.promise;

  try {
    const pageCount = pdf.numPages;
    if (pageNumber > pageCount) {
      throw new Error(`Page ${pageNumber} is out of range (document has ${pageCount} pages).`);
    }

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not create 2D canvas context.");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderTask = page.render({
      canvasContext: context,
      viewport,
      canvas,
    });
    await renderTask.promise;

    return {
      canvas,
      width: viewport.width,
      height: viewport.height,
      pageCount,
    };
  } finally {
    await loadingTask.destroy();
  }
}
