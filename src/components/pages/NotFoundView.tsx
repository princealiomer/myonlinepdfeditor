import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandWordmark } from "@/components/BrandWordmark";
import { NotFoundHero } from "@/components/NotFoundHero";
import { NotFoundSearch } from "@/components/NotFoundSearch";
import { site } from "@/lib/site";

const QUICK = [
  { href: "/tools/merge-pdf", label: "Merge PDF" },
  { href: "/tools/edit-pdf", label: "Edit PDF" },
  { href: "/tools/compress-pdf", label: "Compress" },
  { href: "/tools/sign-pdf", label: "Sign" },
] as const;

export function NotFoundView({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={`nf-page-root${embedded ? " nf-page-root--embedded" : ""}`}>
      {embedded ? null : (
        <header className="nf-top">
          <Link href="/" className="site-brand text-ink no-underline">
            <BrandLogo className="h-8 w-8 shrink-0" title="" />
            <BrandWordmark />
          </Link>
          <nav className="nf-top-nav" aria-label="Helpful links">
            <Link href="/tools" className="no-underline">
              All tools
            </Link>
            <Link href="/pricing" className="no-underline">
              Pricing
            </Link>
          </nav>
          <Link
            href="/tools/edit-pdf"
            className="btn btn-accent nf-top-cta no-underline"
          >
            Open editor
          </Link>
        </header>
      )}

      <main className="nf-main">
        <NotFoundHero />

        <section className="nf-copy">
          <p className="nf-kicker">{site.name}</p>
          <h1 className="display nf-title">Page not found</h1>
          <p className="nf-lead">
            This page isn&apos;t in the document. Search a tool, or pick one from
            the stack.
          </p>

          <NotFoundSearch />

          <div className="nf-actions">
            <Link href="/" className="btn btn-accent no-underline">
              Go home
            </Link>
            <Link href="/tools" className="btn btn-ghost no-underline">
              Browse tools
            </Link>
          </div>

          <ul className="nf-quick">
            {QUICK.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
