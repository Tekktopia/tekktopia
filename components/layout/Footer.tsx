"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import {
  FaLinkedinIn,
  FaXTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import { useForm, ValidationError } from "@formspree/react";

// ─── Replace with your Formspree newsletter form ID ───────────────────────────
// 1. Go to formspree.io → New Form → name it "Newsletter"
// 2. Copy the 8-char ID from the URL (e.g. formspree.io/f/xabcdefg → "xabcdefg")
const NEWSLETTER_FORM_ID = "mojrvwyy";
// ─────────────────────────────────────────────────────────────────────────────

function NewsletterForm() {
  const [state, handleSubmit] = useForm(NEWSLETTER_FORM_ID);

  if (state.succeeded) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-5 px-4 rounded-2xl text-center"
        style={{
          background: "rgba(16,185,129,0.07)",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        <CheckCircle
          style={{ width: 28, height: 28, color: "#10B981" }}
          strokeWidth={1.5}
        />
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.6,
          }}
        >
          You&apos;re subscribed!
        </p>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.38)",
            fontFamily: "monospace",
          }}
        >
          We&apos;ll be in touch with the good stuff.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 12,
          padding: "11px 14px",
          fontSize: 13,
          color: "#fff",
          outline: "none",
          transition: "border-color 0.25s",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(249,115,22,0.45)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")
        }
      />

      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        style={{ fontSize: 11, color: "#EF4444", fontFamily: "monospace" }}
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="group inline-flex items-center justify-center gap-2 font-semibold text-sm text-white"
        style={{
          padding: "11px 14px",
          borderRadius: 12,
          background: state.submitting ? "rgba(249,115,22,0.6)" : "#F97316",
          border: "none",
          cursor: state.submitting ? "not-allowed" : "pointer",
          transition: "box-shadow 0.3s, transform 0.3s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          if (state.submitting) return;
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 32px rgba(249,115,22,0.45)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.transform = "none";
        }}
      >
        {state.submitting ? (
          <>
            <Loader2
              style={{ width: 14, height: 14 }}
              className="animate-spin"
            />
            Subscribing…
          </>
        ) : (
          <>
            Subscribe
            <ArrowUpRight
              style={{ width: 14, height: 14 }}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </>
        )}
      </button>

      {state.errors && Object.keys(state.errors).length > 0 && !state.submitting && (
        <p
          style={{
            fontSize: 11,
            color: "#EF4444",
            fontFamily: "monospace",
            marginTop: 2,
          }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

const SERVICE_LINKS = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "IT Support", href: "/services/it-support" },
  { label: "M365 Provisioning", href: "/services/m365" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "Cloud Computing", href: "/services/cloud-computing" },
  { label: "Data Analytics", href: "/services/data-analytics" },
  { label: "Mobile & Web Dev", href: "/services/mobile-web-development" },
  { label: "Product Design", href: "/services/product-design" },
  { label: "AI & Emerging Tech", href: "/services/emerging-tech" },
  { label: "IT Consultancy", href: "/services/consultancy" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Our Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/tekktopia/",
    label: "LinkedIn",
  },
  { icon: FaXTwitter, href: "https://x.com/tekktopialtd/", label: "X/Twitter" },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/tekktopia/",
    label: "Instagram",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{
        background: "#04080F",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Fine grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{
          height: 280,
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%,rgba(37,99,235,0.07) 0%,transparent 100%) ",
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-16 pb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Brand column */}
        <div className="lg:col-span-4 flex flex-col">
          {/* Logo */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 mb-7 w-fit"
          >
            <Image
              src="/logoTransparent.png"
              alt="Tekktopia logo"
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'GT Walsheim Pro', 'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#F97316" }}>t</span>
              <span style={{ color: "#FFFFFF" }}>ekk</span>
              <span style={{ color: "#3B82F6" }}>t</span>
              <span style={{ color: "#FFFFFF" }}>opia</span>
            </span>
          </Link>

          {/* Tagline */}
          <p
            style={{
              fontSize: 13.5,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 300,
              lineHeight: 1.78,
              maxWidth: 300,
              marginBottom: 28,
            }}
          >
            We build the technology that drives your business forward — from
            managed IT to custom software, cloud, and beyond.
          </p>

          {/* Contact */}
          <div className="flex flex-col gap-3 mb-8">
            <a
              href="mailto:info@tekktopia.com"
              className="inline-flex items-center gap-2.5 w-fit group"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#F97316",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Mail
                style={{ width: 14, height: 14, flexShrink: 0 }}
                strokeWidth={1.8}
              />
              info@tekktopia.com
            </a>
            <a
              href="tel:+2348154332992"
              className="inline-flex items-center gap-2.5 w-fit"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
              }
            >
              <Phone
                style={{ width: 14, height: 14, flexShrink: 0 }}
                strokeWidth={1.8}
              />
              +234 815 433 2992
            </a>
            <a
              href="tel:+2348094140706"
              className="inline-flex items-center gap-2.5 w-fit"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
              }
            >
              <Phone
                style={{ width: 14, height: 14, flexShrink: 0 }}
                strokeWidth={1.8}
              />
              +234 809 414 0706
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.42)",
                  transition:
                    "background 0.25s, border-color 0.25s, color 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(249,115,22,0.12)";
                  el.style.borderColor = "rgba(249,115,22,0.3)";
                  el.style.color = "#F97316";
                  el.style.boxShadow = "0 0 16px rgba(249,115,22,0.18)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.color = "rgba(255,255,255,0.42)";
                  el.style.boxShadow = "none";
                }}
              >
                <Icon style={{ width: 13, height: 13 }} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h3
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 20,
            }}
          >
            Services
          </h3>
          <ul className="flex flex-col gap-3">
            {SERVICE_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.52)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.52)")
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <h3
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 20,
            }}
          >
            Company
          </h3>
          <ul className="flex flex-col gap-3">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.52)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.52)")
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-3">
          <h3
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 20,
            }}
          >
            Stay Updated
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.72,
              marginBottom: 18,
            }}
          >
            Tech insights, company news, and industry trends — straight to your
            inbox.
          </p>
          <NewsletterForm />

          {/* Company credentials */}
          <div
            className="flex flex-col gap-2 mt-5 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { label: "RC Number",           value: "7466800"    },
              { label: "D-U-N-S Number",       value: "669827033"  },
              { label: "Microsoft Partner ID", value: "7098303"    },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.48)",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Giant ghost brand name */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          style={{ overflow: "hidden" }}
        >
          <span
            className="font-display font-black uppercase"
            style={{
              fontSize: "clamp(60px,12vw,160px)",
              color: "rgba(255,255,255,0.022)",
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            TEKKTOPIA
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.32)",
                fontFamily: "monospace",
              }}
            >
              © {year} Tekktopia Limited. All rights reserved.
            </p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.2)",
                fontFamily: "monospace",
              }}
            >
              Registered in England &amp; Wales.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "rgba(255,255,255,0.32)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.72)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.32)")
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
