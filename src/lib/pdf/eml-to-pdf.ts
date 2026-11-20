import { textToPdf } from "./text-to-pdf";

function decodeQuotedPrintable(input: string): string {
  return input
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

/** Best-effort EML → PDF (headers + body text). */
export async function emlToPdf(file: File): Promise<Uint8Array> {
  if (!/\.(eml|msg)$/i.test(file.name) && file.type !== "message/rfc822") {
    // still try if user picked .eml-like
  }
  const raw = await file.text();
  const [headerPart, ...rest] = raw.split(/\r?\n\r?\n/);
  const body = rest.join("\n\n");
  const headers = ["From", "To", "Cc", "Subject", "Date"]
    .map((key) => {
      const re = new RegExp(`^${key}:\\s*(.+)$`, "im");
      const m = headerPart.match(re);
      return m ? `${key}: ${m[1].trim()}` : null;
    })
    .filter(Boolean)
    .join("\n");

  let textBody = body;
  if (/Content-Transfer-Encoding:\s*quoted-printable/i.test(raw)) {
    textBody = decodeQuotedPrintable(body);
  }
  textBody = textBody
    .replace(/--[^\n]+/g, "")
    .replace(/Content-Type:[\s\S]*?\n\n/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const content = `${headers}\n\n${textBody || "(empty message body)"}`;
  return textToPdf(content, file.name.replace(/\.(eml|msg)$/i, "") || "email");
}
