import { productModes } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ProductModes() {
  return (
    <Section
      id="products"
      className="scroll-mt-20 border-t border-[#111111]/[0.06]"
    >
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666666]">
            Product modes
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-tight text-[#111111]">
            Digital goods that can move from concept to launch.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-[#666666]">
            The site should make SpartinaTech feel like a production partner, not
            only a gallery. These are the service lines a visitor can understand
            immediately.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {productModes.map((mode) => (
            <article
              key={mode.title}
              className="rounded-lg border border-[#111111]/[0.08] bg-white p-6 shadow-sm shadow-[#111111]/[0.03]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-[#111111]">
                {mode.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                {mode.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {mode.signals.map((signal) => (
                  <li
                    key={signal}
                    className="rounded-full border border-[#2f4738]/15 bg-[#edf3ef] px-3 py-1 text-xs font-medium text-[#2f4738]"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
