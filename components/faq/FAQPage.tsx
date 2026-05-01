"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";
import { CTABanner } from "@/components/home";

const FAQ_ITEMS = [
  {
    category: "General",
    questions: [
      {
        q: "What does Tekktopia do?",
        a: "Tekktopia is a full-stack technology company based in the UK. We provide a wide range of services including custom software development, cloud computing, cybersecurity, IT support, data analytics, mobile and web development, product design, Microsoft 365 provisioning, AI & emerging tech solutions, and IT consultancy.",
      },
      {
        q: "Where are you based, and do you work with international clients?",
        a: "Our headquarters are in the United Kingdom. We work with clients across Africa, Europe, and beyond. Many of our engagements are delivered fully remotely, and we are comfortable operating across time zones.",
      },
      {
        q: "How do I get started with Tekktopia?",
        a: "The easiest first step is to reach out via our Contact page. Describe your challenge or project idea and one of our team members will respond within one business day to arrange a discovery call — completely free and with no obligation.",
      },
    ],
  },
  {
    category: "Services",
    questions: [
      {
        q: "Can you build a custom web or mobile application for my business?",
        a: "Absolutely. Custom software is one of our core offerings. We handle the full lifecycle — requirements gathering, UX design, development, testing, deployment, and ongoing support. We work across web, iOS, and Android platforms.",
      },
      {
        q: "Do you offer ongoing IT support after a project is delivered?",
        a: "Yes. We offer flexible managed IT support and maintenance plans tailored to your organisation's size and needs. This includes monitoring, incident response, updates, and proactive optimisation.",
      },
      {
        q: "What cloud platforms do you work with?",
        a: "We are experienced across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We can help you choose the right platform for your workloads, migrate existing infrastructure, or architect cloud-native solutions from scratch.",
      },
      {
        q: "Do you provide Microsoft 365 setup and management?",
        a: "Yes. We provision, configure, and manage Microsoft 365 environments — covering Exchange Online, Teams, SharePoint, OneDrive, Intune device management, and security policies. We also assist with licencing optimisation.",
      },
    ],
  },
  {
    category: "Pricing & Engagement",
    questions: [
      {
        q: "How do you price your services?",
        a: "Pricing depends on the nature and scope of the engagement. We offer fixed-price project quotes for well-defined scopes, time-and-materials billing for ongoing or exploratory work, and monthly retainers for managed IT support. We will always provide a transparent proposal before any work begins.",
      },
      {
        q: "Do you work with startups and small businesses?",
        a: "Very much so. We work with organisations of all sizes — from early-stage startups needing their first MVP to established enterprises modernising legacy systems. We scale our approach and pricing to what makes sense for your stage.",
      },
      {
        q: "How long does a typical project take?",
        a: "Timelines vary significantly based on complexity. A simple website or landing page might take two to four weeks; a full-featured web application or mobile app typically spans three to six months. We will provide a detailed timeline estimate during the proposal phase.",
      },
    ],
  },
  {
    category: "Security & Compliance",
    questions: [
      {
        q: "How do you handle data security and privacy?",
        a: "Security is built into everything we do, not bolted on afterwards. We follow industry best practices including encryption at rest and in transit, least-privilege access controls, regular vulnerability assessments, and secure SDLC practices. All client data is handled in accordance with applicable data protection regulations.",
      },
      {
        q: "Are you GDPR compliant?",
        a: "Yes. Tekktopia Limited is registered in England and Wales and operates in compliance with the UK GDPR and the Data Protection Act 2018. When we act as a data processor on your behalf, we are happy to enter into a Data Processing Agreement.",
      },
      {
        q: "Do you offer cybersecurity services?",
        a: "Yes. Our cybersecurity practice covers vulnerability assessments, penetration testing, security architecture review, incident response planning, staff awareness training, and ongoing threat monitoring. We tailor our approach to your sector's specific compliance requirements.",
      },
    ],
  },
];

