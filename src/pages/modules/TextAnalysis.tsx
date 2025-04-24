
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";

const demoData = {
  title: "Customer Experience Intelligence",
  description: "Process and analyze customer feedback across multiple channels to drive business improvements.",
  metrics: [
    {
      name: "Sentiment Score",
      value: 78,
      change: 12
    },
    {
      name: "Reviews Analyzed",
      value: 5420
    },
    {
      name: "Key Issues Found",
      value: 8
    }
  ],
  chartData: [
    { name: "Jan", amount: 0.65 },
    { name: "Feb", amount: 0.72 },
    { name: "Mar", amount: 0.68 },
    { name: "Apr", amount: 0.78 }
  ],
  insights: [
    "Overall sentiment improved by 12% after product updates",
    "Identified UI/UX as top customer concern",
    "Response time reduced to under 2 hours",
    "Customer satisfaction increased in all segments"
  ]
};

export default function TextAnalysis() {
  return (
    <ModuleLayout
      title="Text Analysis"
      subtitle="Module 4"
      description="Master text analysis techniques through real customer feedback analysis."
    >
      <div className="max-w-5xl mx-auto py-8">
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
