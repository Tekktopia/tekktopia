"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SERVICES from "@/lib/services-data";
import { CTABanner } from "@/components/home";
import ServiceConstellation from "@/components/services/ServiceConstellation";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(() => {
    gsap.set(".svp-eyebrow", { autoAlpha: 0, y: 16 });
    gsap.set(".svp-word",    { yPercent: 110 });
    gsap.set(".svp-sub",     { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".svp-card",    { autoAlpha: 0, y: 44, scale: 0.96, filter: "blur(8px)" });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".svp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1)
      .to(".svp-word",    { yPercent: 0, duration: 1, stagger: 0.065 }, "-=0.3")
      .to(".svp-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.5");

    document.querySelectorAll<HTMLElement>(".svp-card").forEach((card, i) => {
      gsap.to(card, {
        autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.65, ease: "power3.out",
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
      });
    });
  }, { scope: sectionRef });

  return (
    <>
      <main ref={sectionRef} style={{ background: "#04080F", overflowX: "hidden" }}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ paddingTop: 128, paddingBottom: 80 }}>
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }} />
          <div aria-hidden className="absolute pointer-events-none" style={{ width: 900, height: 600, borderRadius: "50%", top: "-20%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse,rgba(37,99,235,0.12) 0%,transparent 65%)", filter: "blur(80px)" }} />
          <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-10%", right: "-5%", background: "radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 65%)", filter: "blur(80px)" }} />
          <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 text-center">
            <div className="svp-eyebrow flex items-center justify-center gap-3 mb-7">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                What We Do
              </span>
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            </div>

            <h1 className="font-display font-black uppercase mx-auto"
              style={{ fontSize: "clamp(40px,6vw,82px)", lineHeight: 0.9, letterSpacing: "-0.04em", maxWidth: 900 }}>
              {["End-to-End", "Tech", "Services"].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]">
                  <span className="svp-word inline-block"
                    style={{ color: i === 2 ? "#F97316" : "#ffffff" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="svp-sub mt-6 mx-auto max-w-2xl"
              style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.85 }}>
              Ten specialisations. One team. We design, build, secure, and support every layer of your technology — so you can focus on your business.
            </p>

            {/* Service count pills */}
            <div className="svp-sub flex items-center justify-center gap-4 mt-8 flex-wrap">
              {[
                { label: "10 Services",         color: "#F97316" },
                { label: "24/7 Support",         color: "#10B981" },
                { label: "120+ Projects",        color: "#3B82F6" },
                { label: "Lagos · Canada · UK",  color: "#8B5CF6" },
              ].map(({ label, color }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 99,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", letterSpacing: "0.06em" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section style={{ paddingTop: 16, paddingBottom: 96 }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map(svc => {
                const Icon = svc.icon;
                const isHovered = hovered === svc.slug;
                return (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="svp-card group relative flex flex-col p-7 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.028)",
                      border: `1px solid ${isHovered ? svc.color + "50" : "rgba(255,255,255,0.07)"}`,
                      backdropFilter: "blur(12px)",
                      boxShadow: isHovered ? `0 0 0 1px ${svc.color}1a,0 20px 60px ${svc.glow}` : "none",
                      transform: isHovered ? "translateY(-5px)" : "none",
                      transition: "border-color 0.35s,box-shadow 0.35s,transform 0.35s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={() => setHovered(svc.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Colour top line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "16px 16px 0 0", background: `linear-gradient(to right,${svc.color}88,transparent)`, opacity: isHovered ? 1 : 0.4, transition: "opacity 0.3s" }} />

                    {/* Number */}
                    <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", color: svc.color, opacity: 0.7, marginBottom: 20, display: "block" }}>
                      {svc.num}
                    </span>

                    {/* Icon */}
                    <div style={{
                      width: 50, height: 50, borderRadius: 14, display: "flex",
                      alignItems: "center", justifyContent: "center", marginBottom: 20,
                      background: svc.glow, border: `1px solid ${svc.color}33`,
                      boxShadow: isHovered ? `0 0 24px ${svc.glow}` : "none",
                      transition: "box-shadow 0.3s",
                      flexShrink: 0,
                    }}>
                      <Icon style={{ width: 22, height: 22, color: svc.color }} strokeWidth={1.5} />
                    </div>

                    {/* Name */}
                    <h2 className="font-display font-bold mb-3"
                      style={{ fontSize: "clamp(17px,1.5vw,20px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                      {svc.name}
                    </h2>

                    {/* Desc */}
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.72, marginBottom: 20, flex: 1 }}>
                      {svc.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {svc.tags.slice(0, 4).map(tag => (
                        <span key={tag} style={{
                          fontFamily: "monospace", fontSize: 9, padding: "3px 8px",
                          borderRadius: 100, border: `1px solid ${svc.color}28`,
                          color: "rgba(255,255,255,0.55)", background: `${svc.color}0d`,
                          textTransform: "uppercase", letterSpacing: "0.1em",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-1.5 font-semibold text-sm w-fit"
                      style={{ color: svc.color, borderBottom: `1px solid ${svc.color}44`, paddingBottom: 1 }}>
                      Learn more
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Service Constellation ── */}
        <ServiceConstellation />

      </main>
      <CTABanner />
    </>
  );
}
