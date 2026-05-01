"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home",     href: "/"         },
  { name: "About",    href: "/about"    },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Projects", href: "/projects" },
  { name: "Careers",  href: "/careers"  },
  { name: "Our Team", href: "/team"     },
];

const SERVICE_LINKS = [
  { label: "Software Development",  href: "/services/software-development"   },
  { label: "Cloud Computing",       href: "/services/cloud-computing"         },
  { label: "Cybersecurity",         href: "/services/cybersecurity"           },
  { label: "AI & Emerging Tech",    href: "/services/emerging-tech"           },
  { label: "Data Analytics",        href: "/services/data-analytics"          },
  { label: "IT Support",            href: "/services/it-support"              },
  { label: "Mobile & Web Dev",      href: "/services/mobile-web-development"  },
  { label: "Product Design",        href: "/services/product-design"          },
  { label: "M365 Provisioning",     href: "/services/m365"                    },
  { label: "IT Consultancy",        href: "/services/consultancy"             },
];

// ── Wordmark ──────────────────────────────────────────────────────────────────
function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/logoTransparent.png"
        alt="Tekktopia"
        width={28}
        height={28}
        style={{ objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily: "'GT Walsheim Pro', 'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.15rem",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#F97316" }}>t</span>
        <span style={{ color: "#ffffff" }}>ekk</span>
        <span style={{ color: "#3B82F6" }}>t</span>
        <span style={{ color: "#ffffff" }}>opia</span>
      </span>
    </span>
  );
}

