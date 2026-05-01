"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm, ValidationError } from "@formspree/react";
import {
  Mail, Phone, MapPin, Clock,
  Send, CheckCircle, ArrowUpRight,
} from "lucide-react";

// ─── Replace with your Formspree form ID ──────────────────────────────────────
// Create a free form at https://formspree.io → copy the 8-char ID from the
// endpoint URL (e.g. https://formspree.io/f/xpwzgkdo → ID is "xpwzgkdo")
const FORMSPREE_ID = "maqvnwqb";
// ──────────────────────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@tekktopia.com",
    href: "mailto:info@tekktopia.com",
    color: "#3B82F6",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
    color: "#10B981",
  },
  {
    icon: MapPin,
    label: "Find us",
    value: "Lagos, Nigeria",
    href: "#",
    color: "#F97316",
  },
  {
    icon: Clock,
    label: "Working hours",
    value: "Mon – Fri, 9 am – 6 pm WAT",
    href: null,
    color: "#8B5CF6",
  },
];

const SERVICES_LIST = [
  "Software Development",
  "Cloud Computing",
  "Cybersecurity",
  "AI & Emerging Tech",
  "Data Analytics",
  "IT Support",
  "Mobile & Web Dev",
  "Product Design",
  "Microsoft 365",
  "IT Consultancy",
  "Other / Not sure",
];

