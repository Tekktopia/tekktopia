"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".sh-eyebrow", { autoAlpha: 0, y: 18 });
    gsap.set(".sh-word",    { yPercent: 115 });
    gsap.set(".sh-sub",     { autoAlpha: 0, y: 22, filter: "blur(6px)" });
    gsap.set(".sh-stat",    { autoAlpha: 0, y: 20 });
    gsap.set(".sh-divider", { scaleX: 0, transformOrigin: "center" });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".sh-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 },                     0.1)
      .to(".sh-word",    { yPercent: 0, duration: 1.05, stagger: 0.07 },             0.32)
      .to(".sh-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.75 }, "-=0.45")
      .to(".sh-divider", { scaleX: 1, duration: 1.0, ease: "power2.inOut" },         "-=0.5")
      .to(".sh-stat",    { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },      "-=0.7");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 148, paddingBottom: 96 }}
    >
      {/* Fine grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Orange top-center glow */}
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 800, height: 400, borderRadius: "50%", top: "-15%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse,rgba(249,115,22,0.07) 0%,transparent 65%)", filter: "blur(70px)" }} />
      {/* Blue bottom-left */}
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 500, height: 500, borderRadius: "50%", bottom: "-20%", left: "-5%", background: "radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 65%)", filter: "blur(80px)" }} />

      {/* Ghost watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <span className="font-display font-black uppercase"
          style={{ fontSize: "clamp(80px,15vw,220px)", color: "rgba(255,255,255,0.016)", letterSpacing: "-0.05em", lineHeight: 1, whiteSpace: "nowrap" }}>
          SERVICES
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Eyebrow */}
        <div className="sh-eyebrow inline-flex items-center gap-2.5 mb-9 px-4 py-2 rounded-full"
          style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.2)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 8px #F97316", animation: "shPulse 2s infinite", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.52)" }}>
            What We Do
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black uppercase mb-8"
          style={{ fontSize: "clamp(44px,7.5vw,108px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
          {[
            { words: ["Everything"],              color: "#ffffff" },
            { words: ["your", "business"],        color: "#ffffff" },
            { words: ["needs", "to", "scale."],   color: "rgba(255,255,255,0.35)" },
          ].map(({ words, color }, li) => (
            <span key={li} className="block">
              {words.map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden align-bottom pb-1"
                  style={{ marginRight: "0.16em" }}>
                  <span className="sh-word inline-block" style={{ color }}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p className="sh-sub max-w-2xl mb-14"
          style={{ fontSize: "clamp(15px,1.5vw,17px)", color: "rgba(255,255,255,0.48)", fontWeight: 300, lineHeight: 1.8 }}>
          Ten end-to-end services — from the first line of code to 24/7 managed support.
          One team that owns every outcome alongside you.
        </p>

        {/* Stats strip */}
        <div className="sh-divider h-px mb-10"
          style={{ background: "rgba(255,255,255,0.07)" }} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { num: "10",   label: "Services"         },
            { num: "50+",  label: "Clients Served"   },
            { num: "120+", label: "Projects Shipped" },
            { num: "24/7", label: "Support & SLA"    },
          ].map(({ num, label }) => (
            <div key={label} className="sh-stat flex flex-col gap-1">
              <span className="font-display font-black"
                style={{ fontSize: "clamp(26px,2.8vw,40px)", color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {num}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shPulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>
    </section>
  );
}
