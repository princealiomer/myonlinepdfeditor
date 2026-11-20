import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { NAV_TOOL_GROUPS } from "@/lib/catalog/nav-tools";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedTool, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="site-footer mt-auto border-t border-mist bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1fr_2.4fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10 shrink-0" title="" />
            <p className="display break-words text-2xl font-semibold sm:text-3xl">
              {site.name}
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            {dict.footer.blurb}
          </p>
          <p className="mt-4 text-sm text-mist">
            <a className="text-teal-bright" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_TOOL_GROUPS.map((group) => {
            const categoryKey = group.items[0]
              ? getLocalizedTool(group.items[0].slug, locale)?.category
              : undefined;
            const label =
              (categoryKey && dict.categories[categoryKey]) || group.label;

            return (
              <div key={group.label}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-teal-bright">
                  {label}
                </p>
                <ul className="space-y-2 text-sm">
                  {group.items.map((item) => {
                    const tool = getLocalizedTool(item.slug, locale);
                    return (
                      <li key={item.slug}>
                        <Link
                          href={localePath(locale, `/tools/${item.slug}`)}
                          className="text-paper/90 no-underline hover:text-teal-bright"
                        >
                          {tool?.name || item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © 2026 {site.name}. {dict.footer.copyright}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={localePath(locale, "/privacy")}
              className="no-underline hover:text-white"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={localePath(locale, "/terms")}
              className="no-underline hover:text-white"
            >
              {dict.footer.terms}
            </Link>
            <Link
              href={localePath(locale, "/esign-compliance")}
              className="no-underline hover:text-white"
            >
              {dict.footer.esign}
            </Link>
            <Link href="/sitemap.xml" className="no-underline hover:text-white">
              {dict.footer.sitemap}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
