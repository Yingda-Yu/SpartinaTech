import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Internal demos and prototype projects demonstrating Spartina Technology's AI production system capabilities.",
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
