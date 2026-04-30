import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Our Services | Tekktopia",
  description:
    "From software development and cybersecurity to cloud computing, AI, and IT support — explore Tekktopia full range of technology services.",
  alternates: { canonical: "https://tekktopialtd.com/services" },
  openGraph: {
    title: "Services | Tekktopia",
    description: "End-to-end technology services for startups and enterprises across Africa and beyond.",
    url: "https://tekktopialtd.com/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
