
import { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from "recharts";
import { Network } from "lucide-react";

// Types for our graph data
interface Node {
  id: string;
  type: "user" | "product";
  name: string;
  size: number;
  x?: number;
  y?: number;
  cluster?: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

interface Cluster {
  id: number;
  nodes: Node[];
  centerX: number;
  centerY: number;
}

// Generate a sample product graph
const generateSampleGraph = (): Graph => {
  const productCategories = ["Electronics", "Books", "Clothing", "Home", "Beauty"];
  const products: Node[] = [];
  const users: Node[] = [];
  const edges: Edge[] = [];
  
  // Create products
  for (let i = 0; i < 20; i++) {
    const categoryIndex = Math.floor(i / 4);
    const category = productCategories[categoryIndex];
    products.push({
      id: `p${i + 1}`,
      type: "product",
      name: `${category} Item ${(i % 4) + 1}`,
      size: Math.floor(Math.random() * 30) + 20
    });
  }
  
  // Create users
  for (let i = 0; i < 35; i++) {
    users.push({
      id: `u${i + 1}`,
      type: "user",
      name: `User ${i + 1}`,
      size: 15
    });
  }
  
  // Create edges (user-product interactions)
  users.forEach(user => {
    // Each user interacts with 2-5 products
    const numInteractions = Math.floor(Math.random() * 4) + 2;
    
    const userProductIndices = new Set<number>();
    while (userProductIndices.size < numInteractions) {
      userProductIndices.add(Math.floor(Math.random() * products.length));
    }
    
    userProductIndices.forEach(productIndex => {
      edges.push({
        source: user.id,
        target: products[productIndex].id,
        weight: Math.floor(Math.random() * 5) + 1 // Interaction strength 1-5
      });
    });
  });
  
  return {
    nodes: [...users, ...products],
    edges
  };
};

// Function to calculate simple recommendations based on user similarity
const generateRecommendations = (graph: Graph, userId: string) => {
  const { nodes, edges } = graph;
  
  // Find all products the user has interacted with
  const userProducts = edges
    .filter(edge => edge.source === userId)
    .map(edge => edge.target);
  
  // Find similar users (users who have interacted with at least one of the same products)
  const similarUsers = new Set<string>();
  edges.forEach(edge => {
    if (edge.source !== userId && userProducts.includes(edge.target)) {
      similarUsers.add(edge.source);
    }
  });
  
  // Find products that similar users have interacted with, but the current user hasn't
  const potentialRecommendations: Record<string, number> = {};
  
  edges.forEach(edge => {
    if (similarUsers.has(edge.source) && !userProducts.includes(edge.target)) {
      if (!potentialRecommendations[edge.target]) {
        potentialRecommendations[edge.target] = 0;
      }
      potentialRecommendations[edge.target] += edge.weight;
    }
  });
  
  // Convert to array and sort by score
  const recommendations = Object.entries(potentialRecommendations)
    .map(([productId, score]) => ({
      product: nodes.find(node => node.id === productId),
      score
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5 recommendations
  
  return recommendations;
};

// Simple K-means-like clustering algorithm
const clusterNodes = (nodes: Node[], k = 3): { nodes: Node[], clusters: Cluster[] } => {
  // Copy nodes to avoid modifying the original
  const positionedNodes = nodes.map(node => ({
    ...node,
    // Assign random positions if not already set
    x: node.x || Math.random() * 600,
    y: node.y || Math.random() * 400,
    cluster: node.cluster
  }));
  
  // Initialize cluster centers randomly
  let clusters: Cluster[] = [];
  for (let i = 0; i < k; i++) {
    clusters.push({
      id: i,
      nodes: [],
      centerX: Math.random() * 600,
      centerY: Math.random() * 400
    });
  }
  
  // Iterate a few times to stabilize clusters
  for (let iteration = 0; iteration < 5; iteration++) {
    // Assign nodes to nearest cluster
    clusters.forEach(cluster => {
      cluster.nodes = [];
    });
    
    positionedNodes.forEach(node => {
      let minDistance = Infinity;
      let closestCluster = 0;
      
      clusters.forEach((cluster, i) => {
        const dx = (node.x || 0) - cluster.centerX;
        const dy = (node.y || 0) - cluster.centerY;
        const distance = dx * dx + dy * dy;
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCluster = i;
        }
      });
      
      node.cluster = closestCluster;
      clusters[closestCluster].nodes.push(node);
    });
    
    // Recalculate cluster centers
    clusters.forEach(cluster => {
      if (cluster.nodes.length > 0) {
        cluster.centerX = cluster.nodes.reduce((sum, node) => sum + (node.x || 0), 0) / cluster.nodes.length;
        cluster.centerY = cluster.nodes.reduce((sum, node) => sum + (node.y || 0), 0) / cluster.nodes.length;
      }
    });
  }
  
  // Apply forces to make visualization more pleasing
  const getForceDirectedLayout = (iterations = 20) => {
    for (let i = 0; i < iterations; i++) {
      // Repulsive force between all nodes
      for (let a = 0; a < positionedNodes.length; a++) {
        for (let b = a + 1; b < positionedNodes.length; b++) {
          const nodeA = positionedNodes[a];
          const nodeB = positionedNodes[b];
          
          const dx = (nodeB.x || 0) - (nodeA.x || 0);
          const dy = (nodeB.y || 0) - (nodeA.y || 0);
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          
          const repulsiveForce = 300 / (distance * distance);
          const fx = dx * repulsiveForce / distance;
          const fy = dy * repulsiveForce / distance;
          
          nodeA.x = (nodeA.x || 0) - fx;
          nodeA.y = (nodeA.y || 0) - fy;
          nodeB.x = (nodeB.x || 0) + fx;
          nodeB.y = (nodeB.y || 0) + fy;
        }
      }
      
      // Attractive force within same cluster
      clusters.forEach(cluster => {
        for (let i = 0; i < cluster.nodes.length; i++) {
          const node = cluster.nodes[i];
          const dx = cluster.centerX - (node.x || 0);
          const dy = cluster.centerY - (node.y || 0);
          
          node.x = (node.x || 0) + dx * 0.05;
          node.y = (node.y || 0) + dy * 0.05;
        }
      });
    }
  };
  
  getForceDirectedLayout();
  
  return { nodes: positionedNodes, clusters };
};

export default function AdvancedAnalysis() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [clusteredNodes, setClusteredNodes] = useState<Node[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Array<{product: Node | undefined, score: number}>>([]);
  const [clusterCount, setClusterCount] = useState(3);
  
  useEffect(() => {
    // Generate sample graph on first load
    const sampleGraph = generateSampleGraph();
    setGraph(sampleGraph);
    
    const { nodes: positioned, clusters } = clusterNodes(sampleGraph.nodes, clusterCount);
    setClusteredNodes(positioned);
    setClusters(clusters);
    
    // Select first user by default
    const firstUser = sampleGraph.nodes.find(node => node.type === "user");
    if (firstUser) {
      setSelectedUser(firstUser.id);
      setRecommendations(generateRecommendations(sampleGraph, firstUser.id));
    }
  }, []);
  
  useEffect(() => {
    if (graph.nodes.length > 0) {
      const { nodes: positioned, clusters } = clusterNodes(graph.nodes, clusterCount);
      setClusteredNodes(positioned);
      setClusters(clusters);
    }
  }, [clusterCount, graph]);
  
  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
    setRecommendations(generateRecommendations(graph, userId));
  };
  
  const generateNewGraph = () => {
    const newGraph = generateSampleGraph();
    setGraph(newGraph);
    
    const { nodes: positioned, clusters } = clusterNodes(newGraph.nodes, clusterCount);
    setClusteredNodes(positioned);
    setClusters(clusters);
    
    const firstUser = newGraph.nodes.find(node => node.type === "user");
    if (firstUser) {
      setSelectedUser(firstUser.id);
      setRecommendations(generateRecommendations(newGraph, firstUser.id));
    }
  };
  
  const getClusterColor = (clusterId: number | undefined) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];
    return clusterId !== undefined ? colors[clusterId % colors.length] : "#cccccc";
  };
  
  return (
    <ModuleLayout
      title="Advanced Data Analysis"
      subtitle="Module 6"
      description="Explore advanced techniques like graph analysis and recommendation systems"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold">User-Product Graph Analysis</h2>
          <p className="text-muted-foreground">
            This interactive tool demonstrates advanced techniques for analyzing relations between users and products.
            It visualizes user-product interactions, clusters similar entities, and generates personalized recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5" />
                Graph Visualization
              </CardTitle>
              <CardDescription>
                User-product interaction network with cluster analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="clusters">
                <div className="px-6 pt-2">
                  <TabsList className="mb-2">
                    <TabsTrigger value="clusters">Clusters</TabsTrigger>
                    <TabsTrigger value="relations">Relations</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="clusters" className="mt-0">
                  <div className="h-[500px] w-full relative bg-muted/20 p-4">
                    {/* Legend */}
                    <div className="absolute top-4 right-4 p-3 bg-background/90 backdrop-blur-sm rounded-lg border shadow-sm z-10">
                      <div className="text-xs font-medium mb-2">Legend</div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-xs">Users</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-xs">Products</span>
                        </div>
                        {clusters.map((cluster) => (
                          <div key={cluster.id} className="flex items-center">
                            <div 
                              className="h-3 w-3 rounded border mr-2"
                              style={{ backgroundColor: getClusterColor(cluster.id) }}
                            ></div>
                            <span className="text-xs">Cluster {cluster.id + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid opacity={0.2} />
                        <XAxis type="number" dataKey="x" name="x" hide />
                        <YAxis type="number" dataKey="y" name="y" hide />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload as Node;
                              return (
                                <div className="p-2 bg-background border rounded shadow-sm">
                                  <p className="text-xs font-medium">{data.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Type: {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                  </p>
                                  {data.cluster !== undefined && (
                                    <p className="text-xs text-muted-foreground">
                                      Cluster: {data.cluster + 1}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter 
                          name="Users" 
                          data={clusteredNodes.filter(node => node.type === "user")} 
                          fill="#8884d8"
                        >
                          {clusteredNodes.filter(node => node.type === "user").map((node, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={node.id === selectedUser ? '#ff7300' : '#1e88e5'}
                              stroke={node.id === selectedUser ? '#ff4000' : getClusterColor(node.cluster)}
                              strokeWidth={node.id === selectedUser ? 2 : 1}
                            />
                          ))}
                        </Scatter>
                        <Scatter 
                          name="Products" 
                          data={clusteredNodes.filter(node => node.type === "product")} 
                          fill="#82ca9d"
                        >
                          {clusteredNodes.filter(node => node.type === "product").map((node, index) => {
                            const isRecommended = recommendations.some(rec => rec.product?.id === node.id);
                            return (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={isRecommended ? '#ffab00' : '#f59e0b'}
                                stroke={getClusterColor(node.cluster)}
                                strokeWidth={isRecommended ? 2 : 1}
                              />
                            );
                          })}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Cluster Count</span>
                      <span className="text-sm">{clusterCount}</span>
                    </div>
                    <Slider
                      value={[clusterCount]}
                      min={2}
                      max={5}
                      step={1}
                      onValueChange={([value]) => setClusterCount(value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="relations" className="mt-0">
                  <div className="p-6">
                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                      <p className="text-sm">
                        The graph contains <span className="font-medium">{graph.nodes.filter(n => n.type === "user").length}</span> users and <span className="font-medium">{graph.nodes.filter(n => n.type === "product").length}</span> products, with <span className="font-medium">{graph.edges.length}</span> interaction connections between them.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-2">
                        <h3 className="text-sm font-medium">Selected User Interactions</h3>
                      </div>
                      
                      {selectedUser && (
                        <div className="p-4">
                          <h4 className="text-sm font-medium mb-2">
                            {graph.nodes.find(n => n.id === selectedUser)?.name}
                          </h4>
                          
                          <div className="mb-4">
                            <div className="text-xs text-muted-foreground mb-1">Products Interacted With:</div>
                            <div className="flex flex-wrap gap-2">
                              {graph.edges
                                .filter(edge => edge.source === selectedUser)
                                .map(edge => {
                                  const product = graph.nodes.find(n => n.id === edge.target);
                                  return product ? (
                                    <div 
                                      key={edge.target}
                                      className="px-2 py-1 text-xs bg-card border rounded-full flex items-center"
                                    >
                                      <span>{product.name}</span>
                                      <span className="ml-1 text-xs text-muted-foreground">
                                        (weight: {edge.weight})
                                      </span>
                                    </div>
                                  ) : null;
                                })}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Similar Users:</div>
                            <div className="flex flex-wrap gap-2">
                              {graph.edges
                                .filter(edge => edge.source === selectedUser)
                                .flatMap(edge => 
                                  graph.edges
                                    .filter(e => e.target === edge.target && e.source !== selectedUser)
                                    .map(e => e.source)
                                )
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .slice(0, 5)
                                .map(userId => {
                                  const user = graph.nodes.find(n => n.id === userId);
                                  return user ? (
                                    <div 
                                      key={userId}
                                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                    >
                                      {user.name}
                                    </div>
                                  ) : null;
                                })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recommendation System</CardTitle>
              <CardDescription>
                Analysis tools and personalized suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium block mb-2">Select User</label>
                <select
                  value={selectedUser || ""}
                  onChange={(e) => handleUserChange(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {graph.nodes
                    .filter(node => node.type === "user")
                    .map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Recommended Products</h4>
                {recommendations.length > 0 ? (
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="bg-muted/40 rounded-lg p-3 border">
                        <div className="flex justify-between items-start">
                          <div className="font-medium text-sm">
                            {rec.product?.name || "Unknown Product"}
                          </div>
                          <div className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                            Score: {rec.score}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Recommended based on similar user preferences
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm p-3 bg-muted/20 rounded-lg">
                    No recommendations available for this user
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <Button onClick={generateNewGraph} variant="outline" className="w-full">
                  Generate New Graph
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Analysis Techniques</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start">
                    <div className="h-4 w-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center mr-2 mt-0.5">1</div>
                    <span>K-Means Clustering to group similar users and products</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-4 w-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center mr-2 mt-0.5">2</div>
                    <span>Collaborative Filtering for product recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-4 w-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center mr-2 mt-0.5">3</div>
                    <span>Force-directed layout for intuitive graph visualization</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">Module Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Advanced Data Analysis explores sophisticated techniques for extracting insights from complex data structures. This module covers:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>Graph analysis algorithms for network data</li>
            <li>Clustering techniques for discovering natural groupings</li>
            <li>Collaborative filtering for recommendation systems</li>
            <li>Link analysis methods like PageRank</li>
            <li>Visualization strategies for high-dimensional data</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
