import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StarBackground from "./components/StarBackground"; // 👈 IMPORT THIS
import { HelmetProvider } from 'react-helmet-async'; // 👈 Import this
const HelmetProviderFixed = HelmetProvider as any;
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProviderFixed> 
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StarBackground />
      <BrowserRouter>
        <main className="relative z-10 min-h-[100dvh] pb-[env(safe-area-inset-bottom)]">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
      
    </TooltipProvider>
        </HelmetProviderFixed> 

  </QueryClientProvider>
);

export default App;