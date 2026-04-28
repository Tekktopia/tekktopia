"use client";

import Link from "next/link";
import { Mail, Phone, Zap } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaGithub, FaInstagram } from "react-icons/fa6";

const serviceLinks = [
  { label: "Software Development",     href: "/services/software-development" },
  { label: "IT Support",               href: "/services/it-support" },
  { label: "M365 License Provisioning",href: "/services/m365" },
  { label: "Cybersecurity",            href: "/services/cybersecurity" },
  { label: "Cloud Computing",          href: "/services/cloud-computing" },
  { label: "Data Analytics",           href: "/services/data-analytics" },
  { label: "Mobile & Web Dev",         href: "/services/mobile-web-development" },
  { label: "Product Design",           href: "/services/product-design" },
  { label: "AI & Emerging Tech",       href: "/services/emerging-tech" },
  { label: "IT Consultancy",           href: "/services/consultancy" },
];

const companyLinks = [
  { label: "About Us",  href: "/about" },
  { label: "Projects",  href: "/projects" },
  { label: "Our Team",  href: "/team" },
  { label: "Blog",      href: "/blog" },
  { label: "Careers",   href: "/careers" },
  { label: "FAQ",       href: "/faq" },
  { label: "Contact",   href: "/contact" },
];

const socialLinks = [
  { icon: FaLinkedinIn, href: "https://linkedin.com/company/tekktopia", label: "LinkedIn" },
  { icon: FaXTwitter,   href: "https://x.com/tekktopia",               label: "X / Twitter" },
  { icon: FaGithub,     href: "https://github.com/tekktopia",           label: "GitHub" },
  { icon: FaInstagram,  href: "https://instagram.com/tekktopia",        label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-navy text-off-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                <Zap className="w-4 h-4 text-orange" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                tekk<span className="text-orange">topia</span>
              </span>
            </Link>

            <p className="text-sm font-light leading-relaxed text-white/50 max-w-sm">
              We build the technology that drives your business forward — from managed IT support to custom software, cloud solutions, and beyond.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a href="mailto:hello@tekktopialtd.com" className="inline-flex items-center gap-2.5 text-sm font-medium text-orange/80 hover:text-orange transition-colors">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                hello@tekktopialtd.com
              </a>
              <a href="tel:+44000000000" className="inline-flex items-center gap-2.5 text-sm font-medium text-white/40 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                +44 (0) 000 000 0000
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-orange/15 hover:text-orange border border-white/8 hover:border-orange/25 text-white/40 transition-all duration-200">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-[0.28em] text-white/35 mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-light text-white/55 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-[0.28em] text-white/35 mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-light text-white/55 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-[0.28em] text-white/35 mb-6">Stay Updated</h3>
            <p className="text-sm font-light leading-relaxed text-white/45 mb-5">
              Tech insights, company news, and industry trends — straight to your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange/40 transition-all"
              />
              <button type="submit" className="w-full bg-orange hover:bg-orange-light text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] text-white/35">© {year} Tekktopia Limited. All rights reserved.</p>
            <p className="text-[11px] text-white/22">Registered in England & Wales.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px]">
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }, { label: "Cookie Policy", href: "/cookies" }].map(({ label, href }) => (
              <Link key={href} href={href} className="text-white/35 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
