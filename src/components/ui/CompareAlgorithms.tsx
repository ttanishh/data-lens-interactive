
import { ReactNode, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Renders a dual-panel side-by-side comparison of two algorithms on the same data.
 * Accepts custom element props for each algorithm visualization.
 */
interface CompareAlgorithmsProps {
  leftLabel: string;
  rightLabel: string;
  leftVisualization: ReactNode;
  rightVisualization: ReactNode;
  description?: string;
}

export function CompareAlgorithms({
  leftLabel,
  rightLabel,
  leftVisualization,
  rightVisualization,
  description
}: CompareAlgorithmsProps) {
  const [split, setSplit] = useState<0.5 | 0.6 | 0.4>(0.5);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center mb-3 gap-2">
        <ArrowLeftRight className="h-5 w-5 text-primary" />
        <span className="font-semibold text-lg">Compare Algorithms Side-by-Side</span>
        {description && (
          <span className="ml-2 text-muted-foreground text-sm">{description}</span>
        )}
      </div>
      <div className="flex gap-4 relative">
        <div className={cn("bg-card p-4 rounded-lg w-full transition-all", split === 0.6 && "basis-3/5", split === 0.4 && "basis-2/5")}>
          <div className="font-bold text-primary mb-2">{leftLabel}</div>
          <div>{leftVisualization}</div>
        </div>
        <div className={cn("bg-card p-4 rounded-lg w-full transition-all", split === 0.6 && "basis-2/5", split === 0.4 && "basis-3/5")}>
          <div className="font-bold text-primary mb-2">{rightLabel}</div>
          <div>{rightVisualization}</div>
        </div>
      </div>
      {/* Simple split controls */}
      <div className="flex gap-2 justify-center mt-2">
        <Button size="sm" variant={split === 0.5 ? "default" : "outline"} onClick={() => setSplit(0.5)}>
          Equal Split
        </Button>
        <Button size="sm" variant={split === 0.6 ? "default" : "outline"} onClick={() => setSplit(0.6)}>
          Focus Left
        </Button>
        <Button size="sm" variant={split === 0.4 ? "default" : "outline"} onClick={() => setSplit(0.4)}>
          Focus Right
        </Button>
      </div>
    </div>
  );
}
