import { textToPdf } from "./text-to-pdf";
import { fileToUint8Array } from "./read-file";
import { unzipEntries } from "./unzip";
import { extractPdfText } from "./extract-text";

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function epubToPdf(file: File): Promise<Uint8Array> {
  if (!/\.epub$/i.test(file.name)) throw new Error("Upload an .epub file.");
  const bytes = await fileToUint8Array(file);
  const entries = await unzipEntries(bytes);
  const decode = (d: Uint8Array) => new TextDecoder().decode(d);
  const chapters = entries
    .filter((e) => /\.(xhtml|html|htm)$/i.test(e.name) && !e.name.includes("META-INF"))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  if (!chapters.length) throw new Error("No HTML chapters found in this EPUB.");
  const text = chapters
    .map((c, i) => `--- Chapter file ${i + 1}: ${c.name} ---\n${stripHtml(decode(c.data))}`)
    .join("\n\n");
  return textToPdf(text || "(empty epub)", file.name.replace(/\.epub$/i, ""));
}

function crc32(buf: Uint8Array): number {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function u16(n: number) {
  const b = new Uint8Array(2);
  new DataView(b.buffer).setUint16(0, n, true);
  return b;
}
function u32(n: number) {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, true);
  return b;
}

function concat(parts: Uint8Array[]) {
  const len = parts.reduce((a, p) => a + p.length, 0);
  const out = new Uint8Array(len);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

/** Minimal store-only ZIP writer for EPUB packaging. */
function zipStore(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;
  const enc = new TextEncoder();

  for (const file of files) {
    const nameBytes = enc.encode(file.name);
    const crc = crc32(file.data);
    const local = concat([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(file.data.length),
      u32(file.data.length),
      u16(nameBytes.length),
      u16(0),
      nameBytes,
      file.data,
    ]);
    const central = concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(file.data.length),
      u32(file.data.length),
      u16(nameBytes.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBytes,
    ]);
    localParts.push(local);
    centralParts.push(central);
    offset += local.length;
  }

  const centralDir = concat(centralParts);
  const end = concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);
  return concat([...localParts, centralDir, end]);
}

export async function pdfToEpub(file: File): Promise<Uint8Array> {
  const extracted = await extractPdfText(await fileToUint8Array(file));
  const title = file.name.replace(/\.pdf$/i, "") || "myonlinepdfeditor.com Export";
  const body = extracted.fullText || "(no extractable text)";
  const enc = new TextEncoder();
  const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>${title.replace(/[<>&]/g, "")}</title></head>
<body>
<pre style="white-space:pre-wrap;font-family:serif">${body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</pre>
</body></html>`;
  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title.replace(/[<>&]/g, "")}</dc:title>
    <dc:language>en</dc:language>
    <dc:identifier id="id">myonlinepdfeditor.com-${Date.now()}</dc:identifier>
  </metadata>
  <manifest>
    <item id="ch1" href="chapter.xhtml" media-type="application/xhtml+xml"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
  <spine toc="ncx"><itemref idref="ch1"/></spine>
</package>`;
  const ncx = `<?xml version="1.0"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <docTitle><text>${title.replace(/[<>&]/g, "")}</text></docTitle>
  <navMap><navPoint id="n1" playOrder="1"><navLabel><text>Start</text></navLabel><content src="chapter.xhtml"/></navPoint></navMap>
</ncx>`;
  const container = `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`;

  return zipStore([
    { name: "mimetype", data: enc.encode("application/epub+zip") },
    { name: "META-INF/container.xml", data: enc.encode(container) },
    { name: "content.opf", data: enc.encode(opf) },
    { name: "toc.ncx", data: enc.encode(ncx) },
    { name: "chapter.xhtml", data: enc.encode(xhtml) },
  ]);
}
