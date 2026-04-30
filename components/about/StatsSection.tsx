"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "2022", label: "Year Founded",        suffix: "",  accent: "#F97316" },
  { value: "50",   label: "Clients Served",       suffix: "+", accent: "#3B82F6" },
  { value: "120",  label: "Projects Delivered",   suffix: "+", accent: "#10B981" },
  { value: "25",   label: "Team Specialists",     suffix: "+", accent: "#8B5CF6" },
  { value: "99",   label: "Uptime SLA",           suffix: "%", accent: "#06B6D4" },
  { value: "24",   label: "Support Hours",        suffix: "/7", accent: "#F59E0B" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".st-card", { autoAlpha: 0, y: 40, scale: 0.95, filter: "blur(8px)" });
    gsap.set(".st-line", { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { ease: "power3.out" },
    });

    tl.to(".st-card", { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.08 });
    tl.to(".st-line", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.5");

    /* Count-up animation */
    document.querySelectorAll<HTMLElement>(".st-num").forEach(el => {
      const target = parseInt(el.dataset.target ?? "0", 10);
      if (isNaN(target)) return;
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target,
        duration: 1.8,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Company stats"
      className="relative overflow-hidden"
      style={{ background: "#060C15", paddingTop: 80, paddingBottom: 80 }}
    >
      {/* Top & bottom rules */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Divider line */}
        <div className="st-line mb-12" style={{ height: 1, background: "linear-gradient(to right,#F97316,rgba(249,115,22,0))", width: "40%" }} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map(({ value, label, suffix, accent }) => {
            const numericValue = parseInt(value, 10);
            const isNumeric = !isNaN(numericValue);

            return (
              <div key={label} className="st-card flex flex-col items-center text-center p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  overflow: "hidden",
                }}>
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${accent}66, transparent)` }} />

                <div className="flex items-end gap-0.5 mb-2">
                  {isNumeric ? (
                    <span
                      className="st-num font-display font-black"
                      data-target={numericValue}
                      style={{ fontSize: "clamp(28px,3.2vw,40px)", lineHeight: 1, color: accent, letterSpacing: "-0.03em" }}
                    >
                      {numericValue}
                    </span>
                  ) : (
                    <span className="font-display font-black"
                      style={{ fontSize: "clamp(28px,3.2vw,40px)", lineHeight: 1, color: accent, letterSpacing: "-0.03em" }}>
                      {value}
                    </span>
                  )}
                  {suffix && (
                    <span style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 800, color: accent, lineHeight: 1.2, marginBottom: 2 }}>
                      {suffix}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "monospace", lineHeight: 1.4 }}>
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
