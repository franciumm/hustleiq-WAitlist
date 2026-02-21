import { lazy, Suspense } from 'react'; // ⚡️ Added for performance
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import StarBackground from "./components/StarBackground";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react";

const Index = lazy(() => import("./pages/Index")); 
const NotFound = lazy(() => import("./pages/NotFound"));

const HelmetProviderFixed = HelmetProvider as any;
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProviderFixed> 
      <TooltipProvider>
        <Toaster />
        <Analytics/>
          <Sonner />
        
        {/* Background is always visible */}
        <StarBackground />
      <SpeedInsights />

        <BrowserRouter>
          <main className="relative z-10 min-h-[100dvh]">
            <Suspense fallback={<div className="bg-background min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
        
      </TooltipProvider>
    </HelmetProviderFixed> 
  </QueryClientProvider>
);

export default App;