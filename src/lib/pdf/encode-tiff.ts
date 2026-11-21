/** Minimal uncompressed little-endian TIFF (RGB) writer, multipage-capable. */

function u16(n: number): Uint8Array {
  const b = new Uint8Array(2);
  new DataView(b.buffer).setUint16(0, n, true);
  return b;
}

function u32(n: number): Uint8Array {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, true);
  return b;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const len = parts.reduce((a, p) => a + p.length, 0);
  const out = new Uint8Array(len);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

function rgbaToRgb(rgba: Uint8ClampedArray | Uint8Array): Uint8Array {
  const pixels = rgba.length / 4;
  const rgb = new Uint8Array(pixels * 3);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
    rgb[j] = rgba[i];
    rgb[j + 1] = rgba[i + 1];
    rgb[j + 2] = rgba[i + 2];
  }
  return rgb;
}

type TiffPage = { width: number; height: number; rgb: Uint8Array };

/**
 * Encode one or more canvases as an uncompressed multipage TIFF.
 */
export function encodeTiffFromCanvases(canvases: HTMLCanvasElement[]): Uint8Array {
  if (!canvases.length) throw new Error("No images to encode as TIFF.");

  const pages: TiffPage[] = canvases.map((canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable for TIFF encode.");
    const { width, height } = canvas;
    if (!width || !height) throw new Error("Invalid canvas size for TIFF.");
    const imageData = ctx.getImageData(0, 0, width, height);
    return { width, height, rgb: rgbaToRgb(imageData.data) };
  });

  const HEADER = 8;
  const IFD_SIZE = 2 + 12 * 12 + 4; // 158
  const extrasPerPage = 6 + 8 + 8; // bitsPerSample + xRes + yRes

  const pageOffsets: number[] = [];
  let cursor = HEADER;
  for (const page of pages) {
    pageOffsets.push(cursor);
    cursor += IFD_SIZE + page.rgb.length + extrasPerPage;
  }

  const parts: Uint8Array[] = [
    concat([
      new Uint8Array([0x49, 0x49]), // little-endian
      u16(42),
      u32(pageOffsets[0]),
    ]),
  ];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const ifdOffset = pageOffsets[i];
    const stripOffset = ifdOffset + IFD_SIZE;
    const bitsOffset = stripOffset + page.rgb.length;
    const xResOffset = bitsOffset + 6;
    const yResOffset = xResOffset + 8;
    const nextIfd = i + 1 < pages.length ? pageOffsets[i + 1] : 0;

    const entries: Uint8Array[] = [];
    const push = (tag: number, type: number, count: number, value: number) => {
      entries.push(concat([u16(tag), u16(type), u32(count), u32(value)]));
    };

    push(256, 3, 1, page.width);
    push(257, 3, 1, page.height);
    push(258, 3, 3, bitsOffset);
    push(259, 3, 1, 1);
    push(262, 3, 1, 2);
    push(273, 4, 1, stripOffset);
    push(277, 3, 1, 3);
    push(278, 3, 1, page.height);
    push(279, 4, 1, page.rgb.length);
    push(282, 5, 1, xResOffset);
    push(283, 5, 1, yResOffset);
    push(296, 3, 1, 2);

    parts.push(
      concat([
        u16(12),
        ...entries,
        u32(nextIfd),
        page.rgb,
        concat([u16(8), u16(8), u16(8)]),
        concat([u32(72), u32(1)]),
        concat([u32(72), u32(1)]),
      ]),
    );
  }

  return concat(parts);
}

export async function encodeTiffFromImageBlobs(blobs: Blob[]): Promise<Uint8Array> {
  const canvases: HTMLCanvasElement[] = [];
  for (const blob of blobs) {
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("Could not load image for TIFF encode."));
        el.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable.");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvases.push(canvas);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  return encodeTiffFromCanvases(canvases);
}
