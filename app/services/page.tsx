import type { Metadata } from "next";
import { ServicesHero, ServicesList, WhyUsStrip } from "@/components/services";
import { CTABanner } from "@/components/home";

export const metadata: Metadata = {
  title: "Services | Tekktopia",
  description:
    "Ten end-to-end technology services — software development, cloud, cybersecurity, AI, data analytics, IT support, mobile & web, product design, M365, and IT consultancy.",
  alternates: { canonical: "https://tekktopialtd.com/services" },
  openGraph: {
    title: "Our Services | Tekktopia",
    description:
      "Ten focused disciplines. One accountable partner. Explore what Tekktopia builds and manages for ambitious businesses.",
    url: "https://tekktopialtd.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <WhyUsStrip />
      <CTABanner />
    </>
  );
}
