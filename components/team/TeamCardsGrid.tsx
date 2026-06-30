"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ExternalLink, AtSign, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export const TEAM = [
  {
    name: "Akinola Daniel Oshinubi",
    role: "Managing Director/CEO",
    dept: "Leadership",
    accent: "#F97316",
    photo: "/team/daniel.jpg",
    focus: "center top",
    bio: "Leads Tekktopia's vision, strategy, and overall direction, driving growth and long-term client partnerships.",
    linkedin: "#",
    twitter: "#",
    portfolio: "https://danieloshinubi.online",
  },
  {
    name: "Ireoluwa Adeoluwa",
    role: "Chief Technology Officer",
    dept: "Engineering",
    accent: "#3B82F6",
    photo: "/team/ire.jpg",
    focus: "center top",
    bio: "Owns Tekktopia's technical direction, architecture, and engineering execution across web, mobile, and cloud.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Boluwatife",
    role: "Head, Sales & Business Development",
    dept: "Growth",
    accent: "#10B981",
    photo: "/team/tife.jpg",
    focus: "center",
    bio: "Drives revenue, partnerships, and market expansion, connecting clients with the right Tekktopia solutions.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Adetayo Adeniyi",
    role: "Head, Legal & Compliance",
    dept: "Legal",
    accent: "#8B5CF6",
    photo: "/team/Lawyer.jpg",
    focus: "center",
    bio: "Oversees Tekktopia's legal, regulatory, and compliance matters, safeguarding the business and its clients.",
    linkedin: "#",
    twitter: "#",
  },
];

export default function TeamCardsGrid() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { autoAlpha: 0, y: 48, scale: 0.96, filter: "blur(8px)" });
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
          delay: (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        const color = card.dataset.color!;
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
          card.style.borderColor = color + "44";
          card.style.boxShadow = `0 0 40px ${color}18`;
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.55)" });
          card.style.borderColor = isLight ? "rgba(15,23,42,0.09)" : "rgba(255,255,255,0.07)";
          card.style.boxShadow = "none";
        });
      });
    },
    { scope: gridRef },
  );

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {TEAM.map(({ name, role, dept, accent, photo, focus, bio, linkedin, twitter, portfolio }, i) => (
        <div
          key={name}
          ref={(el) => { cardRefs.current[i] = el; }}
          data-color={accent}
          className="relative flex flex-col rounded-2xl overflow-hidden cursor-default"
          style={{
            background: isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.025)",
            border: isLight ? "1px solid rgba(15,23,42,0.09)" : "1px solid rgba(255,255,255,0.07)",
            transition: "border-color 0.35s, box-shadow 0.35s",
          }}
        >
          {/* Photo */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: focus ?? "center" }}
              loading="lazy"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{ background: "linear-gradient(to top,rgba(4,8,15,0.92),transparent)" }}
            />
            <div className="absolute bottom-4 left-4">
              <span
                style={{
                  padding: "3px 11px",
                  borderRadius: 99,
                  background: `${accent}18`,
                  border: `1px solid ${accent}40`,
                  backdropFilter: "blur(8px)",
                  fontSize: 9,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: accent,
                }}
              >
                {dept}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(to right,${accent},transparent)`,
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col flex-1 p-6">
            <div className="mb-3">
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: isLight ? "#0F172A" : "#fff",
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {name}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: accent,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                {role}
              </p>
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: isLight ? "rgba(15,23,42,0.58)" : "rgba(255,255,255,0.55)",
                lineHeight: 1.78,
                fontWeight: 300,
                flexGrow: 1,
                marginBottom: 18,
              }}
            >
              {bio}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {[
                { href: linkedin, label: "LinkedIn", Icon: ExternalLink },
                { href: twitter, label: "Twitter / X", Icon: AtSign },
                ...(portfolio ? [{ href: portfolio, label: "Portfolio", Icon: Globe }] : []),
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Portfolio" ? "_blank" : undefined}
                  rel={label === "Portfolio" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    width: 34,
                    height: 34,
                    background: isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.05)",
                    border: isLight ? "1px solid rgba(15,23,42,0.10)" : "1px solid rgba(255,255,255,0.08)",
                    color: isLight ? "rgba(15,23,42,0.45)" : "rgba(255,255,255,0.38)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accent;
                    e.currentTarget.style.borderColor = accent + "44";
                    e.currentTarget.style.background = accent + "14";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isLight ? "rgba(15,23,42,0.45)" : "rgba(255,255,255,0.38)";
                    e.currentTarget.style.borderColor = isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.05)";
                  }}
                >
                  <Icon style={{ width: 13, height: 13 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(to right,transparent,${accent}55,transparent)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}