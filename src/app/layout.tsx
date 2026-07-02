import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yingda-yu.github.io/SpartinaTech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Spartina Technology",
    template: "%s - Spartina Technology",
  },
  description:
    "Spartina Technology builds multimodal digital products, AI-generated image and video assets, visual product drops, and custom generation workflows.",
  openGraph: {
    title: "Spartina Technology",
    description:
      "Multimodal digital product generation for image, video, and AI-native commerce.",
    url: siteUrl,
    siteName: "Spartina Technology",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spartina Technology",
    description:
      "Multimodal digital product generation for image, video, and AI-native commerce.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#ffffff] text-[#0a0a0a]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
