import type { Metadata } from "next";
import CareersPage from "@/components/careers/CareersPage";

export const metadata: Metadata = {
  title: "Careers | Tekktopia",
  description:
    "Join the Tekktopia team. We're not actively hiring right now, but we'd love to hear from you — reach out to hr@tekktopia.com.",
  alternates: { canonical: "https://tekktopialtd.com/careers" },
  openGraph: {
    title: "Careers | Tekktopia",
    description: "We're not actively hiring right now, but we'd love to hear from you.",
    url: "https://tekktopialtd.com/careers",
  },
};

export default function Page() {
  return <CareersPage />;
}
