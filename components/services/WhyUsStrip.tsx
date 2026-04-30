"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    label: "One team. All disciplines.",
    body: "No sub-contracting, no hand-offs to strangers. The same team that scopes your project builds and supports it.",
  },
  {
    label: "Outcomes over outputs.",
    body: "We measure success in business results — not deliverables. If it doesn't move your needle, we say so.",
  },
  {
    label: "Transparent by default.",
    body: "Weekly updates, shared dashboards, and direct access to engineers. No account-manager buffer between you and the work.",
  },
  {
    label: "Built to last.",
    body: "Clean code, documented systems, and sensible architecture choices. We build things we're happy to inherit — and to maintain.",
  },
];

export default function WhyUsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".wu-eyebrow", { autoAlpha: 0, y: 14 });
    gsap.set(".wu-heading", { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".wu-card",    { autoAlpha: 0, y: 28, filter: "blur(6px)" });

    const st = {
      trigger: sectionRef.current,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    };

    gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } })
      .to(".wu-eyebrow", { autoAlpha: 1, y: 0, duration: 0.55 })
      .to(".wu-heading", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.3")
      .to(".wu-card",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.1 }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 80, paddingBottom: 96 }}
    >
      {/* Top rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-28">
            <div className="wu-eyebrow flex items-center gap-3 mb-6">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                Why Tekktopia
              </span>
            </div>
            <h2 className="wu-heading font-display font-black uppercase"
              style={{ fontSize: "clamp(28px,3.5vw,46px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "#ffffff" }}>
              The difference<br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>is in how we work.</span>
            </h2>
          </div>

          {/* Right — points */}
          <div className="flex flex-col gap-0">
            {POINTS.map(({ label, body }, i) => (
              <div
                key={i}
                className="wu-card flex gap-5 py-7"
                style={{ borderBottom: i < POINTS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <CheckCircle2
                  style={{ width: 18, height: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: 2 }}
                  strokeWidth={1.5}
                />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", marginBottom: 6, letterSpacing: "-0.01em" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", lineHeight: 1.78, fontWeight: 300 }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
