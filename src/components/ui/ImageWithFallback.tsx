"use client";

import { useState, useEffect } from "react";
import { assetPath, getFallbackPath } from "@/lib/asset-path";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspectRatio = "aspect-[4/3]",
  priority = false,
  loading,
  fetchPriority,
  sizes,
}: ImageWithFallbackProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const [currentSrc, setCurrentSrc] = useState(assetPath(src));

  useEffect(() => {
    setState("loading");
    setCurrentSrc(assetPath(src));
  }, [src]);

  const handleError = () => {
    if (currentSrc.endsWith(".webp")) {
      const fallback = assetPath(getFallbackPath(src));
      setCurrentSrc(fallback);
      setState("loading");
    } else {
      setState("error");
    }
  };

  const actualLoading = loading ?? (priority ? "eager" : "lazy");
  const actualFetchPriority = fetchPriority ?? (priority ? "high" : "auto");

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${wrapperClassName}`}>
      {state === "loading" && (
        <div
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#f5f5f2] via-[#f0f0ed] to-[#f5f5f2]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #f5f5f2 0%, #ecece7 50%, #f5f5f2 100%)",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(47,71,56,0.08) 0%, transparent 50%)",
            }}
          />
        </div>
      )}

      {state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt={alt}
          loading={actualLoading}
          fetchPriority={actualFetchPriority}
          sizes={sizes}
          className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ease-out ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${className}`}
          onLoad={() => setState("loaded")}
          onError={handleError}
        />
      )}

      {state === "error" && (
        <div
          className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-[#f5f5f2] to-[#e8e8e3]"
          aria-hidden
        >
          <div className="text-center">
            <svg
              className="mx-auto h-10 w-10 text-[#2f4738]/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

interface DarkImageWithFallbackProps extends ImageWithFallbackProps {
  accentColor?: string;
}

export function DarkImageWithFallback({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspectRatio = "aspect-[4/3]",
  accentColor = "#a5d4bc",
  priority = false,
  loading,
  fetchPriority,
  sizes,
}: DarkImageWithFallbackProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const [currentSrc, setCurrentSrc] = useState(assetPath(src));

  useEffect(() => {
    setState("loading");
    setCurrentSrc(assetPath(src));
  }, [src]);

  const handleError = () => {
    if (currentSrc.endsWith(".webp")) {
      const fallback = assetPath(getFallbackPath(src));
      setCurrentSrc(fallback);
      setState("loading");
    } else {
      setState("error");
    }
  };

  const actualLoading = loading ?? (priority ? "eager" : "lazy");
  const actualFetchPriority = fetchPriority ?? (priority ? "high" : "auto");

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${wrapperClassName}`}>
      {state === "loading" && (
        <div
          className="absolute inset-0 z-0 bg-[#0f1a18]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, ${accentColor}15 0%, transparent 65%), linear-gradient(135deg, #0a100f 0%, #0f1a18 50%, #0a100f 100%)`,
          }}
          aria-hidden
        />
      )}

      {state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt={alt}
          loading={actualLoading}
          fetchPriority={actualFetchPriority}
          sizes={sizes}
          className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ease-out ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${className}`}
          onLoad={() => setState("loaded")}
          onError={handleError}
        />
      )}

      {state === "error" && (
        <div
          className="absolute inset-0 z-0 flex items-center justify-center bg-[#0f1a18]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, ${accentColor}0a 0%, transparent 65%)`,
          }}
          aria-hidden
        >
          <svg
            className="h-10 w-10 opacity-20"
            style={{ color: accentColor }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
    </div>
  );
}
