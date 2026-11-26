import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getCompanyOgContent } from "@/lib/og/page-og-content";

export const alt = "About";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function AboutOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getCompanyOgContent(locale, "about");
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
