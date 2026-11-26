import type { MetadataRoute } from "next";
import { allFeatureSlugs, allToolSlugs, getTool } from "@/lib/catalog";
import {
  SAMPLE_FORMATS,
  allSampleFormatIds,
} from "@/lib/catalog/sample-documents";
import { LOCALES, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = "2026-11-21";

  const staticPaths = [
    "",
    "/tools",
    "/features",
    "/sample-documents",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/terms",
    "/esign-compliance",
  ];

  // Comparison + guide pages: English only in the sitemap (other locales are noindex).
  const comparePaths = [
    "/vs",
    "/vs/ilovepdf",
    "/vs/smallpdf",
    "/guides",
    "/guides/browser-pdf-privacy",
    "/guides/merge-pdf-without-messing-up-order",
    "/guides/esign-pdf-checklist",
    "/guides/free-pdf-editor-vs-paid",
  ];

  const staticRoutes: MetadataRoute.Sitemap = [
    ...LOCALES.flatMap((locale) =>
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
    ),
    ...comparePaths.map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const toolSlugs = allToolSlugs().filter((slug) => {
    const tool = getTool(slug);
    // Keep guide tools out of the sitemap so stubs are not promoted.
    return tool && tool.availability !== "guide";
  });

  const toolRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    toolSlugs.map((slug) => ({
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

  const sampleFormatRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    allSampleFormatIds().map((format) => ({
      url: `${base}${localePath(locale, `/sample-documents/${format}`)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  );

  const sampleFileRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    SAMPLE_FORMATS.flatMap((format) =>
      format.files.map((file) => ({
        url: `${base}${localePath(locale, `/sample-documents/${format.id}/${file.slug}`)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ),
  );

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...featureRoutes,
    ...sampleFormatRoutes,
    ...sampleFileRoutes,
  ];
}
