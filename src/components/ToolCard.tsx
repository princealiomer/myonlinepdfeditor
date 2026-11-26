import Link from "next/link";
import { ToolIcons8Icon } from "@/components/Icons8Icon";
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
  const isGuide =
    tool.availability === "guide" || tool.engine === "format-advice";
  const badge = isGuide
    ? dict?.common.comingSoon || "Coming soon"
    : null;

  return (
    <Link
      href={localePath(locale, `/tools/${tool.slug}`)}
      className="tool-card surface group block rounded-xl p-4 no-underline transition"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper">
          <ToolIcons8Icon tool={tool} size={28} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal">
            {categoryLabel}
          </p>
          <h3 className="tool-card-title mt-1 text-base font-semibold text-ink sm:text-lg">
            {tool.shortName}
          </h3>
          {badge ? (
            <span className="mt-1 inline-block rounded-md bg-mist/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{tool.summary}</p>
    </Link>
  );
}
