
import { ModuleCard } from "./ModuleCard";
import { ChartBar, Database, Code, MessageSquare, LineChart, Network } from "lucide-react";

const modules = [
  {
    title: "Introduction to Data Science",
    description: "Explore the fundamentals of data science and visualize domain-specific applications.",
    icon: <ChartBar className="h-5 w-5" />,
    href: "/modules/intro-to-data-science",
    gradientClass: "bg-gradient-card-1"
  },
  {
    title: "Managing Large Scale Data",
    description: "Learn data cleaning techniques and preprocessing for large datasets.",
    icon: <Database className="h-5 w-5" />,
    href: "/modules/large-scale-data",
    gradientClass: "bg-gradient-card-2"
  },
  {
    title: "Paradigms for Data Manipulation",
    description: "Understand data manipulation concepts like MapReduce for processing big data.",
    icon: <Code className="h-5 w-5" />,
    href: "/modules/data-manipulation",
    gradientClass: "bg-gradient-card-3"
  },
  {
    title: "Text Analysis",
    description: "Analyze text data using shingling, LSH, and sentiment classification techniques.",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/modules/text-analysis",
    gradientClass: "bg-gradient-card-4"
  },
  {
    title: "Mining Data Streams",
    description: "Process continuous data streams and learn algorithms for real-time analytics.",
    icon: <LineChart className="h-5 w-5" />,
    href: "/modules/data-streams",
    gradientClass: "bg-gradient-card-5"
  },
  {
    title: "Advanced Data Analysis",
    description: "Explore advanced techniques like graph analysis and recommendation systems.",
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
