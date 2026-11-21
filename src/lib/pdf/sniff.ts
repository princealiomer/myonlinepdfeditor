/** Detect file kind from magic bytes (first few bytes), not the filename. */

export type SniffedKind =
  | "pdf"
  | "zip" // OOXML / ODF / EPUB / many Office packages
  | "ole" // legacy .doc / .xls / .ppt
  | "jpeg"
  | "png"
  | "gif"
  | "webp"
  | "tiff"
  | "bmp"
  | "heic"
  | "svg"
  | "text"
  | "unknown";

const ZIP_EXTS = new Set([
  ".docx",
  ".docm",
  ".xlsx",
  ".xlsm",
  ".pptx",
  ".pptm",
  ".odt",
  ".ods",
  ".odp",
  ".odg",
  ".epub",
  ".zip",
]);

const OLE_EXTS = new Set([".doc", ".xls", ".ppt", ".pub", ".vsd"]);

const IMAGE_KIND_BY_EXT: Record<string, SniffedKind> = {
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".png": "png",
  ".gif": "gif",
  ".webp": "webp",
  ".tif": "tiff",
  ".tiff": "tiff",
  ".bmp": "bmp",
  ".heic": "heic",
  ".heif": "heic",
  ".svg": "svg",
};

const TEXT_EXTS = new Set([
  ".txt",
  ".md",
  ".markdown",
  ".html",
  ".htm",
  ".csv",
  ".xml",
  ".rtf",
  ".eml",
]);

function fileExt(name: string): string {
  const lower = name.toLowerCase();
  const i = lower.lastIndexOf(".");
  return i >= 0 ? lower.slice(i) : "";
}

function startsWith(bytes: Uint8Array, sig: number[]): boolean {
  if (bytes.length < sig.length) return false;
  return sig.every((b, i) => bytes[i] === b);
}

function asciiAt(bytes: Uint8Array, offset: number, text: string): boolean {
  if (bytes.length < offset + text.length) return false;
  for (let i = 0; i < text.length; i++) {
    if (bytes[offset + i] !== text.charCodeAt(i)) return false;
  }
  return true;
}

/** Sniff the first bytes of a File. */
export async function sniffFileKind(file: File): Promise<SniffedKind> {
  const slice = file.slice(0, 64);
  const buffer = await slice.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (!bytes.length) return "unknown";

  // PDF
  if (asciiAt(bytes, 0, "%PDF")) return "pdf";

  // ZIP / OOXML / ODF / EPUB
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) || startsWith(bytes, [0x50, 0x4b, 0x05, 0x06])) {
    return "zip";
  }

  // OLE compound (legacy Office)
  if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) {
    return "ole";
  }

  // Images
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpeg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (asciiAt(bytes, 0, "GIF87a") || asciiAt(bytes, 0, "GIF89a")) return "gif";
  if (asciiAt(bytes, 0, "RIFF") && asciiAt(bytes, 8, "WEBP")) return "webp";
  if (
    startsWith(bytes, [0x49, 0x49, 0x2a, 0x00]) ||
    startsWith(bytes, [0x4d, 0x4d, 0x00, 0x2a])
  ) {
    return "tiff";
  }
  if (startsWith(bytes, [0x42, 0x4d])) return "bmp";
  // HEIC/HEIF often start with ftyp....heic / heif / mif1
  if (asciiAt(bytes, 4, "ftyp")) {
    const brand = String.fromCharCode(
      bytes[8] || 0,
      bytes[9] || 0,
      bytes[10] || 0,
      bytes[11] || 0,
    ).toLowerCase();
    if (
      brand.includes("heic") ||
      brand.includes("heif") ||
      brand.includes("mif1") ||
      brand.includes("msf1")
    ) {
      return "heic";
    }
  }
  if (asciiAt(bytes, 0, "<svg") || asciiAt(bytes, 0, "<?xml")) {
    // Could be SVG or generic XML — treat leading <svg as svg; xml alone stays text-ish
    const head = new TextDecoder("utf-8", { fatal: false })
      .decode(bytes)
      .trimStart()
      .toLowerCase();
    if (head.startsWith("<svg") || head.includes("<svg")) return "svg";
  }

  // UTF-8 / UTF-16 BOM or printable text
  if (
    startsWith(bytes, [0xef, 0xbb, 0xbf]) ||
    startsWith(bytes, [0xff, 0xfe]) ||
    startsWith(bytes, [0xfe, 0xff])
  ) {
    return "text";
  }
  const sample = bytes.subarray(0, Math.min(bytes.length, 32));
  let printable = 0;
  for (const b of sample) {
    if (b === 9 || b === 10 || b === 13 || (b >= 32 && b < 127)) printable++;
  }
  if (sample.length && printable / sample.length > 0.85) return "text";

  return "unknown";
}

