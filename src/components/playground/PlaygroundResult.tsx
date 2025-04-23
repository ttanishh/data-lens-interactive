
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InsightCard } from "@/components/ui/insight-card";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Demo: Fake analysis logic just for illustration
function analyzeSentiment(rows: any[]) {
  const texts = rows.map((r) => r.text || "").filter(Boolean);
  const score = (Math.random() * 2 - 1).toFixed(2); // Random sentiment -1..1
  const dominant = score > 0.5 ? "Joy and trust" : score < -0.5 ? "Anger and fear" : "Mixed";
  return {
    viz: (
      <div className="w-full h-40 bg-gradient-to-br from-green-100 to-green-300 flex justify-center items-center rounded-lg font-mono text-5xl text-green-700 shadow-inner animate-fade-in">
        {Number(score) > 0 ? "😊" : Number(score) < 0 ? "😠" : "😶"}
      </div>
    ),
    insight: `The sentiment score is ${score}, indicating a ${Number(score) > 0.65 ? "strongly positive" : Number(score) < -0.65 ? "strongly negative" : "neutral/mixed"} tone. ${dominant} are the dominant emotions.`,
  };
}
function analyzeMapReduce(rows: any[]) {
  const count = rows.length;
  return {
    viz: (
      <div className="flex flex-col gap-2 items-center">
        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-700">{count}</div>
        <div className="text-xs text-muted-foreground">Records Processed (Stream Est.)</div>
      </div>
    ),
    insight: `Processed ${count} entries using MapReduce streaming. Approximate data processed: ${(count * 2.5).toLocaleString()} KB. Trends and aggregates identified.`,
  };
}
function analyzeClustering(rows: any[]) {
  const clusters = Math.max(2, Math.round(Math.random() * 3 + 1));
  return {
    viz: (
      <div className="flex gap-2 mt-4">
        {[...Array(clusters)].map((_, c) => (
          <div key={c} className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `hsl(${80 + c * 100},87%,85%)` }}>
            <span className="text-xl font-bold">{String.fromCharCode(65 + c)}</span>
          </div>
        ))}
      </div>
    ),
    insight: `Identified ${clusters} clusters in your data. Check color groups above. Try adjusting columns or adding more data for deeper patterns.`,
  };
}

const modules: Record<string, { label: string; analyze: (rows: any[]) => { viz: JSX.Element; insight: string } }> = {
  sentiment: {
    label: "Sentiment Analysis",
    analyze: analyzeSentiment,
  },
  stream: {
    label: "MapReduce Streaming",
    analyze: analyzeMapReduce,
  },
  clustering: {
    label: "Clustering",
    analyze: analyzeClustering,
  },
};

interface PlaygroundResultProps {
  moduleKey: string;
  rows: any[];
  onRestart: () => void;
}
export function PlaygroundResult({ moduleKey, rows, onRestart }: PlaygroundResultProps) {
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReportReady(true), 1400);
  }, [moduleKey, rows]);

  const module = modules[moduleKey];
  const { viz, insight } = module?.analyze(rows) || { viz: null, insight: "" };

  const nextSteps = {
    sentiment: [
      "Try visualizing emotion trends over time.",
      "Export sentiment scores for presentations.",
      "Experiment with other modules (e.g., clustering).",
    ],
    stream: [
      "Run aggregation or windowed statistics.",
      "Check for outliers in your data stream.",
      "Try clustering on a sample of the data.",
    ],
    clustering: [
      "Visualize clusters with a scatterplot.",
      "Label clusters for interpretability.",
      "Look for feature correlations.",
    ],
  };

  return (
    <div className={cn("rounded-xl border bg-white/80 dark:bg-background shadow-lg p-6 w-full flex flex-col items-center gap-7 animate-scale-in")}>
      <div className="text-lg font-bold text-primary">{module?.label} Output</div>
      <div className="my-2 w-full">{viz}</div>
      <InsightCard>
        {insight}
      </InsightCard>
      {reportReady && (
        <div className="w-full mt-6 bg-gradient-to-br from-primary/10 to-slate-50 p-4 rounded-xl shadow animate-fade-in">
          <div className="font-bold text-base mb-1 flex items-center gap-2">
            <Check className="text-green-500" /> Report Card
          </div>
          <ol className="ml-7 list-decimal space-y-1 text-[15px] text-muted-foreground">
            {nextSteps[moduleKey].map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ol>
        </div>
      )}
      <Button onClick={onRestart} variant="outline" className="mt-5 flex items-center gap-2">
        <X className="h-4 w-4" />
        Start Over
      </Button>
    </div>
  );
}
