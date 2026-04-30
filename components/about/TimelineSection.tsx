"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2022",
    quarter: "Q1",
    color: "#F97316",
    title: "Tekktopia Founded",
    body: "The company was incorporated in Lagos, Nigeria with a founding team of 4 engineers and a clear mandate — deliver world-class technology to African businesses.",
  },
  {
    year: "2022",
    quarter: "Q3",
    color: "#3B82F6",
    title: "First Enterprise Client",
    body: "Landed our first major enterprise engagement, delivering a full IT infrastructure overhaul and managed support contract within 60 days.",
  },
  {
    year: "2023",
    quarter: "Q1",
    color: "#10B981",
    title: "Software Division Launched",
    body: "Expanded beyond IT support into custom software development, onboarding a dedicated engineering team to build web and mobile applications for clients.",
  },
  {
    year: "2023",
    quarter: "Q2",
    color: "#8B5CF6",
    title: "Cybersecurity Practice",
    body: "Established a dedicated cybersecurity practice offering penetration testing, security audits, and 24/7 monitoring — responding to rising demand from financial sector clients.",
  },
  {
    year: "2023",
    quarter: "Q4",
    color: "#06B6D4",
    title: "International Expansion",
    body: "Extended operations to Canada, enabling us to serve the Nigerian diaspora market and take on cross-border enterprise projects.",
  },
  {
    year: "2024",
    quarter: "Q2",
    color: "#F59E0B",
    title: "Cloud & AI Services",
    body: "Launched cloud migration and AI integration services — helping clients move to scalable infrastructure and leverage intelligent automation across their operations.",
  },
  {
    year: "2024",
    quarter: "Q4",
    color: "#EF4444",
    title: "50+ Clients Milestone",
    body: "Surpassed 50 active client relationships across Nigeria, the UK, and Canada — cementing Tekktopia's reputation as a trusted long-term tech partner.",
  },
  {
    year: "2025",
    quarter: "Q1",
    color: "#EC4899",
    title: "Strategic Partnerships",
    body: "Formalised partnerships with Microsoft and Liquid Intelligent Technologies, unlocking enterprise-grade cloud and connectivity solutions for our client base.",
  },
];

export default function TimelineSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const itemRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(".tl-eyebrow", { autoAlpha: 0, y: 16, filter: "blur(5px)" });
    gsap.set(".tl-word",    { yPercent: 110 });
    gsap.set(".tl-sub",     { autoAlpha: 0, y: 16, filter: "blur(4px)" });
    gsap.set(".tl-spine",   { scaleY: 0, transformOrigin: "top center" });

    gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 88%", end: "bottom 15%", toggleActions: "play reverse play reverse" },
      defaults: { ease: "power3.out" },
    })
      .to(".tl-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 })
      .to(".tl-word",    { yPercent: 0, duration: 0.85, stagger: 0.07 }, "-=0.35")
      .to(".tl-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.4")
      .to(".tl-spine",   { scaleY: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.5");

    /* Per-item animations */
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const isLeft = i % 2 === 0;

      gsap.set(el, { autoAlpha: 0, x: isLeft ? -50 : 50, filter: "blur(8px)" });
      const dot = el.querySelector<HTMLElement>(".tl-dot");
      if (dot) gsap.set(dot, { scale: 0 });

      gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 10%", toggleActions: "play reverse play reverse" },
      })
        .to(el, { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" })
        .to(dot, { scale: 1, duration: 0.45, ease: "back.out(1.8)" }, "-=0.4");
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Company timeline"
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
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: "50%", top: "10%", left: "-15%", background: "radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 65%)", filter: "blur(100px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: "10%", right: "-10%", background: "radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="tl-eyebrow flex items-center justify-center gap-3 mb-6">
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
              Our Journey
            </span>
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          </div>
          <h2 className="font-display font-black uppercase"
            style={{ fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            {["From", "Idea", "to", "Impact."].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                <span className="tl-word inline-block" style={{ color: i >= 2 ? "#F97316" : "#ffffff" }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="tl-sub mt-5 mx-auto max-w-lg"
            style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontWeight: 300 }}>
            Every milestone is a testament to the trust our clients place in us — and the relentless drive of the team behind every delivery.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical spine */}
          <div className="tl-spine hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.6), rgba(59,130,246,0.4), rgba(255,255,255,0.08))" }} />

          <div className="flex flex-col gap-10 lg:gap-0">
            {MILESTONES.map(({ year, quarter, color, title, body }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-center">

                  {/* Dot — center spine */}
                  <div className="tl-dot hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center"
                    style={{ width: 14, height: 14, borderRadius: "50%", background: color, boxShadow: `0 0 18px ${color}88, 0 0 6px ${color}` }} />

                  {/* Card */}
                  <div
                    ref={el => { itemRefs.current[i] = el; }}
                    className={`lg:col-start-${isLeft ? "1" : "2"} relative p-7 rounded-2xl`}
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                      position: "relative",
                      overflow: "hidden",
                      marginBottom: "2rem",
                      order: isLeft ? 0 : 1,
                    }}
                  >
                    {/* Bottom accent line */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${color}55, transparent)` }} />

                    {/* Year + quarter badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span style={{
                        padding: "3px 10px", borderRadius: 99,
                        background: `${color}18`, border: `1px solid ${color}35`,
                        fontFamily: "monospace", fontSize: 11, fontWeight: 700, color,
                        letterSpacing: "0.1em",
                      }}>
                        {year}
                      </span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.16em" }}>
                        {quarter}
                      </span>
                    </div>

                    <h3 className="font-display font-bold mb-3"
                      style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "#fff", lineHeight: 1.25 }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontWeight: 300 }}>
                      {body}
                    </p>
                  </div>

                  {/* Empty col for alternating layout */}
                  {isLeft && <div className="hidden lg:block" />}
                  {!isLeft && <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />}
                </div>
              );
            })}
          </div>

          {/* End cap */}
          <div className="hidden lg:flex justify-center mt-4">
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 18px rgba(249,115,22,0.8)" }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Present</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
