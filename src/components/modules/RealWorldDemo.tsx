
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleBarChart, SimpleLineChart } from "@/utils/visualizations";
import { Button } from "@/components/ui/button";
import { ChartBar, CalendarDays, Users, Database } from "lucide-react";

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
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="border-none bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 mb-6">{data.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {data.metrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  {index === 0 ? <ChartBar className="h-4 w-4" /> :
                   index === 1 ? <CalendarDays className="h-4 w-4" /> :
                   <Users className="h-4 w-4" />}
                  <span className="text-sm">{metric.name}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">
                    {metric.value}
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

          <div className="h-64 mb-8 rounded-lg bg-white/5 p-4 backdrop-blur-sm">
            {data.chartData[0].value ? (
              <SimpleBarChart data={data.chartData} dataKey="value" fill="#818cf8" />
            ) : (
              <SimpleLineChart data={data.chartData} dataKey="amount" stroke="#818cf8" />
            )}
          </div>

          <div className="rounded-lg bg-white/5 backdrop-blur-sm p-4">
            <h4 className="text-sm font-medium text-slate-300 mb-3">Key Insights</h4>
            <ul className="space-y-2">
              {data.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
                  <Database className="h-4 w-4 mt-1 text-purple-400" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
