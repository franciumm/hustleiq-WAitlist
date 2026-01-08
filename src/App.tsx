import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StarBackground from "./components/StarBackground"; // 👈 IMPORT THIS

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* ⚡️ 1. BACKGROUND: Fixed position, sits behind everything (z-0) */}
      <StarBackground />

      <BrowserRouter>
        {/* ⚡️ 2. CONTENT WRAPPER: Sits on top (z-10) so you can click buttons */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;