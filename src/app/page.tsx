import { SiteHeader } from "@/components/ui/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { ProductModes } from "@/components/sections/ProductModes";
import { Workflow } from "@/components/sections/Workflow";
import { AestheticProducts } from "@/components/sections/AestheticProducts";
import { AISystems } from "@/components/sections/AISystems";
import { StudioIdentity } from "@/components/sections/StudioIdentity";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProductModes />
        <Workflow />
        <AestheticProducts />
        <AISystems />
        <StudioIdentity />
        <Contact />
      </main>
      <footer className="border-t border-[#0a0a0a]/[0.06] py-10 text-center text-xs leading-relaxed text-[#666666]">
        <p>
          Copyright {new Date().getFullYear()} {site.name}. Multimodal digital
          product studio.
        </p>
      </footer>
    </div>
  );
}
