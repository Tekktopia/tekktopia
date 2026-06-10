"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Measure scroll progress directly from the document on every scroll/resize.
    // This guarantees the bar hits 100% at the true bottom even on mobile, where
    // the collapsing address bar changes the viewport height (ScrollTrigger's
    // cached end value would otherwise fall short of the real page end).
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const scrolled = window.scrollY || doc.scrollTop;
      const p = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-border pointer-events-none" aria-hidden>
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-orange via-blue to-orange origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
