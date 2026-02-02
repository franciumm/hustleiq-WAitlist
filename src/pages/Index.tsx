import { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Use Helmet here, not Provider
import { Toaster } from '@/components/ui/toaster';

// 1. Keep these STATIC (they are above the fold)
import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FoundersNote from '@/components/FoundersNote'; 

// 2. LAZY LOAD these (they are below the fold)
const FloatingSteps = lazy(() => import('@/components/FloatingSteps'));
const WhyUs = lazy(() => import('@/components/WhyUs'));
const BentoGrid = lazy(() => import('@/components/BentoGrid'));
const NetworkSection = lazy(() => import('@/components/NetworkSection'));
const ComingSoon = lazy(() => import('@/components/ComingSoon'));
const TwoPaths = lazy(() => import('@/components/TwoPaths'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));
const HelmetFixed = Helmet as any;

const Index = () => {  
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HustleIQ",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered platform that finds your perfect business model and provides founder accountability.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    }
  };

  return (
    <div id="top" className="relative min-h-screen bg-background overflow-hidden">
      {/* ⚡️ FIX: Use <Helmet> for tags. HelmetProvider stays in App.tsx */}
      <HelmetFixed>
        <title>HustleIQ | Stop Guessing. Start Executing.</title>
        <meta name="description" content="The AI that finds your perfect business model and holds you accountable until you hit $1k. Join the waitlist." />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
       </HelmetFixed>

      <StarBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero /> 

        {/* ⚡️ PERFORMANCE FIX: Wrap lazy components in Suspense */}
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5" />}>
          <FloatingSteps />
          <WhyUs />
          <BentoGrid />
          <NetworkSection />
          <ComingSoon />
          <TwoPaths />
          <FAQ />
          <Footer />
        </Suspense>
      </main>

      <Toaster />
    </div>
  );
};

export default Index;