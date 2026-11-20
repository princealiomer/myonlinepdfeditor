import { textToPdf } from "./text-to-pdf";

function stripXml(xml: string): string {
  return xml
    .replace(/<\?xml[\s\S]*?\?>/i, "")
    .replace(/<\/[^>]+>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function xmlInvoiceToPdf(file: File): Promise<Uint8Array> {
  const xml = await file.text();
  const text = stripXml(xml) || "(empty XML)";
  return textToPdf(`XML / e-invoice extract\n\n${text}`, file.name.replace(/\.(xml|ubl)$/i, ""));
}
