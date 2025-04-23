
import { Info } from "lucide-react";

interface InsightCardProps {
  title?: string;
  children: React.ReactNode;
}

export function InsightCard({ title = "Insight", children }: InsightCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-semibold text-blue-700 dark:text-blue-300">{title}</h3>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
