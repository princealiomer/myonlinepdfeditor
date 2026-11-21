"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandWordmark } from "@/components/BrandWordmark";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

type NavItem = { href: string; label: string };

export function MobileNav({
  locale,
  dict,
  items,
}: {
  locale: Locale;
  dict: Dictionary;
  items: NavItem[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const titleId = useId();
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open) {
      setOpen(false);
      return;
    }
    dialog.close();
    setOpen(false);
  };

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
  };

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close on navigation only
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => setOpen(false);
    const onCancel = (event: Event) => {
      event.preventDefault();
      closeMenu();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) closeMenu();
    };

    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="hamburger-btn btn btn-ghost min-h-11 min-w-11 px-2.5"
        aria-label={dict.nav.menu}
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        onClick={open ? closeMenu : openMenu}
      >
        <span className="hamburger-icon" data-open={open ? "true" : "false"} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="site-mobile-nav"
        className="mobile-nav-drawer"
        aria-labelledby={titleId}
      >
        <div className="mobile-nav-sheet surface">
          <div className="flex items-center justify-between gap-3 border-b border-mist/80 px-4 py-3">
            <div className="site-brand text-ink">
              <BrandLogo className="h-8 w-8 shrink-0" title="" />
              <p id={titleId} className="m-0">
                <BrandWordmark />
              </p>
            </div>
            <button
              type="button"
              className="btn btn-ghost min-h-11 min-w-11 px-2.5"
              aria-label={dict.nav.close}
              autoFocus
              onClick={closeMenu}
            >
              <span className="hamburger-icon" data-open="true" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          <nav aria-label={dict.nav.menu} className="flex flex-1 flex-col gap-1 p-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3.5 text-base font-medium text-ink no-underline hover:bg-paper"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-mist/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
            <Link
              href={localePath(locale, "/tools/edit-pdf")}
              className="btn btn-accent w-full no-underline"
              onClick={closeMenu}
            >
              {dict.nav.openEditor}
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
}
