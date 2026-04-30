import type { Metadata } from "next";
import {
  AboutHero,
  MissionSection,
  StatsSection,
  TimelineSection,
  TeamSection,
  ValuesSection,
} from "@/components/about";
import { CTABanner } from "@/components/home";

export const metadata: Metadata = {
  title: "About Us | Tekktopia",
  description:
    "Learn about Tekktopia — our story, mission, team, and the values that drive everything we build. A Lagos-based full-stack technology company serving clients globally.",
  alternates: {
    canonical: "https://tekktopialtd.com/about",
  },
  openGraph: {
    title: "About Tekktopia | Who We Are",
    description:
      "From a bold idea in Lagos to a globally trusted tech partner — discover the story, people, and principles behind Tekktopia.",
    url: "https://tekktopialtd.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <StatsSection />
      <TimelineSection />
      <TeamSection />
      <ValuesSection />
      <CTABanner />
    </>
  );
}
