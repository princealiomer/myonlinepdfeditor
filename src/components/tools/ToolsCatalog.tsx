"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { NAV_TOOL_GROUPS } from "@/lib/catalog/nav-tools";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedTool, localePath } from "@/lib/i18n";
import type { ToolCategory } from "@/lib/catalog/tools";

const CATEGORY_ORDER: ToolCategory[] = [
  "convert",
  "edit",
  "sign",
  "share",
  "ai",
  "other",
];

export function ToolsCatalog({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ToolCategory>("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const groups = useMemo(() => {
    return NAV_TOOL_GROUPS.map((group) => {
      const first = group.items[0];
      const cat = first
        ? getLocalizedTool(first.slug, locale)?.category
        : undefined;
      const label = (cat && dict.categories[cat]) || group.label;
      const items = group.items
        .map((item) => getLocalizedTool(item.slug, locale))
        .filter(Boolean) as NonNullable<ReturnType<typeof getLocalizedTool>>[];

      const filtered = items.filter((tool) => {
        if (category !== "all" && tool.category !== category) return false;
        if (!deferredQuery) return true;
        const hay = [
          tool.name,
          tool.shortName,
          tool.summary,
          tool.keywords.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(deferredQuery);
      });

      return { key: group.label, label, category: cat, items: filtered };
    }).filter((g) => g.items.length > 0);
  }, [locale, dict.categories, deferredQuery, category]);

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="space-y-8">
      <form
        className="surface grid gap-4 rounded-2xl p-4 sm:grid-cols-[1fr_auto] sm:items-end"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="field m-0">
          <label htmlFor="tools-search">{dict.toolsIndex.searchLabel}</label>
          <input
            id="tools-search"
            name="q"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.toolsIndex.searchPlaceholder}
            aria-describedby="tools-search-count"
          />
        </div>
        <div className="field m-0">
          <label htmlFor="tools-category">{dict.toolsIndex.filterLabel}</label>
          <select
            id="tools-category"
            name="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as "all" | ToolCategory)
            }
          >
            <option value="all">{dict.toolsIndex.filterAll}</option>
            {CATEGORY_ORDER.map((id) => (
              <option key={id} value={id}>
                {dict.categories[id]}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p id="tools-search-count" className="text-sm text-muted" aria-live="polite">
        {dict.toolsIndex.resultsCount.replace("{count}", String(total))}
      </p>

      {total === 0 ? (
        <p className="surface rounded-2xl p-6 text-sm text-muted">
          {dict.toolsIndex.noResults}
        </p>
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <section
              key={group.key}
              id={group.label.toLowerCase().replace(/\s+/g, "-")}
            >
              <h2 className="display text-2xl font-semibold">{group.label}</h2>
              <div className="tool-grid mt-4">
                {group.items.map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    tool={tool}
                    locale={locale}
                    dict={dict}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {!deferredQuery && category === "all" ? (
        <p className="text-sm text-muted">
          <Link
            href={localePath(locale, "/tools/edit-pdf")}
            className="font-semibold text-teal no-underline"
          >
            {dict.nav.openEditor}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
