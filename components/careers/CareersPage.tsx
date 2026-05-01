"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Heart, Zap, Globe, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CTABanner } from "@/components/home";

const HR_EMAIL = "hr@tekktopia.com";

export default function CareersPage() {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".cp-eyebrow", { autoAlpha: 0, y: 16 });
    gsap.set(".cp-word",    { yPercent: 110 });
    gsap.set(".cp-body",    { autoAlpha: 0, y: 22, filter: "blur(4px)" });
    gsap.set(".cp-card",    { autoAlpha: 0, y: 32, scale: 0.97 });
    gsap.set(".cp-cta",     { autoAlpha: 0, y: 18 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".cp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
      .to(".cp-word",    { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.35")
      .to(".cp-body",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.5")
      .to(".cp-card",    { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12 }, "-=0.4")
      .to(".cp-cta",     { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, { scope: pageRef });

  return (
    <>
      <main ref={pageRef} style={{ background: "#04080F", minHeight: "100vh" }}>

        {/* ── decorative bg ── */}
        <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute", width: 800, height: 800, borderRadius: "50%",
            top: "10%", left: "50%", transform: "translateX(-50%)",
            background: "radial-gradient(ellipse,rgba(37,99,235,0.09) 0%,transparent 65%)",
            filter: "blur(80px)",
          }} />
          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            bottom: "5%", right: "-5%",
            background: "radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 65%)",
            filter: "blur(80px)",
          }} />
          <div aria-hidden className="absolute inset-0" style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />
        </div>

        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center"
          style={{ paddingTop: 160, paddingBottom: 80, minHeight: "72vh" }}
        >
          {/* Top rule */}
          <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

          <div className="relative max-w-3xl mx-auto px-5 sm:px-8">

            {/* Eyebrow */}
            <div className="cp-eyebrow flex items-center justify-center gap-3 mb-7">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                Join Our Team
              </span>
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black uppercase mx-auto"
              style={{ fontSize: "clamp(38px,6vw,78px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              {[
                { word: "Work",  orange: false },
                { word: "With",  orange: false },
                { word: "Us.",   orange: true  },
              ].map(({ word, orange }, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]">
                  <span
                    className="cp-word inline-block"
                    style={{ color: orange ? "#F97316" : "#ffffff" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Body copy */}
            <p
              className="cp-body mt-8 mx-auto"
              style={{
                fontSize: "clamp(15px,1.7vw,19px)",
                color: "rgba(255,255,255,0.60)",
                fontWeight: 300,
                lineHeight: 1.9,
                maxWidth: 540,
              }}
            >
              Thank you so much for your interest in Tekktopia.
              We don&apos;t have any open positions at the moment, but we&apos;re always
              excited to hear from talented people who share our passion for
              technology.
            </p>

            {/* Divider */}
            <div className="cp-body flex items-center gap-4 my-10 justify-center">
              <span style={{ height: 1, flex: 1, maxWidth: 80, background: "rgba(255,255,255,0.08)" }} />
              <Heart style={{ width: 14, height: 14, color: "#F97316", opacity: 0.7 }} />
              <span style={{ height: 1, flex: 1, maxWidth: 80, background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Email CTA */}
            <div className="cp-cta flex flex-col items-center gap-4">
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Want to reach out anyway?
              </p>
              <a
                href={`mailto:${HR_EMAIL}`}
                className="group inline-flex items-center gap-3 font-semibold rounded-xl"
                style={{
                  padding: "14px 32px",
                  background: "linear-gradient(135deg,#F97316,#ea6a0f)",
                  boxShadow: "0 0 0 1px rgba(249,115,22,0.4), 0 8px 32px rgba(249,115,22,0.28)",
                  color: "#fff",
                  fontSize: 15,
                  transition: "box-shadow 0.3s, transform 0.3s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 0 55px rgba(249,115,22,0.55), 0 0 0 1px rgba(249,115,22,0.6)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(249,115,22,0.4), 0 8px 32px rgba(249,115,22,0.28)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Mail className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                {HR_EMAIL}
              </a>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
                We read every email and respond to all genuine enquiries.
              </p>
            </div>
          </div>
        </section>

        {/* ── Values cards ── */}
        <section style={{ paddingBottom: 96 }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-8">

            <div aria-hidden className="h-px mb-14"
              style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)" }} />

            <p style={{
              fontFamily: "monospace", fontSize: 10, textTransform: "uppercase",
              letterSpacing: "0.28em", color: "#F97316", opacity: 0.8,
              marginBottom: 20, textAlign: "center",
            }}>
              — Why people love working here
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {(
                [
                  {
                    Icon: Zap,
                    title: "Move fast",
                    body: "We ship real products to real users. No endless meetings — just meaningful work that makes an impact.",
                    color: "#3B82F6",
                  },
                  {
                    Icon: Globe,
                    title: "Pan-African mission",
                    body: "We're building world-class technology for African businesses. Every line of code moves that mission forward.",
                    color: "#10B981",
                  },
                  {
                    Icon: Users,
                    title: "Grow together",
                    body: "We invest in our people — mentorship, training, and a culture where asking questions is always welcome.",
                    color: "#F97316",
                  },
                ] as { Icon: LucideIcon; title: string; body: string; color: string }[]
              ).map(({ Icon, title, body, color }) => (
                <div
                  key={title}
                  className="cp-card relative p-7 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.028)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* colour top line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    borderRadius: "16px 16px 0 0",
                    background: `linear-gradient(to right,${color}88,transparent)`,
                  }} />
                  {/* Icon box */}
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, display: "flex",
                    alignItems: "center", justifyContent: "center", marginBottom: 18,
                    background: `${color}18`, border: `1px solid ${color}30`,
                  }}>
                    <Icon style={{ width: 20, height: 20, color }} strokeWidth={1.6} />
                  </div>
                  <h3
                    className="font-display font-bold mb-2"
                    style={{ fontSize: 16, color: "#fff", letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <CTABanner />
    </>
  );
}
