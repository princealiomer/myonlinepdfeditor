"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { TOOLS } from "@/lib/catalog";

export function NotFoundSearch() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const matches = useMemo(() => {
    if (!deferred) return [];
    return TOOLS.filter((tool) => {
      const hay = [tool.name, tool.shortName, tool.summary, tool.keywords.join(" ")]
        .join(" ")
        .toLowerCase();
      return hay.includes(deferred);
    }).slice(0, 6);
  }, [deferred]);

  return (
    <form
      className="nf-search"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (matches[0]) window.location.href = `/tools/${matches[0].slug}`;
        else window.location.href = "/tools";
      }}
    >
      <label htmlFor="not-found-search" className="sr-only">
        Search tools
      </label>
      <input
        id="not-found-search"
        name="q"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tools — merge, sign, word…"
        className="nf-search-input"
      />
      {deferred && matches.length > 0 ? (
        <ul className="nf-search-results">
          {matches.map((tool) => (
            <li key={tool.slug}>
              <Link href={`/tools/${tool.slug}`} className="no-underline">
                <span className="nf-search-name">{tool.name}</span>
                <span className="nf-search-summary">{tool.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
