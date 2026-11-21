import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-4 py-16 font-sans text-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose-700">
          404
        </p>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-neutral-600">
          That URL is not on {site.name}. Try the tool catalog or open the
          editor.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/tools"
            className="rounded-lg bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white no-underline"
          >
            All tools
          </Link>
          <Link
            href="/tools/edit-pdf"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-900 no-underline"
          >
            Open editor
          </Link>
          <Link href="/" className="px-4 py-2.5 text-sm font-semibold text-rose-700">
            Home
          </Link>
        </div>
      </body>
    </html>
  );
}
