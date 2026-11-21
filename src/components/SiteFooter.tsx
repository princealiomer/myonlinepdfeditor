import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandWordmark } from "@/components/BrandWordmark";
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
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="site-brand text-paper">
            <BrandLogo className="h-10 w-10 shrink-0" title="" />
            <BrandWordmark />
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

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-teal-bright">
            {dict.common.tools}
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
            {NAV_TOOL_GROUPS.map((group) => {
              const categoryKey = group.items[0]
                ? getLocalizedTool(group.items[0].slug, locale)?.category
                : undefined;
              const label =
                (categoryKey && dict.categories[categoryKey]) || group.label;
              return (
                <li key={group.label}>
                  <Link
                    href={localePath(locale, "/tools")}
                    className="text-paper/90 no-underline hover:text-teal-bright"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="col-span-2 sm:col-span-3">
              <Link
                href={localePath(locale, "/tools")}
                className="font-semibold text-teal-bright no-underline hover:underline"
              >
                {dict.nav.allTools}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © 2026 {site.name}. {dict.footer.copyright}{" "}
            <a
              href="https://icons8.com"
              className="no-underline hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              Icons by Icons8
            </a>
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
            <Link
              href={localePath(locale, "/sample-documents")}
              className="no-underline hover:text-white"
            >
              {dict.nav.samples}
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
