import { Section } from "@/components/ui/Section";
import { SystemCard } from "@/components/ui/SystemCard";
import {
  aiSystemCategoryLabels,
  aiSystems,
  type AISystemCategory,
} from "@/lib/data";

const categoryOrder: AISystemCategory[] = [
  "creative-generation",
  "visual-commerce",
  "research-systems",
];

export function AISystems() {
  const grouped = categoryOrder.map((cat) => ({
    cat,
    label: aiSystemCategoryLabels[cat],
    items: aiSystems.filter((s) => s.category === cat),
  }));

  return (
    <Section
      id="technology"
      className="scroll-mt-20 border-t border-[#0a0a0a]/[0.06] bg-[#fafafa]/40"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666666]">
        Technology backbone
      </p>
      <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight text-[#0a0a0a]">
        The creative surface is powered by repeatable multimodal systems.
      </h2>
      <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#666666]">
        These cards explain the technical layer behind the studio: generation,
        curation, packaging, and research-grade visual intelligence.
      </p>

      <div className="mt-14 space-y-16">
        {grouped.map(
          (group) =>
            group.items.length > 0 && (
              <div key={group.cat}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0a0a0a]">
                  {group.label}
                </h3>
                <div className="mt-8 grid grid-cols-1 gap-6 lg:max-w-4xl">
                  {group.items.map((system) => (
                    <SystemCard key={system.slug} system={system} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </Section>
  );
}
