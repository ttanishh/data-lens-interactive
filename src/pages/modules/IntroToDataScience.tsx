
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
    "Reduced average commute time by 15% through optimized routing",
    "Optimized bus schedules based on real-time passenger data",
    "Saved an estimated 42,000 commuter hours monthly through data-driven improvements"
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
        <div className="mb-10 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-gradient">The Data Science Workflow</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This module demonstrates the complete data science pipeline from data collection to insight generation, 
            using urban mobility as a practical application. Students learn to collect, clean, model, 
            and evaluate data to produce meaningful insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
            {["Collection", "Cleaning", "Exploration", "Modeling", "Evaluation"].map((phase, i) => (
              <div key={i} className="relative">
                <div className="h-20 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                  <span className="font-medium text-sm">{phase}</span>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-blue-400 transform translate-x-1/2 -translate-y-1/2 z-10"></div>
                )}
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-blue-400 to-transparent transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
