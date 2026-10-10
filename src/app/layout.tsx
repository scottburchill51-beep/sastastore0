import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

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

  applicationName: "SastaStore",

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

  authors: [
    {
      name: "SastaStore",
      url: siteConfig.url,
    },
  ],

  creator: "SastaStore",
  publisher: "SastaStore",

  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    siteName: "SastaStore",
    title: "SastaStore | Premium Digital Tools at Sasta Prices",
    description:
      "Affordable AI tools, premium subscriptions, creative software, productivity apps and digital services in Pakistan.",
  },

  twitter: {
    card: "summary_large_image",
    title: "SastaStore | Premium Digital Tools at Sasta Prices",
    description:
      "Affordable AI tools, subscriptions and digital services in Pakistan.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}