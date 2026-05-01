"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CTABanner } from "@/components/home";

const CATEGORIES = ["All", "Web App", "Mobile", "Cloud", "AI / ML", "Design"];

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    client: "RetailMax Nigeria",
    category: "Web App",
    description:
      "A full-stack e-commerce solution with real-time inventory management, payment integration, and AI-powered product recommendations serving thousands of daily shoppers.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    color: "#3B82F6",
    year: "2024",
  },
  {
    id: 2,
    title: "FinTech Mobile App",
    client: "PocketSave",
    category: "Mobile",
    description:
      "Cross-platform savings and investment app featuring biometric authentication, real-time portfolio tracking, and automated savings rules for users across West Africa.",
    tags: ["React Native", "TypeScript", "Firebase", "Plaid"],
    color: "#10B981",
    year: "2024",
  },
  {
    id: 3,
    title: "Cloud Infrastructure Migration",
    client: "LogiFreight Ltd",
    category: "Cloud",
    description:
      "End-to-end migration from on-premises servers to AWS, reducing infrastructure costs by 60% and improving uptime to 99.9% with a zero-downtime cutover strategy.",
    tags: ["AWS", "Terraform", "Docker", "Kubernetes"],
    color: "#F97316",
    year: "2023",
  },
  {
    id: 4,
    title: "AI Document Intelligence",
    client: "LexAI Solutions",
    category: "AI / ML",
    description:
      "An intelligent document processing platform that extracts, classifies, and summarises legal and financial documents at scale using large language models.",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    color: "#8B5CF6",
    year: "2024",
  },
  {
    id: 5,
    title: "HR Management System",
    client: "CorpConnect Africa",
    category: "Web App",
    description:
      "A comprehensive HR platform covering recruitment, onboarding, payroll, leave management, and performance reviews for an organisation of 500+ employees.",
    tags: ["React", "Django", "MySQL", "AWS S3"],
    color: "#EC4899",
    year: "2023",
  },
  {
    id: 6,
    title: "Brand Identity & Design System",
    client: "GreenVault Energy",
    category: "Design",
    description:
      "Complete brand overhaul including identity design, a Figma UI component library, and design-system documentation for a high-growth clean-energy startup.",
    tags: ["Figma", "Design Systems", "Branding", "UI/UX"],
    color: "#14B8A6",
    year: "2024",
  },
];

export default function ProjectsPage() {
  const pageRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  useGSAP(
    () => {
      gsap.set(".pp-eyebrow", { autoAlpha: 0, y: 16 });
      gsap.set(".pp-word", { yPercent: 110 });
      gsap.set(".pp-body", { autoAlpha: 0, y: 22, filter: "blur(4px)" });
      gsap.set(".pp-filter", { autoAlpha: 0, y: 14 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".pp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
        .to(".pp-word", { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.35")
        .to(
          ".pp-body",
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
          "-=0.5"
        )
        .to(".pp-filter", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3");
    },
    { scope: pageRef }
  );

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
              width: 900,
              height: 900,
              borderRadius: "50%",
              top: "0%",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse,rgba(37,99,235,0.09) 0%,transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              bottom: "10%",
              right: "-5%",
              background:
                "radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 65%)",
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

          <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
            {/* Eyebrow */}
            <div className="pp-eyebrow flex items-center justify-center gap-3 mb-7">
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
                Our Work
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
                fontSize: "clamp(38px,6vw,78px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              {[
                { word: "Featured", orange: false },
                { word: "Projects.", orange: true },
              ].map(({ word, orange }, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]"
                >
                  <span
                    className="pp-word inline-block"
                    style={{ color: orange ? "#F97316" : "#ffffff" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="pp-body mt-8 mx-auto"
              style={{
                fontSize: "clamp(15px,1.7vw,19px)",
                color: "rgba(255,255,255,0.60)",
                fontWeight: 300,
                lineHeight: 1.9,
                maxWidth: 540,
              }}
            >
              A selection of the products, platforms, and solutions we&apos;ve
              built for clients across Africa, Europe, and beyond.
            </p>
          </div>
        </section>

        {/* ── Filter tabs ── */}
        <div className="pp-filter relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-14">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: "8px 22px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  border:
                    active === cat
                      ? "1px solid rgba(249,115,22,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                  background:
                    active === cat
                      ? "rgba(249,115,22,0.12)"
                      : "rgba(255,255,255,0.03)",
                  color:
                    active === cat ? "#F97316" : "rgba(255,255,255,0.55)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects grid ── */}
        <section style={{ paddingBottom: 96 }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p
                  style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}
                >
                  No projects in this category yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <CTABanner />
    </>
  );
}

type Project = (typeof PROJECTS)[0];

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        background: "rgba(255,255,255,0.028)",
        border: `1px solid ${hovered ? `${project.color}35` : "rgba(255,255,255,0.07)"}`,
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        boxShadow: hovered ? `0 0 48px ${project.color}16` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* Colour top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          borderRadius: "20px 20px 0 0",
          background: `linear-gradient(to right,${project.color}cc,transparent)`,
        }}
      />

      {/* Visual placeholder */}
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg,${project.color}18 0%,${project.color}06 100%)`,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rings */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: `radial-gradient(circle,${project.color}35,${project.color}06)`,
            border: `1px solid ${project.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: project.color,
              opacity: 0.65,
            }}
          />
        </div>

        {/* Year badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.12em",
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 26px 26px" }}>
        <div style={{ marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: project.color,
              opacity: 0.85,
            }}
          >
            {project.category} &middot; {project.client}
          </span>
        </div>

        <h3
          className="font-display font-bold mb-3"
          style={{
            fontSize: 18,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 13.5,
            color: "rgba(255,255,255,0.52)",
            lineHeight: 1.78,
            fontWeight: 300,
            marginBottom: 20,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                padding: "4px 10px",
                borderRadius: 99,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
