import type { Metadata } from "next";
import FAQPage from "@/components/faq/FAQPage";

export const metadata: Metadata = {
  title: "FAQ | Tekktopia",
  description:
    "Frequently asked questions about Tekktopia's services, pricing, project timelines, data security, and how to get started. Find answers or contact our team.",
  alternates: {
    canonical: "https://tekktopialtd.com/faq",
  },
  openGraph: {
    title: "FAQ | Tekktopia",
    description:
      "Got questions? We have answers. Learn about our services, how we work, pricing, and more.",
    url: "https://tekktopialtd.com/faq",
  },
};

export default function Page() {
  return <FAQPage />;
}
