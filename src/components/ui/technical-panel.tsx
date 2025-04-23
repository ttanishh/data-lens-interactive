
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TechnicalPanelProps {
  title: string;
  description?: string;
  pseudocode?: string;
  formulas?: Array<{
    name: string;
    formula: string;
    explanation: string;
  }>;
  references?: Array<{
    title: string;
    url: string;
  }>;
}

export function TechnicalPanel({
  title,
  description,
  pseudocode,
  formulas,
  references
}: TechnicalPanelProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Code className="h-4 w-4" />
          Technical View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {pseudocode && (
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Code className="h-4 w-4 mr-2" />
                Pseudocode
              </h3>
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">{pseudocode}</pre>
              </div>
            </div>
          )}
          
          {formulas && formulas.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Mathematical Foundation</h3>
              
              <div className="space-y-4">
                {formulas.map((formula, index) => (
                  <Card key={index}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{formula.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="bg-muted p-3 rounded-md mb-3 font-mono text-center">
                        {formula.formula}
                      </div>
                      <p className="text-sm text-muted-foreground">{formula.explanation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {references && references.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                References
              </h3>
              
              <ul className="space-y-2">
                {references.map((reference, index) => (
                  <li key={index}>
                    <a 
                      href={reference.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80"
                    >
                      {reference.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
