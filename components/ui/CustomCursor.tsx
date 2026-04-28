"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /* Hide on touch devices */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    /* ── Dot follows cursor exactly via GSAP ticker ── */
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: "none" });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.18, ease: "power2.out" });
      if (!isVisible) setIsVisible(true);
    };

    /* ── Morph ring on hover over interactive elements ── */
    const onEnterLink = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.dataset.cursorLabel ?? "";
      setLabel(text);
      gsap.to(ring, { scale: text ? 2.8 : 1.8, backgroundColor: "rgba(249,115,22,0.12)", borderColor: "#F97316", duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 0.4, backgroundColor: "#F97316", duration: 0.25 });
    };

    const onLeaveLink = () => {
      setLabel("");
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(37,99,235,0.6)", duration: 0.4, ease: "elastic.out(1,0.5)" });
      gsap.to(dot,  { scale: 1, backgroundColor: "#2563EB", duration: 0.25 });
    };

    /* ── Shrink on mousedown ── */
    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.15 });
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.35, ease: "elastic.out(1,0.5)" });

    /* ── Attach to all interactive elements ── */
    const targets = document.querySelectorAll<HTMLElement>("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      document.documentElement.style.cursor = "";
    };
  }, [isVisible]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        aria-hidden
      >
        <div className="w-2.5 h-2.5 rounded-full bg-blue" />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
        aria-hidden
      >
        <div className="w-10 h-10 rounded-full border-2 border-blue/60 flex items-center justify-center transition-none">
          {label && (
            <span className="text-[8px] font-mono font-bold text-orange uppercase tracking-widest whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
