import { contact } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function Contact() {
  return (
    <Section
      id="contact"
      className="scroll-mt-20 border-t border-[#0a0a0a]/[0.06] pb-28"
    >
      <div className="rounded-lg bg-[#111111] p-8 text-white sm:p-10 lg:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
          Start a project
        </p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-tight">
          Bring a digital product idea, brand brief, or generation workflow.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">
          SpartinaTech can help shape the creative direction, generate assets,
          package a product drop, or design the repeatable AI workflow behind
          it.
        </p>

        <div className="mt-10 flex flex-col gap-4 text-[15px] sm:flex-row sm:items-center">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#111111] transition-opacity hover:opacity-90"
          >
            {contact.email}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
