import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Modules from "./pages/Modules";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import IntroToDataScience from "./pages/modules/IntroToDataScience";
import TextAnalysis from "./pages/modules/TextAnalysis";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
          <Route path="/modules" element={<Modules />} />
          <Route path="/about" element={<About />} />
          
          {/* Module detail pages */}
          <Route path="/modules/intro-to-data-science" element={<IntroToDataScience />} />
          <Route path="/modules/text-analysis" element={<TextAnalysis />} />
          
          {/* ADD OTHER MODULE ROUTES HERE */}
          {/* Route path="/modules/large-scale-data" element={<LargeScaleData />} */}
          {/* Route path="/modules/data-manipulation" element={<DataManipulation />} */}
          {/* Route path="/modules/data-streams" element={<DataStreams />} */}
          {/* Route path="/modules/advanced-analysis" element={<AdvancedAnalysis />} */}
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
