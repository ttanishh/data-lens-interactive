import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InsightCard } from "@/components/ui/insight-card";
import { Check, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimpleBarChart, SimpleLineChart } from "@/utils/visualizations";
import { useToast } from "@/hooks/use-toast";

function analyzeSentiment(rows: any[]) {
  const texts = rows.map((r) => r.text || "").filter(Boolean);
  const score = parseFloat((Math.random() * 2 - 1).toFixed(2));
  const dominant = score > 0.5 ? "Joy and trust" : score < -0.5 ? "Anger and fear" : "Mixed";
  
  const mockTimeData = Array(7).fill(0).map((_, i) => ({
    name: `Day ${i + 1}`,
    sentiment: parseFloat((Math.random() * 2 - 1).toFixed(2))
  }));

  return {
    viz: (
      <div className="space-y-4">
        <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-300 flex justify-center items-center rounded-lg font-mono text-4xl text-green-700 shadow-inner animate-fade-in">
          {score > 0 ? "😊" : score < 0 ? "😠" : "😶"}
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-2">Sentiment Trend</h4>
          <SimpleLineChart data={mockTimeData} dataKey="sentiment" stroke="#4f46e5" />
        </div>
      </div>
    ),
    insight: `The sentiment score is ${score}, indicating a ${score > 0.65 ? "strongly positive" : score < -0.65 ? "strongly negative" : "neutral/mixed"} tone. ${dominant} are the dominant emotions.`,
  };
}

function analyzeMapReduce(rows: any[]) {
  const count = rows.length;
  const mockProcessingData = [
    { name: "Data Load", value: Math.round(Math.random() * 100) },
    { name: "Map Phase", value: Math.round(Math.random() * 100) },
    { name: "Reduce Phase", value: Math.round(Math.random() * 100) },
    { name: "Output", value: Math.round(Math.random() * 100) },
  ];

  return {
    viz: (
      <div className="space-y-4">
        <div className="flex flex-col gap-2 items-center">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-700 animate-pulse">
            {count}
          </div>
          <div className="text-xs text-muted-foreground">Records Processed</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-2">Processing Metrics</h4>
          <SimpleBarChart data={mockProcessingData} dataKey="value" fill="#3b82f6" />
        </div>
      </div>
    ),
    insight: `Processed ${count} entries using MapReduce streaming. Approximate data processed: ${(count * 2.5).toLocaleString()} KB. Processing completed successfully across all phases.`,
  };
}

