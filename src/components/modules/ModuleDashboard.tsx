
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ClipboardList } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dataQuality = [
  { name: 'Missing Values', count: 245 },
  { name: 'Duplicates', count: 87 },
  { name: 'Outliers', count: 32 },
  { name: 'Valid Records', count: 1836 }
];

const sentimentTrends = [
  { date: 'Jan', positive: 65, negative: 35, neutral: 45 },
  { date: 'Feb', positive: 59, negative: 30, neutral: 48 },
  { date: 'Mar', positive: 80, negative: 15, neutral: 40 },
  { date: 'Apr', positive: 81, negative: 20, neutral: 28 },
  { date: 'May', positive: 56, negative: 36, neutral: 40 },
  { date: 'Jun', positive: 55, negative: 45, neutral: 35 }
];

const streamEstimates = [
  { time: '10:00', uniqueUsers: 124, activeUsers: 78 },
  { time: '11:00', uniqueUsers: 186, activeUsers: 144 },
  { time: '12:00', uniqueUsers: 245, activeUsers: 176 },
  { time: '13:00', uniqueUsers: 287, activeUsers: 190 },
  { time: '14:00', uniqueUsers: 256, activeUsers: 166 },
  { time: '15:00', uniqueUsers: 198, activeUsers: 122 }
];

const clusterInsights = [
  { name: 'Cluster 1', value: 400 },
  { name: 'Cluster 2', value: 300 },
  { name: 'Cluster 3', value: 200 },
  { name: 'Cluster 4', value: 100 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const compactNumber = (num: number) => {
  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
};

export function ModuleDashboard() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <ClipboardList className="h-6 w-6 mr-2" />
        <h2 className="text-2xl font-bold">Data Science Insights Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Data Quality Summary</CardTitle>
                <CardDescription>Overview of data cleaning results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dataQuality} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Sentiment Trends</CardTitle>
                <CardDescription>Text analysis results over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sentimentTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="positive" stroke="#22C55E" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="negative" stroke="#EF4444" />
                        <Line type="monotone" dataKey="neutral" stroke="#A3A3A3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Stream Monitoring</CardTitle>
                <CardDescription>User activity tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={streamEstimates} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="uniqueUsers" stroke="#0EA5E9" strokeWidth={2} />
                        <Line type="monotone" dataKey="activeUsers" stroke="#8B5CF6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Cluster Analysis</CardTitle>
                <CardDescription>Data grouping insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={clusterInsights}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {clusterInsights.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="p-2 bg-white shadow rounded border">
                                  <p className="font-medium">{payload[0].name}</p>
                                  <p>Count: {payload[0].value}</p>
                                </div>
                              );
                            }
                            return null;
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="animate-fade-in">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Performance Metrics</CardTitle>
                <CardDescription>Detailed statistics across all data science modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed Items</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Processing Time</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Introduction to Data Science</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1,245</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">98.5%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">0.34s</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Optimal</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Managing Large Scale Data</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">8,742</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">96.2%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1.85s</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Optimal</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Paradigms for Data Manipulation</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">3,541</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">99.1%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">0.67s</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Optimal</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Text Analysis</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">5,872</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">94.8%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1.24s</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Monitoring</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Mining Data Streams</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">12,458</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">97.3%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2.15s</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Optimal</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Advanced Data Analysis</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2,147</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">92.5%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">3.42s</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Monitoring</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
