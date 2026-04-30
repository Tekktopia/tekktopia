import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tekktopialtd.com"),
  title: {
    default: "Tekktopia | IT Support, Software Development & Tech Solutions",
    template: "%s | Tekktopia",
  },
  description:
    "Tekktopia is a tech startup delivering expert IT support, custom software development, cybersecurity, cloud computing, data analytics, and digital transformation services.",
  keywords: [
    "IT support services", "software development company", "managed IT services",
    "cybersecurity services", "cloud computing solutions", "data analytics services",
    "mobile app development", "web development services", "IT consulting",
    "digital transformation", "tech startup", "product design agency",
    "emerging technology", "Tekktopia", "IT support company", "custom software",
    "cloud migration", "cyber security", "data science", "DevOps services",
  ],
  authors: [{ name: "Tekktopia Limited" }],
  creator: "Tekktopia Limited",
  publisher: "Tekktopia Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website", locale: "en_GB",
    url: "https://tekktopialtd.com", siteName: "Tekktopia",
    title: "Tekktopia | IT Support, Software Development & Tech Solutions",
    description: "Expert IT support, custom software development, cybersecurity, cloud computing, and digital transformation services.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tekktopia — Building the Tech That Builds Your Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekktopia | IT Support & Software Development",
    description: "Expert IT support, software development, cybersecurity, and cloud computing services.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://tekktopialtd.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": "https://tekktopialtd.com/#organization",
      name: "Tekktopia Limited", url: "https://tekktopialtd.com",
      logo: { "@type": "ImageObject", url: "https://tekktopialtd.com/logo.png" },
      description: "Tekktopia is a tech startup offering IT support, software development, cybersecurity, cloud computing, data analytics, and digital transformation services.",
      knowsAbout: ["IT Support", "Software Development", "Cybersecurity", "Cloud Computing", "Data Analytics", "Mobile App Development", "Web Development", "Product Design", "Emerging Technology", "IT Consultancy"],
    },
    {
      "@type": "WebSite", "@id": "https://tekktopialtd.com/#website",
      url: "https://tekktopialtd.com", name: "Tekktopia",
      publisher: { "@id": "https://tekktopialtd.com/#organization" },
    },
    {
      "@type": "ProfessionalService", "@id": "https://tekktopialtd.com/#service",
      name: "Tekktopia Tech Services",
      provider: { "@id": "https://tekktopialtd.com/#organization" },
      serviceType: ["IT Support", "Software Development", "Cybersecurity", "Cloud Computing", "Data Analytics"],
      areaServed: "Worldwide",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-blue selection:text-white overflow-x-hidden">
        <ScrollProgress />
        <CustomCursor />
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
