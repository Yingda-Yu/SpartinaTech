import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom AI Workflows",
  description: "Custom AI production workflows for repeatable delivery including image generation, dataset enhancement, education content, visual asset packaging, and internal demos.",
};

export default function WorkflowsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
