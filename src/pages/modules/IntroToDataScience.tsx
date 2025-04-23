
import { useState } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const domains = [
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Applying data science to improve patient outcomes and healthcare operations",
    steps: [
      {
        title: "Data Collection",
        description: "Gathering patient records, medical imaging, device readings, clinical notes"
      },
      {
        title: "Data Processing",
        description: "Cleaning medical data, handling missing values, standardizing formats"
      },
      {
        title: "Exploratory Analysis",
        description: "Identifying patterns in patient data, disease correlations, treatment efficacy"
      },
      {
        title: "Modeling",
        description: "Predicting disease progression, patient risks, treatment responses"
      },
      {
        title: "Deployment",
        description: "Clinical decision support systems, personalized treatment recommendations"
      }
    ]
  },
  {
    id: "retail",
    title: "Retail",
    description: "Using data science to optimize inventory, pricing and customer experience",
    steps: [
      {
        title: "Data Collection",
        description: "Gathering sales transactions, customer behavior, inventory levels, market trends"
      },
      {
        title: "Data Processing",
        description: "Cleaning sales data, integrating data sources, handling seasonality"
      },
      {
        title: "Exploratory Analysis",
        description: "Analyzing purchase patterns, product affinities, customer segments"
      },
      {
        title: "Modeling",
        description: "Demand forecasting, price optimization, recommendation systems"
      },
      {
        title: "Deployment",
        description: "Automated inventory management, dynamic pricing, personalized marketing"
      }
    ]
  },
  {
    id: "finance",
    title: "Finance",
    description: "Leveraging data science for risk assessment, fraud detection, and investment strategies",
    steps: [
      {
        title: "Data Collection",
        description: "Gathering market data, transaction records, customer profiles, news feeds"
      },
      {
        title: "Data Processing",
        description: "Cleaning financial data, handling outliers, time-series normalization"
      },
      {
        title: "Exploratory Analysis",
        description: "Market pattern analysis, correlation discovery, anomaly detection"
      },
      {
        title: "Modeling",
        description: "Risk modeling, fraud detection, algorithmic trading, credit scoring"
      },
      {
        title: "Deployment",
        description: "Automated trading systems, real-time fraud alerts, credit approval workflows"
      }
    ]
  }
];

export default function IntroToDataScience() {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ModuleLayout
      title="Introduction to Data Science"
      subtitle="Module 1"
      description="Explore the fundamentals of data science and its applications across different domains"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold">Data Science Pipeline Explorer</h2>
          <p className="text-muted-foreground">
            Select a domain to visualize how the data science pipeline is applied in different industries. 
            This interactive tool demonstrates the practical application of data science concepts in 
            real-world scenarios.
          </p>
        </div>

        <Tabs defaultValue={domains[0].id} className="mb-8" onValueChange={(value) => {
          const domain = domains.find(d => d.id === value);
          if (domain) {
            setSelectedDomain(domain);
            setCurrentStep(0);
          }
        }}>
          <TabsList className="grid grid-cols-3 mb-8">
            {domains.map(domain => (
              <TabsTrigger key={domain.id} value={domain.id} className="text-sm">
                {domain.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {domains.map(domain => (
            <TabsContent key={domain.id} value={domain.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{domain.title}</CardTitle>
                  <CardDescription>{domain.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-10">
                    <div className="absolute top-1/2 h-0.5 w-full bg-muted" />
                    <ol className="relative z-10 flex justify-between">
                      {domain.steps.map((step, index) => (
                        <li key={index} className="flex items-center justify-center">
                          <button
                            onClick={() => setCurrentStep(index)}
                            className={`h-8 w-8 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                              index === currentStep
                                ? "bg-primary text-white"
                                : index < currentStep
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="mt-8 p-6 bg-muted/50 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                      {currentStep + 1}. {selectedDomain.steps[currentStep].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedDomain.steps[currentStep].description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous Step
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(Math.min(selectedDomain.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === selectedDomain.steps.length - 1}
                  >
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">Module Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Introduction to Data Science covers the fundamental concepts that form the basis for 
            more advanced topics. This module explores:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>Core data science terminology and concepts</li>
            <li>The data science workflow from acquisition to deployment</li>
            <li>How different domains adapt data science methodologies</li>
            <li>The relationship between statistics, programming, and domain expertise</li>
            <li>Ethical considerations in data collection and analysis</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
