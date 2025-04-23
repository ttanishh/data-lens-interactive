
import { ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
          {children}
        </div>
      </section>
    </Layout>
  );
}
