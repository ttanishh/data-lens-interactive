import { useState, useEffect, useRef } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Play, Pause, RotateCw } from "lucide-react";

// Types for our stream data
interface StreamEvent {
  id: string;
  userId: string;
  action: string;
  timestamp: number;
  metadata: Record<string, any>;
}

interface StreamMetrics {
  time: number;
  distinctUsers: number;
  eventCount: number;
  sampledEvents: number;
  windowEvents: number;
}

// Create random user IDs
const generateUserId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// Available actions for our stream events
const actions = ["login", "view", "click", "purchase", "logout"];

// Generate a random event
const generateEvent = (timestamp: number): StreamEvent => {
  const userId = generateUserId();
  const action = actions[Math.floor(Math.random() * actions.length)];
  
  return {
    id: `${timestamp}-${Math.random().toString(36).substring(2, 10)}`,
    userId,
    action,
    timestamp,
    metadata: {
      ip: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      browser: ["Chrome", "Firefox", "Safari", "Edge"][Math.floor(Math.random() * 4)],
      page: ["/home", "/products", "/checkout", "/profile", "/settings"][Math.floor(Math.random() * 5)]
    }
  };
};

export default function DataStreams() {
  // Stream state
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamRate, setStreamRate] = useState(2); // events per second
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [metrics, setMetrics] = useState<StreamMetrics[]>([]);
  const [userSet, setUserSet] = useState<Set<string>>(new Set());
  const [sampleRate, setSampleRate] = useState(0.5); // 50% sampling
  const [windowSize, setWindowSize] = useState(10); // 10 second window
  
  // Refs for animation frame and intervals
  const streamIntervalRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    // Reset metrics when starting fresh
    if (events.length === 0) {
      setMetrics([]);
      startTimeRef.current = Date.now();
    }
    
    return () => {
      // Clean up on unmount
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [events.length]);
  
  useEffect(() => {
    // Update stream interval when rate changes
    if (isStreaming) {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
      
      const interval = 1000 / streamRate;
      streamIntervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const newEvent = generateEvent(now);
        
        setEvents(prev => {
          // Keep only the most recent events for performance
          const newEvents = [...prev, newEvent];
          if (newEvents.length > 1000) {
            return newEvents.slice(-1000);
          }
          return newEvents;
        });
        
        // Update unique users set
        setUserSet(prev => {
          const newSet = new Set(prev);
          newSet.add(newEvent.userId);
          return newSet;
        });
      }, interval);
    } else {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }
    }
    
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, [isStreaming, streamRate]);
  
  useEffect(() => {
    // Set up animation frame for metrics updates
    if (isStreaming) {
      const updateMetrics = () => {
        const now = Date.now();
        const elapsedTimeSeconds = Math.floor((now - startTimeRef.current) / 1000);
        
        // Only update metrics once per second
        if (metrics.length === 0 || metrics[metrics.length - 1].time !== elapsedTimeSeconds) {
          // Calculate metrics for the current time
          const currentUserCount = userSet.size;
          const currentEventCount = events.length;
          
          // Calculate sampled event count based on sample rate
          const sampledEventCount = Math.round(currentEventCount * sampleRate);
          
          // Calculate events in current sliding window
          const windowStartTime = now - (windowSize * 1000);
          const windowEvents = events.filter(e => e.timestamp >= windowStartTime).length;
          
          setMetrics(prev => {
            const newMetrics = [...prev, {
              time: elapsedTimeSeconds,
              distinctUsers: currentUserCount,
              eventCount: currentEventCount,
              sampledEvents: sampledEventCount,
              windowEvents
            }];
            
            // Keep only the most recent metrics for charting
            if (newMetrics.length > 60) { // 1 minute of data
              return newMetrics.slice(-60);
            }
            return newMetrics;
          });
        }
        
        animationRef.current = requestAnimationFrame(updateMetrics);
      };
      
      animationRef.current = requestAnimationFrame(updateMetrics);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isStreaming, metrics, events, userSet, sampleRate, windowSize]);
  
  const handleStartStop = () => {
    setIsStreaming(prev => !prev);
  };
  
  const handleReset = () => {
    setIsStreaming(false);
    setEvents([]);
    setMetrics([]);
    setUserSet(new Set());
    startTimeRef.current = Date.now();
  };
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate window percentage for visualization
  const getWindowPercentage = () => {
    if (metrics.length === 0) return 0;
    const latestMetrics = metrics[metrics.length - 1];
    if (latestMetrics.eventCount === 0) return 0;
    return (latestMetrics.windowEvents / latestMetrics.eventCount) * 100;
  };
  
  return (
    <ModuleLayout
      title="Mining Data Streams"
      subtitle="Module 5"
      description="Process continuous data streams and learn algorithms for real-time analytics"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold">Stream Processing Simulator</h2>
          <p className="text-muted-foreground">
            This interactive tool simulates processing a continuous stream of user events in real-time.
            It demonstrates concepts like counting distinct elements, reservoir sampling, and sliding window analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Stream Controls</CardTitle>
              <CardDescription>
                Configure stream processing parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Stream Rate</label>
                  <span className="text-sm text-muted-foreground">{streamRate} events/sec</span>
                </div>
                <Slider 
                  defaultValue={[streamRate]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={([value]) => setStreamRate(value)} 
                  disabled={isStreaming}
                  className="py-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Sample Rate</label>
                  <span className="text-sm text-muted-foreground">{Math.round(sampleRate * 100)}%</span>
                </div>
                <Slider 
                  defaultValue={[sampleRate * 100]} 
                  min={10} 
                  max={100} 
                  step={10} 
                  onValueChange={([value]) => setSampleRate(value / 100)} 
                  className="py-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Window Size</label>
                  <span className="text-sm text-muted-foreground">{windowSize} seconds</span>
                </div>
                <Slider 
                  defaultValue={[windowSize]} 
                  min={5} 
                  max={30} 
                  step={5} 
                  onValueChange={([value]) => setWindowSize(value)} 
                  className="py-2"
                />
              </div>
              
              <div className="pt-2 space-x-2">
                <Button 
                  onClick={handleStartStop} 
                  variant={isStreaming ? "destructive" : "default"}
                >
                  {isStreaming ? 
                    <><Pause className="mr-1 h-4 w-4" /> Pause Stream</> : 
                    <><Play className="mr-1 h-4 w-4" /> Start Stream</>
                  }
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCw className="mr-1 h-4 w-4" /> Reset
                </Button>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h3 className="text-sm font-medium">Stream Stats</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="text-sm">Total Events:</div>
                  <div className="text-sm font-medium text-right">{events.length}</div>
                  
                  <div className="text-sm">Unique Users:</div>
                  <div className="text-sm font-medium text-right">{userSet.size}</div>
                  
                  <div className="text-sm">Elapsed Time:</div>
                  <div className="text-sm font-medium text-right">
                    {metrics.length > 0 ? formatTime(metrics[metrics.length - 1].time) : '00:00'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Stream Visualization</CardTitle>
              <CardDescription>
                Real-time metrics from the data stream
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="distinct" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="distinct">Distinct Count</TabsTrigger>
                  <TabsTrigger value="sampling">Sampling</TabsTrigger>
                  <TabsTrigger value="window">Sliding Window</TabsTrigger>
                </TabsList>
                
                <TabsContent value="distinct" className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Flajolet-Martin Algorithm (Simulated)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tracking the number of distinct users in a continuous stream without storing all user IDs.
                  </p>
                  
                  <div className="h-[250px] w-full">
                    <ChartContainer config={{}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={metrics}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis 
                            dataKey="time" 
                            tickFormatter={formatTime}
                            stroke="#888888"
                            fontSize={12}
                          />
                          <YAxis stroke="#888888" fontSize={12} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="distinctUsers" 
                            name="Unique Users"
                            stroke="#8884d8" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border text-sm">
                    <p className="mb-2">
                      <span className="font-medium">Flajolet-Martin Concept:</span> Uses bit patterns in hashed user IDs to estimate unique users.
                    </p>
                    <p>
                      For a stream with <span className="font-medium">{userSet.size}</span> distinct users, 
                      our visualization shows the exact count, but a real F-M algorithm would use constant space.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="sampling" className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Reservoir Sampling (Simulated)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Maintaining a representative sample of events from a continuous stream.
                  </p>
                  
                  <div className="h-[250px] w-full">
                    <ChartContainer config={{}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={metrics}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis 
                            dataKey="time" 
                            tickFormatter={formatTime}
                            stroke="#888888"
                            fontSize={12}
                          />
                          <YAxis stroke="#888888" fontSize={12} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Area
                            type="monotone"
                            dataKey="eventCount"
                            name="All Events"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                            opacity={0.3}
                          />
                          <Area
                            type="monotone"
                            dataKey="sampledEvents"
                            name="Sampled Events"
                            stackId="2"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            opacity={0.8}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border text-sm">
                    <p className="mb-2">
                      <span className="font-medium">Sampling Rate:</span> {Math.round(sampleRate * 100)}% of all events
                    </p>
                    <p>
                      Reservoir sampling allows maintaining a fixed-size representative sample
                      even as the stream grows infinitely, with each element having equal probability of selection.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="window" className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Sliding Window Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Processing only the most recent events within a time window of {windowSize} seconds.
                  </p>
                  
                  <div className="h-[250px] w-full">
                    <ChartContainer config={{}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={metrics}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis 
                            dataKey="time" 
                            tickFormatter={formatTime}
                            stroke="#888888"
                            fontSize={12}
                          />
                          <YAxis stroke="#888888" fontSize={12} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="windowEvents" 
                            name="Events in Window"
                            stroke="#ff7300" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border text-sm">
                    <p className="mb-2">
                      <span className="font-medium">Window Size:</span> {windowSize} seconds
                    </p>
                    <p>
                      Sliding window techniques process only the most recent data,
                      allowing real-time analysis on recent trends without having to consider the entire stream history.
                    </p>
                    <div className="mt-2">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        Window coverage ({getWindowPercentage().toFixed(1)}% of all events)
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500" 
                          style={{ width: `${getWindowPercentage()}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="overflow-x-auto">
                <h3 className="text-sm font-medium mb-2">Recent Events</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 text-left font-medium">Time</th>
                      <th className="p-2 text-left font-medium">User ID</th>
                      <th className="p-2 text-left font-medium">Action</th>
                      <th className="p-2 text-left font-medium">Page</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {events.slice(-5).reverse().map((event, index) => (
                      <tr key={event.id} className={index % 2 === 0 ? 'bg-muted/20' : 'bg-background'}>
                        <td className="p-2">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-2 font-mono">{event.userId}</td>
                        <td className="p-2">{event.action}</td>
                        <td className="p-2">{event.metadata.page}</td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                          No events yet. Start the stream to see data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">Module Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Mining Data Streams explores techniques for processing and analyzing continuous data flows. This module covers:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>Algorithms for estimating stream statistics with limited memory</li>
            <li>Flajolet-Martin algorithm for counting distinct elements</li>
            <li>Reservoir sampling for maintaining representative samples</li>
            <li>Sliding window techniques for time-based analysis</li>
            <li>Real-time stream processing architecture</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
