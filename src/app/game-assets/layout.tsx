import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game & Interactive Assets - Spartina Technology",
  description:
    "AI game asset pipelines for mini-games and interactive content — base image generation, controllable local edits, A/B image pairs, and difference-point annotation for level-ready game data.",
};

export default function GameAssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
