
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
    "Predicted 15 potential equipment failures before occurrence through anomaly detection",
    "Reduced maintenance costs by 30% by switching from scheduled to predictive maintenance",
    "Extended average equipment lifespan by 2.5 years through early intervention",
    "Real-time monitoring of 250+ sensors with millisecond alert response time"
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
        <div className="mb-10 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-gradient">Stream Processing Architecture</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This module explores real-time data processing techniques for analyzing continuous streams of 
            sensor data. Students implement anomaly detection algorithms and stream processing techniques.
          </p>
          
          <div className="relative">
            <div className="h-24 rounded-lg bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 p-3 flex items-center">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                <div className="relative h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50">
                  <div className="absolute left-[20%] top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-blue-400 animate-pulse"></div>
                  <div className="absolute left-[40%] top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute left-[70%] top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 w-full relative z-10">
                <div className="text-center">
                  <div className="text-xs font-medium text-blue-400 mb-1">Data Ingestion</div>
                  <div className="text-[10px] text-muted-foreground">250+ Sensors</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-blue-400 mb-1">Processing</div>
                  <div className="text-[10px] text-muted-foreground">Stream Analytics</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-blue-400 mb-1">Pattern Detection</div>
                  <div className="text-[10px] text-muted-foreground">Anomaly Identification</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-blue-400 mb-1">Alert System</div>
                  <div className="text-[10px] text-muted-foreground">Real-time Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
