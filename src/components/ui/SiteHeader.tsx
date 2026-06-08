import Link from "next/link";
import { site } from "@/lib/data";

const nav = [
  { href: "#products", label: "Products" },
  { href: "#workflow", label: "Workflow" },
  { href: "#work", label: "Work" },
  { href: "#technology", label: "Technology" },
  { href: "#studio", label: "Studio" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#0a0a0a]/[0.06] bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="#top"
          className="text-sm font-semibold tracking-tight text-[#0a0a0a]"
        >
          {site.name}
        </Link>
        <nav className="hidden gap-8 text-sm text-[#666666] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[#0a0a0a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#contact"
          className="hidden rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2f4738] sm:inline-flex"
        >
          Start
        </Link>
      </div>
    </header>
  );
}
