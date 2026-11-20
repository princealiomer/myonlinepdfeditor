import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.footer.privacy,
    description: "How myonlinepdfeditor.com handles privacy, local file processing, and advertising.",
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 prose-like">
      <h1 className="display text-4xl font-semibold">{dict.footer.privacy}</h1>
      <p className="mt-4 text-muted">Last updated: November 16, 2026</p>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          {site.name} is built so core PDF tools can run in your browser. Documents you
          open in the editor are processed locally on your device for those tools.
        </p>
        <h2 className="pt-4 text-2xl font-semibold text-ink">Advertising</h2>
        <p>
          We use Google AdSense to fund free access. Google and its partners may use cookies
          or similar technologies to serve personalized or non-personalized ads based on
          your browsing activity and settings. You can manage ad personalization through
          Google&apos;s ad settings.
        </p>
        <h2 className="pt-4 text-2xl font-semibold text-ink">Analytics & logs</h2>
        <p>
          Hosting providers (including Vercel) may collect standard request logs such as IP
          address, user agent, and URL path for security and reliability.
        </p>
        <h2 className="pt-4 text-2xl font-semibold text-ink">Contact</h2>
        <p>
          Privacy questions:{" "}
          <a className="text-teal" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </p>
      </div>
    </article>
  );
}
