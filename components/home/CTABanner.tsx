"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TRUST = [
  "50+ Projects Delivered",
  "98% Client Retention",
  "8+ Years in Market",
  "24/7 Expert Support",
  "No Lock-in Contracts",
];

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".cta-badge", { autoAlpha: 0, y: 16, filter: "blur(6px)" });
    gsap.set(".cta-word",  { yPercent: 110 });
    gsap.set(".cta-sub",   { autoAlpha: 0, y: 22, filter: "blur(5px)" });
    gsap.set(".cta-btns",  { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".cta-trust", { autoAlpha: 0, y: 14, filter: "blur(4px)" });

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { ease: "power3.out" },
    })
      .to(".cta-badge", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "back.out(2)" })
      .to(".cta-word",  { yPercent: 0, duration: 1.0, stagger: 0.06 }, "-=0.35")
      .to(".cta-sub",   { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.75 }, "-=0.55")
      .to(".cta-btns",  { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.45")
      .to(".cta-trust", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6  }, "-=0.3");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Get started with Tekktopia"
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 120, paddingBottom: 120 }}
    >
      {/* Fine grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Aurora — centred spotlight */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 1000, height: 1000, borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 62%)", filter: "blur(72px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 500,  height: 500,  borderRadius: "50%", top: "-15%", right: "8%",  background: "radial-gradient(circle,rgba(249,115,22,0.11) 0%,transparent 68%)", filter: "blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 400,  height: 400,  borderRadius: "50%", bottom: "-12%", left: "8%",  background: "radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 68%)", filter: "blur(80px)" }} />

      {/* Decorative rings */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 560, height: 560, borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "1px solid rgba(37,99,235,0.1)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 840, height: 840, borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "1px solid rgba(249,115,22,0.06)" }} />

      {/* Top accent line */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,rgba(249,115,22,0.45) 30%,rgba(37,99,235,0.45) 70%,transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-12 text-center">

        {/* Eyebrow badge */}
        <div className="cta-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
          style={{
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.28)",
            backdropFilter: "blur(12px)",
          }}>
          <span className="relative flex w-1.5 h-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "#F97316" }} />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ background: "#F97316" }} />
          </span>
          <Calendar style={{ width: 11, height: 11, color: "#FB923C", flexShrink: 0 }} strokeWidth={2} />
          <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.26em", color: "#FB923C" }}>
            Free consultation — no commitment
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-display font-black uppercase mb-8 select-none"
          style={{ fontSize: "clamp(40px,7.5vw,100px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
        >
          {[
            { line: "Ready to build",   accent: false },
            { line: "something that",   accent: false },
            { line: "actually works?",  accent: true  },
          ].map(({ line, accent }, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                  <span className="cta-word inline-block" style={{ color: accent ? "#F97316" : "#fff" }}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Sub-copy */}
        <p className="cta-sub mx-auto mb-12 max-w-xl"
          style={{ fontSize: "clamp(15px,1.6vw,17px)", color: "rgba(255,255,255,0.62)", fontWeight: 300, lineHeight: 1.78 }}>
          Whether you need IT support, a custom platform, or a full digital overhaul — book a free 30-minute strategy session and let&apos;s talk.
        </p>

        {/* CTA buttons */}
        <div className="cta-btns flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 font-semibold text-base px-9 py-4 rounded-2xl text-white w-full sm:w-auto"
            style={{
              background: "#F97316",
              boxShadow: "0 0 0 1px rgba(249,115,22,0.4), 0 4px 28px rgba(249,115,22,0.35)",
              transition: "box-shadow 0.4s ease, transform 0.4s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 80px rgba(249,115,22,0.65), 0 0 0 1px rgba(249,115,22,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(249,115,22,0.4), 0 4px 28px rgba(249,115,22,0.35)"; e.currentTarget.style.transform = "none"; }}
          >
            Book a Free Consultation
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center justify-center gap-2.5 font-semibold text-base px-9 py-4 rounded-2xl text-white w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
              boxShadow: "0 0 0 1px rgba(59,130,246,0.28), 0 4px 28px rgba(37,99,235,0.28)",
              transition: "box-shadow 0.4s ease, transform 0.4s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 80px rgba(37,99,235,0.65), 0 0 0 1px rgba(59,130,246,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.28), 0 4px 28px rgba(37,99,235,0.28)"; e.currentTarget.style.transform = "none"; }}
          >
            View Our Services
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="cta-trust flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST.map((item, i) => (
            <span key={i} className="flex items-center gap-2"
              style={{ fontFamily: "monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#F97316", display: "block", flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
