import { textToPdf, csvToFormattedText } from "./text-to-pdf";
import { fileToUint8Array } from "./read-file";
import { unzipEntries } from "./unzip";

function sheetToCsv(xml: string): string {
  const rows: string[] = [];
  const rowRe = /<row\b[^>]*>([\s\S]*?)<\/row>/gi;
  let rowMatch: RegExpExecArray | null;
  while ((rowMatch = rowRe.exec(xml))) {
    const cells: string[] = [];
    const cellRe = /<c\b[^>]*>(?:[\s\S]*?<v>([\s\S]*?)<\/v>)?/gi;
    let cellMatch: RegExpExecArray | null;
    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      const raw = (cellMatch[1] || "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .trim();
      cells.push(raw.includes(",") ? `"${raw}"` : raw);
    }
    if (cells.some((c) => c)) rows.push(cells.join(","));
  }
  return rows.join("\n");
}

function sharedStrings(xml: string): string[] {
  const values: string[] = [];
  const re = /<si>([\s\S]*?)<\/si>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml))) {
    const textParts = [...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gi)].map((m) =>
      m[1]
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&"),
    );
    values.push(textParts.join(""));
  }
  return values;
}

function resolveShared(csv: string, shared: string[]): string {
  return csv.replace(/\b(\d+)\b/g, (full, num, offset, whole) => {
    // Only replace bare numeric cells that look like shared indexes when shared exists
    if (!shared.length) return full;
    const idx = Number(num);
    if (!Number.isInteger(idx) || idx < 0 || idx >= shared.length) return full;
    // Avoid replacing numbers inside longer tokens
    const before = whole[offset - 1];
    const after = whole[offset + full.length];
    if ((before && /[\w.]/.test(before)) || (after && /[\w.]/.test(after))) return full;
    return shared[idx].includes(",") ? `"${shared[idx]}"` : shared[idx];
  });
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
    let csv = sheetToCsv(decode(sheet.data));
    if (shared.length) csv = resolveShared(csv, shared);
    return `Sheet ${index + 1}\n${csvToFormattedText(csv || "(empty sheet)")}`;
  });

  return textToPdf(sections.join("\n\n"), file.name.replace(/\.xlsx$/i, ""));
}
