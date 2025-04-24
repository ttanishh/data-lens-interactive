
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
    "Reduced patient wait times by 32% through optimized resource allocation",
    "Identified 7 distinct patient clusters with unique care requirements",
    "Improved staff utilization by 27% through predictive scheduling",
    "Predicted seasonal admission increases with 94% accuracy for better planning"
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
        <div className="mb-10 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-gradient">Clustering & Predictive Modeling</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This module demonstrates advanced analytical techniques including unsupervised clustering and
            predictive modeling. Students explore methods to identify patterns in complex healthcare data 
            and predict future resource requirements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 border border-purple-500/20">
              <h3 className="text-sm font-medium mb-3 text-purple-400">Patient Clustering</h3>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                  <span className="text-xs font-medium">Group A</span>
                </div>
                <div className="h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-500/5">
                  <span className="text-xs font-medium">Group B</span>
                </div>
                <div className="h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-500/20 to-green-500/5">
                  <span className="text-xs font-medium">Group C</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Unsupervised learning to identify groups of patients with similar care needs based on multiple factors
              </div>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-green-500/10 p-4 border border-blue-500/20">
              <h3 className="text-sm font-medium mb-3 text-blue-400">Resource Prediction</h3>
              
              <div className="h-16 relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-blue-500/30"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-around">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-blue-400"></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-3/4 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Predictive modeling forecasts future resource needs based on historical patterns and seasonal trends
              </div>
            </div>
          </div>
        </div>
        
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
