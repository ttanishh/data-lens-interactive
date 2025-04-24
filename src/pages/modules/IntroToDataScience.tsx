
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";

const demoData = {
  title: "Urban Mobility Analyzer",
  description: "Tracking and analyzing public transportation patterns to optimize city transit systems.",
  metrics: [
    {
      name: "Commute Reduction",
      value: 15,
      change: 7
    },
    {
      name: "Routes Analyzed",
      value: 347
    },
    {
      name: "Congestion Points",
      value: 28
    }
  ],
  chartData: [
    { name: "6 AM", value: 35 },
    { name: "9 AM", value: 87 },
    { name: "12 PM", value: 42 },
    { name: "3 PM", value: 45 },
    { name: "6 PM", value: 89 },
    { name: "9 PM", value: 32 }
  ],
  insights: [
    "Identified 28 critical congestion points across the city",
    "Reduced average commute time by 15%",
    "Optimized bus schedules based on real-time passenger data",
    "Saved an estimated 42,000 commuter hours monthly"
  ]
};

export default function IntroToDataScience() {
  return (
    <ModuleLayout
      title="Introduction to Data Science"
      subtitle="Module 1"
      description="Master the complete data science workflow through urban mobility analysis."
    >
      <div className="max-w-5xl mx-auto py-8">
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