export default function FAQPage() {
  const pageRef = useRef<HTMLElement>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.set(".faq-eyebrow", { autoAlpha: 0, y: 16 });
      gsap.set(".faq-word", { yPercent: 110 });
      gsap.set(".faq-body", { autoAlpha: 0, y: 22, filter: "blur(4px)" });
      gsap.set(".faq-section", { autoAlpha: 0, y: 28 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".faq-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
        .to(".faq-word", { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.35")
        .to(
          ".faq-body",
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
          "-=0.5"
        )
        .to(
          ".faq-section",
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.35"
        );
    },
    { scope: pageRef }
  );

  const toggle = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <>
      <main ref={pageRef} style={{ background: "#04080F", minHeight: "100vh" }}>
        {/* ── Decorative bg ── */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none overflow-hidden"
        >
          <div
            style={{
              position: "absolute",
              width: 800,
              height: 800,
              borderRadius: "50%",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse,rgba(37,99,235,0.09) 0%,transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center"
          style={{ paddingTop: 160, paddingBottom: 72 }}
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
            <div className="faq-eyebrow flex items-center justify-center gap-3 mb-7">
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
                Help Centre
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

            <h1
              className="font-display font-black uppercase mx-auto"
              style={{
                fontSize: "clamp(38px,6vw,78px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              {[
                { word: "Frequently", orange: false },
                { word: "Asked", orange: false },
                { word: "Questions.", orange: true },
              ].map(({ word, orange }, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]"
                >
                  <span
                    className="faq-word inline-block"
                    style={{ color: orange ? "#F97316" : "#ffffff" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="faq-body mt-8 mx-auto"
              style={{
                fontSize: "clamp(15px,1.7vw,19px)",
                color: "rgba(255,255,255,0.60)",
                fontWeight: 300,
                lineHeight: 1.9,
                maxWidth: 500,
              }}
            >
              Answers to the questions we hear most often. Can&apos;t find what
              you need?{" "}
              <a
                href="/contact"
                style={{
                  color: "#F97316",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(249,115,22,0.35)",
                }}
              >
                Get in touch
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── FAQ sections ── */}
        <section style={{ paddingBottom: 96 }}>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col gap-14">
            {FAQ_ITEMS.map((section) => (
              <div key={section.category} className="faq-section">
                {/* Category label */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.28em",
                      color: "#F97316",
                      opacity: 0.85,
                      flexShrink: 0,
                    }}
                  >
                    {section.category}
                  </span>
                  <div
                    style={{
                      height: 1,
                      flex: 1,
                      background:
                        "linear-gradient(to right,rgba(249,115,22,0.25),transparent)",
                    }}
                  />
                </div>

                {/* Questions */}
                <div className="flex flex-col gap-3">
                  {section.questions.map((item, qi) => {
                    const key = `${section.category}-${qi}`;
                    const isOpen = openItem === key;
                    return (
                      <div
                        key={key}
                        style={{
                          borderRadius: 16,
                          background: isOpen
                            ? "rgba(249,115,22,0.04)"
                            : "rgba(255,255,255,0.025)",
                          border: isOpen
                            ? "1px solid rgba(249,115,22,0.2)"
                            : "1px solid rgba(255,255,255,0.07)",
                          overflow: "hidden",
                          transition: "border-color 0.25s, background 0.25s",
                        }}
                      >
                        <button
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-4 text-left"
                          style={{ padding: "20px 24px", cursor: "pointer", background: "transparent", border: "none" }}
                        >
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 500,
                              color: isOpen
                                ? "#ffffff"
                                : "rgba(255,255,255,0.82)",
                              lineHeight: 1.5,
                              transition: "color 0.2s",
                            }}
                          >
                            {item.q}
                          </span>
                          <span
                            style={{
                              flexShrink: 0,
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: isOpen
                                ? "rgba(249,115,22,0.15)"
                                : "rgba(255,255,255,0.06)",
                              border: isOpen
                                ? "1px solid rgba(249,115,22,0.3)"
                                : "1px solid rgba(255,255,255,0.1)",
                              transition: "all 0.25s",
                            }}
                          >
                            {isOpen ? (
                              <Minus
                                style={{
                                  width: 13,
                                  height: 13,
                                  color: "#F97316",
                                }}
                                strokeWidth={2}
                              />
                            ) : (
                              <Plus
                                style={{
                                  width: 13,
                                  height: 13,
                                  color: "rgba(255,255,255,0.5)",
                                }}
                                strokeWidth={2}
                              />
                            )}
                          </span>
                        </button>

                        {isOpen && (
                          <div style={{ padding: "0 24px 22px" }}>
                            <div
                              style={{
                                height: 1,
                                background: "rgba(255,255,255,0.06)",
                                marginBottom: 18,
                              }}
                            />
                            <p
                              style={{
                                fontSize: 14.5,
                                color: "rgba(255,255,255,0.58)",
                                lineHeight: 1.85,
                                fontWeight: 300,
                              }}
                            >
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <CTABanner />
    </>
  );
}
