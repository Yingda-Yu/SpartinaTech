import Image from "next/image";
import { heroImages, metrics, site } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-1rem)] flex-col justify-center overflow-hidden px-6 pb-12 pt-20 sm:px-8 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[#f7f4ee]"
        aria-hidden
      />
      <div
        className="hero-gradient pointer-events-none absolute inset-0 -z-10 opacity-90"
        aria-hidden
      />
      <div
        className="hero-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div>
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.22em] text-[#5f615f]">
            AI-native digital product studio
          </p>
          <h1 className="max-w-4xl text-[clamp(3.4rem,8vw,6.7rem)] font-semibold leading-[0.95] tracking-tight text-[#111111]">
            {site.shortName}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-[1.55] text-[#2d2d2d] sm:text-2xl">
            {site.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-[#666666] sm:text-base">
            {site.positioning}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
            >
              {site.primaryCta}
            </a>
            <a
              href="#work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#111111]/15 bg-white/60 px-6 text-sm font-semibold text-[#111111] backdrop-blur transition-colors hover:bg-white"
            >
              {site.secondaryCta}
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-[#111111]/10 pt-6">
            {metrics.map((metric) => (
              <div key={metric.value}>
                <dt className="text-xl font-semibold text-[#111111]">
                  {metric.value}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-[#666666]">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute left-2 top-6 h-[440px] w-[198px] overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-2xl shadow-[#5a4b36]/15 sm:left-10">
            <Image
              src={heroImages[0].src}
              alt={heroImages[0].alt}
              fill
              priority
              className="object-cover"
              sizes="220px"
            />
          </div>
          <div className="absolute right-0 top-0 h-[520px] w-[234px] overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-2xl shadow-[#5a4b36]/20 sm:right-8">
            <Image
              src={heroImages[1].src}
              alt={heroImages[1].alt}
              fill
              priority
              className="object-cover"
              sizes="260px"
            />
          </div>
          <div className="absolute bottom-0 left-[22%] h-[360px] w-[162px] overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-2xl shadow-[#5a4b36]/15">
            <Image
              src={heroImages[2].src}
              alt={heroImages[2].alt}
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>
          <div className="absolute bottom-10 right-4 max-w-[260px] rounded-lg border border-[#111111]/10 bg-white/85 p-4 shadow-xl shadow-[#5a4b36]/10 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2f4738]">
              Output pack
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#333333]">
              Prompt direction, curated variants, channel-ready image assets,
              and reusable generation rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
