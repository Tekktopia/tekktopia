import type { Metadata } from "next";
import OurTeamPage from "@/components/team/OurTeamPage";

export const metadata: Metadata = {
  title: "Our Team | Tekktopia",
  description:
    "Meet the engineers, designers, and strategists behind Tekktopia — a focused, battle-tested team building world-class technology for African businesses.",
  alternates: { canonical: "https://tekktopialtd.com/team" },
  openGraph: {
    title: "Our Team | Tekktopia",
    description: "Meet the people behind Tekktopia.",
    url: "https://tekktopialtd.com/team",
  },
};

export default function Page() {
  return <OurTeamPage />;
}
