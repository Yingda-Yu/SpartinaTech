import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Data Enhancement - Spartina Technology",
  description:
    "Industrial visual data enhancement platform for enterprise AI inspection. Data diagnosis, enhancement planning, and model validation.",
};

export default function IndustrialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}