"use client";

import LegalPage from "./LegalPage";

const sections = [
  {
    heading: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using the Tekktopia website (tekktopialtd.com) or
        engaging with our services, you confirm that you have read, understood,
        and agree to be bound by these Terms of Use and our Privacy Policy. If
        you do not agree, please discontinue use of our website and services
        immediately. These terms apply to all visitors, clients, and others who
        access or use our website.
      </p>
    ),
  },
  {
    heading: "Services",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Tekktopia Limited provides technology services including, but not
          limited to, custom software development, cloud computing, cybersecurity,
          IT support, data analytics, mobile and web development, product design,
          Microsoft 365 provisioning, AI solutions, and IT consultancy.
        </p>
        <p>
          The specific terms governing any service engagement — including scope,
          deliverables, fees, and timelines — will be set out in a separate
          written agreement or statement of work between Tekktopia and the client.
          In the event of a conflict between these Terms of Use and a client
          agreement, the client agreement shall prevail.
        </p>
      </div>
    ),
  },
  {
    heading: "Intellectual Property",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          All content on this website — including text, graphics, logos, images,
          and software — is the property of Tekktopia Limited or its content
          suppliers and is protected by applicable intellectual property laws.
          You may not reproduce, distribute, or create derivative works without
          our prior written consent.
        </p>
        <p>
          Work product created for clients under a separate engagement agreement
          will be governed by the intellectual property provisions of that
          agreement. Unless otherwise agreed in writing, Tekktopia retains
          ownership of all pre-existing intellectual property, tools, frameworks,
          and methodologies used in the delivery of services.
        </p>
      </div>
    ),
  },
  {
    heading: "Acceptable Use",
    body: (
      <div className="flex flex-col gap-3">
        <p>You agree not to use our website or services to:</p>
        <ul
          className="flex flex-col gap-2"
          style={{ listStyle: "none", paddingLeft: 0 }}
        >
          {[
            "Violate any applicable law or regulation",
            "Infringe the intellectual property rights of Tekktopia or any third party",
            "Transmit any harmful, offensive, or unlawful content",
            "Attempt to gain unauthorised access to our systems or networks",
            "Interfere with or disrupt the integrity or performance of our website",
            "Engage in any conduct that could damage the reputation of Tekktopia",
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
    heading: "Disclaimers",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Our website and its content are provided on an &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; basis without any warranties of any kind,
          either express or implied. We do not warrant that the website will be
          uninterrupted, error-free, or free of viruses or other harmful
          components.
        </p>
        <p>
          Information published on this website is for general informational
          purposes only and does not constitute professional advice. You should
          seek professional guidance before acting on any information contained
          herein.
        </p>
      </div>
    ),
  },
  {
    heading: "Limitation of Liability",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          To the fullest extent permitted by law, Tekktopia Limited shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or related to your use of our website
          or services, even if we have been advised of the possibility of such
          damages.
        </p>
        <p>
          Our total aggregate liability to you in connection with any claim
          arising under these Terms of Use shall not exceed the amount paid by
          you to Tekktopia in the three months preceding the claim, or £100,
          whichever is greater. Nothing in these terms limits our liability for
          death or personal injury caused by our negligence, fraud, or any other
          matter that cannot be excluded by law.
        </p>
      </div>
    ),
  },
  {
    heading: "Third-Party Links",
    body: (
      <p>
        Our website may contain links to third-party websites for your
        convenience. These sites are not under our control and we are not
        responsible for their content, privacy practices, or terms. The
        inclusion of a link does not imply endorsement by Tekktopia. We
        encourage you to review the terms and privacy policies of any third-party
        sites you visit.
      </p>
    ),
  },
  {
    heading: "Modifications",
    body: (
      <p>
        We reserve the right to modify these Terms of Use at any time. Changes
        will take effect immediately upon posting to this page. Your continued
        use of our website after any change constitutes your acceptance of the
        revised terms. We recommend reviewing this page periodically. The
        &ldquo;Last updated&rdquo; date at the top of this page indicates when
        changes were last made.
      </p>
    ),
  },
  {
    heading: "Governing Law & Jurisdiction",
    body: (
      <p>
        These Terms of Use and any disputes arising out of or in connection with
        them shall be governed by and construed in accordance with the laws of
        England and Wales. You agree to submit to the exclusive jurisdiction of
        the courts of England and Wales to resolve any legal matter arising from
        these terms, except where applicable law requires otherwise.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        If you have any questions about these Terms of Use, please contact us at{" "}
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

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={["Terms", "of Use."]}
      lastUpdated="1 May 2025"
      intro="Please read these Terms of Use carefully before using the Tekktopia website or engaging with any of our services. These terms form a legally binding agreement between you and Tekktopia Limited, a company registered in England and Wales. By accessing our website or using our services, you agree to these terms in full."
      sections={sections}
    />
  );
}
