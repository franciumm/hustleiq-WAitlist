import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// StoryBrand: The Plan (How it works)
const FloatingSteps = lazy(() => import('@/components/FloatingSteps'));
// StoryBrand: The Stakes (Path A vs Path B)
const TwoPaths = lazy(() => import('@/components/TwoPaths'));
// Alleviating Fear (The 3 Questions)
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

const HelmetFixed = Helmet as any;

const Index = () => {  
  return (
    <div id="top" className="relative min-h-screen bg-[#0b0f0a] overflow-hidden">
      <HelmetFixed>
        <title>HustleIQ | Stop Guessing. Start Executing.</title>
        <meta name="description" content="The AI Co-founder that kills distraction. Launch your $10k/mo business." />
      </HelmetFixed>
      
      <StarBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero /> 
        
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5" />}>
          {/* Section 1: The Plan (Demonstrates the Guide knows the way) */}
          <FloatingSteps />
          
          {/* Section 2: The Stakes (StoryBrand: What happens if they don't act?) */}
          <TwoPaths />
          
          {/* Section 3: Friction Removal (Minimalist FAQ) */}
          <FAQ />
          
          <Footer />
        </Suspense>
      </main>
      <Toaster />
    </div>
  );
};

export default Index;