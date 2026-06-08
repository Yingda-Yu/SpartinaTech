import { aiSystemCategoryLabels, type AISystem } from "@/lib/data";
import { cn } from "@/lib/utils";

type SystemCardProps = {
  system: AISystem;
  className?: string;
};

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <span className="text-xs font-medium uppercase tracking-wider text-[#666666]">
        {title}
      </span>
      <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-[#0a0a0a]/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-[#2f4738]" aria-hidden>
              -
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SystemCard({ system, className }: SystemCardProps) {
  const categoryLabel = aiSystemCategoryLabels[system.category];

  return (
    <article
      className={cn(
        "flex flex-col rounded-lg border border-[#0a0a0a]/[0.06] bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-8",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-[#2f4738]">
        {categoryLabel}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#0a0a0a] sm:text-[1.35rem]">
        {system.systemName}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[#666666]">
        {system.oneLineFunction}
      </p>

      <div className="mt-7 grid gap-6 md:grid-cols-3">
        <DetailList title="Input signals" items={system.inputSignals} />
        <DetailList title="Output" items={system.outputs} />
        <DetailList title="Impact" items={system.impact} />
      </div>

      <p className="mt-6 text-xs text-[#666666]/80">{system.year}</p>
    </article>
  );
}
