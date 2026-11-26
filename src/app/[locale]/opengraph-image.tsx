import { LOCALES } from "@/lib/i18n";
import {
  homeOgContentType,
  homeOgSize,
  renderHomeOpenGraphImage,
} from "@/lib/og/home-image";
import { site } from "@/lib/site";

export const alt = `${site.name} — free PDF tools`;
export const size = homeOgSize;
export const contentType = homeOgContentType;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderHomeOpenGraphImage(locale);
}
