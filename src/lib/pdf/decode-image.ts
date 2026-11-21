import { fileToUint8Array } from "./read-file";

type UtifApi = {
  decode: (buffer: ArrayBuffer | Uint8Array) => import("utif").IFD[];
  decodeImage: (buffer: ArrayBuffer | Uint8Array, ifd: import("utif").IFD) => void;
  toRGBA8: (ifd: import("utif").IFD) => Uint8Array;
};

async function loadUtif(): Promise<UtifApi> {
  const mod = await import("utif");
  const api = (mod as { default?: UtifApi }).default ?? (mod as unknown as UtifApi);
  if (typeof api?.decode !== "function") {
    throw new Error("TIFF decoder failed to load.");
  }
  return api;
}

function isHeicName(name: string, type: string): boolean {
  return (
    /\.heic$/i.test(name) ||
    /\.heif$/i.test(name) ||
    type.includes("heic") ||
    type.includes("heif")
  );
}

function isTiffName(name: string, type: string): boolean {
  return /\.tiff?$/i.test(name) || type.includes("tiff") || type.includes("tif");
}

async function canvasFromBitmapSource(
  source: CanvasImageSource,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  if (!canvas.width || !canvas.height) {
    throw new Error("Invalid image dimensions.");
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.drawImage(source, 0, 0, width, height);
  return canvas;
}

async function decodeWithImageElement(file: Blob, label: string): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error(`Could not decode ${label}.`));
      el.src = url;
    });
    return canvasFromBitmapSource(
      img,
      img.naturalWidth || img.width,
      img.naturalHeight || img.height,
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function decodeWithCreateImageBitmap(file: Blob, label: string): Promise<HTMLCanvasElement> {
  if (typeof createImageBitmap !== "function") {
    throw new Error(`Could not decode ${label}.`);
  }
  const bitmap = await createImageBitmap(file);
  try {
    return canvasFromBitmapSource(bitmap, bitmap.width, bitmap.height);
  } finally {
    bitmap.close();
  }
}

async function decodeHeicWithLib(file: File): Promise<HTMLCanvasElement> {
  // CSP-safe build (no eval). Prefer bitmap when available, else PNG blob.
  const { heicTo } = await import("heic-to/csp");

  try {
    const bitmap = (await heicTo({
      blob: file,
      type: "bitmap",
    })) as ImageBitmap;
    try {
      return await canvasFromBitmapSource(bitmap, bitmap.width, bitmap.height);
    } finally {
      bitmap.close();
    }
  } catch {
    /* fall through to PNG path */
  }

  const result = await heicTo({
    blob: file,
    type: "image/png",
  });
  const blob = result as Blob;
  if (!(blob instanceof Blob)) {
    throw new Error(`Could not decode HEIC file ${file.name}.`);
  }
  return decodeWithImageElement(blob, file.name);
}

async function decodeHeic(file: File): Promise<HTMLCanvasElement> {
  // Safari / some Chromium builds decode HEIC natively — try that first.
  try {
    return await decodeWithCreateImageBitmap(file, file.name);
  } catch {
    /* fall through */
  }
  try {
    return await decodeWithImageElement(file, file.name);
  } catch {
    /* fall through to libheif (heic-to) */
  }

  try {
    return await decodeHeicWithLib(file);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "";
    throw new Error(
      `Could not decode HEIC file ${file.name}${detail ? ` (${detail})` : ""}. Try another photo or export JPEG from Photos first.`,
    );
  }
}

function ifdDimensions(ifd: import("utif").IFD): { width: number; height: number } {
  const width = ifd.width || Number(ifd.t256?.[0]) || 0;
  const height = ifd.height || Number(ifd.t257?.[0]) || 0;
  return { width, height };
}

function ifdToCanvas(
  UTIF: UtifApi,
  buffer: ArrayBuffer | Uint8Array,
  ifd: import("utif").IFD,
  label: string,
): HTMLCanvasElement {
  UTIF.decodeImage(buffer, ifd);
  const rgba = UTIF.toRGBA8(ifd);
  const { width, height } = ifdDimensions(ifd);
  if (!width || !height) {
    throw new Error(`TIFF file ${label} has invalid dimensions.`);
  }
  if (rgba.length < width * height * 4) {
    throw new Error(`Could not decode ${label}.`);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(rgba.subarray(0, width * height * 4));
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

async function decodeTiffPages(file: File): Promise<HTMLCanvasElement[]> {
  const UTIF = await loadUtif();
  const bytes = await fileToUint8Array(file);
  // UTIF accepts Uint8Array; keep a tight copy so views into larger buffers don't confuse it.
  const buffer = bytes.slice();

  let ifds: import("utif").IFD[];
  try {
    ifds = UTIF.decode(buffer);
  } catch {
    throw new Error(`Could not read TIFF file ${file.name}.`);
  }
  if (!ifds.length) throw new Error(`TIFF file ${file.name} has no images.`);

  const pages: HTMLCanvasElement[] = [];
  for (let index = 0; index < ifds.length; index++) {
    try {
      pages.push(ifdToCanvas(UTIF, buffer, ifds[index], `${file.name} (page ${index + 1})`));
    } catch (err) {
      if (index === 0) {
        throw err instanceof Error
          ? err
          : new Error(`Could not decode ${file.name}.`);
      }
      // Skip broken trailing IFDs in multipage files.
      break;
    }
  }
  if (!pages.length) throw new Error(`Could not decode ${file.name}.`);
  return pages;
}

async function decodeTiff(file: File): Promise<HTMLCanvasElement> {
  const pages = await decodeTiffPages(file);
  return pages[0];
}

/** Decode common raster formats, including HEIC and TIFF via dedicated decoders. */
export async function decodeImageToCanvas(file: File): Promise<HTMLCanvasElement> {
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();

  if (isHeicName(name, type)) {
    return decodeHeic(file);
  }
  if (isTiffName(name, type)) {
    return decodeTiff(file);
  }

  try {
    return await decodeWithImageElement(file, file.name);
  } catch (err) {
    // Some browsers mis-label HEIC/TIFF; retry specialized decoders.
    if (name.endsWith(".heic") || name.endsWith(".heif")) {
      return decodeHeic(file);
    }
    if (name.endsWith(".tif") || name.endsWith(".tiff")) {
      return decodeTiff(file);
    }
    throw err instanceof Error
      ? err
      : new Error(`Could not decode ${file.name}.`);
  }
}

/** Decode all frames/pages (multipage TIFF expands to multiple canvases). */
export async function decodeImageToCanvases(file: File): Promise<HTMLCanvasElement[]> {
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();
  if (isTiffName(name, type) || name.endsWith(".tif") || name.endsWith(".tiff")) {
    return decodeTiffPages(file);
  }
  return [await decodeImageToCanvas(file)];
}

export async function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("PNG encode failed."))),
      "image/png",
    );
  });
  return new Uint8Array(await blob.arrayBuffer());
}

export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Image encode failed."))),
      mime,
      quality,
    );
  });
}
