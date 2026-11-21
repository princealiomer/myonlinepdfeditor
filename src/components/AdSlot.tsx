"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

type AdSlotProps = {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
  label?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

let adsenseLoader: Promise<void> | null = null;

function loadAdsenseScript(client: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (adsenseLoader) return adsenseLoader;

  adsenseLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-inkdocs-adsense="1"]',
    );
    if (existing) {
      if (existing.dataset.loaded === "1") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.inkdocsAdsense = "1";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "1";
        resolve();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => reject(new Error("AdSense script failed to load.")),
      { once: true },
    );
    document.head.appendChild(script);
  });

  return adsenseLoader;
}

/**
 * Lazy AdSense unit: script loads only when the slot nears the viewport.
 * Renders nothing when client/slot env vars are missing (avoids placeholder 0000000000).
 */
export function AdSlot({
  slot,
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);
  const [visible, setVisible] = useState(false);
  const client = site.adsenseClient;
  const resolvedSlot = slot || site.adsenseSlot;

  useEffect(() => {
    if (!client || !resolvedSlot || resolvedSlot === "0000000000") return;
    const el = hostRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [client, resolvedSlot]);

  useEffect(() => {
    if (!visible || !client || !resolvedSlot || pushed.current) return;
    let cancelled = false;

    (async () => {
      try {
        await loadAdsenseScript(client);
        if (cancelled || pushed.current) return;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        // Blocked by extensions / network — keep empty reserved space.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [visible, client, resolvedSlot]);

  if (!client || !resolvedSlot || resolvedSlot === "0000000000") {
    return null;
  }

  return (
    <aside
      ref={hostRef}
      className={`ad-slot ${className}`}
      aria-label={label}
      style={{ minHeight: 280 }}
    >
      {visible ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: 250 }}
          data-ad-client={client}
          data-ad-slot={resolvedSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : null}
    </aside>
  );
}
