"use client";

import { useEffect } from "react";
import { heroBackground, solutions } from "@/lib/data";

export default function PreloadImages() {
  useEffect(() => {
    const images = [
      heroBackground,
      solutions[0]?.image,
      solutions[1]?.image,
      solutions[2]?.image,
    ].filter(Boolean) as string[];

    images.forEach((src) => {
      if (document.querySelector(`link[href="${src}"]`)) return;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      if (src.endsWith(".webp")) {
        link.type = "image/webp";
      }
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
