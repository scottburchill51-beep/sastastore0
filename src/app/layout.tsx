import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: "SastaStore | Premium Digital Tools at Sasta Prices",

  description:
    "Buy affordable AI tools, premium subscriptions, creative software, productivity apps, VPN services and digital products in Pakistan.",

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,

  keywords: [
    "SastaStore",
    "digital tools Pakistan",
    "AI tools Pakistan",
    "premium subscriptions Pakistan",
    "ChatGPT Plus Pakistan",
    "Canva Pro Pakistan",
    "CapCut Pro Pakistan",
    "Netflix Pakistan",
    "VPN Pakistan",
    "software keys Pakistan",
  ],

  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "SastaStore | Premium Digital Tools at Sasta Prices",
    description:
      "Affordable AI tools, premium subscriptions, creative software, productivity apps and digital services in Pakistan.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SastaStore | Premium Digital Tools at Sasta Prices",
    description:
      "Affordable AI tools, subscriptions and digital services in Pakistan.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sastastore.store/#organization",
      name: "SastaStore",
      url: "https://sastastore.store/",
      logo: "https://sastastore.store/icon.svg",
      description:
        "SastaStore provides affordable digital tools, premium subscriptions and professional digital services in Pakistan.",
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-313-6093501",
        contactType: "customer support",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
      sameAs: [
        "https://www.facebook.com/share/1cbKHVxxJi/",
        "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://sastastore.store/#website",
      url: "https://sastastore.store/",
      name: "SastaStore",
      description:
        "Premium digital tools, subscriptions and digital services at affordable prices in Pakistan.",
      publisher: {
        "@id": "https://sastastore.store/#organization",
      },
      inLanguage: "en-PK",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <Header />
        <WelcomePopup />

        {children}

        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
