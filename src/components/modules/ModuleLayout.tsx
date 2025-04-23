import { ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
      <div>
        <div className="mb-1 font-mono text-xs">K-Means output (Cluster assignment):</div>
        <div className="flex gap-2">
          {data.map((pt, i) => (
            <div key={i} className="p-2 bg-blue-100 rounded text-xs">
              [{pt.x}, {pt.y}] → {pt.cluster}
            </div>
          ))}
        </div>
      </div>
    );
  }
  function HierarchicalViz({ data }: { data: typeof demoClustering }) {
    return (
      <div>
        <div className="mb-1 font-mono text-xs">Hierarchical Clustering output:</div>
        <div className="flex gap-2">
          {data.map((pt, i) => (
            <div key={i} className="p-2 bg-green-100 rounded text-xs">
              [{pt.x}, {pt.y}] → {pt.cluster}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <HeroSection
        title={title}
        subtitle={subtitle}
        description={description}
      >
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/modules">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Modules
          </Link>
        </Button>
      </HeroSection>
      
      <section className="py-16">
        <div className="container">
          <DatasetSwitch
            demoData={demoClustering}
            realData={realClustering}
            label="Switch to Real Dataset"
          >
            {(curData) => (
              <CompareAlgorithms
                leftLabel="K-Means"
                rightLabel="Hierarchical"
                description="Observe how different clustering approaches group the same data."
                leftVisualization={<KMeansViz data={curData} />}
                rightVisualization={<HierarchicalViz data={curData} />}
              />
            )}
          </DatasetSwitch>
          {children}
        </div>
      </section>
    </Layout>
  );
}
