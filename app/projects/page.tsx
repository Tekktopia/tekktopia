import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Tekktopia",
  description:
    "Explore featured projects built by Tekktopia — e-commerce platforms, fintech apps, cloud migrations, AI solutions, and more, for clients across Africa and Europe.",
  alternates: {
    canonical: "https://tekktopialtd.com/projects",
  },
  openGraph: {
    title: "Our Projects | Tekktopia",
    description:
      "A curated showcase of the products, platforms, and digital solutions we've built for clients worldwide.",
    url: "https://tekktopialtd.com/projects",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
