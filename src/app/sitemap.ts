import type { MetadataRoute } from "next";
import { allFeatureSlugs, allToolSlugs, getTool } from "@/lib/catalog";
import {
  SAMPLE_FORMATS,
  allSampleFormatIds,
} from "@/lib/catalog/sample-documents";
import { LOCALES, localePath, stripLocalePrefix } from "@/lib/i18n";
import { languageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";

function entry(
  localizedPath: string,
  opts: {
    lastModified: string;
    changeFrequency: NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >;
    priority: number;
    /** When false, skip hreflang (EN-only /vs + guides that stay noindex elsewhere). */
    hreflang?: boolean;
  },
): MetadataRoute.Sitemap[number] {
  const base = site.url.replace(/\/$/, "");
  const href = localizedPath === "/" ? "/" : localizedPath;
  const { path: sharedPath } = stripLocalePrefix(href);

  return {
    url: `${base}${href === "/" ? "/" : href}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    ...(opts.hreflang === false
      ? {}
      : {
          alternates: {
            languages: languageAlternates(sharedPath),
          },
        }),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
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
        const shared = path || "/";
        const localized = localePath(locale, shared);
        return entry(localized === "/" ? "/" : localized, {
          lastModified,
          changeFrequency:
            path === "" || path === "/tools" ? "weekly" : "monthly",
          priority: path === "" ? 1 : path === "/tools" ? 0.9 : 0.6,
          hreflang: true,
        });
      }),
    ),
    ...comparePaths.map((path) =>
      entry(path, {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.75,
        // Do not point hreflang at noindex locale duplicates.
        hreflang: false,
      }),
    ),
  ];

  const toolSlugs = allToolSlugs().filter((slug) => {
    const tool = getTool(slug);
    // Keep guide tools out of the sitemap so stubs are not promoted.
    return tool && tool.availability !== "guide";
  });

  const toolRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    toolSlugs.map((slug) =>
      entry(localePath(locale, `/tools/${slug}`), {
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
        hreflang: true,
      }),
    ),
  );

  const featureRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    allFeatureSlugs().map((slug) =>
      entry(localePath(locale, `/features/${slug}`), {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        hreflang: true,
      }),
    ),
  );

  const sampleFormatRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    allSampleFormatIds().map((format) =>
      entry(localePath(locale, `/sample-documents/${format}`), {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.55,
        hreflang: true,
      }),
    ),
  );

  const sampleFileRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    SAMPLE_FORMATS.flatMap((format) =>
      format.files.map((file) =>
        entry(
          localePath(locale, `/sample-documents/${format.id}/${file.slug}`),
          {
            lastModified,
            changeFrequency: "monthly",
            priority: 0.5,
            hreflang: true,
          },
        ),
      ),
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
