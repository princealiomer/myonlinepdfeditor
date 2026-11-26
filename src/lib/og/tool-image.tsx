import { getToolOgContent } from "@/lib/og/page-og-content";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";

export const toolOgSize = ogSize;
export const toolOgContentType = ogContentType;

export async function renderToolOpenGraphImage(
  localeRaw: string,
  slug: string,
) {
  const content = await getToolOgContent(localeRaw, slug);
  return renderPageOpenGraphImage({
    locale: localeRaw,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
