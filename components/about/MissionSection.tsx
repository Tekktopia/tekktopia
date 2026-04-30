"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Target, Eye, Handshake, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    Icon: Handshake,
    color: "#F97316",
    glow: "rgba(249,115,22,0.14)",
    title: "Partnership",
    body: "We embed ourselves in your team — not as vendors, but as a long-term tech partner invested in your outcomes.",
  },
  {
    Icon: Zap,
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.14)",
    title: "Excellence",
    body: "Every line of code, every deployment, every support ticket — held to the same standard we'd set for ourselves.",
  },
  {
    Icon: Target,
    color: "#F97316",
    glow: "rgba(249,115,22,0.14)",
    title: "Results",
    body: "We measure success in shipped products, uptime records, and clients who keep coming back — nothing else.",
  },
];

// ── 2-line headline ────────────────────────────────────────────────────────
const TITLE_LINES = [
  { words: ["Driven", "by", "Purpose,"],  accent: false },
  { words: ["Defined", "by", "Results."], accent: true  },
];

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".ms-eyebrow", { autoAlpha: 0, y: 16 });
    gsap.set(".ms-word",    { yPercent: 110 });
    gsap.set(".ms-body",    { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".ms-pillar",  { autoAlpha: 0, y: 36, filter: "blur(8px)" });
    gsap.set(".ms-card",    { autoAlpha: 0, y: 36, filter: "blur(8px)" });

    const st = {
      trigger: sectionRef.current,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    };

    gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } })
      .to(".ms-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 })
      .to(".ms-word",    { yPercent: 0, duration: 0.9, stagger: 0.065 }, "-=0.35")
      .to(".ms-body",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.1 }, "-=0.45")
      .to(".ms-pillar",  { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65, stagger: 0.12 }, "-=0.35")
      .to(".ms-card",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65, stagger: 0.14 }, "-=0.3");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Who we are"
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 100, paddingBottom: 100 }}
    >
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora */}
      <div aria-hidden className="absolute pointer-events-none"
        style={{ width: 700, height: 700, borderRadius: "50%", top: "-15%", right: "-10%", background: "radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 65%)", filter: "blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-15%", left: "-8%", background: "radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* ── Header block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 items-end">

          {/* Left — eyebrow + 2-line title */}
          <div>
            <div className="ms-eyebrow flex items-center gap-3 mb-6">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
                Who We Are
              </span>
            </div>

            <h2 className="font-display font-black uppercase"
              style={{ fontSize: "clamp(30px,4vw,54px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
              {TITLE_LINES.map(({ words, accent }, li) => (
                <span key={li} className="block">
                  {words.map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.14em]">
                      <span className="ms-word inline-block"
                        style={{ color: accent ? "#F97316" : "#ffffff" }}>
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>

          {/* Right — intro paragraph */}
          <div className="flex flex-col gap-4">
            <p className="ms-body"
              style={{ fontSize: "clamp(14px,1.45vw,16px)", color: "rgba(255,255,255,0.68)", fontWeight: 300, lineHeight: 1.85 }}>
              Tekktopia was born from a simple belief: African businesses deserve world-class technology partners — not vendors who over-promise and under-deliver, but a team that owns every outcome alongside them.
            </p>
            <p className="ms-body"
              style={{ fontSize: "clamp(14px,1.45vw,16px)", color: "rgba(255,255,255,0.48)", fontWeight: 300, lineHeight: 1.85 }}>
              From Lagos, we've grown into a full-stack tech firm trusted by companies across Nigeria, Canada, and beyond — delivering software, infrastructure, cybersecurity, and strategy that actually works.
            </p>
          </div>
        </div>

        {/* ── Three pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {PILLARS.map(({ Icon, color, glow, title, body }) => (
            <div
              key={title}
              className="ms-pillar relative p-6 rounded-2xl group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "border-color 0.3s, background 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
              }}
            >
              {/* Top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "12px 12px 0 0", background: `linear-gradient(to right, ${color}, transparent)` }} />

              <div style={{ width: 42, height: 42, borderRadius: 11, background: glow, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon style={{ width: 18, height: 18, color }} strokeWidth={1.6} />
              </div>

              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</p>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* ── Mission + Vision cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            {
              Icon: Target,
              color: "#F97316",
              glow: "rgba(249,115,22,0.16)",
              label: "Our Mission",
              text: "To empower African businesses with reliable, secure, and scalable technology — delivering end-to-end solutions that remove friction, accelerate growth, and create lasting digital advantage.",
            },
            {
              Icon: Eye,
              color: "#3B82F6",
              glow: "rgba(59,130,246,0.16)",
              label: "Our Vision",
              text: "A future where every African business — from ambitious startup to established enterprise — has access to the same world-class technology that powers global industry leaders.",
            },
          ].map(({ Icon, color, glow, label, text }) => (
            <div key={label} className="ms-card relative p-7 rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Bottom accent */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${color}55, transparent)` }} />

              <div className="flex items-start gap-4">
                <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: glow, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 18px ${glow}` }}>
                  <Icon style={{ width: 20, height: 20, color }} strokeWidth={1.6} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color, marginBottom: 8 }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, fontWeight: 300 }}>{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
