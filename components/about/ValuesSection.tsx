"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Zap, Shield, Users, Heart, TrendingUp, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    num: "01", icon: Zap,        color: "#F97316", glow: "rgba(249,115,22,0.18)",
    title: "Velocity",
    body:  "Speed is a feature. We move fast, iterate quickly, and deliver results in days — not months — without sacrificing quality.",
  },
  {
    num: "02", icon: Shield,     color: "#EF4444", glow: "rgba(239,68,68,0.18)",
    title: "Integrity",
    body:  "We say what we'll do and we do what we say. No hidden agendas, no inflated estimates, no cutting corners.",
  },
  {
    num: "03", icon: Users,      color: "#3B82F6", glow: "rgba(59,130,246,0.18)",
    title: "Partnership",
    body:  "Your problem is our problem. We embed ourselves in your goals and treat every engagement as if the outcome is our own.",
  },
  {
    num: "04", icon: TrendingUp, color: "#10B981", glow: "rgba(16,185,129,0.18)",
    title: "Excellence",
    body:  "We hold ourselves to the highest standards — every line of code, every design decision, every support interaction.",
  },
  {
    num: "05", icon: Lightbulb,  color: "#8B5CF6", glow: "rgba(139,92,246,0.18)",
    title: "Innovation",
    body:  "We stay curious, embrace new technologies, and challenge assumptions — because standing still is moving backwards.",
  },
  {
    num: "06", icon: Heart,      color: "#EC4899", glow: "rgba(236,72,153,0.18)",
    title: "Impact",
    body:  "Technology is a means, not an end. Every solution we build is measured by the real-world difference it makes for the people who use it.",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(".vl-eyebrow", { autoAlpha: 0, y: 16, filter: "blur(5px)" });
    gsap.set(".vl-word",    { yPercent: 110 });
    gsap.set(".vl-sub",     { autoAlpha: 0, y: 16, filter: "blur(4px)" });

    gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 88%", end: "bottom 15%", toggleActions: "play reverse play reverse" },
      defaults: { ease: "power3.out" },
    })
      .to(".vl-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 })
      .to(".vl-word",    { yPercent: 0, duration: 0.85, stagger: 0.07 }, "-=0.35")
      .to(".vl-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.4");

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const color = card.dataset.color!;

      gsap.set(card, { autoAlpha: 0, y: 44, scale: 0.96, filter: "blur(8px)" });
      const icon  = card.querySelector<HTMLElement>(".vl-icon");
      const title = card.querySelector<HTMLElement>(".vl-title");
      const line  = card.querySelector<HTMLElement>(".vl-line");
      if (icon)  gsap.set(icon,  { autoAlpha: 0, scale: 0.5, rotation: -20 });
      if (title) gsap.set(title, { autoAlpha: 0, y: 12 });
      if (line)  gsap.set(line,  { scaleX: 0, transformOrigin: "left center" });

      gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 88%", end: "bottom 10%", toggleActions: "play reverse play reverse" },
        delay: (i % 3) * 0.09,
      })
        .to(card,  { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.65, ease: "power3.out" })
        .to(icon,  { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.8)" }, "-=0.35")
        .to(title, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.25")
        .to(line,  { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.25");

      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
        card.style.borderColor = color + "44";
        card.style.boxShadow = `0 0 32px ${color}18`;
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.55)" });
        card.style.borderColor = "rgba(255,255,255,0.07)";
        card.style.boxShadow = "none";
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Our values"
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 96, paddingBottom: 96 }}
    >
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: "50%", top: "-20%", left: "-12%", background: "radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 65%)", filter: "blur(100px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-15%", right: "-8%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="vl-eyebrow flex items-center justify-center gap-3 mb-6">
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
              What Drives Us
            </span>
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          </div>
          <h2 className="font-display font-black uppercase"
            style={{ fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            {["Our", "Core", "Values"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                <span className="vl-word inline-block" style={{ color: i === 2 ? "#F97316" : "#ffffff" }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="vl-sub mt-5 mx-auto max-w-lg"
            style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontWeight: 300 }}>
            Six principles that govern every decision we make, every product we ship, and every relationship we build.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map(({ num, icon: Icon, color, glow, title, body }, i) => (
            <div
              key={num}
              ref={el => { cardRefs.current[i] = el; }}
              data-color={color}
              className="relative flex flex-col gap-5 p-7 rounded-2xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.35s, box-shadow 0.35s",
              }}
            >
              {/* Ghost number */}
              <span aria-hidden style={{
                position: "absolute", top: 10, right: 14,
                fontFamily: "monospace", fontSize: 60, fontWeight: 900,
                color, opacity: 0.06, lineHeight: 1, userSelect: "none",
                letterSpacing: "-0.04em",
              }}>
                {num}
              </span>

              {/* Bottom line */}
              <div className="vl-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${color}55, transparent)` }} />

              {/* Icon */}
              <div className="vl-icon" style={{
                width: 46, height: 46, borderRadius: 13, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: glow, border: `1px solid ${color}30`,
                boxShadow: `0 0 18px ${glow}`,
              }}>
                <Icon style={{ width: 20, height: 20, color }} strokeWidth={1.6} />
              </div>

              <div>
                <h3 className="vl-title font-display font-bold mb-2.5"
                  style={{ fontSize: 16, color: "#fff", lineHeight: 1.25 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, fontWeight: 300 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
