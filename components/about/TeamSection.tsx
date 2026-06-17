"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import TeamCardsGrid from "@/components/team/TeamCardsGrid";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useGSAP(() => {
    gsap.set(".tm-eyebrow", { autoAlpha: 0, y: 16, filter: "blur(5px)" });
    gsap.set(".tm-word",    { yPercent: 110 });
    gsap.set(".tm-sub",     { autoAlpha: 0, y: 16, filter: "blur(4px)" });

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 88%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { ease: "power3.out" },
    })
      .to(".tm-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 })
      .to(".tm-word",    { yPercent: 0, duration: 0.85, stagger: 0.07 }, "-=0.35")
      .to(".tm-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Our team"
      className="relative overflow-hidden"
      style={{ background: isLight ? "#F1F5F9" : "#060C15", paddingTop: 96, paddingBottom: 96 }}
    >
      {/* Top rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: isLight
          ? "linear-gradient(to right,transparent,rgba(15,23,42,0.10),transparent)"
          : "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isLight
            ? "linear-gradient(rgba(15,23,42,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.06) 1px,transparent 1px)"
            : "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora */}
      <div aria-hidden className="absolute pointer-events-none"
        style={{ width: 700, height: 700, borderRadius: "50%", top: "-20%", right: "-8%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-15%", left: "-10%", background: "radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="tm-eyebrow flex items-center justify-center gap-3 mb-6">
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: isLight ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.55)" }}>
              The People
            </span>
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          </div>
          <h2 className="font-display font-black uppercase"
            style={{ fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            {["Meet", "the", "Team"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                <span className="tm-word inline-block" style={{ color: i === 2 ? "#F97316" : isLight ? "#0F172A" : "#ffffff" }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="tm-sub mt-5 mx-auto max-w-lg"
            style={{ fontSize: "clamp(13px,1.4vw,15px)", color: isLight ? "rgba(15,23,42,0.48)" : "rgba(255,255,255,0.48)", lineHeight: 1.8, fontWeight: 300 }}>
            A focused, battle-tested team of engineers, designers, and strategists — each one hand-picked for their craft and their character.
          </p>
        </div>

        <TeamCardsGrid />

      </div>
    </section>
  );
}
