import { workflowSteps } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function Workflow() {
  return (
    <Section
      id="workflow"
      className="scroll-mt-20 border-t border-[#111111]/[0.06] bg-[#f7f4ee]/70"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666666]">
          Generation workflow
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight text-[#111111]">
          From prompt experiments to packaged digital products.
        </h2>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-4">
        {workflowSteps.map((item) => (
          <article
            key={item.step}
            className="flex min-h-[260px] flex-col rounded-lg border border-[#111111]/[0.08] bg-white/80 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f4738]">
              {item.step}
            </p>
            <h3 className="mt-8 text-lg font-semibold tracking-tight text-[#111111]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#666666]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
