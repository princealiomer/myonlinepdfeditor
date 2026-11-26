import { textToPdf, csvToFormattedText } from "./text-to-pdf";
import { fileToUint8Array } from "./read-file";
import { unzipEntries } from "./unzip";

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function csvEscape(value: string): string {
  return value.includes(",") || value.includes('"') || value.includes("\n")
    ? `"${value.replace(/"/g, '""')}"`
    : value;
}

function sharedStrings(xml: string): string[] {
  const values: string[] = [];
  const re = /<si>([\s\S]*?)<\/si>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml))) {
    const textParts = [...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gi)].map((m) =>
      decodeXmlEntities(m[1]),
    );
    values.push(textParts.join(""));
  }
  return values;
}

/**
 * Parse sheet XML into CSV. Shared-string cells (`t="s"`) are resolved from the
 * shared string table; numeric / other cells keep their raw `<v>` value.
 */
function sheetToCsv(xml: string, shared: string[]): string {
  const rows: string[] = [];
  const rowRe = /<row\b[^>]*>([\s\S]*?)<\/row>/gi;
  let rowMatch: RegExpExecArray | null;
  while ((rowMatch = rowRe.exec(xml))) {
    const cells: string[] = [];
    // Capture the full <c ...>...</c> (or self-closing) including attributes.
    const cellRe = /<c\b([^>]*)(?:\/>|>([\s\S]*?)<\/c>)/gi;
    let cellMatch: RegExpExecArray | null;
    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      const attrs = cellMatch[1] || "";
      const body = cellMatch[2] || "";
      const typeMatch = /\bt="([^"]*)"/.exec(attrs);
      const cellType = (typeMatch?.[1] || "").toLowerCase();

      let value = "";
      if (cellType === "s") {
        const vMatch = /<v>([\s\S]*?)<\/v>/i.exec(body);
        const idx = Number((vMatch?.[1] || "").trim());
        value =
          Number.isInteger(idx) && idx >= 0 && idx < shared.length
            ? shared[idx]
            : (vMatch?.[1] || "").trim();
      } else if (cellType === "inlineStr" || cellType === "str") {
        const inline = [...body.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gi)]
          .map((m) => decodeXmlEntities(m[1]))
          .join("");
        value = inline || "";
      } else if (cellType === "b") {
        const vMatch = /<v>([\s\S]*?)<\/v>/i.exec(body);
        value = (vMatch?.[1] || "").trim() === "1" ? "TRUE" : "FALSE";
      } else {
        // Default / numeric / date serial — keep the literal value, do not map through shared strings.
        const vMatch = /<v>([\s\S]*?)<\/v>/i.exec(body);
        value = decodeXmlEntities((vMatch?.[1] || "").trim());
      }

      cells.push(csvEscape(value));
    }
    if (cells.some((c) => c)) rows.push(cells.join(","));
  }
  return rows.join("\n");
}

/** Convert .xlsx sheet text into a PDF (layout is tabular text, not Excel formatting). */
export async function excelToPdf(file: File): Promise<Uint8Array> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv") || name.endsWith(".txt")) {
    const text = await file.text();
    return textToPdf(csvToFormattedText(text), file.name);
  }
  if (!name.endsWith(".xlsx")) {
    throw new Error(
      "Upload an .xlsx file (or CSV). Legacy .xls should be saved as .xlsx first.",
    );
  }

  const decode = (data: Uint8Array) => new TextDecoder().decode(data);
  const bytes = await fileToUint8Array(file);
  const entries = await unzipEntries(bytes);
  const sharedEntry = entries.find((e) => e.name === "xl/sharedStrings.xml");
  const shared = sharedEntry ? sharedStrings(decode(sharedEntry.data)) : [];
  const sheets = entries
    .filter((e) => /^xl\/worksheets\/sheet\d+\.xml$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  if (!sheets.length) throw new Error("No worksheets found in this Excel file.");

  const sections = sheets.map((sheet, index) => {
    const csv = sheetToCsv(decode(sheet.data), shared);
    return `Sheet ${index + 1}\n${csvToFormattedText(csv || "(empty sheet)")}`;
  });

  return textToPdf(sections.join("\n\n"), file.name.replace(/\.xlsx$/i, ""));
}
