import { NotFoundView } from "@/components/pages/NotFoundView";

/** Locale-scoped 404 keeps the app chrome from [locale]/layout. */
export default function LocaleNotFound() {
  return <NotFoundView embedded />;
}
