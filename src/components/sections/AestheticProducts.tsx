import { Section } from "@/components/ui/Section";
import { wallpaperCollections } from "@/lib/data";
import { WallpaperGallery } from "@/components/sections/WallpaperGallery";

const nextCollectionSlots = [
  "Nail design drops",
  "Short-form video assets",
  "Brand campaign visuals",
];

export function AestheticProducts() {
  return (
    <Section
      id="work"
      className="scroll-mt-20 border-t border-[#0a0a0a]/[0.06]"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666666]">
        Selected work
      </p>
      <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight text-[#0a0a0a]">
        Mobile-first visual drops, generated and curated as product sets.
      </h2>
      <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#666666]">
        This section is the public proof layer: visitors can inspect the image
        language, open the gallery, and understand that SpartinaTech ships coherent
        collections rather than isolated samples.
      </p>

      <div className="mt-16">
        <p className="text-xs font-medium uppercase tracking-wider text-[#666666]">
          Wallpaper collection
        </p>
        <div className="mt-10 space-y-16">
          {wallpaperCollections.map((collection) => (
            <div key={collection.id}>
              <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-lg font-semibold text-[#0a0a0a] sm:text-xl">
                  {collection.themeName}
                </h3>
                <p className="text-[13px] text-[#666666] sm:shrink-0">
                  {collection.description}
                </p>
              </div>
              <WallpaperGallery collection={collection} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-[#0a0a0a]/[0.06] pt-16">
        <p className="text-xs font-medium uppercase tracking-wider text-[#666666]">
          Next collection slots
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {nextCollectionSlots.map((slot) => (
            <div
              key={slot}
              className="rounded-lg border border-dashed border-[#0a0a0a]/15 p-5"
            >
              <h3 className="text-base font-semibold text-[#0a0a0a]">
                {slot}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                Ready for the next batch of generated assets and product
                packaging.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
