"use client";

import { useState, useEffect } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
}

/**
 * Safe image renderer. Shows the real image when available and a refined
 * gradient fallback otherwise. Never renders a broken-image icon.
 * Uses object-cover to preserve aspect ratio without distortion.
 */
export function ImageWithFallback({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspectRatio = "aspect-[4/3]",
  priority = false,
}: ImageWithFallbackProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!src) {
      setState("error");
      return;
    }
    setState("loading");
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${wrapperClassName}`}>
      {state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            state === "loaded" ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${className}`}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
      {state !== "loaded" && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100"
          aria-hidden
        />
      )}
    </div>
  );
}

interface DarkImageWithFallbackProps extends ImageWithFallbackProps {
  accentColor?: string;
}

/**
 * Dark-theme variant for the industrial page. Fallback uses the brand's
 * deep-black-green palette with a subtle accent glow.
 */
export function DarkImageWithFallback({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspectRatio = "aspect-[4/3]",
  accentColor = "#a5d4bc",
  priority = false,
}: DarkImageWithFallbackProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!src) {
      setState("error");
      return;
    }
    setState("loading");
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${wrapperClassName}`}>
      {state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            state === "loaded" ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${className}`}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
      {state !== "loaded" && (
        <div
          className="absolute inset-0 bg-[#0f1a18]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, ${accentColor}18 0%, transparent 65%)`,
          }}
          aria-hidden
        />
      )}
    </div>
  );
}
