
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";

const demoData = {
  title: "Agricultural Yield Optimizer",
  description: "Helping small-scale farmers maximize crop yields using environmental sensors and satellite imagery.",
  metrics: [
    {
      name: "Yield Increase",
      value: 23,
      change: 13
    },
    {
      name: "Sensors Active",
      value: 438
    },
    {
      name: "Acres Covered",
      value: 1250
    }
  ],
  chartData: [
    { name: "Jan", value: 35 },
    { name: "Feb", value: 42 },
    { name: "Mar", value: 58 },
    { name: "Apr", value: 75 },
    { name: "May", value: 88 },
    { name: "Jun", value: 95 }
  ],
  insights: [
    "Increased crop yields by 23% through data-driven planting decisions",
    "Reduced water usage by 17% with precision irrigation",
    "Early detection of potential crop diseases",
    "Optimized fertilizer application based on soil chemistry"
  ]
};

export default function LargeScaleData() {
  return (
    <ModuleLayout
      title="Managing Large Scale Data"
      subtitle="Module 2"
      description="Learn to integrate and process multi-source data through agricultural applications."
    >
      <div className="max-w-5xl mx-auto py-8">
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
