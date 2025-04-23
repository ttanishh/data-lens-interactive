
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { PlaygroundUploader } from "@/components/playground/PlaygroundUploader";
import { PlaygroundModulePicker } from "@/components/playground/PlaygroundModulePicker";
import { PlaygroundResult } from "@/components/playground/PlaygroundResult";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Playground() {
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Example analysis results to simulate playground (replace with real logic later)
  const [results, setResults] = useState<any>(null);

  return (
    <Layout>
      <HeroSection
        title="🧩 Data Science Playground"
        subtitle="Upload your data, experiment, learn."
        description="Try real data science: upload your CSV, choose a technique, and instantly see visual insights, explanations, and next steps."
      >
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </HeroSection>
      <section className="max-w-3xl mx-auto py-10 animate-fade-in">
        {!csvRows.length ? (
          <PlaygroundUploader onSuccess={setCsvRows} />
        ) : !selectedModule ? (
          <PlaygroundModulePicker onSelect={setSelectedModule} />
        ) : (
          <PlaygroundResult
            moduleKey={selectedModule}
            rows={csvRows}
            onRestart={() => {
              setCsvRows([]);
              setSelectedModule(null);
              setResults(null);
            }}
          />
        )}
      </section>
    </Layout>
  );
}
