"use client";

import { useState, useEffect, useRef } from "react";
import { assetPath, getFallbackPath } from "@/lib/asset-path";

interface TeamMemberImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
}

export function TeamMemberImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspectRatio = "aspect-[4/5]",
}: TeamMemberImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const webpSrc = assetPath(src);
  const pngSrc = assetPath(getFallbackPath(src));

  useEffect(() => {
    setLoaded(false);
    setFailed(false);

    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    setFailed(false);
  };

  const handleError = () => {
    setFailed(true);
    setLoaded(false);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${wrapperClassName}`}>
      {!loaded && !failed && (
        <div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{
            background: "#f6f8f5",
          }}
          aria-hidden
        >
          <div
            className="h-12 w-12 animate-pulse rounded-full bg-[#e8ebe6]"
          />
        </div>
      )}

      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={pngSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`relative z-10 h-full w-full object-contain transition-opacity duration-300 ease-out ${
            loaded && !failed ? "opacity-100" : "opacity-0"
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>

      {failed && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#f6f8f5]"
          aria-hidden
        >
          <svg
            className="h-10 w-10 text-[#2f4738]/20"
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
