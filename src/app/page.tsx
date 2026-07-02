import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { SolutionMatrix } from "@/components/sections/SolutionMatrix";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { VisualProofSection } from "@/components/sections/VisualProofSection";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <SolutionMatrix />
        <VideoShowcase />
        <VisualProofSection />
        <ProjectShowcase />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}