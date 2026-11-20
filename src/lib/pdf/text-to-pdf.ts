import { PDFDocument, StandardFonts } from "@cantoo/pdf-lib";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 54;
const FONT_SIZE = 12;
const LINE_HEIGHT = FONT_SIZE * 1.35;

export function htmlishToText(html: string): string {
  if (typeof document === "undefined") {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  }

  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent ?? "").trim();
}

export function csvToFormattedText(csv: string): string {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const out: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === "," && !inQuotes) {
          out.push(current);
          current = "";
        } else {
          current += ch;
        }
      }
      out.push(current);
      return out;
    });

  if (rows.length === 0) return "";

  const colCount = Math.max(...rows.map((r) => r.length));
  const widths = Array.from({ length: colCount }, (_, col) =>
    Math.max(...rows.map((row) => (row[col] ?? "").length), 3),
  );

  const pad = (value: string, width: number) =>
    value + " ".repeat(Math.max(0, width - value.length));

  const lines = rows.map((row, rowIndex) =>
    row
      .map((cell, i) => pad(cell ?? "", widths[i]))
      .join(rowIndex === 0 ? " | " : "   "),
  );

  if (lines.length > 1) {
    const sep = widths.map((w) => "-".repeat(w)).join("-+-");
    lines.splice(1, 0, sep);
  }

  return lines.join("\n");
}

function wrapParagraph(
  paragraph: string,
  maxWidth: number,
  measure: (line: string) => number,
): string[] {
  if (!paragraph) return [""];

  const words = paragraph.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const next = `${current} ${words[i]}`;
    if (measure(next) <= maxWidth) {
      current = next;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

export async function textToPdf(text: string, title?: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  if (title) {
    pdfDoc.setTitle(title);
  }

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const maxWidth = PAGE_WIDTH - MARGIN * 2;
  const measure = (line: string) => font.widthOfTextAtSize(line, FONT_SIZE);

  const paragraphs = text.replace(/\r\n/g, "\n").split("\n");
  const wrappedLines: string[] = [];
  for (const paragraph of paragraphs) {
    const wrapped = wrapParagraph(paragraph, maxWidth, measure);
    wrappedLines.push(...wrapped);
  }

  if (wrappedLines.length === 0) {
    wrappedLines.push("");
  }

  const linesPerPage = Math.floor((PAGE_HEIGHT - MARGIN * 2) / LINE_HEIGHT);
  let lineIndex = 0;

  while (lineIndex < wrappedLines.length) {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - MARGIN - FONT_SIZE;

    for (let n = 0; n < linesPerPage && lineIndex < wrappedLines.length; n++) {
      const line = wrappedLines[lineIndex];
      if (line) {
        page.drawText(line, {
          x: MARGIN,
          y,
          size: FONT_SIZE,
          font,
        });
      }
      y -= LINE_HEIGHT;
      lineIndex++;
    }
  }

  return pdfDoc.save();
}