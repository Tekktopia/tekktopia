"use client";

import LegalPage from "./LegalPage";

const sections = [
  {
    heading: "What Are Cookies?",
    body: (
      <p>
        Cookies are small text files placed on your device (computer, tablet, or
        smartphone) when you visit a website. They allow the website to recognise
        your device and remember certain information about your visit. Cookies do
        not contain personally identifiable information on their own, but they
        can be linked to information you provide to us.
      </p>
    ),
  },
  {
    heading: "How We Use Cookies",
    body: (
      <p>
        We use cookies to understand how visitors interact with our website,
        remember your preferences, and improve the overall experience. We do not
        use cookies to serve targeted advertising. The information collected by
        cookies on our website is used solely for operational and analytical
        purposes.
      </p>
    ),
  },
  {
    heading: "Types of Cookies We Use",
    body: (
      <div className="flex flex-col gap-5">
        {[
          {
            type: "Strictly Necessary Cookies",
            color: "#3B82F6",
            description:
              "These cookies are essential for the website to function correctly and cannot be disabled. They are typically set in response to actions you take, such as submitting a form or navigating between pages. Without these cookies, the website cannot operate properly.",
            examples: "Session management, security tokens, load balancing",
          },
          {
            type: "Functional Cookies",
            color: "#10B981",
            description:
              "These cookies allow the website to remember choices you make and provide enhanced, more personalised features. For example, they may remember your language preference or the region you are in.",
            examples: "Language preferences, form auto-fill helpers",
          },
          {
            type: "Analytics Cookies",
            color: "#8B5CF6",
            description:
              "These cookies help us understand how visitors interact with our website by collecting information anonymously. This helps us improve site performance and user experience. We may use tools such as Google Analytics for this purpose.",
            examples: "Page views, session duration, traffic sources, device types",
          },
        ].map(({ type, color, description, examples }) => (
          <div
            key={type}
            style={{
              borderRadius: 12,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "18px 20px",
              borderLeft: `3px solid ${color}`,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}
            >
              {type}
            </p>
            <p style={{ marginBottom: 8 }}>{description}</p>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: color,
                opacity: 0.75,
              }}
            >
              Examples: {examples}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "Third-Party Cookies",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Some pages on our website may embed content or use services from third
          parties, which may place their own cookies on your device. We do not
          control the use of these third-party cookies and they are governed by
          the respective third party&apos;s privacy and cookie policies.
        </p>
        <p>
          Third parties whose services may place cookies include analytics
          providers (such as Google Analytics) and form-handling services (such
          as Formspree). We encourage you to review their policies if you have
          concerns.
        </p>
      </div>
    ),
  },
  {
    heading: "Managing and Disabling Cookies",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          You can control and manage cookies in several ways. Please note that
          removing or blocking cookies may impact your experience on our website
          and some features may become unavailable.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Browser settings:
          </strong>{" "}
          Most browsers allow you to refuse or delete cookies through their
          settings. The method varies by browser; refer to your browser&apos;s
          help documentation for instructions.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Opt-out tools:
          </strong>{" "}
          For analytics cookies, you can opt out of Google Analytics tracking by
          installing the{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            Google Analytics Opt-out Browser Add-on
          </span>
          .
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Device settings:
          </strong>{" "}
          Mobile devices typically offer controls in their operating system
          settings to limit ad tracking and cookie usage.
        </p>
      </div>
    ),
  },
  {
    heading: "Cookie Consent",
    body: (
      <p>
        By continuing to use our website, you consent to the use of cookies as
        described in this policy, except for strictly necessary cookies which are
        set automatically. Where required by law, we will ask for your explicit
        consent before setting non-essential cookies. You may withdraw your
        consent at any time by adjusting your browser settings as described
        above.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or for other operational, legal, or regulatory reasons.
        Please revisit this page periodically to stay informed. The &ldquo;Last
        updated&rdquo; date at the top indicates when this policy was last
        revised.
      </p>
    ),
  },
  {
    heading: "Contact Us",
    body: (
      <p>
        If you have any questions about our use of cookies, please contact us at{" "}
        <a
          href="mailto:info@tekktopia.com"
          style={{ color: "#F97316", textDecoration: "none" }}
        >
          info@tekktopia.com
        </a>{" "}
        or visit our{" "}
        <a
          href="/contact"
          style={{ color: "#F97316", textDecoration: "none" }}
        >
          Contact page
        </a>
        .
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={["Cookie", "Policy."]}
      lastUpdated="1 May 2025"
      intro="This Cookie Policy explains what cookies are, how Tekktopia Limited uses cookies on the tekktopialtd.com website, and the choices you have regarding their use. This policy should be read alongside our Privacy Policy, which provides broader context about how we handle personal data."
      sections={sections}
    />
  );
}
