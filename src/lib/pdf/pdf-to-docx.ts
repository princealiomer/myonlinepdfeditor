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

function paragraphXml(text: string): string {
  const safe = escapeXml(text || " ");
  return `<w:p><w:r><w:t xml:space="preserve">${safe}</w:t></w:r></w:p>`;
}

/** Build a minimal .docx (OOXML) from extracted PDF text. */
export async function pdfToDocx(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const extracted = await extractPdfText(bytes);
  const bodyPars = extracted.pages.flatMap((page) => {
    const chunks = page.text
      ? page.text.split(/\n+/).map((line) => line.trim()).filter(Boolean)
      : [`(No extractable text on page ${page.page})`];
    return [
      paragraphXml(`Page ${page.page}`),
      ...chunks.map(paragraphXml),
      paragraphXml(""),
    ];
  });

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyPars.join("\n    ")}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
  </w:body>
</w:document>`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`;

  const zip = new JSZip();
  zip.file("[Content_Types].xml", contentTypes);
  zip.folder("_rels")?.file(".rels", rels);
  const word = zip.folder("word");
  word?.file("document.xml", documentXml);
  word?.folder("_rels")?.file("document.xml.rels", docRels);

  const out = await zip.generateAsync({ type: "uint8array" });
  return out;
}