export default function ContactPage() {
  const pageRef  = useRef<HTMLElement>(null);
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  useGSAP(() => {
    gsap.set(".ctp-eyebrow", { autoAlpha: 0, y: 16 });
    gsap.set(".ctp-word",    { yPercent: 110 });
    gsap.set(".ctp-sub",     { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".ctp-info",    { autoAlpha: 0, x: -24 });
    gsap.set(".ctp-form",    { autoAlpha: 0, y: 32, filter: "blur(6px)" });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".ctp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1)
      .to(".ctp-word",    { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.35")
      .to(".ctp-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.5")
      .to(".ctp-info",    { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
      .to(".ctp-form",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.5");
  }, { scope: pageRef });

  return (
    <>
      <main
        ref={pageRef}
        style={{ background: "#04080F", minHeight: "100vh" }}
      >
        {/* ── Background decoration ── */}
        <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute", width: 900, height: 700, borderRadius: "50%",
            top: "-10%", left: "50%", transform: "translateX(-50%)",
            background: "radial-gradient(ellipse,rgba(37,99,235,0.10) 0%,transparent 65%)",
            filter: "blur(80px)",
          }} />
          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            bottom: "5%", right: "-5%",
            background: "radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 65%)",
            filter: "blur(80px)",
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />
        </div>

        {/* ── Hero ── */}
        <section
          className="relative"
          style={{ paddingTop: 140, paddingBottom: 72 }}
        >
          <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 text-center">
            <div className="ctp-eyebrow flex items-center justify-center gap-3 mb-7">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                Get In Touch
              </span>
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            </div>

            <h1
              className="font-display font-black uppercase mx-auto"
              style={{ fontSize: "clamp(38px,6vw,78px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              {[
                { word: "Let's",  orange: false },
                { word: "Talk",   orange: false },
                { word: "Tech.",  orange: true  },
              ].map(({ word, orange }, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]">
                  <span className="ctp-word inline-block" style={{ color: orange ? "#F97316" : "#ffffff" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="ctp-sub mt-6 mx-auto max-w-xl"
              style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.85 }}>
              Tell us about your project. We read every message and respond within
              24 hours on business days.
            </p>
          </div>
        </section>

        {/* ── Two-column layout ── */}
        <section style={{ paddingBottom: 96 }}>
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">

              {/* ── Left: contact info ── */}
              <div>
                <p style={{
                  fontFamily: "monospace", fontSize: 10, textTransform: "uppercase",
                  letterSpacing: "0.28em", color: "#F97316", opacity: 0.8, marginBottom: 28,
                }}>
                  — Contact details
                </p>

                <div className="flex flex-col gap-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                    <div
                      key={label}
                      className="ctp-info flex items-center gap-4 p-5 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.028)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div style={{
                        width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${color}18`, border: `1px solid ${color}30`,
                      }}>
                        <Icon style={{ width: 18, height: 18, color }} strokeWidth={1.6} />
                      </div>
                      <div>
                        <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", marginBottom: 3 }}>
                          {label}
                        </p>
                        {href && href !== "#" ? (
                          <a
                            href={href}
                            style={{ fontSize: 14, fontWeight: 500, color: "#fff", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = color)}
                            onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
                          >
                            {value}
                          </a>
                        ) : (
                          <span style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick response badge */}
                <div className="ctp-info mt-8 p-5 rounded-2xl"
                  style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.18)" }}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", flexShrink: 0, boxShadow: "0 0 6px #10B98166" }} />
                    <span style={{ fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.16em", color: "#10B981" }}>
                      Fast response
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", lineHeight: 1.7, fontWeight: 300 }}>
                    We typically respond within a few hours — never more than one business day.
                  </p>
                </div>
              </div>

              {/* ── Right: form ── */}
              <div
                className="ctp-form relative rounded-2xl p-8 sm:p-10"
                style={{
                  background: "rgba(255,255,255,0.028)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Colour top rule */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  borderRadius: "16px 16px 0 0",
                  background: "linear-gradient(to right,#F97316aa,#3B82F6aa,transparent)",
                }} />

                {state.succeeded ? (
                  /* ── Success state ── */
                  <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <CheckCircle style={{ width: 28, height: 28, color: "#10B981" }} strokeWidth={1.5} />
                    </div>
                    <h2 className="font-display font-bold" style={{ fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}>
                      Message sent!
                    </h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 360 }}>
                      Thanks for reaching out. We&apos;ll be in touch within one business day.
                    </p>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 font-semibold text-sm"
                      style={{ color: "#F97316", borderBottom: "1px solid rgba(249,115,22,0.4)", paddingBottom: 1 }}
                    >
                      Back to home <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <p style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>
                      — Send us a message
                    </p>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field id="name" label="Full name" type="text" name="name" placeholder="Ada Okonkwo" required state={state} />
                      <Field id="email" label="Email address" type="email" name="email" placeholder="ada@company.com" required state={state} />
                    </div>

                    {/* Company + Phone row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field id="company" label="Company" type="text" name="company" placeholder="Acme Ltd" state={state} />
                      <Field id="phone" label="Phone (optional)" type="tel" name="phone" placeholder="+234 800 000 0000" state={state} />
                    </div>

                    {/* Service interest */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="service"
                        style={{ fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)" }}
                      >
                        Service of interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          borderRadius: 10,
                          padding: "11px 14px",
                          fontSize: 14,
                          color: "rgba(255,255,255,0.80)",
                          outline: "none",
                          width: "100%",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.55)")}
                        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                      >
                        <option value="" style={{ background: "#04080F" }}>Select a service…</option>
                        {SERVICES_LIST.map(s => (
                          <option key={s} value={s} style={{ background: "#04080F" }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        style={{ fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)" }}
                      >
                        Message <span style={{ color: "#F97316" }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your project, timeline, and budget…"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          borderRadius: 10,
                          padding: "11px 14px",
                          fontSize: 14,
                          color: "rgba(255,255,255,0.80)",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          lineHeight: 1.7,
                          transition: "border-color 0.2s",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.55)")}
                        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                      />
                      <ValidationError field="message" prefix="Message" errors={state.errors}
                        className="text-red-400 text-xs mt-0.5" />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="group inline-flex items-center justify-center gap-2.5 font-semibold rounded-xl mt-1"
                      style={{
                        padding: "14px 28px",
                        background: state.submitting
                          ? "rgba(249,115,22,0.5)"
                          : "linear-gradient(135deg,#F97316,#ea6a0f)",
                        boxShadow: "0 0 0 1px rgba(249,115,22,0.4), 0 8px 28px rgba(249,115,22,0.22)",
                        color: "#fff",
                        fontSize: 15,
                        cursor: state.submitting ? "not-allowed" : "pointer",
                        border: "none",
                        transition: "box-shadow 0.3s, transform 0.3s, background 0.2s",
                        width: "100%",
                      }}
                      onMouseEnter={e => {
                        if (!state.submitting) {
                          e.currentTarget.style.boxShadow = "0 0 55px rgba(249,115,22,0.50), 0 0 0 1px rgba(249,115,22,0.6)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(249,115,22,0.4), 0 8px 28px rgba(249,115,22,0.22)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      {state.submitting ? "Sending…" : "Send message"}
                    </button>

                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", fontFamily: "monospace" }}>
                      We&apos;ll never share your information with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ── Reusable field component ──────────────────────────────────────────────── */
function Field({
  id, label, type, name, placeholder, required, state,
}: {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        style={{
          fontSize: 11, fontFamily: "monospace", textTransform: "uppercase",
          letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)",
        }}
      >
        {label} {required && <span style={{ color: "#F97316" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 14,
          color: "rgba(255,255,255,0.80)",
          outline: "none",
          width: "100%",
          transition: "border-color 0.2s",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.55)")}
        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
      />
      <ValidationError
        field={name}
        prefix={label}
        errors={state.errors}
        className="text-red-400 text-xs mt-0.5"
      />
    </div>
  );
}
