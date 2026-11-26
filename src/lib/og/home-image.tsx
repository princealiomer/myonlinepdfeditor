import { getHomeOgContent } from "@/lib/og/page-og-content";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";

export const homeOgSize = ogSize;
export const homeOgContentType = ogContentType;

export async function renderHomeOpenGraphImage(localeRaw = "en") {
  const content = await getHomeOgContent(localeRaw);
  return renderPageOpenGraphImage({
    locale: localeRaw,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
