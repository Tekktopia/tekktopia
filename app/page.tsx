import type { Metadata } from "next";
import {
  HeroSection,
  StatsStrip,
  ServicesGrid,
  WhySection,
  ProcessSection,
  CTABanner,
} from "@/components/home";

export const metadata: Metadata = {
  title: "IT Support, Software Development & Tech Solutions",
  description:
    "Tekktopia delivers expert IT support, custom software development, cybersecurity, cloud computing, and data analytics services. Book a free consultation today.",
  alternates: {
    canonical: "https://tekktopialtd.com",
  },
  openGraph: {
    title: "Tekktopia | IT Support, Software Development & Tech Solutions",
    description:
      "End-to-end tech services for startups and enterprises — IT support, software development, cybersecurity, cloud computing, and more.",
    url: "https://tekktopialtd.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <ServicesGrid />
      <WhySection />
      <ProcessSection />
      <CTABanner />
    </>
  );
}
