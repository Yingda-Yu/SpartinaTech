"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { WallpaperCollection, WallpaperItem } from "@/lib/data";

function itemHasImage(item: WallpaperItem): boolean {
  return Boolean(item.imageSrc?.length);
}

type WallpaperGalleryProps = {
  collection: WallpaperCollection;
};

export function WallpaperGallery({ collection }: WallpaperGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setOpenIndex((i) =>
          i === null ? i : (i + 1) % collection.items.length
        );
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null
            ? i
            : (i - 1 + collection.items.length) % collection.items.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, collection.items.length, openIndex]);

  const openItem =
    openIndex !== null ? collection.items[openIndex] ?? null : null;
  const openSrc = openItem?.imageSrc;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
        {collection.items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[9/20] w-full overflow-hidden rounded-lg border border-[#0a0a0a]/[0.06] bg-[#f4f4f5] text-left outline-none ring-[#2f4738] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2"
            aria-label={`Open fullscreen preview: ${item.alt}`}
          >
            {itemHasImage(item) ? (
              <Image
                src={item.imageSrc!}
                alt={item.alt}
                fill
                className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            ) : (
              <span
                className="absolute inset-0 bg-[#ececee]"
                aria-hidden
              />
            )}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0a]/20 to-transparent p-2 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-[11px] font-medium text-white drop-shadow">
                View
              </span>
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallpaper-lightbox-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close gallery"
            onClick={close}
          />
          <div className="relative z-[101] flex w-full max-w-[calc(100vw-2rem)] flex-col items-center gap-4">
            <div className="flex w-full max-w-[min(calc(85vh*9/20),calc(100vw-2rem))] items-center justify-between gap-4 px-1">
              <p
                id="wallpaper-lightbox-title"
                className="text-sm font-medium text-white"
              >
                {collection.themeName} - {openIndex + 1} /{" "}
                {collection.items.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <div className="relative aspect-[9/20] h-[min(85vh,calc(100dvh-8rem))] w-auto max-w-full overflow-hidden rounded-lg bg-[#1a1a1a] shadow-2xl">
              {openSrc ? (
                <Image
                  src={openSrc}
                  alt={openItem?.alt ?? ""}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-[#2a2a2a]" />
              )}
            </div>
            <div className="flex w-full max-w-[min(calc(85vh*9/20),calc(100vw-2rem))] flex-wrap justify-center gap-3">
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
                onClick={() =>
                  setOpenIndex(
                    (openIndex - 1 + collection.items.length) %
                      collection.items.length
                  )
                }
              >
                Previous
              </button>
              {openSrc ? (
                <a
                  href={openSrc}
                  download
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
                >
                  Download
                </a>
              ) : (
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#0a0a0a] opacity-50"
                  disabled
                >
                  Download
                </button>
              )}
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
                onClick={() =>
                  setOpenIndex((openIndex + 1) % collection.items.length)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
