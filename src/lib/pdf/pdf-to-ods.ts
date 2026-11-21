import { extractPdfText } from "./extract-text";
import { fileToUint8Array } from "./read-file";
import { encodeUtf8, zipStore } from "./zip-store";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cellXml(text: string): string {
  const safe = escapeXml(text || " ");
  return `<table:table-cell office:value-type="string"><text:p>${safe}</text:p></table:table-cell>`;
}

/** Minimal OpenDocument Spreadsheet (.ods) from extractable PDF text. */
export async function pdfToOds(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const extracted = await extractPdfText(bytes);

  const rows = extracted.pages.flatMap((page) => {
    const lines = page.text
      ? page.text.split(/\n+/).map((l) => l.trim()).filter(Boolean)
      : [`(No extractable text on page ${page.page})`];
    return [
      `<table:table-row>${cellXml(`Page ${page.page}`)}</table:table-row>`,
      ...lines.map((line) => {
        // Split on multiple spaces / tabs into columns when it looks tabular
        const cols = line.split(/\s{2,}|\t/).map((c) => c.trim()).filter(Boolean);
        if (cols.length > 1) {
          return `<table:table-row>${cols.map(cellXml).join("")}</table:table-row>`;
        }
        return `<table:table-row>${cellXml(line)}</table:table-row>`;
      }),
      `<table:table-row>${cellXml(" ")}</table:table-row>`,
    ];
  });

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  office:version="1.2">
  <office:body>
    <office:spreadsheet>
      <table:table table:name="Sheet1">
        ${rows.join("\n        ")}
      </table:table>
    </office:spreadsheet>
  </office:body>
</office:document-content>`;

  const meta = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" office:version="1.2">
  <office:meta/>
</office:document-meta>`;

  const styles = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" office:version="1.2">
  <office:styles/>
</office:document-styles>`;

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;

  // mimetype must be first and uncompressed for valid ODF packages.
  return zipStore([
    { name: "mimetype", data: encodeUtf8("application/vnd.oasis.opendocument.spreadsheet") },
    { name: "content.xml", data: encodeUtf8(content) },
    { name: "styles.xml", data: encodeUtf8(styles) },
    { name: "meta.xml", data: encodeUtf8(meta) },
    { name: "META-INF/manifest.xml", data: encodeUtf8(manifest) },
  ]);
}
