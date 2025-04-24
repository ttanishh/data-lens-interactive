
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleBarChart, SimpleLineChart } from "@/utils/visualizations";
import { Button } from "@/components/ui/button";
import { ChartBar, CalendarDays, Users, Database, ArrowRight, Layers, Cpu, BookText, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoData {
  title: string;
  description: string;
  metrics: {
    name: string;
    value: number;
    change?: number;
  }[];
  chartData: any[];
  insights: string[];
}

interface RealWorldDemoProps {
  data: DemoData;
}

export function RealWorldDemo({ data }: RealWorldDemoProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'insights'>('demo');

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="border-none bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-sm"></div>
        
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              {data.title.includes("Urban") ? <Layers className="h-4 w-4 text-white" /> :
               data.title.includes("Agricultural") ? <Cpu className="h-4 w-4 text-white" /> :
               data.title.includes("Medical") ? <Database className="h-4 w-4 text-white" /> :
               data.title.includes("Customer") ? <BookText className="h-4 w-4 text-white" /> :
               data.title.includes("Maintenance") ? <Network className="h-4 w-4 text-white" /> :
               <Users className="h-4 w-4 text-white" />}
            </div>
            <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {data.title}
            </CardTitle>
          </div>
          <p className="text-slate-300 ml-11">{data.description}</p>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="flex mb-6 border-b border-white/10">
            <button 
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all", 
                activeTab === 'demo' 
                  ? "text-blue-400 border-b-2 border-blue-400 -mb-px" 
                  : "text-slate-400 hover:text-slate-200"
              )}
              onClick={() => setActiveTab('demo')}
            >
              Interactive Demo
            </button>
            <button 
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all", 
                activeTab === 'insights' 
                  ? "text-blue-400 border-b-2 border-blue-400 -mb-px" 
                  : "text-slate-400 hover:text-slate-200"
              )}
              onClick={() => setActiveTab('insights')}
            >
              Technical Insights
            </button>
          </div>
          
          {activeTab === 'demo' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {data.metrics.map((metric, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 shadow-xl"
                  >
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      {index === 0 ? <ChartBar className="h-4 w-4" /> :
                       index === 1 ? <CalendarDays className="h-4 w-4" /> :
                       <Users className="h-4 w-4" />}
                      <span className="text-sm">{metric.name}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">
                        {metric.value}
                        {metric.name.includes("Efficiency") || metric.name.includes("Health") ? "%" : ""}
                      </span>
                      {metric.change && (
                        <span className={`text-sm ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-64 mb-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm border border-white/10 shadow-xl">
                {data.chartData[0] && data.chartData[0].value !== undefined ? (
                  <SimpleBarChart 
                    data={data.chartData} 
                    dataKey="value" 
                    fill="url(#blueGradient)" 
                  />
                ) : (
                  <SimpleLineChart 
                    data={data.chartData} 
                    dataKey="amount" 
                    stroke="#818cf8" 
                  />
                )}
                
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 shadow-xl animate-fade-in">
              <h4 className="text-sm font-medium text-blue-400 mb-4">Technical Background & Insights</h4>
              <ul className="space-y-4">
                {data.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="mt-1.5 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                      <Database className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">{insight}</p>
                      <div className="mt-2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
                <h5 className="text-xs font-medium text-blue-400 mb-2">Technical Implementation</h5>
                <p className="text-xs text-slate-400">
                  {data.title.includes("Urban") ? 
                    "Implements a multi-stage data pipeline with clustering algorithms and temporal pattern recognition for transport optimization." :
                   data.title.includes("Agricultural") ? 
                    "Utilizes sensor data fusion, satellite imagery processing, and multi-source data normalization with missing value imputation." :
                   data.title.includes("Medical") ? 
                    "Employs MapReduce distributed computing paradigm for parallel genomic sequence analysis across multiple nodes." :
                   data.title.includes("Customer") ? 
                    "Uses NLP techniques including sentiment analysis, topic modeling, and entity extraction with temporal trend visualization." :
                   data.title.includes("Maintenance") ? 
                    "Implements real-time anomaly detection using sliding window algorithms and stream processing over sensor network data." :
                    "Applies unsupervised clustering and predictive modeling with simulation capabilities for resource allocation optimization."}
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 group">
              <span>Explore Details</span>
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
