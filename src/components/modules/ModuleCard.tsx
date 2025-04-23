
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradientClass: string;
  className?: string;
  index: number;
}

export function ModuleCard({
  title,
  description,
  icon,
  href,
  gradientClass,
  className,
  index,
}: ModuleCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group module-card animate-fade-in",
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={cn("module-card-gradient", gradientClass)} />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {description}
        </p>
        <div className="flex items-center text-sm font-medium text-primary">
          <span>Explore Module</span>
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
