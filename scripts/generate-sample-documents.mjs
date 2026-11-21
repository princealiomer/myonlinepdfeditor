/**
 * Build sample office/PDF files for /sample-documents pages.
 * Formats mirror file-examples.com sample-documents-download catalog.
 * Generated locally (source site returns HTML interstitials to bots).
 */
import { mkdir, writeFile, stat } from "fs/promises";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const JSZip = require("jszip");
const { PDFDocument, StandardFonts, rgb } = require("@cantoo/pdf-lib");

const OUT = path.resolve("public/sample-documents");

function padTo(bytes, target) {
  if (bytes.length >= target) return bytes;
  const extra = Buffer.alloc(target - bytes.length, 0x20);
  return Buffer.concat([Buffer.from(bytes), extra]);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function zipBuffer(files) {
  const zip = new JSZip();
  for (const [name, content] of Object.entries(files)) {
    zip.file(name, content);
  }
  return Buffer.from(await zip.generateAsync({ type: "uint8array" }));
}

async function makePdf(targetBytes, label) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pagesNeeded = Math.max(1, Math.ceil(targetBytes / 2800));
  for (let i = 0; i < pagesNeeded; i++) {
    const page = pdf.addPage([612, 792]);
    page.drawText("myonlinepdfeditor.com sample PDF", {
      x: 48,
      y: 740,
      size: 18,
      font,
      color: rgb(0.35, 0.06, 0.18),
    });
    page.drawText(`${label} · page ${i + 1} of ${pagesNeeded}`, {
      x: 48,
      y: 710,
      size: 12,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
    const filler =
      "Sample paragraph for converter and upload testing. ".repeat(18);
    page.drawText(filler.slice(0, 90), {
      x: 48,
      y: 670,
      size: 10,
      font,
      color: rgb(0.25, 0.25, 0.25),
      maxWidth: 516,
      lineHeight: 14,
    });
  }
  let bytes = Buffer.from(await pdf.save());
  // Pad with PDF comment lines if still short.
  while (bytes.length < targetBytes) {
    const need = Math.min(4000, targetBytes - bytes.length);
    const comment = Buffer.from(
      `\n% sample-padding ${"x".repeat(Math.max(1, need - 20))}\n`,
    );
    bytes = Buffer.concat([bytes.slice(0, -7), comment, Buffer.from("\n%%EOF\n")]);
  }
  return bytes.slice(0, Math.max(bytes.length, targetBytes));
}

async function makeDocx(targetBytes, label) {
  const paragraphs = [];
  paragraphs.push(`Sample DOCX — ${label}`);
  paragraphs.push("Generated for myonlinepdfeditor.com sample-documents.");
  while (paragraphs.join(" ").length < targetBytes / 2) {
    paragraphs.push(
      "Lorem sample line for Word Open XML upload and conversion tests. ".repeat(4),
    );
  }
  const body = paragraphs
    .map(
      (p) =>
        `<w:p><w:r><w:t xml:space="preserve">${escapeXml(p)}</w:t></w:r></w:p>`,
    )
    .join("");
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${body}<w:sectPr/></w:body>
</w:document>`;
  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
  let buf = await zipBuffer({
    "[Content_Types].xml": contentTypes,
    "_rels/.rels": rels,
    "word/document.xml": documentXml,
  });
  if (buf.length < targetBytes) {
    // Re-pack with a large media part of spaces inside document.xml already grown;
    // append unused zip entry for padding.
    buf = await zipBuffer({
      "[Content_Types].xml": contentTypes,
      "_rels/.rels": rels,
      "word/document.xml": documentXml,
      "word/padding.txt": " ".repeat(targetBytes - buf.length + 64),
    });
  }
  return buf;
}

async function makeXlsx(targetBytes, label) {
  const rows = [];
  rows.push(`<row r="1"><c r="A1" t="inlineStr"><is><t>${escapeXml(label)}</t></is></c><c r="B1" t="inlineStr"><is><t>Sample</t></is></c></row>`);
  let r = 2;
  while (rows.join("").length < targetBytes / 3 && r < 4000) {
    rows.push(
      `<row r="${r}"><c r="A${r}" t="inlineStr"><is><t>Row ${r} sample cell text for spreadsheet tests</t></is></c><c r="B${r}"><v>${r}</v></c></row>`,
    );
    r++;
  }
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rows.join("")}</sheetData></worksheet>`;
  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Sample" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
  const wbRels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`;
  let buf = await zipBuffer({
    "[Content_Types].xml": contentTypes,
    "_rels/.rels": rels,
    "xl/workbook.xml": workbook,
    "xl/_rels/workbook.xml.rels": wbRels,
    "xl/worksheets/sheet1.xml": sheet,
  });
  if (buf.length < targetBytes) {
    buf = await zipBuffer({
      "[Content_Types].xml": contentTypes,
      "_rels/.rels": rels,
      "xl/workbook.xml": workbook,
      "xl/_rels/workbook.xml.rels": wbRels,
      "xl/worksheets/sheet1.xml": sheet,
      "xl/padding.txt": " ".repeat(targetBytes - buf.length + 64),
    });
  }
  return buf;
}

async function makePptx(targetBytes, label) {
  const slides = Math.max(1, Math.ceil(targetBytes / 12000));
  const contentTypesParts = [
    `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>`,
  ];
  const presRels = [];
  const files = {
    "[Content_Types].xml": "",
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`,
  };
  const sldIdLst = [];
  for (let i = 1; i <= slides; i++) {
    contentTypesParts.push(
      `<Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`,
    );
    presRels.push(
      `<Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>`,
    );
    sldIdLst.push(`<p:sldId id="${255 + i}" r:id="rId${i}"/>`);
    files[`ppt/slides/slide${i}.xml`] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree>
    <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
    <p:grpSpPr/>
    <p:sp>
      <p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr/>
      <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:t>${escapeXml(`${label} slide ${i}`)}</a:t></a:r></a:p></p:txBody>
    </p:sp>
  </p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
  }
  files["ppt/presentation.xml"] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldIdLst>${sldIdLst.join("")}</p:sldIdLst>
</p:presentation>`;
  files["ppt/_rels/presentation.xml.rels"] = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${presRels.join("")}</Relationships>`;
  files["[Content_Types].xml"] = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  ${contentTypesParts.join("")}
</Types>`;
  if (targetBytes > 50_000) {
    files["ppt/padding.txt"] = " ".repeat(Math.max(1024, targetBytes - 20_000));
  }
  return zipBuffer(files);
}

async function makeOdt(targetBytes, label) {
  const paras = [`<text:p>${escapeXml(label)}</text:p>`];
  while (paras.join("").length < targetBytes / 2) {
    paras.push(
      `<text:p>${escapeXml("OpenDocument sample paragraph for LibreOffice tests. ".repeat(6))}</text:p>`,
    );
  }
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2">
  <office:body><office:text>${paras.join("")}</office:text></office:body>
</office:document-content>`;
  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.text"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;
  const files = {
    "mimetype": "application/vnd.oasis.opendocument.text",
    "content.xml": content,
    "META-INF/manifest.xml": manifest,
  };
  if (targetBytes > 20_000) files["padding.txt"] = " ".repeat(targetBytes / 2);
  return zipBuffer(files);
}

async function makeOds(targetBytes, label) {
  const cells = [`<table:table-row><table:table-cell office:value-type="string"><text:p>${escapeXml(label)}</text:p></table:table-cell></table:table-row>`];
  let i = 0;
  while (cells.join("").length < targetBytes / 2 && i < 3000) {
    i++;
    cells.push(
      `<table:table-row><table:table-cell office:value-type="string"><text:p>Cell ${i} sample</text:p></table:table-cell><table:table-cell office:value-type="float" office:value="${i}"><text:p>${i}</text:p></table:table-cell></table:table-row>`,
    );
  }
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2">
  <office:body><office:spreadsheet><table:table table:name="Sample">${cells.join("")}</table:table></office:spreadsheet></office:body>
</office:document-content>`;
  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;
  const files = {
    mimetype: "application/vnd.oasis.opendocument.spreadsheet",
    "content.xml": content,
    "META-INF/manifest.xml": manifest,
  };
  if (targetBytes > 20_000) files["padding.txt"] = " ".repeat(targetBytes / 2);
  return zipBuffer(files);
}

async function makeOdp(targetBytes, label) {
  const pages = Math.max(1, Math.ceil(targetBytes / 8000));
  const draws = [];
  for (let i = 1; i <= pages; i++) {
    draws.push(
      `<draw:page draw:name="page${i}" draw:style-name="dp1"><draw:frame><draw:text-box><text:p>${escapeXml(`${label} page ${i}`)}</text:p></draw:text-box></draw:frame></draw:page>`,
    );
  }
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2">
  <office:body><office:presentation>${draws.join("")}</office:presentation></office:body>
</office:document-content>`;
  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.presentation"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;
  const files = {
    mimetype: "application/vnd.oasis.opendocument.presentation",
    "content.xml": content,
    "META-INF/manifest.xml": manifest,
  };
  if (targetBytes > 20_000) files["padding.txt"] = " ".repeat(targetBytes / 2);
  return zipBuffer(files);
}

function makeRtf(targetBytes, label) {
  let body = `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\f0\\fs24 ${label}\\par Sample RTF for myonlinepdfeditor.com.\\par `;
  while (Buffer.byteLength(body, "utf8") < targetBytes - 16) {
    body += "Sample RTF line for upload and conversion testing. ";
  }
  body += "}";
  return padTo(Buffer.from(body, "utf8"), targetBytes);
}

/** Legacy .doc as RTF payload (Word opens RTF content in .doc). */
function makeDoc(targetBytes, label) {
  return makeRtf(targetBytes, `DOC sample (${label})`);
}

/** Legacy .xls as SpreadsheetML 2003 XML (Excel opens). */
function makeXls(targetBytes, label) {
  let rows = `<Row><Cell><Data ss:Type="String">${escapeXml(label)}</Data></Cell></Row>`;
  let i = 0;
  while (Buffer.byteLength(rows, "utf8") < targetBytes / 2 && i < 5000) {
    i++;
    rows += `<Row><Cell><Data ss:Type="String">Row ${i}</Data></Cell><Cell><Data ss:Type="Number">${i}</Data></Cell></Row>`;
  }
  const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Sample"><Table>${rows}</Table></Worksheet>
</Workbook>`;
  return padTo(Buffer.from(xml, "utf8"), targetBytes);
}

/** Legacy .ppt as a minimal HTML presentation renamed for upload testing. */
function makePpt(targetBytes, label) {
  let html = `<html><head><meta charset="utf-8"><title>${escapeXml(label)}</title></head><body><h1>${escapeXml(label)}</h1>`;
  while (Buffer.byteLength(html, "utf8") < targetBytes - 32) {
    html += `<p>Sample PowerPoint-legacy placeholder for converter testing.</p>`;
  }
  html += `</body></html>`;
  return padTo(Buffer.from(html, "utf8"), targetBytes);
}

const SIZES = [
  { slug: "100kb", label: "100 kB", bytes: 100 * 1024 },
  { slug: "500kb", label: "500 kB", bytes: 500 * 1024 },
  { slug: "1mb", label: "1 MB", bytes: 1024 * 1024 },
];

const PDF_SIZES = [
  { slug: "150kb", label: "150 kB", bytes: 150 * 1024 },
  { slug: "500kb", label: "500 kB", bytes: 500 * 1024 },
  { slug: "1mb", label: "1 MB", bytes: 1024 * 1024 },
];

const FORMATS = [
  { format: "pdf", ext: "pdf", mime: "application/pdf", sizes: PDF_SIZES, build: makePdf },
  { format: "doc", ext: "doc", mime: "application/msword", sizes: SIZES, build: async (b, l) => makeDoc(b, l) },
  { format: "docx", ext: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", sizes: SIZES, build: makeDocx },
  { format: "xls", ext: "xls", mime: "application/vnd.ms-excel", sizes: SIZES, build: async (b, l) => makeXls(b, l) },
  { format: "xlsx", ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", sizes: SIZES, build: makeXlsx },
  { format: "ppt", ext: "ppt", mime: "application/vnd.ms-powerpoint", sizes: SIZES, build: async (b, l) => makePpt(b, l) },
  { format: "pptx", ext: "pptx", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation", sizes: SIZES, build: makePptx },
  { format: "odt", ext: "odt", mime: "application/vnd.oasis.opendocument.text", sizes: SIZES, build: makeOdt },
  { format: "ods", ext: "ods", mime: "application/vnd.oasis.opendocument.spreadsheet", sizes: SIZES, build: makeOds },
  { format: "odp", ext: "odp", mime: "application/vnd.oasis.opendocument.presentation", sizes: SIZES, build: makeOdp },
  { format: "rtf", ext: "rtf", mime: "application/rtf", sizes: SIZES, build: async (b, l) => makeRtf(b, l) },
];

await mkdir(OUT, { recursive: true });

const manifest = [];

for (const fmt of FORMATS) {
  const dir = path.join(OUT, fmt.format);
  await mkdir(dir, { recursive: true });
  for (const size of fmt.sizes) {
    const filename = `sample-${fmt.format}-${size.slug}.${fmt.ext}`;
    const outPath = path.join(dir, filename);
    const buf = await fmt.build(size.bytes, `${fmt.format.toUpperCase()} ${size.label}`);
    await writeFile(outPath, buf);
    const st = await stat(outPath);
    console.log(filename, st.size);
    manifest.push({
      format: fmt.format,
      ext: fmt.ext,
      mime: fmt.mime,
      slug: size.slug,
      label: size.label,
      filename,
      path: `/sample-documents/${fmt.format}/${filename}`,
      bytes: st.size,
    });
  }
}

await writeFile(
  path.join(OUT, "manifest.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), files: manifest }, null, 2),
);
console.log("Wrote", manifest.length, "files + manifest.json");
