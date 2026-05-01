import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Tekktopia",
  description:
    "Get in touch with Tekktopia. Tell us about your project and we'll get back to you within 24 hours.",
  alternates: { canonical: "https://tekktopialtd.com/contact" },
  openGraph: {
    title: "Contact Us | Tekktopia",
    description: "Tell us about your project and we'll get back to you within 24 hours.",
    url: "https://tekktopialtd.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
