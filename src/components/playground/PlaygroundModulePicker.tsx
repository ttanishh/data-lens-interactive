
import { Button } from "@/components/ui/button";
import { ChartBar, FileChartPie, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaygroundModulePickerProps {
  onSelect: (key: string) => void;
}

const modules = [
  {
    key: "sentiment",
    label: "Sentiment Analysis",
    icon: Search,
    color: "bg-green-100 text-green-700",
    description: "Analyze sentiment of your text data.",
  },
  {
    key: "stream",
    label: "Stream Estimate (MapReduce)",
    icon: ChartBar,
    color: "bg-blue-100 text-blue-700",
    description: "Estimate trends with streaming algorithms.",
  },
  {
    key: "clustering",
    label: "Clustering",
    icon: FileChartPie,
    color: "bg-purple-100 text-purple-700",
    description: "Cluster your data points visually.",
  },
];

export function PlaygroundModulePicker({ onSelect }: PlaygroundModulePickerProps) {
  return (
    <div className={cn("flex flex-col gap-7 items-center py-8 w-full animate-fade-in")}>
      <div className="text-lg font-semibold">Choose analysis module:</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {modules.map((mod) => (
          <Button
            key={mod.key}
            variant="outline"
            className={cn("flex flex-col items-center p-6 gap-3 rounded-lg border-2 border-primary/5 transition hover:border-primary hover:scale-105", mod.color)}
            onClick={() => onSelect(mod.key)}
          >
            <mod.icon className="h-8 w-8 mb-2" />
            <span className="font-bold">{mod.label}</span>
            <span className="text-xs text-muted-foreground text-center">{mod.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