export default function Navigation() {
  const headerRef   = useRef<HTMLElement>(null);
  const mobileRef   = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const pathname = usePathname();

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Close everything on route change ─────────────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // ── Entry animation ───────────────────────────────────────────────────────
  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -72, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.85, ease: "expo.out", delay: 0.08 },
    );
  }, { scope: headerRef });

  // ── Dropdown hover helpers ────────────────────────────────────────────────
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  // ── Mobile menu open ──────────────────────────────────────────────────────
  const openMenu = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      const menu     = mobileRef.current;
      const backdrop = backdropRef.current;
      if (!menu || !backdrop) return;
      const links = menu.querySelectorAll<HTMLElement>(".mob-link");
      gsap.set([menu, backdrop], { autoAlpha: 0 });
      gsap.set(menu,  { y: -16 });
      gsap.set(links, { y: 18, autoAlpha: 0 });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(backdrop, { autoAlpha: 1, duration: 0.3 })
        .to(menu,  { y: 0, autoAlpha: 1, duration: 0.45 }, "-=0.2")
        .to(links, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.055 }, "-=0.25");
    });
  };

  // ── Mobile menu close ─────────────────────────────────────────────────────
  const closeMenu = () => {
    const menu     = mobileRef.current;
    const backdrop = backdropRef.current;
    if (!menu || !backdrop) { setMenuOpen(false); return; }
    const links = menu.querySelectorAll<HTMLElement>(".mob-link");
    gsap
      .timeline({ onComplete: () => setMenuOpen(false) })
      .to(links,    { y: -10, autoAlpha: 0, duration: 0.18, stagger: 0.03, ease: "power2.in" })
      .to(menu,     { y: -16, autoAlpha: 0, duration: 0.28, ease: "power2.in" }, "-=0.1")
      .to(backdrop, { autoAlpha: 0, duration: 0.22 }, "-=0.14");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{ background: "#04080F", borderBottom: "none", boxShadow: "none" }}
      >
        {/* Fine grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 h-[68px] flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 group"
            onClick={() => menuOpen && closeMenu()}
            style={{ transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <Wordmark />
          </Link>

          {/* ── Desktop nav ────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleClose}
                  >
                    {/* Services trigger button */}
                    <Link
                      href={link.href}
                      className="relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                      style={{
                        color: active || servicesOpen ? "#F97316" : "rgba(255,255,255,0.58)",
                        background: active || servicesOpen ? "rgba(249,115,22,0.08)" : "transparent",
                      }}
                    >
                      {link.name}
                      <ChevronDown
                        style={{
                          width: 13,
                          height: 13,
                          opacity: 0.7,
                          transition: "transform 0.25s",
                          transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                      {active && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2"
                          style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "#F97316",
                            boxShadow: "0 0 6px rgba(249,115,22,0.7)",
                            display: "block",
                          }}
                        />
                      )}
                    </Link>

                    {/* ── Dropdown panel ── */}
                    {servicesOpen && (
                      <div
                        onMouseEnter={openServices}
                        onMouseLeave={scheduleClose}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 480,
                          background: "#0D1520",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: 16,
                          boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(37,99,235,0.08)",
                          padding: "20px 20px 16px",
                          zIndex: 60,
                          animation: "dropIn 0.2s ease forwards",
                        }}
                      >
                        {/* Arrow pointer */}
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: -6,
                            left: "50%",
                            transform: "translateX(-50%) rotate(45deg)",
                            width: 11,
                            height: 11,
                            background: "#0D1520",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderBottom: "none",
                            borderRight: "none",
                            borderRadius: "2px 0 0 0",
                          }}
                        />

                        {/* Header row */}
                        <div className="flex items-center justify-between mb-4 px-1">
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: 9,
                              textTransform: "uppercase",
                              letterSpacing: "0.28em",
                              color: "rgba(255,255,255,0.3)",
                            }}
                          >
                            Our Services
                          </span>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: 9,
                              textTransform: "uppercase",
                              letterSpacing: "0.2em",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            {SERVICE_LINKS.length} offerings
                          </span>
                        </div>

                        {/* 2-column service grid */}
                        <div className="grid grid-cols-2 gap-1">
                          {SERVICE_LINKS.map(({ label, href }) => (
                            <Link
                              key={href}
                              href={href}
                              className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-150"
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.65)",
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                e.currentTarget.style.color = "#ffffff";
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                              }}
                            >
                              {/* Dot accent */}
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: "50%",
                                  background: "#F97316",
                                  opacity: 0.5,
                                  flexShrink: 0,
                                  transition: "opacity 0.15s",
                                }}
                                className="group-hover:opacity-100"
                              />
                              {label}
                            </Link>
                          ))}
                        </div>

                        {/* Footer CTA */}
                        <div
                          style={{
                            marginTop: 14,
                            paddingTop: 14,
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <Link
                            href="/services"
                            className="group flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200"
                            style={{
                              background: "rgba(249,115,22,0.1)",
                              border: "1px solid rgba(249,115,22,0.2)",
                              color: "#F97316",
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = "rgba(249,115,22,0.18)";
                              e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
                              e.currentTarget.style.boxShadow = "0 0 24px rgba(249,115,22,0.2)";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = "rgba(249,115,22,0.1)";
                              e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            View all services
                            <ArrowUpRight
                              style={{ width: 14, height: 14 }}
                              className="transition-transform duration-200 group-hover:rotate-45"
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? "#F97316" : "rgba(255,255,255,0.58)",
                    background: active ? "rgba(249,115,22,0.08)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.58)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.name}
                  {active && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2"
                      style={{
                        width: 4, height: 4, borderRadius: "50%",
                        background: "#F97316",
                        boxShadow: "0 0 6px rgba(249,115,22,0.7)",
                        display: "block",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side — CTA + hamburger ───────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex group items-center gap-2 font-semibold text-sm text-white px-5 py-2.5 rounded-full"
              style={{
                background: "linear-gradient(135deg,#F97316,#EA6A00)",
                boxShadow: "0 0 0 1px rgba(249,115,22,0.3),0 4px 18px rgba(249,115,22,0.2)",
                transition: "box-shadow 0.3s, transform 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(249,115,22,0.5),0 0 0 1px rgba(249,115,22,0.55)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(249,115,22,0.3),0 4px 18px rgba(249,115,22,0.2)";
                e.currentTarget.style.transform = "none";
              }}
            >
              Connect with us
              <ArrowUpRight
                style={{ width: 14, height: 14 }}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => menuOpen ? closeMenu() : openMenu()}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl transition-all duration-200"
              style={{
                background: menuOpen ? "rgba(249,115,22,0.1)"  : "rgba(255,255,255,0.05)",
                border:     menuOpen ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {menuOpen ? (
                <X style={{ width: 16, height: 16, color: "#F97316" }} strokeWidth={2} />
              ) : (
                <span className="flex flex-col gap-[5px] items-center">
                  <span style={{ display: "block", width: 18, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.75)" }} />
                  <span style={{ display: "block", width: 12, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.45)" }} />
                  <span style={{ display: "block", width: 18, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.75)" }} />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Dropdown animation keyframe (injected once) ───────────────────── */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }
      `}</style>

      {/* ── Mobile overlay + drawer ───────────────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="md:hidden fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={closeMenu}
          />

          {/* Drawer */}
          <div
            ref={mobileRef}
            className="md:hidden fixed top-[68px] left-0 right-0 z-50"
            style={{ background: "#04080F", borderBottom: "none", boxShadow: "none" }}
          >
            {/* Fine grid in drawer */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px)," +
                  "linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <nav className="relative flex flex-col px-5 py-5 gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="mob-link flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200"
                    style={{
                      color: active ? "#F97316" : "rgba(255,255,255,0.62)",
                      background: active ? "rgba(249,115,22,0.07)" : "transparent",
                      borderLeft: active ? "2px solid #F97316" : "2px solid transparent",
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.62)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span
                        style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "#F97316",
                          boxShadow: "0 0 8px rgba(249,115,22,0.7)",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Mobile services sub-links */}
              <div
                className="mob-link flex flex-col gap-1 ml-4 mt-1 mb-1 pl-3"
                style={{ borderLeft: "1px solid rgba(249,115,22,0.2)" }}
              >
                {SERVICE_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px]"
                    style={{ color: "rgba(255,255,255,0.48)", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
                  >
                    <span
                      style={{
                        width: 4, height: 4, borderRadius: "50%",
                        background: "#F97316", opacity: 0.5, flexShrink: 0,
                      }}
                    />
                    {label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div
                className="mob-link my-1"
                style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
              />

              {/* Mobile CTA */}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mob-link group inline-flex items-center justify-center gap-2 font-semibold text-sm text-white py-4 rounded-xl"
                style={{
                  background: "linear-gradient(135deg,#F97316,#EA6A00)",
                  boxShadow: "0 0 0 1px rgba(249,115,22,0.3),0 4px 18px rgba(249,115,22,0.2)",
                }}
              >
                Connect with us
                <ArrowUpRight
                  style={{ width: 15, height: 15 }}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
