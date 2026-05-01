import type { Metadata } from "next";
import PrivacyPage from "@/components/legal/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Tekktopia",
  description:
    "Read Tekktopia's Privacy Policy to understand how we collect, use, and protect your personal data in accordance with UK GDPR and the Data Protection Act 2018.",
  alternates: {
    canonical: "https://tekktopialtd.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Tekktopia",
    description:
      "How Tekktopia collects, uses, and safeguards your personal information.",
    url: "https://tekktopialtd.com/privacy",
  },
};

export default function Page() {
  return <PrivacyPage />;
}
