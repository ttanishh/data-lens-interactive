
import { ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Cpu, Database } from "lucide-react";
import { CompareAlgorithms } from "@/components/ui/CompareAlgorithms";
import { DatasetSwitch } from "@/components/ui/DatasetSwitch";

interface ModuleLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  children: ReactNode;
}

export function ModuleLayout({ 
  title, 
  subtitle, 
  description, 
  children 
}: ModuleLayoutProps) {
  const demoClustering = [
    { x: 1, y: 2, cluster: 0 },
    { x: 2, y: 4, cluster: 0 },
    { x: 5, y: 8, cluster: 1 },
    { x: 8, y: 3, cluster: 2 },
  ];
  const realClustering = [
    { x: 4, y: 7, cluster: 1 },
    { x: 6, y: 2, cluster: 2 },
    { x: 9, y: 5, cluster: 1 },
    { x: 2, y: 8, cluster: 0 },
  ];

  function KMeansViz({ data }: { data: typeof demoClustering }) {
    return (
      <div className="neo-gradient p-4 rounded-lg border border-blue-300/20 shadow-lg backdrop-blur-sm">
        <div className="mb-1 font-mono text-xs flex items-center gap-1.5">
          <Code className="h-3.5 w-3.5 text-blue-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">K-Means Clustering Output:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.map((pt, i) => (
            <div 
              key={i} 
              className="p-2 rounded-md text-xs backdrop-blur-sm animate-fade-in"
              style={{ 
                background: pt.cluster === 0 
                  ? 'rgba(59, 130, 246, 0.15)' 
                  : pt.cluster === 1 
                    ? 'rgba(139, 92, 246, 0.15)' 
                    : 'rgba(236, 72, 153, 0.15)',
                borderLeft: pt.cluster === 0 
                  ? '2px solid rgba(59, 130, 246, 0.5)' 
                  : pt.cluster === 1 
                    ? '2px solid rgba(139, 92, 246, 0.5)' 
                    : '2px solid rgba(236, 72, 153, 0.5)',
                animationDelay: `${i * 100}ms`
              }}
            >
              [{pt.x}, {pt.y}] → <span className="font-semibold">{pt.cluster}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  function HierarchicalViz({ data }: { data: typeof demoClustering }) {
    return (
      <div className="neo-gradient p-4 rounded-lg border border-purple-300/20 shadow-lg backdrop-blur-sm">
        <div className="mb-1 font-mono text-xs flex items-center gap-1.5">
          <Database className="h-3.5 w-3.5 text-purple-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Hierarchical Clustering Output:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.map((pt, i) => (
            <div 
              key={i} 
              className="p-2 rounded-md text-xs backdrop-blur-sm animate-fade-in" 
              style={{ 
                background: pt.cluster === 0 
                  ? 'rgba(16, 185, 129, 0.15)' 
                  : pt.cluster === 1 
                    ? 'rgba(245, 158, 11, 0.15)' 
                    : 'rgba(239, 68, 68, 0.15)',
                borderLeft: pt.cluster === 0 
                  ? '2px solid rgba(16, 185, 129, 0.5)' 
                  : pt.cluster === 1 
                    ? '2px solid rgba(245, 158, 11, 0.5)' 
                    : '2px solid rgba(239, 68, 68, 0.5)',
                animationDelay: `${i * 100}ms`
              }}
            >
              [{pt.x}, {pt.y}] → <span className="font-semibold">{pt.cluster}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="absolute inset-0 w-full overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] opacity-70"></div>
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] opacity-70"></div>
      </div>

      <HeroSection
        title={title}
        subtitle={subtitle}
        description={description}
      >
        <Button asChild variant="outline" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
          <Link to="/modules">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Modules
          </Link>
        </Button>
      </HeroSection>
      
      <section className="py-16 relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto mb-16 glass-panel p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            
            <DatasetSwitch
              demoData={demoClustering}
              realData={realClustering}
              label="Toggle Between Demo & Real Dataset"
            >
              {(curData) => (
                <CompareAlgorithms
                  leftLabel="K-Means Clustering"
                  rightLabel="Hierarchical Clustering"
                  description="Observe how different clustering approaches group the same data points."
                  leftVisualization={<KMeansViz data={curData} />}
                  rightVisualization={<HierarchicalViz data={curData} />}
                />
              )}
            </DatasetSwitch>
            
            <div className="mt-6 flex items-center justify-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <Cpu className="h-5 w-5" />
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
              The interactive algorithm comparison above demonstrates how different analytical approaches 
              can produce varied results when applied to the same dataset. This concept is fundamental 
              to understanding the appropriate selection of algorithms for specific use cases.
            </p>
          </div>
          
          {children}
        </div>
      </section>
    </Layout>
  );
}
