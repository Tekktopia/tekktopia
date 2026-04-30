"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Target, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".ms-eyebrow", { autoAlpha: 0, y: 16, filter: "blur(5px)" });
    gsap.set(".ms-word",    { yPercent: 110 });
    gsap.set(".ms-body",    { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".ms-card",    { autoAlpha: 0, y: 40, filter: "blur(8px)" });
    gsap.set(".ms-quote",   { autoAlpha: 0, y: 24, filter: "blur(5px)" });

    const st = {
      trigger: sectionRef.current,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    };

    gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } })
      .to(".ms-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 })
      .to(".ms-word",    { yPercent: 0, duration: 0.9, stagger: 0.065 }, "-=0.35")
      .to(".ms-body",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.12 }, "-=0.5")
      .to(".ms-card",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.14 }, "-=0.4")
      .to(".ms-quote",   { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.3");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Our mission and vision"
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
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: "50%", top: "-20%", right: "-10%", background: "radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-15%", left: "-8%", background: "radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 65%)", filter: "blur(90px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Eyebrow */}
        <div className="ms-eyebrow flex items-center gap-3 mb-6">
          <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
            Who We Are
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display font-black uppercase mb-10"
          style={{ fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
          {[
            { text: "Driven by", accent: false },
            { text: "Purpose,", accent: false },
            { text: "Defined by", accent: false },
            { text: "Results.", accent: true },
          ].map(({ text, accent }, li) => (
            <span key={li} className="block">
              {text.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]">
                  <span className="ms-word inline-block" style={{ color: accent ? "#F97316" : "#ffffff" }}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — body copy */}
          <div className="flex flex-col justify-center">
            <p className="ms-body mb-5"
              style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.7)", fontWeight: 300, lineHeight: 1.85 }}>
              Tekktopia was born out of a simple observation: African businesses deserved world-class technology partners — not vendors who over-promise and under-deliver, but a team that owns every outcome alongside them.
            </p>
            <p className="ms-body mb-5"
              style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.85 }}>
              From a bold idea in Lagos, we've grown into a full-stack tech firm trusted by companies across Nigeria, Canada, and beyond — delivering software, infrastructure, cybersecurity, and strategy that actually works.
            </p>
            <p className="ms-body"
              style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.85 }}>
              We don't chase projects. We build partnerships — long-term, hands-on relationships where your success is the only metric that matters.
            </p>
          </div>

          {/* Right — Mission + Vision cards */}
          <div className="flex flex-col gap-5">
            {[
              {
                Icon: Target,
                color: "#F97316",
                glow: "rgba(249,115,22,0.18)",
                label: "Our Mission",
                text: "To empower African businesses with reliable, secure, and scalable technology — delivering end-to-end solutions that remove friction, accelerate growth, and create lasting digital advantage.",
              },
              {
                Icon: Eye,
                color: "#3B82F6",
                glow: "rgba(59,130,246,0.18)",
                label: "Our Vision",
                text: "A future where every African business — from ambitious startup to established enterprise — has access to the same world-class technology that powers global industry leaders.",
              },
            ].map(({ Icon, color, glow, label, text }) => (
              <div key={label} className="ms-card relative p-7 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}>
                {/* Bottom accent line */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${color}55, transparent)` }} />

                <div className="flex items-start gap-4">
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: glow, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 16px ${glow}`,
                  }}>
                    <Icon style={{ width: 19, height: 19, color }} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: color, marginBottom: 8 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, fontWeight: 300 }}>
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Founder quote */}
            <div className="ms-quote p-6 rounded-2xl"
              style={{
                background: "rgba(249,115,22,0.05)",
                border: "1px solid rgba(249,115,22,0.14)",
              }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontStyle: "italic", fontWeight: 300, marginBottom: 14 }}>
                &ldquo;Technology should be an equaliser, not a barrier. We built Tekktopia to give every African business the digital edge they deserve.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F97316" }}>T</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Tekktopia Founder</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
