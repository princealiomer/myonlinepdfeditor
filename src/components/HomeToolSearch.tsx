"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { TOOLS } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedTool, localePath } from "@/lib/i18n";

export function HomeToolSearch({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const matches = useMemo(() => {
    if (!deferred) return [];
    return TOOLS.map((t) => getLocalizedTool(t.slug, locale))
      .filter(Boolean)
      .filter((tool) => {
        if (!tool) return false;
        const hay = [tool.name, tool.shortName, tool.summary, tool.keywords.join(" ")]
          .join(" ")
          .toLowerCase();
        return hay.includes(deferred);
      })
      .slice(0, 6) as NonNullable<ReturnType<typeof getLocalizedTool>>[];
  }, [deferred, locale]);

  return (
    <form
      className="mt-5"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (matches[0]) {
          window.location.href = localePath(locale, `/tools/${matches[0].slug}`);
        } else {
          window.location.href = localePath(locale, "/tools");
        }
      }}
    >
      <label htmlFor="home-tools-search" className="sr-only">
        {dict.toolsIndex.searchLabel}
      </label>
      <input
        id="home-tools-search"
        name="q"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={dict.toolsIndex.searchPlaceholder}
        className="w-full rounded-xl border border-mist bg-paper px-4 py-3 text-base text-ink outline-none ring-teal focus:ring-2"
      />
      {deferred && matches.length > 0 ? (
        <ul className="mt-2 overflow-hidden rounded-xl border border-mist bg-paper text-sm shadow-sm">
          {matches.map((tool) => (
            <li key={tool.slug} className="border-b border-mist last:border-0">
              <Link
                href={localePath(locale, `/tools/${tool.slug}`)}
                className="block px-4 py-2.5 text-ink no-underline hover:bg-mist/40"
              >
                <span className="font-semibold">{tool.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{tool.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      {deferred && matches.length === 0 ? (
        <p className="mt-2 text-sm text-muted">{dict.toolsIndex.noResults}</p>
      ) : null}
    </form>
  );
}
