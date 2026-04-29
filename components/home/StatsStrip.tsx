"use client";

import { useRef } from "react";
import { Briefcase, Users, Clock, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Stat = {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  counter?: { from: number; to: number; prefix?: string; suffix?: string };
  typewriter?: boolean;
};

const stats: Stat[] = [
  { icon: Briefcase, label: "Projects Delivered",  value: "50+",    sub: "Across 10+ industries",         counter: { from: 0, to: 50, suffix: "+" } },
  { icon: Users,     label: "Client Satisfaction", value: "98%",    sub: "Post-project reviews",           counter: { from: 0, to: 98, suffix: "%" } },
  { icon: Clock,     label: "Support Response",    value: "< 1 hr", sub: "Guaranteed first response",      counter: { from: 24, to: 1, prefix: "< ", suffix: " hr" } },
  { icon: Trophy,    label: "Uptime Guarantee",    value: "99.9%",  sub: "SLA-backed reliability",         typewriter: true },
];

export default function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stat-card");

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 84%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    // Section reveal
    master.fromTo(sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      0
    );

    cards.forEach((card, i) => {
      const offset   = i * 0.12;
      const iconEl   = card.querySelector<HTMLElement>(".stat-icon");
      const labelEl  = card.querySelector<HTMLElement>(".stat-label");
      const valueEl  = card.querySelector<HTMLElement>(".stat-value");
      const subEl    = card.querySelector<HTMLElement>(".stat-sub");
      const divider  = card.querySelector<HTMLElement>(".stat-divider");

      master.fromTo(card, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, offset);
      if (divider) master.fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out" }, offset + 0.1);
      if (iconEl)  master.fromTo(iconEl,  { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(2.5)" }, offset + 0.18);
      if (labelEl) master.fromTo(labelEl, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" }, offset + 0.28);

      const stat = stats[i];
      if (stat.counter && valueEl) {
        const { from, to, prefix = "", suffix = "" } = stat.counter;
        valueEl.textContent = prefix + from + suffix;
        const proxy = { val: from };
        master.to(proxy, {
          val: to, duration: 1.8, ease: "power2.out",
          onUpdate() { valueEl.textContent = prefix + Math.round(proxy.val) + suffix; },
        }, offset + 0.3);
      } else if (stat.typewriter && valueEl) {
        const full = stat.value;
        valueEl.textContent = "";
        const proxy = { len: 0 };
        master.to(proxy, {
          len: full.length, duration: 0.8, ease: "none",
          onUpdate() { valueEl.textContent = full.slice(0, Math.round(proxy.len)); },
        }, offset + 0.3);
      }

      if (subEl) master.fromTo(subEl, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" }, offset + 0.55);
    });

    // Hover micro-interactions
    cards.forEach((card) => {
      const iconEl  = card.querySelector<HTMLElement>(".stat-icon");
      const valueEl = card.querySelector<HTMLElement>(".stat-value");
      card.addEventListener("mouseenter", () => {
        gsap.to(iconEl,  { rotation: 12, scale: 1.18, duration: 0.4, ease: "back.out(2.5)" });
        gsap.to(valueEl, { color: "#ffffff", duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(iconEl,  { rotation: 0, scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.5)" });
        gsap.to(valueEl, { color: "#F97316", duration: 0.4, ease: "power2.out" });
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Tekktopia statistics"
      style={{ background: "#04080F", opacity: 0 }}
    >
      {/* Top orange line */}
      <div style={{ height: 2, background: "linear-gradient(to right, transparent, #F97316 30%, #F97316 70%, transparent)" }} />

      {/* Fine grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12 py-16 md:py-20">

        {/* Label */}
        <p className="text-center mb-12"
          style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.32em", color: "rgba(255,255,255,0.25)" }}>
          By The Numbers
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value, sub }, i) => (
            <div
              key={label}
              className="stat-card group relative flex flex-col items-center text-center px-6 py-8 cursor-default"
              style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
            >
              {/* Divider ref for animation */}
              <div className="stat-divider" style={{ display: "none" }} />

              {/* Icon */}
              <div
                className="stat-icon mb-6 flex items-center justify-center"
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.22)",
                }}
              >
                <Icon style={{ width: 20, height: 20, color: "#F97316" }} strokeWidth={1.5} aria-hidden />
              </div>

              {/* Label */}
              <p className="stat-label mb-3"
                style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)" }}>
                {label}
              </p>

              {/* Value */}
              <p className="stat-value font-display font-black"
                style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1, color: "#F97316", letterSpacing: "-0.02em" }}>
                {value}
              </p>

              {/* Sub */}
              <p className="stat-sub mt-3"
                style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom orange line */}
      <div style={{ height: 2, background: "linear-gradient(to right, transparent, #F97316 30%, #F97316 70%, transparent)" }} />
    </section>
  );
}
