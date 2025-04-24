
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
    "Overall sentiment improved by 12% after implementing product updates based on feedback",
    "Identified UI/UX as the top customer concern through topic modeling",
    "Response time reduced to under 2 hours by prioritizing critical issues",
    "Customer satisfaction increased across all segments through targeted improvements"
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
        <div className="mb-10 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-gradient">Natural Language Processing Pipeline</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This module demonstrates advanced text analysis techniques for extracting meaningful insights from
            unstructured customer feedback. Students learn sentiment analysis, topic modeling, and entity extraction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4">
              <h3 className="text-sm font-medium mb-2">Sentiment Analysis</h3>
              <div className="flex gap-2 mb-1">
                <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">Positive</span>
                <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-medium">Neutral</span>
                <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-medium">Negative</span>
              </div>
              <p className="text-xs text-muted-foreground">Classifying emotional tone of feedback</p>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4">
              <h3 className="text-sm font-medium mb-2">Topic Modeling</h3>
              <div className="flex flex-wrap gap-1 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">UI/UX</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">Performance</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">Features</span>
              </div>
              <p className="text-xs text-muted-foreground">Discovering common themes in feedback</p>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-pink-500/10 to-orange-500/10 p-4">
              <h3 className="text-sm font-medium mb-2">Entity Extraction</h3>
              <div className="text-xs font-mono p-1 bg-black/20 rounded mb-1">
                I love the <span className="bg-blue-500/30 px-1">checkout process</span> but the <span className="bg-red-500/30 px-1">payment page</span> is slow.
              </div>
              <p className="text-xs text-muted-foreground">Identifying specific aspects mentioned</p>
            </div>
          </div>
        </div>
        
        <RealWorldDemo data={demoData} />
      </div>
    </ModuleLayout>
  );
}
