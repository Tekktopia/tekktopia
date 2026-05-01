import type { Metadata } from "next";
import TermsPage from "@/components/legal/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Use | Tekktopia",
  description:
    "Read Tekktopia's Terms of Use — the rules and conditions governing use of our website and services. Governed by the laws of England and Wales.",
  alternates: {
    canonical: "https://tekktopialtd.com/terms",
  },
  openGraph: {
    title: "Terms of Use | Tekktopia",
    description:
      "The terms and conditions that govern your use of the Tekktopia website and services.",
    url: "https://tekktopialtd.com/terms",
  },
};

export default function Page() {
  return <TermsPage />;
}
