import type { MetadataRoute } from "next";
import { allFeatureSlugs, allToolSlugs } from "@/lib/catalog";
import { LOCALES, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = "2026-11-18";

  const staticPaths = [
    "",
    "/tools",
    "/features",
    "/pricing",
    "/about",
    "/privacy",
    "/terms",
    "/esign-compliance",
  ];

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    staticPaths.map((path) => {
      const localized = localePath(locale, path || "/");
      return {
        url: `${base}${localized === "/" ? "/" : localized}`,
        lastModified,
        changeFrequency:
          path === "" || path === "/tools" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/tools" ? 0.9 : 0.6,
      } as const;
    }),
  );

  const toolRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    allToolSlugs().map((slug) => ({
      url: `${base}${localePath(locale, `/tools/${slug}`)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const featureRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    allFeatureSlugs().map((slug) => ({
      url: `${base}${localePath(locale, `/features/${slug}`)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...toolRoutes, ...featureRoutes];
}
