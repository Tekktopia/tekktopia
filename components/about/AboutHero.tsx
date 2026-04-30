"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Swap src for a real team/founder photo when ready ──────────────────────
const FOUNDER_PHOTO = null; // e.g. "/team/founder.jpg"

const PROOF_POINTS = [
  { num: "01", label: "Founded",       value: "2022",    sub: "Lagos, Nigeria" },
  { num: "02", label: "Clients",       value: "50+",     sub: "Across 3 continents" },
  { num: "03", label: "Projects",      value: "120+",    sub: "Delivered on time" },
  { num: "04", label: "Uptime SLA",    value: "99%",     sub: "Always-on support" },
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── Set initial states ──
    gsap.set(".ah-eyebrow",      { autoAlpha: 0, y: 14 });
    gsap.set(".ah-word",         { yPercent: 110 });
    gsap.set(".ah-quote",        { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".ah-cta",          { autoAlpha: 0, y: 16 });
    gsap.set(".ah-photo-wrap",   { autoAlpha: 0, x: 48, filter: "blur(10px)" });
    gsap.set(".ah-proof-line",   { scaleX: 0, transformOrigin: "left" });
    gsap.set(".ah-proof-item",   { autoAlpha: 0, y: 20 });
    gsap.set(".ah-scroll",       { autoAlpha: 0 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".ah-eyebrow",    { autoAlpha: 1, y: 0, duration: 0.55 },                   0.1)
      .to(".ah-word",       { yPercent: 0, duration: 1, stagger: 0.06 },              "-=0.3")
      .to(".ah-photo-wrap", { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 1 }, 0.3)
      .to(".ah-quote",      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.55")
      .to(".ah-cta",        { autoAlpha: 1, y: 0, duration: 0.5 },                    "-=0.35")
      .to(".ah-proof-line", { scaleX: 1, duration: 0.9, ease: "power2.inOut" },       "-=0.4")
      .to(".ah-proof-item", { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.09 },    "-=0.7")
      .to(".ah-scroll",     { autoAlpha: 1, duration: 0.8 },                          "-=0.2");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#04080F", minHeight: "100svh", paddingTop: 108, paddingBottom: 0 }}
    >
      {/* Subtle grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Soft aurora — kept subtle so it doesn't fight the editorial feel */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: "50%", top: "-20%", left: "-10%", background: "radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 65%)", filter: "blur(100px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: "50%", bottom: "20%", right: "-5%", background: "radial-gradient(circle,rgba(249,115,22,0.09) 0%,transparent 65%)", filter: "blur(90px)" }} />

      {/* Top rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* ── Hero split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-16 items-start pb-16 lg:pb-24">

          {/* LEFT — copy */}
          <div className="flex flex-col pt-4">

            {/* Eyebrow */}
            <div className="ah-eyebrow flex items-center gap-3 mb-8">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                About Us
              </span>
            </div>

            {/* Headline — editorial, direct, human */}
            <h1 className="font-display font-black uppercase mb-10"
              style={{ fontSize: "clamp(42px,5.8vw,80px)", lineHeight: 0.88, letterSpacing: "-0.04em" }}>
              {[
                { words: ["We started"],         accent: false },
                { words: ["with a"],             accent: false },
                { words: ["problem."],           accent: false },
                { words: ["We became"],          accent: true  },
                { words: ["the solution."],      accent: true  },
              ].map(({ words, accent }, li) => (
                <span key={li} className="block">
                  {words.join(" ").split(" ").map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.14em]">
                      <span className="ah-word inline-block"
                        style={{ color: accent ? "#F97316" : "#ffffff" }}>
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Founder pull-quote */}
            <div className="ah-quote mb-10 pl-5 max-w-lg"
              style={{ borderLeft: "2px solid #F97316" }}>
              <p style={{ fontSize: "clamp(14px,1.5vw,16.5px)", color: "rgba(255,255,255,0.68)", fontWeight: 300, lineHeight: 1.85, fontStyle: "italic" }}>
                &ldquo;African businesses were being underserved — handed off to junior consultants, sold products they didn&apos;t need, and left to figure it out alone. We built Tekktopia because they deserved better.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "radial-gradient(135deg,rgba(249,115,22,0.3),rgba(249,115,22,0.05))",
                  border: "1px solid rgba(249,115,22,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#F97316", fontFamily: "monospace" }}>TF</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>Tekktopia Founder</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 2 }}>Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="ah-cta flex flex-wrap gap-3">
              <Link href="/contact"
                className="group inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg,#F97316,#EA6A00)",
                  boxShadow: "0 0 0 1px rgba(249,115,22,0.35),0 4px 24px rgba(249,115,22,0.22)",
                  transition: "box-shadow 0.3s,transform 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 55px rgba(249,115,22,0.5),0 0 0 1px rgba(249,115,22,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(249,115,22,0.35),0 4px 24px rgba(249,115,22,0.22)"; e.currentTarget.style.transform = "none"; }}
              >
                Work with us
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link href="/projects"
                className="group inline-flex items-center gap-2.5 font-medium text-sm px-7 py-3.5 rounded-xl"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "border-color 0.3s,color 0.3s,background 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                See our work
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="ah-photo-wrap relative hidden lg:block" style={{ paddingTop: 4 }}>

            {/* Main photo frame */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/5", background: "#0a1020", border: "1px solid rgba(255,255,255,0.07)" }}>

              {FOUNDER_PHOTO ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={FOUNDER_PHOTO} alt="Tekktopia team" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                /* Gradient placeholder — remove once real photo is added */
                <>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#0f1f3d 0%,#04080F 40%,#1a0a00 100%)" }} />
                  {/* Decorative lines pattern */}
                  <div className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: "linear-gradient(rgba(249,115,22,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.06) 1px,transparent 1px)",
                      backgroundSize: "40px 40px",
                    }} />
                  {/* Centre wordmark */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.38em", color: "rgba(255,255,255,0.18)" }}>
                      Add founder photo here
                    </span>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.1)", letterSpacing: "0.2em" }}>
                      /team/founder.jpg
                    </span>
                  </div>
                </>
              )}

              {/* Bottom gradient scrim */}
              <div className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: "linear-gradient(to top,rgba(4,8,15,0.85),transparent)" }} />

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-2.5">
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 8px #F97316", animation: "ahPulse 2s infinite" }} />
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Lagos, Nigeria · Est. 2022
                  </span>
                </div>
              </div>
            </div>

            {/* Floating accent card — top right corner */}
            <div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.25)",
                backdropFilter: "blur(12px)",
              }}>
              <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Team size</p>
              <p className="font-display font-black" style={{ fontSize: 26, color: "#F97316", lineHeight: 1, letterSpacing: "-0.03em" }}>25+</p>
            </div>

            {/* Floating accent card — bottom left */}
            <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.2)",
                backdropFilter: "blur(12px)",
              }}>
              <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Projects</p>
              <p className="font-display font-black" style={{ fontSize: 26, color: "#3B82F6", lineHeight: 1, letterSpacing: "-0.03em" }}>120+</p>
            </div>
          </div>

        </div>

        {/* ── Proof-points strip ── */}
        <div className="relative border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {/* Animated top line */}
          <div className="ah-proof-line absolute top-0 left-0 h-px w-full"
            style={{ background: "linear-gradient(to right,#F97316,rgba(249,115,22,0))", transformOrigin: "left" }} />

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {PROOF_POINTS.map(({ num, label, value, sub }, i) => (
              <div
                key={num}
                className="ah-proof-item py-8 px-6"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
                  {num} — {label}
                </p>
                <p className="font-display font-black"
                  style={{ fontSize: "clamp(28px,3vw,40px)", color: "#fff", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 6 }}>
                  {value}
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "monospace", letterSpacing: "0.06em" }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="ah-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom,rgba(249,115,22,0.5),transparent)" }} />
      </div>

      <style>{`
        @keyframes ahPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
