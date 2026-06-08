import { Section } from "@/components/ui/Section";
import { studio } from "@/lib/data";

export function StudioIdentity() {
  return (
    <Section
      id="studio"
      className="scroll-mt-20 border-t border-[#0a0a0a]/[0.06]"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666666]">
        Studio identity
      </p>
      <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight text-[#0a0a0a]">
        A small AI studio positioned between creative production and technical
        systems.
      </h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div>
          <p className="text-[16px] leading-[1.85] text-[#666666]">
            {studio.statement}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#666666]">
            Focus areas
          </p>
          <ul className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#0a0a0a]">
            {studio.focusAreas.map((line) => (
              <li key={line} className="border-l-2 border-[#2f4738]/40 pl-4">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 grid gap-8 border-t border-[#0a0a0a]/[0.06] pt-14 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#666666]">
            Research link
          </p>
          <p className="mt-3 text-base font-medium text-[#0a0a0a]">
            {studio.affiliation}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#666666]">
            Operating roles
          </p>
          <ul className="mt-3 space-y-2 text-[15px] text-[#666666]">
            {studio.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
