import type { Metadata } from "next";
import CookiesPage from "@/components/legal/CookiesPage";

export const metadata: Metadata = {
  title: "Cookie Policy | Tekktopia",
  description:
    "Learn how Tekktopia uses cookies on our website — what types we use, why, and how you can manage or disable them.",
  alternates: {
    canonical: "https://tekktopialtd.com/cookies",
  },
  openGraph: {
    title: "Cookie Policy | Tekktopia",
    description:
      "Understand how Tekktopia uses cookies and how to manage your cookie preferences.",
    url: "https://tekktopialtd.com/cookies",
  },
};

export default function Page() {
  return <CookiesPage />;
}
