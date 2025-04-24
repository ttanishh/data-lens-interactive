
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";

const demoData = {
  title: "Predictive Maintenance System",
  description: "Real-time monitoring and anomaly detection for industrial equipment.",
  metrics: [
    {
      name: "Equipment Health",
      value: 92,
      change: 8
    },
    {
      name: "Active Sensors",
      value: 248
    },
    {
      name: "Early Warnings",
      value: 15
    }
  ],
  chartData: [
    { name: "Week 1", value: 95 },
    { name: "Week 2", value: 92 },
    { name: "Week 3", value: 88 },
    { name: "Week 4", value: 82 },
    { name: "Week 5", value: 75 }
  ],
  insights: [
    "Predicted 15 potential failures before occurrence",
    "Reduced maintenance costs by 30%",
    "Extended average equipment lifespan by 2.5 years",
    "Real-time monitoring of 250+ sensors"
  ]
};

export default function DataStreams() {
  return (
    <ModuleLayout
      title="Mining Data Streams"
      subtitle="Module 5"
      description="Learn stream processing through industrial IoT applications."
    >
      <div className="max-w-5xl mx-auto py-8">
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
