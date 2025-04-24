
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";

const demoData = {
  title: "Healthcare Resource Allocator",
  description: "Decision support system for hospitals that optimizes staffing and resource allocation.",
  metrics: [
    {
      name: "Wait Time Reduction",
      value: 32,
      change: 15
    },
    {
      name: "Staff Efficiency",
      value: 27,
      change: 11
    },
    {
      name: "Patient Clusters",
      value: 7
    }
  ],
  chartData: [
    { name: "Emergency", value: 85 },
    { name: "Surgery", value: 72 },
    { name: "Pediatrics", value: 63 },
    { name: "Obstetrics", value: 57 },
    { name: "Cardiology", value: 89 }
  ],
  insights: [
    "Reduced patient wait times by 32%",
    "Identified 7 distinct patient clusters with unique care needs",
    "Improved staff utilization by 27%",
    "Predicted seasonal admission increases with 94% accuracy"
  ]
};

export default function AdvancedAnalysis() {
  return (
    <ModuleLayout
      title="Advanced Data Analysis"
      subtitle="Module 6"
      description="Explore clustering and predictive modeling through healthcare resource allocation."
    >
      <div className="max-w-5xl mx-auto py-8">
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
