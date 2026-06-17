"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CTABanner } from "@/components/home";
import { useTheme } from "@/context/ThemeContext";
import TeamCardsGrid from "./TeamCardsGrid";

gsap.registerPlugin(ScrollTrigger);

export default function OurTeamPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".otp-eyebrow", { autoAlpha: 0, y: 16 });
      gsap.set(".otp-word", { yPercent: 110 });
      gsap.set(".otp-sub", { autoAlpha: 0, y: 20, filter: "blur(4px)" });
      gsap.set(".otp-pill", { autoAlpha: 0, y: 10 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".otp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1)
        .to(".otp-word", { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.35")
        .to(".otp-sub", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.5")
        .to(".otp-pill", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.3");
    },
    { scope: pageRef },
  );

  return (
    <>
      <main
        ref={pageRef}
        style={{ background: isLight ? "#F8FAFC" : "#04080F" }}
      >
        {/* ── Background decoration ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div
            style={{
              position: "absolute",
              width: 900,
              height: 700,
              borderRadius: "50%",
              top: "-5%",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse,rgba(139,92,246,0.10) 0%,transparent 65%)",
              filter: "blur(90px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              bottom: "10%",
              right: "-5%",
              background: isLight
                ? "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)"
                : "radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isLight
                ? "linear-gradient(rgba(15,23,42,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.06) 1px,transparent 1px)"
                : "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* ── Hero ── */}
        <section
          className="relative text-center"
          style={{ paddingTop: 140, paddingBottom: 80 }}
        >
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
            {/* Eyebrow */}
            <div className="otp-eyebrow flex items-center justify-center gap-3 mb-7">
              <span
                style={{
                  height: 1,
                  width: 24,
                  background: "#F97316",
                  display: "block",
                  borderRadius: 99,
                }}
              />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: isLight
                    ? "rgba(15, 23, 42, 0.45)"
                    : "rgba(255,255,255,0.45)",
                }}
              >
                The People
              </span>
              <span
                style={{
                  height: 1,
                  width: 24,
                  background: "#F97316",
                  display: "block",
                  borderRadius: 99,
                }}
              />
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black uppercase mx-auto"
              style={{
                fontSize: "clamp(40px,6vw,82px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              {[
                { word: "Meet", orange: false },
                { word: "the", orange: false },
                { word: "Team.", orange: true },
              ].map(({ word, orange }, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]"
                >
                  <span
                    className="otp-word inline-block"
                    style={{
                      color: orange
                        ? "#F97316"
                        : isLight
                          ? "#0F172A"
                          : "#ffffff",
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p
              className="otp-sub mt-6 mx-auto max-w-2xl"
              style={{
                fontSize: "clamp(14px,1.5vw,17px)",
                color: isLight
                  ? "rgba(15, 42, 43, 0.55)"
                  : "rgba(255,255,255,0.55)",
                fontWeight: 300,
                lineHeight: 1.85,
              }}
            >
              A focused, battle-tested team of engineers, designers, and
              strategists — each one hand-picked for their craft and their
              character.
            </p>

            {/* Stat pills */}
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              {[
                { label: "4 Core Members", color: "#F97316" },
                { label: "3 Continents", color: "#3B82F6" },
                { label: "50+ Years Combined", color: "#10B981" },
                { label: "Pan-African Mission", color: "#8B5CF6" },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  className="otp-pill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 16px",
                    borderRadius: 99,
                    background: isLight
                      ? "rgba(15, 42, 43, 0.08)"
                      : "rgba(255,255,255,0.04)",
                    border: isLight
                      ? "1px solid rgba(15, 42, 43, 0.10)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: isLight
                        ? "rgba(15, 42, 43, 0.6)"
                        : "rgba(255,255,255,0.6)",
                      fontFamily: "monospace",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team grid ── */}
        <section style={{ paddingBottom: 100 }}>
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
            <div
              aria-hidden
              className="h-px mb-14"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)",
              }}
            />

            <TeamCardsGrid />

            {/* ── Join CTA ── */}
            <div className="mt-16 text-center">
              <div
                aria-hidden
                className="h-px mb-12"
                style={{
                  background: isLight
                    ? "linear-gradient(to right, transparent, rgba(15,23,42,0.12), transparent)"
                    : "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
                }}
              />
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: isLight
                    ? "rgba(15, 42, 43, 0.35)"
                    : "rgba(255,255,255,0.35)",
                  marginBottom: 16,
                }}
              >
                — Want to join us?
              </p>
              <p
                style={{
                  fontSize: "clamp(14px,1.5vw,17px)",
                  color: isLight
                    ? "rgba(15, 42, 43, 0.5)"
                    : "rgba(255,255,255,0.5)",
                  fontWeight: 300,
                  marginBottom: 28,
                  maxWidth: 420,
                  margin: "0 auto 28px",
                }}
              >
                We&apos;re not hiring right now, but we&apos;d love to hear from
                talented people.
              </p>
              <Link
                href="/careers"
                className="group inline-flex items-center gap-2 font-semibold text-sm"
                style={{
                  padding: "12px 28px",
                  borderRadius: 12,
                  background: isLight
                    ? "rgba(15, 42, 43, 0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: isLight
                    ? "1px solid rgba(15, 42, 43, 0.10)"
                    : "1px solid rgba(255,255,255,0.10)",
                  color: isLight
                    ? "rgba(15, 42, 43, 0.75)"
                    : "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  transition:
                    "border-color 0.25s, color 0.25s, background 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isLight
                    ? "rgba(15, 42, 43, 0.45)"
                    : "rgba(249,115,22,0.45)";
                  e.currentTarget.style.color = isLight ? "#0F172A" : "#fff";
                  e.currentTarget.style.background = isLight
                    ? "rgba(15, 42, 43, 0.08)"
                    : "rgba(249,115,22,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isLight
                    ? "rgba(15, 42, 43, 0.10)"
                    : "rgba(255,255,255,0.10)";
                  e.currentTarget.style.color = isLight
                    ? "rgba(15, 42, 43, 0.75)"
                    : "rgba(255,255,255,0.75)";
                  e.currentTarget.style.background = isLight
                    ? "rgba(15, 42, 43, 0.08)"
                    : "rgba(255,255,255,0.04)";
                }}
              >
                View careers page
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <CTABanner />
    </>
  );
}
