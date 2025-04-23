
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  className,
  children,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        backgroundImage ? "text-white" : "",
        className
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      )}

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {subtitle && (
            <h2 className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              {subtitle}
            </h2>
          )}
          <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
