
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
      {backgroundImage ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute w-full h-full">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-0 right-1/3 w-72 h-72 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "4s" }}></div>
          </div>
        </div>
      )}

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {subtitle && (
            <div className="mb-4 inline-flex items-center justify-center">
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/10 px-4 py-1.5">
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  {subtitle}
                </span>
              </div>
            </div>
          )}
          
          <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-shadow">
              {title}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </h1>
          
          {description && (
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
