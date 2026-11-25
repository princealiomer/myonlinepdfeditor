"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Spiral-inspired large-type 404: stacked PDF pages spiral into giant digits.
 * Pointer parallax is the interactive beat; reduced-motion users get a static stack.
 */
export function NotFoundHero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = nx;
      targetY = ny;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      stage.style.setProperty("--nf-tilt-x", `${(-currentY * 8).toFixed(2)}deg`);
      stage.style.setProperty("--nf-tilt-y", `${(currentX * 10).toFixed(2)}deg`);
      stage.style.setProperty("--nf-shift-x", `${(currentX * 18).toFixed(2)}px`);
      stage.style.setProperty("--nf-shift-y", `${(currentY * 12).toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    stage.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="nf-stage"
      aria-hidden="true"
    >
      <div className="nf-spiral" />
      <div className="nf-stack">
        {PAGES.map((page) => (
          <div
            key={page.id}
            className="nf-page"
            style={
              {
                "--r": `${page.rotate}deg`,
                "--x": `${page.x}%`,
                "--y": `${page.y}%`,
                "--z": page.z,
                "--delay": `${page.delay}ms`,
              } as CSSProperties
            }
          >
            <span className="nf-page-lines" />
            <span className="nf-page-stamp">{page.stamp}</span>
          </div>
        ))}
      </div>
      <p className="nf-giant">
        <span>4</span>
        <span className="nf-giant-gap">0</span>
        <span>4</span>
      </p>
    </div>
  );
}

const PAGES = [
  { id: 1, rotate: -14, x: 8, y: 18, z: 1, delay: 40, stamp: "p.1" },
  { id: 2, rotate: 8, x: 62, y: 12, z: 2, delay: 120, stamp: "scan" },
  { id: 3, rotate: -4, x: 28, y: 42, z: 3, delay: 200, stamp: "draft" },
  { id: 4, rotate: 16, x: 70, y: 48, z: 4, delay: 280, stamp: "sign" },
  { id: 5, rotate: -10, x: 40, y: 64, z: 5, delay: 360, stamp: "…" },
];
