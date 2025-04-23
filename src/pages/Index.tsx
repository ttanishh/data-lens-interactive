import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { ModulesGrid } from "@/components/modules/ModulesGrid";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Cpu } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Data Lens Interactive"
        subtitle="CS322 - Data Science"
        description="An interactive showcase of data science concepts and techniques applied to real-world problems"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/modules">
              Explore Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/about">
              About Project
              <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </HeroSection>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learning Modules</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore six core modules of data science through interactive demonstrations 
              and visualizations designed to help understand complex concepts.
            </p>
          </div>
          
          <ModulesGrid />
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
              <p className="text-muted-foreground mb-6">
                This interactive application demonstrates practical applications of six core data 
                science modules from the university syllabus. Each module features a hands-on 
                demonstration that lets you experiment with real algorithms and techniques.
              </p>
              <ul className="space-y-3">
                {[
                  "Interactive visualizations of complex algorithms",
                  "Upload and process real data samples",
                  "Explore text analysis and sentiment detection",
                  "Simulate data streaming and real-time analytics",
                  "Visualize graph-based recommendation systems",
                  "Learn through hands-on experimentation"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Cpu className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl border">
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Interactive Learning</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Each module features interactive examples where you can experiment 
                    with algorithms and techniques in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Science Playground Section */}
      <section className="py-20 animate-fade-in">
        <div className="container max-w-3xl flex flex-col gap-8 items-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-br from-primary to-purple-500 bg-clip-text text-transparent mb-2">
            Data Science Playground
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mb-3">
            Explore, analyze, and visualize your own datasets with interactive modules. Upload a CSV and dive into clustering, sentiment, streaming, and more!
          </p>
          <Button asChild size="lg" variant="default">
            <a href="/playground">Try Data Science Playground</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
