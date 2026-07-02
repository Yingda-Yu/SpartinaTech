"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { videoAssets } from "@/lib/data";

export function VideoShowcase() {
  const { t, tArr } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"poster" | "playing" | "loading" | "error">("poster");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState("poster");
    fetch(videoAssets.demoReel, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const ok = res.ok && (res.headers.get("content-type")?.startsWith("video/") || res.headers.get("content-length"));
        if (!ok) setState("error");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    setState("loading");
    v.play()
      .then(() => {
        setState("playing");
        setIsPlaying(true);
      })
      .catch(() => setState("error"));
  };

  const handleTogglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v && v.duration) setDuration(v.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  const formatTime = (s: number) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const showVideo = state === "playing" || state === "loading";
  const tags = tArr("demoReel.tags", ["Industrial", "Visual", "Education", "Workflow"]);

  return (
    <section
      id="demo-reel"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-28 sm:px-8 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(47,71,56,0.4), transparent 60%), radial-gradient(ellipse 50% 40% at 75% 70%, rgba(211,121,66,0.25), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
            {t("demoReel.sectionEyebrow", "Demo Reel")}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            {t("demoReel.sectionTitle", "See it in motion.")}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-[1.6] text-[#999999]">
            {t("demoReel.sectionSubtitle")}
          </p>
        </div>

        <div className="mt-14">
          <div className="group relative aspect-video overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            {state !== "playing" && state !== "loading" && (
              <button
                onClick={state === "error" ? undefined : handlePlay}
                className="absolute inset-0 z-10 h-full w-full"
                aria-label={t("demoReel.player.play", "Play")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={videoAssets.demoReelPoster}
                  alt={t("demoReel.reelTitle", "Demo reel cover")}
                  className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[#0a0a0a]">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                  <div>
                    <p className="text-base font-semibold text-white">
                      {t("demoReel.reelTitle", "Spartina Technology · Demo Reel")}
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      {t("demoReel.reelSubtitle", "Industrial · Visual · Education · Workflow")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#a5d4bc]" />
                    <span className="text-xs text-white/80">
                      {state === "error" ? t("demoReel.coverPreview", "Cover preview") : t("demoReel.playing", "Demo Reel")}
                    </span>
                  </div>
                </div>
              </button>
            )}

            {showVideo && (
              <video
                ref={videoRef}
                src={videoAssets.demoReel}
                className="absolute inset-0 h-full w-full object-cover"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  setState("poster");
                }}
                playsInline
                loop
              />
            )}

            {state === "playing" && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div
                  className="group/seek mb-3 cursor-pointer"
                  onClick={handleSeek}
                >
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#a5d4bc] transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                      aria-label={isPlaying ? t("demoReel.player.pause", "Pause") : t("demoReel.player.play", "Play")}
                    >
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <span className="text-xs font-medium text-white/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/60 backdrop-blur-md">
                      {t("demoReel.player.hd", "HD")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {state === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#666666]">
              {state === "error"
                ? t("demoReel.videoComingSoon", "Video coming soon — cover preview shown.")
                : t("demoReel.clickToPlay", "Click the cover to play the demo reel.")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
