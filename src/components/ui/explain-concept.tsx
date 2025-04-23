
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExplainConceptProps {
  title: string;
  explanation: string;
  children?: React.ReactNode;
}

export function ExplainConcept({ title, explanation, children }: ExplainConceptProps) {
  const [open, setOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleExplain = () => {
    setOpen(true);
    setTypedText("");
    setIsTyping(true);
    
    let i = 0;
    const typingSpeed = 20; // ms per character
    
    const typeText = () => {
      if (i < explanation.length) {
        setTypedText(prev => prev + explanation.charAt(i));
        i++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };
    
    setTimeout(typeText, 300); // Start typing after dialog animation
  };

  return (
    <>
      <Button 
        onClick={handleExplain} 
        variant="outline" 
        size="sm"
        className="flex items-center gap-1"
      >
        <HelpCircle className="h-4 w-4" />
        {children || "Explain This Concept"}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>AI-generated explanation</DialogDescription>
          </DialogHeader>
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <p className="relative">
              {typedText}
              {isTyping && <span className="animate-pulse ml-1">▋</span>}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
