import type { Metadata } from "next";
import {
  HeroSection,
  NetworkGlobe,
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
      <div aria-hidden style={{ height: 96, background: "#04080F", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: 1, background: "linear-gradient(to right, transparent, rgba(37,99,235,0.35), transparent)" }} />
      </div>
      <NetworkGlobe />
      <ServicesGrid />
      <WhySection />
      <ProcessSection />
      <CTABanner />
    </>
  );
}
