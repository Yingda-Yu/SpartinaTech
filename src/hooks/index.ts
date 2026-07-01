"use client";

import React, { useEffect, useRef, useCallback } from "react";

/**
 * useReveal — IntersectionObserver 滚动揭示
 * 对应参考项目的 .reveal + .visible 系统
 */
export function useReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    container.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/**
 * useHeaderScroll — Header scroll 检测
 * 对应参考项目的 header.classList.toggle("scrolled", ...)
 */
export function useHeaderScroll(threshold = 20) {
  const [scrolled, setScrolled] = React.useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * useParallax — 视差滚动
 * 对应参考项目的 data-parallax + scroll handler
 */
export function useParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    function onScroll() {
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = Number((el as HTMLElement).dataset.parallax || 0);
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - window.innerHeight / 2) * speed;
        (el as HTMLElement).style.setProperty("--py", `${offset}px`);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/**
 * useVideoAutoplay — 视频自动播放容错
 * 对应参考项目的 video canplay + play().catch fallback
 */
export function useVideoAutoplay() {
  useEffect(() => {
    document.querySelectorAll("video").forEach((video) => {
      video.addEventListener(
        "canplay",
        () => {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => video.setAttribute("controls", "controls"));
          }
        },
        { once: true }
      );
    });
  }, []);
}
