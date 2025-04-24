
import { ModuleCard } from "./ModuleCard";
import { ChartBar, Database, Code, MessageSquare, LineChart, Network } from "lucide-react";

const modules = [
  {
    title: "Introduction to Data Science",
    description: "Urban Mobility Analyzer: Optimize public transportation patterns using real-world data science workflows.",
    icon: <ChartBar className="h-5 w-5" />,
    href: "/modules/intro-to-data-science",
    gradientClass: "bg-gradient-card-1"
  },
  {
    title: "Managing Large Scale Data",
    description: "Agricultural Yield Optimizer: Help farmers maximize crop yields using sensor data and satellite imagery.",
    icon: <Database className="h-5 w-5" />,
    href: "/modules/large-scale-data",
    gradientClass: "bg-gradient-card-2"
  },
  {
    title: "Paradigms for Data Manipulation",
    description: "Medical Research Accelerator: Process genomic datasets using distributed computing techniques.",
    icon: <Code className="h-5 w-5" />,
    href: "/modules/data-manipulation",
    gradientClass: "bg-gradient-card-3"
  },
  {
    title: "Text Analysis",
    description: "Customer Experience Intelligence: Analyze customer feedback and sentiment across multiple channels.",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/modules/text-analysis",
    gradientClass: "bg-gradient-card-4"
  },
  {
    title: "Mining Data Streams",
    description: "Predictive Maintenance System: Monitor industrial equipment and predict failures using real-time data streams.",
    icon: <LineChart className="h-5 w-5" />,
    href: "/modules/data-streams",
    gradientClass: "bg-gradient-card-5"
  },
  {
    title: "Advanced Data Analysis",
    description: "Healthcare Resource Allocator: Optimize hospital resource allocation using clustering and predictive modeling.",
    icon: <Network className="h-5 w-5" />,
    href: "/modules/advanced-analysis",
    gradientClass: "bg-gradient-card-6"
  }
];

export function ModulesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module, index) => (
        <ModuleCard
          key={module.title}
          index={index}
          title={module.title}
          description={module.description}
          icon={module.icon}
          href={module.href}
          gradientClass={module.gradientClass}
        />
      ))}
    </div>
  );
}
