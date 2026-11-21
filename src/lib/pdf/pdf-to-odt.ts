import JSZip from "jszip";
import { extractPdfText } from "./extract-text";
import { fileToUint8Array } from "./read-file";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Minimal OpenDocument Text (.odt) from extractable PDF text. */
export async function pdfToOdt(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const extracted = await extractPdfText(bytes);
  const paragraphs = extracted.pages
    .flatMap((page) => {
      const lines = page.text
        ? page.text.split(/\n+/).map((l) => l.trim()).filter(Boolean)
        : [`(No extractable text on page ${page.page})`];
      return [`Page ${page.page}`, ...lines, ""];
    })
    .map(
      (line) =>
        `<text:p text:style-name="Standard">${escapeXml(line || " ")}</text:p>`,
    )
    .join("\n");

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  office:version="1.2">
  <office:body>
    <office:text>
      ${paragraphs}
    </office:text>
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
  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.text"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;

  const zip = new JSZip();
  zip.file("mimetype", "application/vnd.oasis.opendocument.text", {
    compression: "STORE",
  });
  zip.file("content.xml", content);
  zip.file("styles.xml", styles);
  zip.file("meta.xml", meta);
  zip.folder("META-INF")?.file("manifest.xml", manifest);

  return zip.generateAsync({ type: "uint8array" });
}
