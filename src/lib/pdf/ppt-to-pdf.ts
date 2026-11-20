import { textToPdf } from "./text-to-pdf";
import { fileToUint8Array } from "./read-file";
import { unzipEntries } from "./unzip";

function extractTextFromSlideXml(xml: string): string {
  const parts: string[] = [];
  const re = /<a:t[^>]*>([\s\S]*?)<\/a:t>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml))) {
    const text = match[1]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .trim();
    if (text) parts.push(text);
  }
  return parts.join(" ");
}

/** Convert .pptx slide text into a multi-section PDF (layout not preserved). */
export async function pptxToPdf(file: File): Promise<Uint8Array> {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".pptx")) {
    throw new Error(
      "Upload a .pptx file. Legacy .ppt is not supported — save as PPTX in PowerPoint first, or export slides as images and use JPG/PNG to PDF.",
    );
  }

  const bytes = await fileToUint8Array(file);
  const entries = await unzipEntries(bytes);
  const slides = entries
    .filter((e) => /^ppt\/slides\/slide\d+\.xml$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  if (!slides.length) {
    throw new Error("No slides found in this PPTX file.");
  }

  const sections = slides.map((slide, index) => {
    const xml = new TextDecoder().decode(slide.data);
    const text = extractTextFromSlideXml(xml) || "(No extractable text on this slide)";
    return `Slide ${index + 1}\n${text}`;
  });

  return textToPdf(sections.join("\n\n"), file.name.replace(/\.pptx$/i, ""));
}
