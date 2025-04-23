
import { ReactNode } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderModuleProps {
  title: string;
  moduleNumber: string;
  description: string;
  icon: ReactNode;
}

export default function PlaceholderModule({
  title,
  moduleNumber,
  description,
  icon
}: PlaceholderModuleProps) {
  return (
    <ModuleLayout
      title={title}
      subtitle={`Module ${moduleNumber}`}
      description={description}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-full bg-primary/10 p-3 w-16 h-16 flex items-center justify-center text-primary">
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>This module is coming soon!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              We're currently working on implementing this interactive module. Check back soon to explore this topic!
            </p>
            <Button asChild>
              <a href="https://github.com/yourusername/data-lens-interactive" target="_blank" rel="noreferrer">
                View Project Repository
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </ModuleLayout>
  );
}
