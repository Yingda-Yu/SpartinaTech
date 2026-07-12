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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://spartina.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Spartina Technology | AI Services for Data, Vision, and Industry Workflows",
    template: "%s | Spartina Technology",
  },
  description:
    "Spartina Technology is an AI service company incubated by Wenzhou-Kean University, building data assets, visual assets, educational content, and industry workflows.",
  openGraph: {
    title: "Spartina Technology | AI Services",
    description:
      "Spartina Technology is an AI service company incubated by Wenzhou-Kean University, building data assets, visual assets, educational content, and industry workflows.",
    url: siteUrl,
    siteName: "Spartina Technology",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spartina Technology | AI Services",
    description:
      "Spartina Technology is an AI service company incubated by Wenzhou-Kean University.",
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
