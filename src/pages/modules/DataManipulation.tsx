
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";

const demoData = {
  title: "Medical Research Accelerator",
  description: "Analyze massive genomic datasets using distributed computing for medical research breakthroughs.",
  metrics: [
    {
      name: "Processing Speed",
      value: 85,
      change: 30
    },
    {
      name: "Active Studies",
      value: 24
    },
    {
      name: "Research Teams",
      value: 12
    }
  ],
  chartData: [
    { name: "Baseline", value: 100 },
    { name: "Distributed", value: 15 },
    { name: "MapReduce", value: 8 },
    { name: "Optimized", value: 4 }
  ],
  insights: [
    "Reduced computation time from 100 hours to 4 hours using distributed processing",
    "Processed over 500,000 genetic sequences across multiple computational nodes",
    "Identified 15 potential genetic markers linked to targeted conditions",
    "Enabled parallel processing across 1000+ nodes for maximum efficiency"
  ]
};

export default function DataManipulation() {
  return (
    <ModuleLayout
      title="Paradigms for Data Manipulation"
      subtitle="Module 3"
      description="Learn advanced data manipulation techniques through real-world genomic research applications."
    >
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-10 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-gradient">MapReduce Processing Paradigm</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This module explores distributed computing techniques, focusing on the MapReduce paradigm for
            processing massive datasets across multiple computing nodes. Students implement parallel algorithms
            to analyze genomic data at scale.
          </p>
          
          <div className="relative py-8 px-4">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-3 mb-2">
                  <span className="text-xs font-mono">Map Phase</span>
                </div>
                <span className="text-xs text-muted-foreground">Data Splitting</span>
              </div>
              
              <div className="text-center">
                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-3 mb-2">
                  <span className="text-xs font-mono">Process</span>
                </div>
                <span className="text-xs text-muted-foreground">Parallel Execution</span>
              </div>
              
              <div className="text-center">
                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-3 mb-2">
                  <span className="text-xs font-mono">Reduce Phase</span>
                </div>
                <span className="text-xs text-muted-foreground">Result Aggregation</span>
              </div>
              
              <div className="text-center">
                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-3 mb-2">
                  <span className="text-xs font-mono">Output</span>
                </div>
                <span className="text-xs text-muted-foreground">Final Results</span>
              </div>
            </div>
          </div>
        </div>
        
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
