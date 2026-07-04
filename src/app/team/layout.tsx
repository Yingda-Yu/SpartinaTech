import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the Spartina Technology team - a research-driven AI service company incubated by Wenzhou-Kean University.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
