import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Six AI service areas including industrial data enhancement, AI education, visual assets, custom workflows, game/film assets, and consumer digital products.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
