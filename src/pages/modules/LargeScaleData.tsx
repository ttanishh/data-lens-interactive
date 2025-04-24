
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { RealWorldDemo } from "@/components/modules/RealWorldDemo";
import { Database, Layers } from "lucide-react";

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
    "Reduced water usage by 17% with precision irrigation based on soil moisture data",
    "Early detection of potential crop diseases using pattern recognition",
    "Optimized fertilizer application based on soil chemistry analysis"
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
        <div className="mb-10 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-gradient">Multi-Source Data Integration</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This module focuses on techniques for handling large-scale data from multiple sources, including
            sensor networks, satellite imagery, and historical records. Students learn data normalization,
            integration, and handling missing or inconsistent values.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 p-4 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-green-400" />
                <h3 className="text-sm font-medium">Sensor Data</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                Temperature, humidity, soil moisture from 400+ sensors
              </div>
            </div>
            
            <div className="flex-1 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium">Satellite Imagery</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                Multi-spectral imagery for vegetation health analysis
              </div>
            </div>
            
            <div className="flex-1 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-purple-400" />
                <h3 className="text-sm font-medium">Historical Records</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                5-year crop yield, weather, and soil chemistry history
              </div>
            </div>
          </div>
        </div>
        
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
