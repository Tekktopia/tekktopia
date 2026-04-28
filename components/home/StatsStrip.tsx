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
  { icon: Briefcase, label: "Projects Delivered", value: "50+",    sub: "Across 10+ industries worldwide", counter: { from: 0, to: 50, suffix: "+" } },
  { icon: Users,     label: "Client Satisfaction",value: "98%",    sub: "Based on post-project reviews",   counter: { from: 0, to: 98, suffix: "%" } },
  { icon: Clock,     label: "Support Response",   value: "< 1 hr", sub: "Guaranteed first response time",  counter: { from: 24, to: 1, prefix: "< ", suffix: " hr" } },
  { icon: Trophy,    label: "Uptime Guarantee",   value: "99.9%",  sub: "SLA-backed service reliability",  typewriter: true },
];

export default function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stat-card");

    const master = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 84%", toggleActions: "play none none reverse", invalidateOnRefresh: true },
    });

    cards.forEach((card, i) => {
      const offset    = i * 0.1;
      const icon      = card.querySelector<HTMLElement>(".stat-icon");
      const labelEl   = card.querySelector<HTMLElement>(".stat-label");
      const valueEl   = card.querySelector<HTMLElement>(".stat-value");
      const accentEl  = card.querySelector<HTMLElement>(".stat-accent");
      const subEl     = card.querySelector<HTMLElement>(".stat-sub");
      const shimmerEl = card.querySelector<HTMLElement>(".stat-shimmer");

      master.fromTo(card,   { clipPath: "inset(100% 0% 0% 0% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 0.78, ease: "expo.out" }, offset);
      if (shimmerEl) master.fromTo(shimmerEl, { x: "-110%", autoAlpha: 1 }, { x: "210%", autoAlpha: 0.4, duration: 0.85, ease: "sine.inOut" }, offset + 0.05);
      if (icon)      master.fromTo(icon,  { scale: 0.3, rotation: -20, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(2.8)" }, offset + 0.18);
      if (labelEl)   master.fromTo(labelEl,{ y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, offset + 0.26);

      const stat = stats[i];
      if (stat.counter && valueEl) {
        const { from, to, prefix = "", suffix = "" } = stat.counter;
        valueEl.textContent = prefix + from + suffix;
        const proxy = { val: from };
        master.to(proxy, { val: to, duration: 1.6, ease: "power2.out", onUpdate() { valueEl.textContent = prefix + Math.round(proxy.val) + suffix; } }, offset + 0.32);
      } else if (stat.typewriter && valueEl) {
        const full = stat.value;
        valueEl.textContent = "";
        const proxy = { len: 0 };
        master.to(proxy, { len: full.length, duration: 0.75, ease: "none", onUpdate() { valueEl.textContent = full.slice(0, Math.round(proxy.len)); } }, offset + 0.32);
      }
      if (accentEl) master.fromTo(accentEl, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "expo.out" }, offset + 0.52);
      if (subEl)    master.fromTo(subEl,    { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, offset + 0.62);
    });

    /* Hover micro-interactions */
    cards.forEach((card) => {
      const icon  = card.querySelector<HTMLElement>(".stat-icon");
      const value = card.querySelector<HTMLElement>(".stat-value");
      card.addEventListener("mouseenter", () => {
        gsap.to(icon,  { rotation: 12, scale: 1.15, duration: 0.4, ease: "back.out(2.5)" });
        gsap.fromTo(value, { y: 0 }, { y: -4, yoyo: true, repeat: 1, duration: 0.2, ease: "power1.inOut" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(icon, { rotation: 0, scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.5)" });
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} aria-label="Tekktopia statistics" className="border-y border-border bg-off-white px-5 sm:px-8 md:px-12 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section label */}
        <p className="text-center text-[11px] font-mono font-semibold text-navy/40 uppercase tracking-[0.3em] mb-12">
          Trusted Numbers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="stat-card group relative flex cursor-default flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 sm:p-8 transition-all duration-300 hover:border-blue/30 hover:shadow-[0_12px_40px_-12px_rgba(37,99,235,0.15)] hover:-translate-y-1"
              style={{ clipPath: "inset(100% 0% 0% 0% round 16px)" }}
            >
              {/* Shimmer */}
              <div className="stat-shimmer pointer-events-none absolute inset-0 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0" aria-hidden />

              {/* Icon */}
              <div className="stat-icon mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-off-white text-navy/50 transition-all group-hover:border-blue/20 group-hover:bg-blue/5 group-hover:text-blue">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>

              {/* Label — dark on white */}
              <p className="stat-label text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-navy/50">{label}</p>

              {/* Value — very dark on white */}
              <p className="stat-value mt-2 font-display font-black text-3xl sm:text-[2rem] tracking-tight text-navy">{value}</p>

              {/* Orange-to-blue accent line */}
              <div className="stat-accent mt-3 h-[2.5px] w-10 origin-left rounded-full bg-gradient-to-r from-orange to-blue" />

              {/* Sub — readable grey */}
              <p className="stat-sub mt-3 text-sm font-normal leading-relaxed text-navy/60">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
