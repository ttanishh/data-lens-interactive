import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LayoutDashboard, X } from "lucide-react";
import Index from "./pages/Index";
import Modules from "./pages/Modules";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import IntroToDataScience from "./pages/modules/IntroToDataScience";
import TextAnalysis from "./pages/modules/TextAnalysis";
import DataManipulation from "./pages/modules/DataManipulation";
import LargeScaleData from "./pages/modules/LargeScaleData";
import DataStreams from "./pages/modules/DataStreams";
import AdvancedAnalysis from "./pages/modules/AdvancedAnalysis";
import { ModuleDashboard } from "./components/modules/ModuleDashboard";
import Playground from "./pages/Playground";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Dashboard Floating Button
function DashboardButton() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <LayoutDashboard className="h-6 w-6" />
        </Button>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Data Science Dashboard</DialogTitle>
              <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Overview of data science metrics across all modules
            </DialogDescription>
          </DialogHeader>
          
          <ModuleDashboard />
        </DialogContent>
      </Dialog>
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/about" element={<About />} />
          
          {/* Module detail pages */}
          <Route path="/modules/intro-to-data-science" element={<IntroToDataScience />} />
          <Route path="/modules/text-analysis" element={<TextAnalysis />} />
          <Route path="/modules/data-manipulation" element={<DataManipulation />} />
          <Route path="/modules/large-scale-data" element={<LargeScaleData />} />
          <Route path="/modules/data-streams" element={<DataStreams />} />
          <Route path="/modules/advanced-analysis" element={<AdvancedAnalysis />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Dashboard button for all pages */}
        <DashboardButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
