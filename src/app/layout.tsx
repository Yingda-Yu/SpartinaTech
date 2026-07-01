import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    default: "米草科技 / Spartina Technology",
    template: "%s - 米草科技",
  },
  description:
    "基于生成式AI的工业视觉数据增强平台，面向PCB、钢材表面、半导体、锂电池等行业的缺陷检测合成数据生成与模型增强。",
  openGraph: {
    title: "米草科技 / Spartina Technology",
    description:
      "基于生成式AI的工业视觉数据增强平台，面向PCB、钢材表面、半导体、锂电池等行业的缺陷检测合成数据生成与模型增强。",
    url: siteUrl,
    siteName: "米草科技",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "米草科技 / Spartina Technology",
    description:
      "基于生成式AI的工业视觉数据增强平台，面向PCB、钢材表面、半导体、锂电池等行业的缺陷检测合成数据生成与模型增强。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
