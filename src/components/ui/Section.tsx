import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
};

export function Section({
  id,
  children,
  className,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </Component>
  );
}
