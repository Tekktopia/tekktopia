"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

// ── Headline: exactly 2 lines ──────────────────────────────────────────────
// Each word carries its resting colour and its glitch-hover colour
const LINES: { word: string; color: string; hoverColor: string }[][] = [
  [
    { word: "The",     color: "#ffffff", hoverColor: "#60A5FA" },
    { word: "tech",    color: "#ffffff", hoverColor: "#60A5FA" },
    { word: "company", color: "#ffffff", hoverColor: "#60A5FA" },
  ],
  [
    { word: "African",    color: "#ffffff", hoverColor: "#60A5FA" },
    { word: "businesses", color: "#ffffff", hoverColor: "#60A5FA" },
  ],
  [
    { word: "actually", color: "#F97316", hoverColor: "#ffffff" },
    { word: "deserve.", color: "#F97316", hoverColor: "#ffffff" },
  ],
];

const STATS = [
  { value: "2022", label: "Year Founded",     sub: "Lagos, Nigeria"      },
  { value: "50+",  label: "Clients Served",   sub: "Across 3 continents" },
  { value: "120+", label: "Projects Shipped", sub: "Delivered on time"   },
  { value: "99%",  label: "Uptime SLA",       sub: "Always-on support"   },
];

export default function AboutHero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const wordGlitchMap = useRef<Map<HTMLElement, gsap.core.Timeline>>(new Map());

  // ── VHS glitch on enter ───────────────────────────────────────────────────
  const handleWordEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    hoverColor: string,
  ) => {
    const el = e.currentTarget;
    gsap.killTweensOf(el);
    wordGlitchMap.current.get(el)?.kill();

    el.style.fontStyle = "italic";
    gsap.to(el, { color: hoverColor, duration: 0.35, ease: "power2.out" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0 + Math.random() * 1.8 });
    tl.to(el, {
        x: -5, skewX: -6,
        filter: "brightness(1.7) contrast(1.3)",
        textShadow: "5px 0 rgba(255,40,40,0.9), -5px 0 rgba(0,220,255,0.9)",
        opacity: 0.75, duration: 0.04, ease: "none",
      })
      .to(el, {
        x: 6, skewX: 4,
        filter: "brightness(0.6) contrast(1.8)",
        textShadow: "-4px 0 rgba(255,40,40,0.95), 4px 0 rgba(0,220,255,0.95)",
        opacity: 1, duration: 0.04, ease: "none",
      })
      .to(el, {
        x: -3, skewX: -2,
        filter: "brightness(1.3)",
        textShadow: "2px 0 rgba(255,40,40,0.55), -2px 0 rgba(0,220,255,0.55)",
        opacity: 0.88, duration: 0.05, ease: "none",
      })
      .to(el, {
        x: 0, skewX: 0,
        filter: "brightness(1) contrast(1)",
        textShadow: "0px 0px 0px rgba(0,0,0,0)",
        opacity: 1, duration: 0.2, ease: "power2.out",
      });

    wordGlitchMap.current.set(el, tl);
  };

  // ── Restore original colour on leave ─────────────────────────────────────
  const handleWordLeave = (
    e: React.MouseEvent<HTMLSpanElement>,
    originalColor: string,
  ) => {
    const el = e.currentTarget;
    wordGlitchMap.current.get(el)?.kill();
    wordGlitchMap.current.delete(el);
    gsap.killTweensOf(el);

    el.style.fontStyle = "normal";
    gsap.to(el, {
      color: originalColor,
      x: 0, skewX: 0, opacity: 1,
      filter: "brightness(1) contrast(1)",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.6, ease: "power2.out",
    });
  };

  // ── Mouse-follow spotlight ────────────────────────────────────────────────
  useEffect(() => {
    const section   = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      spotlight.style.background = `radial-gradient(520px circle at ${cx}px ${cy}px, rgba(249,115,22,0.055) 0%, rgba(37,99,235,0.03) 40%, transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Entry animations ──────────────────────────────────────────────────────
  useGSAP(() => {
    gsap.set(".ah-eyebrow",   { autoAlpha: 0, y: 18 });
    gsap.set(".ah-word",      { yPercent: 115 });
    gsap.set(".ah-sub",       { autoAlpha: 0, y: 22, filter: "blur(6px)" });
    gsap.set(".ah-cta",       { autoAlpha: 0, y: 16 });
    gsap.set(".ah-badge",     { autoAlpha: 0, scale: 0.88 });
    gsap.set(".ah-deco-line", { scaleY: 0, transformOrigin: "top" });
    gsap.set(".ah-deco-dot",  { autoAlpha: 0, scale: 0 });
    gsap.set(".ah-divider",   { scaleX: 0, transformOrigin: "center" });
    gsap.set(".ah-stat",      { autoAlpha: 0, y: 26 });
    gsap.set(".ah-scroll",    { autoAlpha: 0 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".ah-deco-line", { scaleY: 1, duration: 1.4, ease: "power2.inOut" }, 0)
      .to(".ah-deco-dot",  { autoAlpha: 1, scale: 1, duration: 0.6 },          0.9)
      .to(".ah-eyebrow",   { autoAlpha: 1, y: 0, duration: 0.6 },              0.15)
      .to(".ah-word",      { yPercent: 0, duration: 1.1, stagger: 0.07 },      0.38)
      .to(".ah-sub",       { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.45")
      .to(".ah-cta",       { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1 }, "-=0.4")
      .to(".ah-badge",     { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, "-=0.55")
      .to(".ah-divider",   { scaleX: 1, duration: 1, ease: "power2.inOut" },   "-=0.5")
      .to(".ah-stat",      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.75")
      .to(".ah-scroll",    { autoAlpha: 1, duration: 0.8 },                    "-=0.3");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col"
      style={{ background: "#04080F", minHeight: "100svh", paddingTop: 100 }}
    >
      {/* Mouse spotlight */}
      <div ref={spotlightRef} aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }} />

      {/* Fine grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora glows */}
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 900, height: 520, borderRadius: "50%", top: "-20%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse,rgba(249,115,22,0.07) 0%,transparent 62%)", filter: "blur(60px)" }} />
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 600, height: 600, borderRadius: "50%", bottom: "5%", left: "-8%", background: "radial-gradient(circle,rgba(37,99,235,0.09) 0%,transparent 65%)", filter: "blur(80px)" }} />
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 460, height: 460, borderRadius: "50%", top: "5%", right: "-5%", background: "radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 65%)", filter: "blur(70px)" }} />

      {/* Ghost watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <span className="font-display font-black uppercase"
          style={{ fontSize: "clamp(100px,18vw,260px)", color: "rgba(255,255,255,0.018)", letterSpacing: "-0.05em", lineHeight: 1, whiteSpace: "nowrap" }}>
          ABOUT
        </span>
      </div>

      {/* Top rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      {/* Side deco lines */}
      <div aria-hidden className="ah-deco-line pointer-events-none absolute hidden lg:block"
        style={{ left: "5%", top: "14%", bottom: "20%", width: 1, background: "linear-gradient(to bottom,transparent,rgba(249,115,22,0.22) 40%,rgba(249,115,22,0.22) 60%,transparent)" }} />
      <div aria-hidden className="ah-deco-dot pointer-events-none absolute hidden lg:block"
        style={{ left: "calc(5% - 3.5px)", top: "50%", width: 8, height: 8, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 14px rgba(249,115,22,0.7)", transform: "translateY(-50%)" }} />
      <div aria-hidden className="ah-deco-line pointer-events-none absolute hidden lg:block"
        style={{ right: "5%", top: "14%", bottom: "20%", width: 1, background: "linear-gradient(to bottom,transparent,rgba(59,130,246,0.22) 40%,rgba(59,130,246,0.22) 60%,transparent)" }} />
      <div aria-hidden className="ah-deco-dot pointer-events-none absolute hidden lg:block"
        style={{ right: "calc(5% - 3.5px)", top: "50%", width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 14px rgba(59,130,246,0.7)", transform: "translateY(-50%)" }} />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-12 pb-4" style={{ zIndex: 2 }}>

        {/* Eyebrow */}
        <div className="ah-eyebrow inline-flex items-center gap-2.5 mb-9 px-4 py-2 rounded-full"
          style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.2)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 8px #F97316", animation: "ahPulse 2s infinite", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.52)" }}>
            Our Story · Est. 2022
          </span>
        </div>

        {/* ── Headline — 2 lines, VHS glitch on hover ── */}
        <h1
          className="font-display font-black uppercase mb-9 select-none"
          style={{ fontSize: "clamp(46px,8.5vw,118px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
        >
          {LINES.map((words, li) => (
            <span key={li} className="block">
              {words.map(({ word, color, hoverColor }, wi) => (
                <span
                  key={wi}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ marginRight: wi < words.length - 1 ? "0.16em" : 0 }}
                >
                  <span
                    className="ah-word inline-block cursor-default"
                    style={{ color, paddingBottom: "0.05em" }}
                    onMouseEnter={(e) => handleWordEnter(e, hoverColor)}
                    onMouseLeave={(e) => handleWordLeave(e, color)}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Sub-line */}
        <p className="ah-sub max-w-md mb-10"
          style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(255,255,255,0.52)", fontWeight: 300, lineHeight: 1.8 }}>
          From Lagos to the world — we build the software, infrastructure, and systems that ambitious African businesses use to compete globally.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link href="/contact"
            className="ah-cta group inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg,#F97316,#EA6A00)", boxShadow: "0 0 0 1px rgba(249,115,22,0.35),0 4px 24px rgba(249,115,22,0.22)", transition: "box-shadow 0.3s,transform 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 55px rgba(249,115,22,0.5),0 0 0 1px rgba(249,115,22,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(249,115,22,0.35),0 4px 24px rgba(249,115,22,0.22)"; e.currentTarget.style.transform = "none"; }}>
            Work with us
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
          <Link href="/projects"
            className="ah-cta group inline-flex items-center gap-2.5 font-medium text-sm px-7 py-3.5 rounded-xl"
            style={{ color: "rgba(255,255,255,0.62)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", transition: "border-color 0.3s,color 0.3s,background 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.62)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
            See our work
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        {/* Location badge */}
        <div className="ah-badge inline-flex items-center gap-2 px-3.5 py-2 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <MapPin style={{ width: 11, height: 11, color: "#F97316", flexShrink: 0 }} strokeWidth={2} />
          <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
            Lagos, Nigeria
          </span>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <div className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", zIndex: 2 }}>
        <div className="ah-divider absolute top-0 left-0 h-px w-full"
          style={{ background: "linear-gradient(to right,transparent,#F97316,rgba(249,115,22,0))" }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map(({ value, label, sub }, i) => (
              <div key={label} className="ah-stat py-8 px-4 sm:px-6"
                style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <p className="font-display font-black"
                  style={{ fontSize: "clamp(28px,3vw,42px)", color: "#fff", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 6 }}>
                  {value}
                </p>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.62)", marginBottom: 3 }}>{label}</p>
                <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em" }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="ah-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style={{ zIndex: 2 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Scroll</span>
        <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom,rgba(249,115,22,0.5),transparent)" }} />
      </div>

      <style>{`
        @keyframes ahPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
      `}</style>
    </section>
  );
}
