"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface Props {
  eyebrow: string;
  title: string[];
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: Props) {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".lp-eyebrow", { autoAlpha: 0, y: 16 });
      gsap.set(".lp-word", { yPercent: 110 });
      gsap.set(".lp-meta", { autoAlpha: 0, y: 14 });
      gsap.set(".lp-content", { autoAlpha: 0, y: 28 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".lp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
        .to(".lp-word", { yPercent: 0, duration: 0.9, stagger: 0.07 }, "-=0.3")
        .to(".lp-meta", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(".lp-content", { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.3");
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} style={{ background: "#04080F", minHeight: "100vh" }}>
      {/* ── Decorative bg ── */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center"
        style={{ paddingTop: 148, paddingBottom: 64 }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
          {/* Eyebrow */}
          <div className="lp-eyebrow flex items-center justify-center gap-3 mb-7">
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
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {eyebrow}
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

          {/* Title */}
          <h1
            className="font-display font-black uppercase mx-auto"
            style={{
              fontSize: "clamp(32px,5.5vw,68px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            {title.map((word, i) => {
              const isLast = i === title.length - 1;
              return (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]"
                >
                  <span
                    className="lp-word inline-block"
                    style={{ color: isLast ? "#F97316" : "#ffffff" }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </h1>

          {/* Last updated */}
          <p
            className="lp-meta mt-7"
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.32)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ paddingBottom: 100 }}>
        <div className="lp-content max-w-5xl mx-auto px-5 sm:px-8 md:px-12">
          {/* Intro */}
          <div
            style={{
              padding: "28px 32px",
              borderRadius: 16,
              background: "rgba(37,99,235,0.06)",
              border: "1px solid rgba(37,99,235,0.15)",
              marginBottom: 48,
            }}
          >
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              {intro}
            </p>
          </div>

          {/* Divider */}
          <div
            aria-hidden
            style={{
              height: 1,
              background:
                "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)",
              marginBottom: 48,
            }}
          />

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {sections.map((sec, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 mb-5">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "#F97316",
                      opacity: 0.7,
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="font-display font-bold"
                    style={{
                      fontSize: "clamp(16px,2vw,20px)",
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {sec.heading}
                  </h2>
                </div>
                <div
                  style={{
                    fontSize: 14.5,
                    color: "rgba(255,255,255,0.56)",
                    lineHeight: 1.88,
                    fontWeight: 300,
                    paddingLeft: 26,
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {sec.body}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: 56,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.32)",
                lineHeight: 1.8,
                fontFamily: "monospace",
              }}
            >
              Questions about this document?{" "}
              <Link
                href="/contact"
                style={{
                  color: "#F97316",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                Contact us
              </Link>
              . Tekktopia Limited &mdash; Registered in England &amp; Wales.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