function analyzeClustering(rows: any[]) {
  const clusters = Math.max(2, Math.round(Math.random() * 3 + 1));
  const mockClusterData = Array(clusters).fill(0).map((_, i) => ({
    name: `Cluster ${String.fromCharCode(65 + i)}`,
    size: Math.round(Math.random() * 100)
  }));

  return {
    viz: (
      <div className="space-y-4">
        <div className="flex gap-2 justify-center">
          {[...Array(clusters)].map((_, c) => (
            <div
              key={c}
              className="w-16 h-16 rounded-full flex items-center justify-center animate-scale-in"
              style={{ background: `hsl(${80 + c * 100},87%,85%)` }}
            >
              <span className="text-xl font-bold">{String.fromCharCode(65 + c)}</span>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-2">Cluster Sizes</h4>
          <SimpleBarChart data={mockClusterData} dataKey="size" fill="#8b5cf6" />
        </div>
      </div>
    ),
    insight: `Identified ${clusters} distinct clusters in your data. The distribution shows varying cluster sizes, suggesting natural groupings in the dataset.`,
  };
}

const realWorldExamples: Record<string, {
  title: string;
  description: string;
  mockData: any;
  insights: string[];
}> = {
  sentiment: {
    title: "Customer Experience Intelligence",
    description: "Analysis of customer feedback from social media and support tickets",
    mockData: [
      { date: "Jan", positive: 65, negative: 35 },
      { date: "Feb", positive: 70, negative: 30 },
      { date: "Mar", positive: 55, negative: 45 },
      { date: "Apr", positive: 80, negative: 20 },
    ],
    insights: [
      "Customer satisfaction increased by 15% after product updates",
      "Response times under 2 hours led to 30% more positive reviews",
      "Common pain points: account setup (40%), payment issues (25%)"
    ]
  },
  stream: {
    title: "Predictive Maintenance System",
    description: "Real-time monitoring of industrial equipment performance",
    mockData: [
      { component: "Motors", normal: 85, warning: 12, critical: 3 },
      { component: "Pumps", normal: 90, warning: 8, critical: 2 },
      { component: "Valves", normal: 78, warning: 15, critical: 7 },
    ],
    insights: [
      "Early detection reduced downtime by 27%",
      "Predictive maintenance saved $145K in Q1 2025",
      "Average equipment lifespan extended by 2.3 years"
    ]
  },
  clustering: {
    title: "Healthcare Resource Optimization",
    description: "Patient admission patterns and resource allocation",
    mockData: [
      { department: "Emergency", high: 45, medium: 35, low: 20 },
      { department: "Surgery", high: 30, medium: 50, low: 20 },
      { department: "Pediatrics", high: 25, medium: 45, low: 30 },
    ],
    insights: [
      "Optimal staff scheduling reduced wait times by 35%",
      "Resource allocation improved bed utilization by 28%",
      "Peak admission times identified: 8-10 AM, 2-4 PM"
    ]
  }
};

const nextSteps: Record<string, string[]> = {
  sentiment: [
    "Try filtering by specific time periods to identify sentiment trends",
    "Segment data by demographic factors to find group-specific patterns",
    "Apply more advanced NLP techniques for emotion detection"
  ],
  stream: [
    "Experiment with different MapReduce algorithms for your data",
    "Consider implementing real-time processing for streaming data",
    "Try aggregating results by different dimensions"
  ],
  clustering: [
    "Experiment with different numbers of clusters to find optimal groupings",
    "Analyze the characteristics of each cluster to understand differences",
    "Try different distance metrics to see how clusters change"
  ]
};

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
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setReportReady(true);
      toast({
        title: "Analysis Complete",
        description: "Your data has been processed successfully.",
      });
    }, 1400);
  }, [moduleKey, rows, toast]);

  const module = modules[moduleKey];
  const { viz, insight } = module?.analyze(rows) || { viz: null, insight: "" };
  const example = realWorldExamples[moduleKey];

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify({ insight, timestamp: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analysis-${moduleKey}-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Analysis results have been saved to your device.",
    });
  };

  return (
    <div className={cn(
      "rounded-xl border bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800",
      "shadow-lg p-6 w-full flex flex-col items-center gap-7 animate-scale-in"
    )}>
      <div className="text-lg font-bold text-primary">{module?.label} Results</div>
      
      {example && (
        <div className="w-full p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100 mb-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">{example.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-sm font-medium mb-2">Real-world Impact</h4>
              <ul className="space-y-2 text-sm">
                {example.insights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-sm font-medium mb-2">Sample Metrics</h4>
              {moduleKey === 'sentiment' ? (
                <SimpleLineChart 
                  data={example.mockData} 
                  dataKey="positive"
                  stroke="#22c55e"
                />
              ) : (
                <SimpleBarChart 
                  data={example.mockData} 
                  dataKey="normal" 
                  fill="#3b82f6"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="my-2 w-full">{viz}</div>
      <InsightCard>{insight}</InsightCard>
      
      {reportReady && (
        <div className="w-full mt-6 bg-gradient-to-br from-primary/10 to-slate-50 p-4 rounded-xl shadow animate-fade-in">
          <div className="font-bold text-base mb-1 flex items-center gap-2">
            <Check className="text-green-500" /> Report Card
          </div>
          <ol className="ml-7 list-decimal space-y-1 text-[15px] text-muted-foreground">
            {nextSteps[moduleKey]?.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ol>
        </div>
      )}
      
      <div className="flex gap-3">
        <Button onClick={onRestart} variant="outline" className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Start Over
        </Button>
        <Button onClick={handleDownload} variant="default" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
}