/**
 * Whether sniffed content is compatible with the accept= string / claimed extension.
 * Returns null when no magic check applies (unknown / permissive accept).
 */
export function sniffMatchesAccept(
  kind: SniffedKind,
  fileName: string,
  accept: string | undefined,
): boolean | null {
  if (!accept || accept.trim() === "*" || accept.includes("*/*")) return null;
  if (kind === "unknown") return null; // don't hard-fail exotic formats

  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  const ext = fileExt(fileName);

  const expectsPdf = tokens.some(
    (t) => t === ".pdf" || t === "application/pdf" || t === "pdf",
  );
  const expectsImage = tokens.some(
    (t) =>
      t.startsWith("image/") ||
      [".jpg", ".jpeg", ".png", ".gif", ".webp", ".tif", ".tiff", ".bmp", ".heic", ".heif", ".svg"].includes(
        t,
      ),
  );
  const expectsZipOffice = tokens.some(
    (t) => ZIP_EXTS.has(t) || t.includes("officedocument") || t.includes("opendocument"),
  );
  const expectsOle = tokens.some((t) => OLE_EXTS.has(t));
  const expectsText = tokens.some(
    (t) =>
      TEXT_EXTS.has(t) ||
      t.startsWith("text/") ||
      t === "application/xml" ||
      t === "application/json",
  );

  if (expectsPdf && !expectsImage && !expectsZipOffice && !expectsText) {
    return kind === "pdf";
  }

  if (expectsImage && !expectsPdf) {
    if (kind === "heic" && (ext === ".heic" || ext === ".heif" || tokens.some((t) => t.includes("heic") || t.includes("heif")))) {
      return true;
    }
    const expected = IMAGE_KIND_BY_EXT[ext];
    if (expected) return kind === expected || (kind === "jpeg" && expected === "jpeg");
    return [
      "jpeg",
      "png",
      "gif",
      "webp",
      "tiff",
      "bmp",
      "heic",
      "svg",
    ].includes(kind);
  }

  if (expectsZipOffice && !expectsPdf) {
    // Renamed PDF pretending to be DOCX, etc.
    if (kind === "pdf") return false;
    if (kind === "ole" && expectsOle) return true;
    return kind === "zip" || kind === "ole";
  }

  if (expectsOle && !expectsZipOffice) {
    return kind === "ole";
  }

  if (expectsText && !expectsPdf && !expectsImage) {
    return kind === "text" || kind === "svg";
  }

  // Mixed accept lists: if PDF is allowed and content is PDF, ok; etc.
  if (kind === "pdf") return expectsPdf || tokens.some((t) => t.includes("pdf"));
  if (kind === "zip") return expectsZipOffice || expectsPdf === false;
  if (["jpeg", "png", "gif", "webp", "tiff", "bmp", "heic", "svg"].includes(kind)) {
    return expectsImage;
  }
  if (kind === "text") return expectsText;
  if (kind === "ole") return expectsOle || expectsZipOffice;

  return null;
}

export async function validateFileMagic(
  file: File,
  accept: string | undefined,
): Promise<{ ok: boolean; kind: SniffedKind; reason?: string }> {
  const kind = await sniffFileKind(file);
  const match = sniffMatchesAccept(kind, file.name, accept);
  if (match === false) {
    return {
      ok: false,
      kind,
      reason: `${file.name} does not match its contents (detected ${kind}). Use a real ${acceptHintShort(accept)} file.`,
    };
  }
  return { ok: true, kind };
}

function acceptHintShort(accept: string | undefined): string {
  if (!accept) return "supported";
  const ext = accept
    .split(",")
    .map((t) => t.trim())
    .find((t) => t.startsWith("."));
  return ext || "supported";
}
