"use client";

import LegalPage from "./LegalPage";

const sections = [
  {
    heading: "Who We Are",
    body: (
      <p>
        Tekktopia Limited (&ldquo;Tekktopia&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a technology company
        registered in England and Wales. We are the data controller for personal
        information collected through our website (tekktopialtd.com) and our
        services. You can contact us at{" "}
        <a
          href="mailto:info@tekktopia.com"
          style={{ color: "#F97316", textDecoration: "none" }}
        >
          info@tekktopia.com
        </a>{" "}
        with any privacy-related queries.
      </p>
    ),
  },
  {
    heading: "Information We Collect",
    body: (
      <div className="flex flex-col gap-4">
        <p>
          We collect information you provide directly to us and information we
          collect automatically when you use our website.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Information you provide:
          </strong>{" "}
          This includes your name, email address, phone number, company name,
          and any message content when you submit our contact form or subscribe
          to our newsletter.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Information collected automatically:
          </strong>{" "}
          When you visit our website we may collect your IP address, browser
          type and version, pages visited, time and date of your visit, and
          referring URL. This is collected through cookies and similar
          technologies — see our Cookie Policy for more detail.
        </p>
      </div>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <div className="flex flex-col gap-3">
        <p>We use the information we collect to:</p>
        <ul
          className="flex flex-col gap-2"
          style={{ listStyle: "none", paddingLeft: 0 }}
        >
          {[
            "Respond to your enquiries and provide the services you request",
            "Send you our newsletter if you have subscribed (you can unsubscribe at any time)",
            "Improve and optimise our website and services",
            "Comply with our legal obligations",
            "Detect and prevent fraud or other unlawful activity",
            "Send you updates about our services where you have given consent or where we have a legitimate interest",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#F97316",
                  opacity: 0.7,
                  flexShrink: 0,
                  marginTop: 8,
                }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    heading: "Legal Bases for Processing",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Under UK GDPR, we rely on the following lawful bases to process your
          personal data:
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Contract:
          </strong>{" "}
          Processing necessary to perform a contract with you or take steps at
          your request before entering into one.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Legitimate interests:
          </strong>{" "}
          Processing necessary for our legitimate business interests, such as
          improving our services and communicating with prospective clients,
          provided these are not overridden by your rights.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Consent:
          </strong>{" "}
          Where you have given us clear consent to process your personal data for
          a specific purpose, such as subscribing to our newsletter.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Legal obligation:
          </strong>{" "}
          Processing necessary to comply with a legal or regulatory obligation.
        </p>
      </div>
    ),
  },
  {
    heading: "How We Share Your Information",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          We do not sell your personal data. We may share it with trusted third
          parties only where necessary to operate our services:
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Service providers:
          </strong>{" "}
          Including our form-handling provider (Formspree), analytics services,
          hosting infrastructure, and email delivery platforms. These parties are
          contractually bound to keep your data secure and use it only for the
          purposes we specify.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Legal requirements:
          </strong>{" "}
          We may disclose your data where required by law, court order, or
          government authority.
        </p>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            Business transfers:
          </strong>{" "}
          In the event of a merger, acquisition, or sale of assets, your data
          may be transferred as part of that transaction.
        </p>
      </div>
    ),
  },
  {
    heading: "Data Retention",
    body: (
      <p>
        We retain your personal data only for as long as necessary to fulfil the
        purposes described in this policy or as required by law. Contact form
        submissions are typically retained for up to 24 months. Newsletter
        subscriber data is retained until you unsubscribe. You can request
        deletion of your data at any time by contacting us.
      </p>
    ),
  },
  {
    heading: "Your Rights",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Under UK GDPR you have the right to: access the personal data we hold
          about you; correct inaccurate data; request erasure of your data;
          object to or restrict processing; data portability; and to withdraw
          consent at any time where processing is based on consent.
        </p>
        <p>
          To exercise any of these rights, please email{" "}
          <a
            href="mailto:info@tekktopia.com"
            style={{ color: "#F97316", textDecoration: "none" }}
          >
            info@tekktopia.com
          </a>
          . We will respond within 30 days. You also have the right to lodge a
          complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>ico.org.uk</span>.
        </p>
      </div>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        Our website uses cookies and similar tracking technologies. Please see
        our{" "}
        <a
          href="/cookies"
          style={{ color: "#F97316", textDecoration: "none" }}
        >
          Cookie Policy
        </a>{" "}
        for full details on what cookies we use and how to manage them.
      </p>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        We implement appropriate technical and organisational measures to protect
        your personal data against unauthorised access, loss, alteration, or
        disclosure. These include TLS encryption for data in transit, access
        controls, and regular security assessments. However, no method of
        transmission over the internet is completely secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the &ldquo;Last updated&rdquo; date at the top of this page.
        Material changes will be communicated more prominently. We encourage you
        to review this page periodically.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={["Privacy", "Policy."]}
      lastUpdated="1 May 2025"
      intro="This Privacy Policy explains how Tekktopia Limited collects, uses, stores, and shares your personal information when you visit our website or engage with our services. We are committed to protecting your privacy and handling your data in an open and transparent manner in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018."
      sections={sections}
    />
  );
}
