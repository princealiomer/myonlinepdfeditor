import Link from "next/link";
import type { Tool } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export function ToolCard({
  tool,
  locale = "en",
  dict,
}: {
  tool: Tool;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const categoryLabel = dict?.categories[tool.category] || tool.category;

  return (
    <Link
      href={localePath(locale, `/tools/${tool.slug}`)}
      className="tool-card surface group block rounded-xl p-4 no-underline transition"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal">
        {categoryLabel}
      </p>
      <h3 className="tool-card-title mt-2 text-base font-semibold text-ink sm:text-lg">
        {tool.shortName}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{tool.summary}</p>
    </Link>
  );
}
