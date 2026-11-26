import { allToolSlugs } from "@/lib/catalog";
import { LOCALES } from "@/lib/i18n";
import {
  renderToolOpenGraphImage,
  toolOgContentType,
  toolOgSize,
} from "@/lib/og/tool-image";

export const alt = "Tool preview";
export const size = toolOgSize;
export const contentType = toolOgContentType;

export function generateStaticParams() {
  const slugs = allToolSlugs();
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export default async function ToolOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return renderToolOpenGraphImage(locale, slug);
}
