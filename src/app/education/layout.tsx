import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI for Education",
  description: "AI-powered educational content production including leveled reading, essays, illustrations, course visuals, and serialized IP content.",
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
