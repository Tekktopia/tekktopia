import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SERVICES, { getServiceBySlug } from "@/lib/services-data";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return {};
  return {
    title: `${svc.name} | Tekktopia`,
    description: svc.desc,
    alternates: { canonical: `https://tekktopialtd.com/services/${svc.slug}` },
    openGraph: {
      title: `${svc.name} | Tekktopia`,
      description: svc.desc,
      url: `https://tekktopialtd.com/services/${svc.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();
  return <ServicePageTemplate svc={svc} />;
}
