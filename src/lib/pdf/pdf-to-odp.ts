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

/** Minimal OpenDocument Presentation (.odp) — one slide per PDF page. */
export async function pdfToOdp(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const extracted = await extractPdfText(bytes);

  const slides = extracted.pages
    .map((page) => {
      const lines = page.text
        ? page.text.split(/\n+/).map((l) => l.trim()).filter(Boolean)
        : [`(No extractable text on page ${page.page})`];
      const paragraphs = [
        `<text:p text:style-name="Standard">${escapeXml(`Page ${page.page}`)}</text:p>`,
        ...lines.slice(0, 40).map(
          (line) =>
            `<text:p text:style-name="Standard">${escapeXml(line || " ")}</text:p>`,
        ),
      ].join("\n          ");
      return `<draw:page draw:name="page${page.page}" draw:style-name="dp1" draw:master-page-name="Standard">
        <draw:frame svg:width="25cm" svg:height="16cm" svg:x="1cm" svg:y="1cm">
          <draw:text-box>
            ${paragraphs}
          </draw:text-box>
        </draw:frame>
      </draw:page>`;
    })
    .join("\n      ");

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
  xmlns:presentation="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0"
  xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
  office:version="1.2">
  <office:automatic-styles>
    <style:style style:name="dp1" style:family="drawing-page"/>
  </office:automatic-styles>
  <office:body>
    <office:presentation>
      ${slides}
    </office:presentation>
  </office:body>
</office:document-content>`;

  const meta = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" office:version="1.2">
  <office:meta/>
</office:document-meta>`;

  const styles = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
  xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
  xmlns:presentation="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0"
  xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
  office:version="1.2">
  <office:master-styles>
    <style:master-page style:name="Standard" style:page-layout-name="PM1">
      <style:drawing-page-properties presentation:background-visible="true"/>
    </style:master-page>
  </office:master-styles>
  <office:styles/>
</office:document-styles>`;

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.presentation"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;

  // mimetype must be first and uncompressed for valid ODF packages.
  return zipStore([
    { name: "mimetype", data: encodeUtf8("application/vnd.oasis.opendocument.presentation") },
    { name: "content.xml", data: encodeUtf8(content) },
    { name: "styles.xml", data: encodeUtf8(styles) },
    { name: "meta.xml", data: encodeUtf8(meta) },
    { name: "META-INF/manifest.xml", data: encodeUtf8(manifest) },
  ]);
}
