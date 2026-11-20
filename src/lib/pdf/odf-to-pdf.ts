import { textToPdf, csvToFormattedText } from "./text-to-pdf";
import { fileToUint8Array } from "./read-file";
import { unzipEntries } from "./unzip";

function stripXml(xml: string): string {
  return xml
    .replace(/<text:line-break\b[^/]*\/>/gi, "\n")
    .replace(/<\/text:p>/gi, "\n")
    .replace(/<\/text:h>/gi, "\n\n")
    .replace(/<text:tab\b[^/]*\/>/gi, "\t")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function tableToCsv(xml: string): string {
  const rows: string[] = [];
  const rowRe = /<table:table-row\b[^>]*>([\s\S]*?)<\/table:table-row>/gi;
  let rowMatch: RegExpExecArray | null;
  while ((rowMatch = rowRe.exec(xml))) {
    const cells: string[] = [];
    const cellRe =
      /<table:table-cell\b[^>]*>([\s\S]*?)<\/table:table-cell>/gi;
    let cellMatch: RegExpExecArray | null;
    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      const text = stripXml(cellMatch[1]).replace(/\n/g, " ").trim();
      cells.push(text.includes(",") ? `"${text.replace(/"/g, '""')}"` : text);
    }
    if (cells.some((c) => c)) rows.push(cells.join(","));
  }
  return rows.join("\n");
}

/** Convert ODT/ODS/ODP/ODG (OpenDocument) ZIP packages to a text-based PDF. */
export async function odfToPdf(file: File): Promise<Uint8Array> {
  const name = file.name.toLowerCase();
  if (!/\.(odt|ods|odp|odg)$/i.test(name)) {
    throw new Error("Upload an OpenDocument file (.odt, .ods, .odp, or .odg).");
  }
  const bytes = await fileToUint8Array(file);
  const entries = await unzipEntries(bytes);
  const decode = (data: Uint8Array) => new TextDecoder().decode(data);
  const content = entries.find((e) => e.name === "content.xml");
  if (!content) throw new Error("Invalid OpenDocument file (missing content.xml).");
  const xml = decode(content.data);

  let body: string;
  if (name.endsWith(".ods")) {
    body = csvToFormattedText(tableToCsv(xml) || "(empty spreadsheet)");
  } else {
    body = stripXml(xml) || "(empty document)";
  }

  return textToPdf(body, file.name.replace(/\.(odt|ods|odp|odg)$/i, ""));
}
