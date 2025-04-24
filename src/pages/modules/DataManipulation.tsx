
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
    "Reduced computation time from 100 hours to 4 hours",
    "Processed over 500,000 genetic sequences",
    "Identified 15 potential genetic markers",
    "Enabled parallel processing across 1000+ nodes"
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
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
