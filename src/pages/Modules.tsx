
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { ModulesGrid } from "@/components/modules/ModulesGrid";

const Modules = () => {
  return (
    <Layout>
      <HeroSection
        title="Interactive Learning Modules"
        subtitle="Data Science"
        description="Explore six core data science concepts through interactive demonstrations"
      />
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-lg text-muted-foreground">
              Each module presents a different aspect of data science with practical, 
              hands-on examples that demonstrate real-world applications of theoretical concepts.
            </p>
          </div>
          
          <ModulesGrid />
        </div>
      </section>
    </Layout>
  );
};

export default Modules;
