import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";
import { renderPdfPage } from "./render";
import { canvasToPngBytes } from "./decode-image";

const COARSE_MIN = -10;
const COARSE_MAX = 10;
const COARSE_STEP = 0.5;
const FINE_RADIUS = 0.75;
const FINE_STEP = 0.25;
const SAMPLE_MAX = 480;
const INK_LUMA = 200;

/** Variance of horizontal (or vertical) ink projection — peaks when lines are aligned. */
function projectionVariance(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  axis: "row" | "col",
): number {
  const len = axis === "row" ? height : width;
  const sums = new Float64Array(len);

  if (axis === "row") {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      const row = y * width * 4;
      for (let x = 0; x < width; x++) {
        const i = row + x * 4;
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        if (lum < INK_LUMA) sum += 255 - lum;
      }
      sums[y] = sum;
    }
  } else {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let y = 0; y < height; y++) {
        const i = (y * width + x) * 4;
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        if (lum < INK_LUMA) sum += 255 - lum;
      }
      sums[x] = sum;
    }
  }

  let mean = 0;
  for (let i = 0; i < len; i++) mean += sums[i];
  mean /= len || 1;
  let variance = 0;
  for (let i = 0; i < len; i++) {
    const d = sums[i] - mean;
    variance += d * d;
  }
  return variance;
}

/** Prefer strong horizontal text lines; vertical projection is a tie-breaker. */
function alignmentScore(data: Uint8ClampedArray, width: number, height: number): number {
  const row = projectionVariance(data, width, height, "row");
  const col = projectionVariance(data, width, height, "col");
  return row * 2 + col;
}

function scoreAtAngle(
  sample: HTMLCanvasElement,
  probe: HTMLCanvasElement,
  pctx: CanvasRenderingContext2D,
  angle: number,
  cropW: number,
  cropH: number,
): number {
  const pad = probe.width;
  pctx.save();
  pctx.fillStyle = "#ffffff";
  pctx.fillRect(0, 0, pad, pad);
  pctx.translate(pad / 2, pad / 2);
  pctx.rotate((-angle * Math.PI) / 180);
  pctx.drawImage(sample, -sample.width / 2, -sample.height / 2);
  pctx.restore();

  const x0 = Math.floor((pad - cropW) / 2);
  const y0 = Math.floor((pad - cropH) / 2);
  const imageData = pctx.getImageData(x0, y0, cropW, cropH);
  return alignmentScore(imageData.data, cropW, cropH);
}

function searchAngles(
  sample: HTMLCanvasElement,
  probe: HTMLCanvasElement,
  pctx: CanvasRenderingContext2D,
  cropW: number,
  cropH: number,
  min: number,
  max: number,
  step: number,
): { angle: number; score: number } {
  let bestAngle = 0;
  let bestScore = -Infinity;
  for (let angle = min; angle <= max + 1e-9; angle += step) {
    const score = scoreAtAngle(sample, probe, pctx, angle, cropW, cropH);
    if (score > bestScore) {
      bestScore = score;
      bestAngle = angle;
    }
  }
  return { angle: bestAngle, score: bestScore };
}

function estimateSkewDegrees(canvas: HTMLCanvasElement): number {
  const srcW = canvas.width;
  const srcH = canvas.height;
  if (!srcW || !srcH) return 0;

  const scale = Math.min(1, SAMPLE_MAX / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const sample = document.createElement("canvas");
  sample.width = w;
  sample.height = h;
  const sctx = sample.getContext("2d", { willReadFrequently: true });
  if (!sctx) return 0;
  sctx.drawImage(canvas, 0, 0, w, h);

  const pad = Math.ceil(Math.sqrt(w * w + h * h));
  const probe = document.createElement("canvas");
  probe.width = pad;
  probe.height = pad;
  const pctx = probe.getContext("2d", { willReadFrequently: true });
  if (!pctx) return 0;

  const coarse = searchAngles(
    sample,
    probe,
    pctx,
    w,
    h,
    COARSE_MIN,
    COARSE_MAX,
    COARSE_STEP,
  );
  const fine = searchAngles(
    sample,
    probe,
    pctx,
    w,
    h,
    coarse.angle - FINE_RADIUS,
    coarse.angle + FINE_RADIUS,
    FINE_STEP,
  );

  const bestAngle = fine.angle;
  // Ignore tiny noise angles
  if (Math.abs(bestAngle) < 0.2) return 0;
  // Round to one decimal for stable reporting / apply
  return Math.round(bestAngle * 10) / 10;
}

function rotateCanvas(source: HTMLCanvasElement, angleDeg: number): HTMLCanvasElement {
  if (!angleDeg) return source;
  const rad = (-angleDeg * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const w = source.width;
  const h = source.height;
  const outW = Math.ceil(w * cos + h * sin);
  const outH = Math.ceil(w * sin + h * cos);

  const out = document.createElement("canvas");
  out.width = outW;
  out.height = outH;
  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outW, outH);
  ctx.translate(outW / 2, outH / 2);
  ctx.rotate(rad);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, -w / 2, -h / 2);
  return out;
}

/**
 * Deskew scanned PDF pages by detecting small skew angles and re-embedding
 * upright raster pages. Large 90° mistakes should still use Rotate PDF.
 */
export async function straightenPdf(file: File): Promise<{
  bytes: Uint8Array;
  angles: number[];
}> {
  const bytes = await fileToUint8Array(file);
  let pageCount: number;
  try {
    const probe = await PDFDocument.load(bytes, { ignoreEncryption: true });
    pageCount = probe.getPageCount();
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }
  if (!pageCount) throw new Error("PDF has no pages.");

  const outDoc = await PDFDocument.create();
  const angles: number[] = [];

  for (let page = 1; page <= pageCount; page++) {
    const { canvas } = await renderPdfPage(bytes, page, 1.75);
    const angle = estimateSkewDegrees(canvas);
    angles.push(angle);
    const upright = rotateCanvas(canvas, angle);
    const png = await canvasToPngBytes(upright);
    const image = await outDoc.embedPng(png);
    const pdfPage = outDoc.addPage([image.width, image.height]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return { bytes: await outDoc.save(), angles };
}
