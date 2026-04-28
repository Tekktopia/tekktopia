"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Blog",     href: "/blog" },
  { name: "Career",   href: "/careers" },
  { name: "Our Team", href: "/team" },
];

export default function Navigation() {
  const headerRef   = useRef<HTMLElement>(null);
  const mobileRef   = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.05 }
    );
  }, { scope: headerRef });

  const openMenu = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      const menu     = mobileRef.current;
      const backdrop = backdropRef.current;
      if (!menu || !backdrop) return;
      const links = menu.querySelectorAll<HTMLElement>(".mob-link");
      gsap.set([menu, backdrop], { opacity: 0 });
      gsap.set(menu, { y: -12 });
      gsap.set(links, { y: 16, opacity: 0 });
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .to(backdrop, { opacity: 1, duration: 0.28 })
        .to(menu,     { y: 0, opacity: 1, duration: 0.42 }, "-=0.18")
        .to(links,    { y: 0, opacity: 1, duration: 0.38, stagger: 0.05 }, "-=0.22");
    });
  };

  const closeMenu = () => {
    const menu     = mobileRef.current;
    const backdrop = backdropRef.current;
    if (!menu || !backdrop) { setMenuOpen(false); return; }
    const links = menu.querySelectorAll<HTMLElement>(".mob-link");
    gsap.timeline({ onComplete: () => setMenuOpen(false) })
      .to(links,    { y: -10, opacity: 0, duration: 0.2, stagger: 0.03, ease: "power2.in" })
      .to(menu,     { y: -12, opacity: 0, duration: 0.28, ease: "power2.in" }, "-=0.1")
      .to(backdrop, { opacity: 0, duration: 0.22 }, "-=0.14");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_16px_rgba(15,23,42,0.08)] border-b border-border"
            : "bg-white border-b border-border",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => menuOpen && closeMenu()}>
            {/* Wordmark matches brand — "T" icon in orange + blue, bold "tekktopia" */}
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect width="32" height="32" rx="6" fill="#0F172A"/>
                <path d="M7 10h18M16 10v12" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M7 10h9M16 10v12" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="font-display font-bold text-lg tracking-tight">
                <span className="text-navy">tekk</span><span className="text-blue">topia</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={[
                    "relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    active
                      ? "text-orange"
                      : "text-navy/70 hover:text-navy hover:bg-slate-50",
                  ].join(" ")}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  {active && (
                    <span className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="hidden cursor-pointer md:inline-flex items-center gap-2 relative overflow-hidden bg-navy hover:bg-navy-mid text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-sm group"
            >
              <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <span className="relative h-full w-6 bg-white/10" />
              </span>
              <span className="relative z-10 flex items-center gap-1.5">
                Connect with us
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => menuOpen ? closeMenu() : openMenu()}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-slate-50 transition-colors gap-[5px]"
            >
              <span className={["block w-5 h-[1.5px] bg-navy rounded-full transition-all duration-300 origin-center", menuOpen ? "rotate-45 translate-y-[6.5px]" : ""].join(" ")} />
              <span className={["block w-5 h-[1.5px] bg-navy rounded-full transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
              <span className={["block w-5 h-[1.5px] bg-navy rounded-full transition-all duration-300 origin-center", menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""].join(" ")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div ref={backdropRef} className="md:hidden fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm" onClick={closeMenu} />
          <div ref={mobileRef} className="md:hidden fixed top-[72px] left-0 right-0 z-50 bg-white border-b border-border shadow-xl">
            <nav className="flex flex-col px-6 py-5 gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className={[
                      "mob-link flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                      active
                        ? "text-orange bg-orange/5 border-l-4 border-orange pl-3"
                        : "text-navy/70 hover:text-navy hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-orange" />}
                  </Link>
                );
              })}
              <div className="mob-link h-px bg-border my-2" />
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mob-link w-full flex items-center justify-center gap-2 bg-navy text-white px-5 py-4 rounded-full font-semibold text-sm"
              >
                Connect with us <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
