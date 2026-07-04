import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visual Assets",
  description: "Brand-grade AI visual assets including product photography, marketing posters, packaging concepts, social media assets, and IP imagery.",
};

export default function VisualAssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
