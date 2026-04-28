"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!$%&*";

/* ── Scramble on hover ───────────────────────────────────────────────── */
function ScrambleLine({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const run = useCallback(() => {
    let i = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDisplay(
        text.split("").map((ch, idx) => {
          if (ch === " " || ch === "." || ch === "!" || ch === "?") return ch;
          if (idx < i) return text[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      i += 0.65;
      if (i > text.length) { clearInterval(timer.current); setDisplay(text); }
    }, 24);
  }, [text]);

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <span
      className={`block cursor-default select-none ${className}`}
      onMouseEnter={run}
      aria-label={text}
    >
      {display}
    </span>
  );
}

/* ── Magnetic wrapper ───────────────────────────────────────────────── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (e.clientX - r.left - r.width  / 2) * 0.28,
          y: (e.clientY - r.top  - r.height / 2) * 0.28,
          duration: 0.38, ease: "power2.out",
        });
      }}
      onMouseLeave={() =>
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1.1,0.5)" })
      }
    >
      {children}
    </div>
  );
}

const TICKER = [
  "Software Development", "IT Support", "M365 License Provisioning",
  "Cybersecurity", "Cloud Computing", "Data Analytics",
  "Mobile & Web Dev", "Product Design", "AI & Emerging Tech", "IT Consultancy",
];

/* ══════════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      gsap.to(spotRef.current, { x: e.clientX, y: e.clientY, duration: 1.5, ease: "power3.out" });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useGSAP(() => {
    gsap.set([".h-eyebrow", ".h-sub", ".h-cta", ".h-stats", ".h-hint"], { autoAlpha: 0 });
    gsap.set(".h-line-wrap", { yPercent: 116 });

    gsap.timeline({ delay: 0.12 })
      .to(".h-eyebrow",  { autoAlpha: 1, duration: 0.5, ease: "power3.out" })
      .to(".h-line-wrap",{ yPercent: 0, duration: 0.92, stagger: 0.11, ease: "expo.out" }, "-=0.22")
      .to(".h-sub",      { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.52")
      .to(".h-cta",      { autoAlpha: 1, duration: 0.42, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.42")
      .to(".h-stats",    { autoAlpha: 1, duration: 0.42 }, "-=0.3")
      .to(".h-hint",     { autoAlpha: 1, duration: 0.7 }, "+=0.4");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] bg-white overflow-hidden flex flex-col"
      aria-label="Tekktopia — Enterprise Technology Services"
    >
      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-0 rounded-full"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)",
          transform: "translate(-50%,-50%)",
          willChange: "transform",
        }}
      />

      {/* Decorative corner arcs */}
      <svg
        aria-hidden
        className="absolute top-0 right-0 w-[520px] h-[520px] pointer-events-none select-none"
        viewBox="0 0 520 520"
        fill="none"
      >
        {[236, 188, 140, 92, 44].map((r, i) => (
          <circle key={i} cx="520" cy="0" r={r} stroke="#0F172A" strokeWidth="1" strokeOpacity="0.038" />
        ))}
      </svg>

      {/* Blue ambient bottom-left */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[420px] h-[300px] bg-blue/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4"
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-24 pb-12">

        {/* Eyebrow */}
        <div className="h-eyebrow flex items-center gap-3 mb-10">
          <span className="h-px w-7 bg-orange rounded-full flex-shrink-0" />
          <span className="font-mono text-[10px] text-navy/40 uppercase tracking-[0.3em]">
            End-to-End Tech Services · Trusted by 50+ Businesses
          </span>
        </div>

        {/* Headline — hover any line to scramble */}
        <h1
          className="font-display font-black tracking-tighter leading-[0.86] mb-9"
          aria-label="Transform Your Business. With Tech."
        >
          <span className="block overflow-hidden pb-[0.07em]">
            <span className="h-line-wrap block">
              <ScrambleLine
                text="Transform"
                className="text-[clamp(50px,8.5vw,118px)] text-navy"
              />
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <span className="h-line-wrap block">
              <ScrambleLine
                text="Your Business."
                className="text-[clamp(50px,8.5vw,118px)] text-navy"
              />
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <span className="h-line-wrap block">
              <ScrambleLine
                text="With Tech."
                className="text-[clamp(50px,8.5vw,118px)] text-orange italic"
              />
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="h-sub text-base md:text-[17px] text-navy/55 font-light leading-relaxed max-w-[560px] mb-10">
          Expert end-to-end technology services for forward-thinking businesses — from
          day-to-day IT support to custom AI-powered software and cloud infrastructure.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Magnetic>
            <Link
              href="/contact"
              className="h-cta group inline-flex items-center gap-2.5 bg-navy hover:bg-orange text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_14px_36px_-8px_rgba(249,115,22,0.42)] hover:-translate-y-0.5 active:scale-95"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/services"
              className="h-cta group inline-flex items-center gap-2 text-navy hover:text-orange font-semibold text-base border-b-2 border-navy/20 hover:border-orange pb-0.5 transition-all duration-300"
            >
              Explore Services
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45 group-hover:scale-110" />
            </Link>
          </Magnetic>
        </div>

        {/* Stats */}
        <div className="h-stats flex items-center gap-6 sm:gap-10 border-t border-border pt-8 flex-wrap">
          {(
            [["50+", "Projects"], ["98%", "Satisfaction"], ["<1hr", "Response"], ["99.9%", "Uptime"]] as const
          ).map(([val, lbl]) => (
            <div key={lbl} className="flex flex-col gap-0.5 group cursor-default">
              <span className="font-display font-black text-xl text-navy group-hover:text-orange transition-colors duration-200">
                {val}
              </span>
              <span className="font-mono text-[9px] text-navy/35 uppercase tracking-[0.22em]">{lbl}</span>
            </div>
          ))}
        </div>

        <p className="h-hint font-mono text-[9px] text-navy/20 uppercase tracking-[0.22em] mt-5">
          ↑ Hover the headline to interact
        </p>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-t border-border bg-off-white py-3.5 overflow-hidden flex-shrink-0">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 34s linear infinite" }}
        >
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 font-mono text-[10px] text-navy/35 uppercase tracking-[0.2em]"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-orange/40 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
